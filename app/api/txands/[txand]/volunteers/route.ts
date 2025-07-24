import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/auth-helpers"
import { logger } from "@/lib/logger"
import { createSecureHeaders } from "@/lib/security"
import { sectors, volunteers, affectations, timeslots } from "@/lib/airtable"
import { TimeslotDetails } from "@/components/volunteers/type"
import { VolunteerRecord } from "@/types/user.interface"
import { TimeslotRecord } from "@/types/timeslot.interface"

// ✅ Proper TypeScript interfaces
interface CacheEntry<T> {
  data: T
  timestamp: number
}

interface BulkData {
  allTimeslots: TimeslotRecord[]
  allAffectations: AffectationRecord[]
  allVolunteers: VolunteerRecord[]
}

interface ProcessedResult {
  volunteers: EnrichedVolunteer[]
  timeslots: Record<string, string>
  allSectorTimeslots: Record<string, TimeslotDetails>
  timeslotDetails: Record<string, TimeslotDetails>
  totalTimeslots: number
}

interface AffectationRecord {
  id: string
  fields: {
    volunteer?: string | string[]
    txand?: string | string[]
  }
}

interface EnrichedVolunteer extends VolunteerRecord {
  affectations: EnrichedAffectation[]
}

interface EnrichedAffectation extends AffectationRecord {
  timeslotNames: string[]
}

// ✅ Request deduplication with proper typing
const pendingRequests = new Map<string, Promise<ProcessedResult>>()

// ✅ Multi-level cache system with proper typing
const cache = new Map<string, CacheEntry<ProcessedResult>>()
const bulkDataCache: CacheEntry<BulkData | null> = { data: null, timestamp: 0 }
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes
const BULK_CACHE_TTL = 2 * 60 * 1000 // 2 minutes for bulk data

function getCacheKey(sectorId: string): string {
  return `sector-volunteers-${sectorId}`
}

function getFromCache(key: string): ProcessedResult | null {
  const cached = cache.get(key)
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data
  }
  cache.delete(key)
  return null
}

function setCache(key: string, data: ProcessedResult): void {
  cache.set(key, { data, timestamp: Date.now() })

  // ✅ More efficient cache cleanup
  if (cache.size > 100) {
    const now = Date.now()
    for (const [cacheKey, entry] of cache.entries()) {
      if (now - entry.timestamp > CACHE_TTL) {
        cache.delete(cacheKey)
      }
    }
  }
}

// ✅ Cached bulk data fetching with proper typing
async function getCachedBulkData(): Promise<BulkData> {
  const now = Date.now()

  if (bulkDataCache.data && now - bulkDataCache.timestamp < BULK_CACHE_TTL) {
    logger.info('Using cached bulk data')
    return bulkDataCache.data
  }

  logger.info('Fetching fresh bulk data')
  const [allTimeslots, allAffectations, allVolunteers] = await Promise.all([
    timeslots.getAll() as Promise<TimeslotRecord[]>,
    affectations.getAll() as Promise<AffectationRecord[]>,
    volunteers.getAll() as Promise<VolunteerRecord[]>
  ])

  const data: BulkData = { allTimeslots, allAffectations, allVolunteers }
  bulkDataCache.data = data
  bulkDataCache.timestamp = now

  return data
}

// ✅ Type-safe helper functions
function isTimeslotInSector(timeslotSectors: string | string[] | undefined, sectorId: string): boolean {
  if (!timeslotSectors) return false
  return Array.isArray(timeslotSectors)
    ? timeslotSectors.includes(sectorId)
    : timeslotSectors === sectorId
}

function extractTimeslotIds(txandField: string | string[] | undefined): string[] {
  if (!txandField) return []
  return Array.isArray(txandField) ? txandField : [txandField]
}

function extractVolunteerIds(volunteerField: string | string[] | undefined): string[] {
  if (!volunteerField) return []
  if (Array.isArray(volunteerField)) {
    return volunteerField.filter((id): id is string => typeof id === 'string' && id.trim() !== '')
  }
  return typeof volunteerField === 'string' && volunteerField.trim() ? [volunteerField.trim()] : []
}

function isVolunteerInAffectation(volunteerField: string | string[] | undefined, volunteerId: string): boolean {
  if (!volunteerField) return false
  return Array.isArray(volunteerField)
    ? volunteerField.includes(volunteerId)
    : volunteerField === volunteerId
}

