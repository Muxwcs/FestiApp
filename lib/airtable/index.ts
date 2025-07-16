import { base } from './base'
import { events } from './events'
import { sectors } from './sectors'
import { tasks } from './tasks'
import { volunteers } from './volunteers'

// Re-export everything from individual services
export { sectors } from './sectors'
export { volunteers } from './volunteers'
export { events } from './events'
export { tasks } from './tasks'

// Export types
export type { AirtableRecord, QueryOptions, UpdateData, CreateData } from './types'

// Export base functions for custom use cases
export {
  airtableGet,
  airtableCreate,
  airtableUpdate,
  airtableDelete,
  base
} from './base'

// // Default export with all services (optional)
// export default {
//   volunteers,
//   events,
//   tasks,
//   base
// }

// Assign object to a variable before exporting as module default
const airtableServices = {
  volunteers,
  sectors,
  events,
  tasks,
  base
}

export default airtableServices