// ✅ Optimized data processing with proper types
function processVolunteersForSector(
  sectorId: string,
  { allTimeslots, allAffectations, allVolunteers }: BulkData
): ProcessedResult {
  // ✅ Early return optimizations
  const sectorTimeslots = allTimeslots.filter(timeslot =>
    isTimeslotInSector(timeslot.fields.sector, sectorId)
  )

  if (sectorTimeslots.length === 0) {
    return {
      volunteers: [],
      timeslots: {},
      allSectorTimeslots: {},
      timeslotDetails: {},
      totalTimeslots: 0
    }
  }

  // ✅ Use Sets for O(1) lookups
  const sectorTimeslotIds = new Set(sectorTimeslots.map(ts => ts.id))

  // ✅ Build maps for efficient lookups
  const allSectorTimeslotsMap = new Map<string, TimeslotDetails>()
  const volunteerMap = new Map<string, VolunteerRecord>()

  // ✅ Single pass to build volunteer map
  allVolunteers.forEach(volunteer => {
    volunteerMap.set(volunteer.id, volunteer)
  })

  // ✅ Single pass to build timeslot details
  sectorTimeslots.forEach(timeslot => {
    const details: TimeslotDetails = {
      id: timeslot.id,
      name: (typeof timeslot.fields.name === "string" && timeslot.fields.name.trim())
        ? timeslot.fields.name
        : `Créneau ${timeslot.id.slice(-6)}`,
      dateStart: timeslot.fields.dateStart,
      dateEnd: timeslot.fields.dateEnd,
      totalVolunteers: timeslot.fields.totalVolunteers
    }
    allSectorTimeslotsMap.set(timeslot.id, details)
  })

  // ✅ Optimized affectation filtering
  const sectorAffectations = allAffectations.filter(affectation => {
    const timeslotIds = extractTimeslotIds(affectation.fields.txand)
    return timeslotIds.some(id => sectorTimeslotIds.has(id))
  })

  if (sectorAffectations.length === 0) {
    return {
      volunteers: [],
      timeslots: {},
      allSectorTimeslots: Object.fromEntries(allSectorTimeslotsMap),
      timeslotDetails: {},
      totalTimeslots: sectorTimeslots.length
    }
  }

  // ✅ Efficient volunteer ID extraction
  const volunteerIds = new Set<string>()
  sectorAffectations.forEach(affectation => {
    const ids = extractVolunteerIds(affectation.fields.volunteer)
    ids.forEach(id => volunteerIds.add(id))
  })

  // ✅ Build volunteers with their affectations
  const sectorVolunteers: EnrichedVolunteer[] = Array.from(volunteerIds)
    .map(volunteerId => {
      const volunteer = volunteerMap.get(volunteerId)
      if (!volunteer) return null

      const volunteerAffectations: EnrichedAffectation[] = sectorAffectations
        .filter(aff => isVolunteerInAffectation(aff.fields.volunteer, volunteerId))
        .map(aff => ({
          ...aff,
          timeslotNames: extractTimeslotIds(aff.fields.txand)
            .filter(id => sectorTimeslotIds.has(id))
            .map(id => {
              const details = allSectorTimeslotsMap.get(id)
              return details ? details.name : `Créneau ${id.slice(-6)}`
            })
        }))

      return {
        ...volunteer,
        affectations: volunteerAffectations
      }
    })
    .filter((volunteer): volunteer is EnrichedVolunteer => volunteer !== null)

  // ✅ Build timeslots with volunteers
  const timeslotsWithVolunteers = new Map<string, TimeslotDetails>()
  const timeslotsWithAffectations = new Set<string>()

  sectorAffectations.forEach(affectation => {
    const timeslotIds = extractTimeslotIds(affectation.fields.txand)
    timeslotIds.forEach(timeslotId => {
      if (sectorTimeslotIds.has(timeslotId)) {
        timeslotsWithAffectations.add(timeslotId)
      }
    })
  })

  timeslotsWithAffectations.forEach(timeslotId => {
    const details = allSectorTimeslotsMap.get(timeslotId)
    if (details) {
      timeslotsWithVolunteers.set(timeslotId, details)
    }
  })

  return {
    volunteers: sectorVolunteers,
    timeslots: Object.fromEntries(
      Array.from(timeslotsWithVolunteers.entries()).map(([id, details]) => [id, details.name])
    ),
    allSectorTimeslots: Object.fromEntries(allSectorTimeslotsMap),
    timeslotDetails: Object.fromEntries(timeslotsWithVolunteers),
    totalTimeslots: sectorTimeslots.length
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ txand: string }> }
): Promise<NextResponse> {
  const headers = createSecureHeaders()

  try {
    const { token, error } = await requireAdmin(request)
    if (error) return error

    const resolvedParams = await params
    const sectorId = resolvedParams.txand

    if (!sectorId) {
      return NextResponse.json(
        { error: "Sector ID is required" },
        { status: 400, headers }
      )
    }

    // ✅ Check cache first
    const cacheKey = getCacheKey(sectorId)
    const cached = getFromCache(cacheKey)
    if (cached) {
      logger.info(`Cache hit for sector volunteers: ${sectorId}`)
      return NextResponse.json(cached, { headers })
    }

    // ✅ Request deduplication
    const requestKey = `fetch-${sectorId}`
    if (pendingRequests.has(requestKey)) {
      logger.info(`Deduplicating request for sector: ${sectorId}`)
      const result = await pendingRequests.get(requestKey)!
      return NextResponse.json(result, { headers })
    }

    // ✅ Create deduplication promise
    const requestPromise = (async (): Promise<ProcessedResult> => {
      try {
        // ✅ Verify sector exists
        const sector = await sectors.getById(sectorId)
        if (!sector) {
          throw new Error(`Sector not found: ${sectorId}`)
        }

        logger.info(`Processing volunteers for sector: ${token.email}`, {
          sectorId,
          sectorName: sector.fields.name
        })

        // ✅ Get bulk data (cached separately)
        const bulkData = await getCachedBulkData()

        logger.info(`Bulk data ready: ${bulkData.allTimeslots.length} timeslots, ${bulkData.allAffectations.length} affectations, ${bulkData.allVolunteers.length} volunteers`)

        // ✅ Process data efficiently
        const result = processVolunteersForSector(sectorId, bulkData)

        // ✅ Cache the result
        setCache(cacheKey, result)

        logger.info(`Retrieved ${result.volunteers.length} volunteers for sector: ${sectorId}`, {
          adminEmail: token.email,
          sectorName: sector.fields.name,
          volunteerCount: result.volunteers.length,
          timeslotCount: result.totalTimeslots,
          cacheKey
        })

        return result

      } finally {
        // ✅ Always clean up pending request
        pendingRequests.delete(requestKey)
      }
    })()

    // ✅ Store pending request
    pendingRequests.set(requestKey, requestPromise)
    const result = await requestPromise

    return NextResponse.json(result, { headers })

  } catch (err: unknown) {
    logger.error("Error fetching sector volunteers", err)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers }
    )
  }
}

// ✅ Enhanced cache management
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ txand: string }> }
): Promise<NextResponse> {
  const headers = createSecureHeaders()

  try {
    const { error } = await requireAdmin(request)
    if (error) return error

    const resolvedParams = await params
    const sectorId = resolvedParams.txand

    if (sectorId === 'all') {
      // Clear all caches
      cache.clear()
      bulkDataCache.data = null
      bulkDataCache.timestamp = 0
      pendingRequests.clear()
      logger.info('All caches cleared')
    } else {
      // Clear specific sector cache
      const cacheKey = getCacheKey(sectorId)
      cache.delete(cacheKey)
      const requestKey = `fetch-${sectorId}`
      pendingRequests.delete(requestKey)
      logger.info(`Cache cleared for sector: ${sectorId}`)
    }

    return NextResponse.json({ message: "Cache cleared" }, { headers })
  } catch (err: unknown) {
    logger.error("Error clearing cache", err)
    return NextResponse.json({ error: "Failed to clear cache" }, { status: 500, headers })
  }
}

// ✅ Health check endpoint with proper typing
export async function HEAD(): Promise<NextResponse> {
  const headers = createSecureHeaders()

  return new NextResponse(null, {
    status: 200,
    headers: {
      ...headers,
      'X-Cache-Size': cache.size.toString(),
      'X-Pending-Requests': pendingRequests.size.toString(),
      'X-Bulk-Cache-Age': bulkDataCache.data
        ? Math.floor((Date.now() - bulkDataCache.timestamp) / 1000).toString()
        : '0'
    }
  })
}