"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import {
  ArrowLeft, Edit, Save, X, Trash2, RefreshCw, AlertCircle,
  User, Mail, Phone, Briefcase, Star, FileText, Clock, Database,
  CheckCircle, XCircle, AlertTriangle, Loader2, Copy, Eye, EyeOff, Calendar, Shield, Settings,
  Hash,
  MapPin,
  Target,
  Users
} from "lucide-react"

import { useVolunteer } from "@/hooks/use-volunteer"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { toast } from "sonner"

import { VolunteerRecord } from "@/types/user.interface"
import { useVolunteerMissions, useVolunteerAssignments } from "@/hooks/use-volunteer-missions"

const VolunteerPage = () => {
  const params = useParams()
  const router = useRouter()
  const volunteerId = params.benevole as string

  const {
    volunteer,
    isLoading,
    error,
    updateVolunteer,
    deleteVolunteer,
    refetch,
    isUpdating,
    isDeleting,
    isNotFound
  } = useVolunteer(volunteerId)

  // Inside your VolunteerPage component, add these hooks after your existing ones:
  const {
    data: missions,
    isLoading: missionsLoading,
    error: missionsError
  } = useVolunteerMissions(volunteerId)

  const {
    data: assignments,
    isLoading: assignmentsLoading,
    error: assignmentsError
  } = useVolunteerAssignments(volunteerId)

  // ✅ Enhanced local state
  const [editing, setEditing] = useState(false)
  const [editData, setEditData] = useState<Partial<VolunteerRecord>>({})
  const [showRawData, setShowRawData] = useState(false)
  const [unsavedChanges, setUnsavedChanges] = useState(false)

  // ✅ Initialize edit data and track changes
  useEffect(() => {
    if (volunteer && !editing) {
      setEditData(volunteer)
      setUnsavedChanges(false)
    }
  }, [volunteer, editing])

  // ✅ Track unsaved changes
  useEffect(() => {
    if (editing && volunteer) {
      const hasChanges = JSON.stringify(editData) !== JSON.stringify(volunteer)
      setUnsavedChanges(hasChanges)
    }
  }, [editData, volunteer, editing])

  // ✅ Enhanced save with validation
  const handleSave = async () => {
    if (!editData.fields) return

    // Basic validation
    if (!editData.fields.email || !editData.fields.firstname) {
      toast.error("Veuillez remplir les champs obligatoires (Email, Prénom)")
      return
    }

    updateVolunteer(
      { id: volunteerId, updates: editData },
      {
        onSuccess: () => {
          setEditing(false)
          setUnsavedChanges(false)
          toast.success("Bénévole mis à jour avec succès")
        },
        onError: () => {
          toast.error("Erreur lors de la mise à jour")
        }
      }
    )
  }

  // ✅ Enhanced delete with confirmation
  const handleDelete = async () => {
    const volunteerName = `${volunteer?.fields?.firstname || ''} ${volunteer?.fields?.name || ''}`.trim()

    if (!confirm(`Êtes-vous sûr de vouloir supprimer le bénévole "${volunteerName}" ?\n\nCette action est irréversible.`)) return

    deleteVolunteer(volunteerId, {
      onSuccess: () => {
        toast.success("Bénévole supprimé avec succès")
        router.push("/admin/benevoles")
      },
      onError: () => {
        toast.error("Erreur lors de la suppression")
      }
    })
  }

  // ✅ Handle field updates with change tracking
  const updateField = (field: string, value: string | string[] | number | boolean | null) => {
    setEditData(prev => ({
      ...prev,
      fields: {
        ...prev.fields,
        [field]: value
      }
    }))
  }

  // ✅ Enhanced cancel with unsaved changes warning
  const handleCancel = () => {
    if (unsavedChanges) {
      if (!confirm("Vous avez des modifications non sauvegardées. Voulez-vous vraiment annuler ?")) {
        return
      }
    }
    setEditData(volunteer || {})
    setEditing(false)
    setUnsavedChanges(false)
  }

  // ✅ Copy to clipboard helper
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast.success(`${label} copié dans le presse-papiers`)
  }

  // ✅ Enhanced loading with skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-20" />
            <Skeleton className="h-8 w-64" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-48" />
                </CardHeader>
                <CardContent className="space-y-4">
                  {[1, 2, 3, 4].map(j => (
                    <div key={j} className="space-y-2">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // ✅ Enhanced not found state
  if (isNotFound) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center space-y-6 max-w-md">
          <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center">
            <AlertCircle className="h-12 w-12 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Bénévole introuvable</h1>
            <p className="text-muted-foreground">
              Le bénévole avec l&apos;ID <code className="bg-muted px-1 rounded">{volunteerId}</code> n&apos;existe pas.
            </p>
          </div>
          <div className="flex gap-2 justify-center">
            <Link href="/admin/benevoles">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour à la liste
              </Button>
            </Link>
            <Button onClick={() => refetch()} variant="ghost">
              <RefreshCw className="h-4 w-4 mr-2" />
              Réessayer
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // ✅ Enhanced error state
  if (error && !isNotFound) {
    return (
      <div className="min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link href="/admin/benevoles">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour
              </Button>
            </Link>
          </div>

          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between">
              <div>
                <p className="font-medium">Erreur de chargement</p>
                <p className="text-sm opacity-90">{error.message}</p>
              </div>
              <Button onClick={() => refetch()} variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Réessayer
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    )
  }

  if (!volunteer) return null

  const fields = volunteer.fields

  // ✅ Helper functions for status styling
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Validé": return "default"
      case "En attente": return "secondary"
      case "Refusé": return "destructive"
      default: return "outline"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Validé": return <CheckCircle className="h-3 w-3" />
      case "En attente": return <AlertTriangle className="h-3 w-3" />
      case "Refusé": return <XCircle className="h-3 w-3" />
      default: return null
    }
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background rounded-lg">
        {/* ✅ Enhanced Header with better spacing */}
        <div className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50 rounded-lg">
          <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col space-y-4 lg:flex-row lg:items-start lg:justify-between lg:space-y-0">
              {/* Left side - Title and info */}
              <div className="flex flex-col space-y-4 sm:flex-row sm:items-start sm:space-y-0 sm:space-x-4">
                <Link href="/admin/benevoles">
                  <Button variant="outline" size="sm" className="w-full sm:w-auto">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Retour
                  </Button>
                </Link>

                <div className="flex items-start space-x-4">
                  {/* ✅ Avatar with initials */}
                  <Avatar className="h-12 w-12 border-2">
                    <AvatarImage src="" alt="" />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {`${fields.firstname?.charAt(0) || ''}${fields.name?.charAt(0) || ''}`.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div className="space-y-1">
                    <h1 className="text-xl sm:text-2xl font-bold leading-tight">
                      {fields.surname
                        ? `${fields.surname} - ${fields.firstname || ""} ${fields.name || ""}`.trim()
                        : `${fields.firstname || ""} ${fields.name || ""}`.trim() || "Bénévole sans nom"
                      }
                    </h1>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant={getStatusVariant(fields.status || "")} className="gap-1">
                        {getStatusIcon(fields.status || "")}
                        {fields.status || "Non défini"}
                      </Badge>
                      <Badge variant={fields.role === "admin" ? "destructive" : "secondary"}>
                        {fields.role || "bénévole"}
                      </Badge>
                      {fields.firebaseUid && (
                        <Badge variant="outline" className="gap-1">
                          <Database className="h-3 w-3" />
                          Connecté
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* ✅ Action Buttons with enhanced styling */}
              <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                {editing ? (
                  <>
                    <Button
                      onClick={handleSave}
                      disabled={isUpdating || !unsavedChanges}
                      className="w-full sm:w-auto relative"
                    >
                      {isUpdating ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Save className="h-4 w-4 mr-2" />
                      )}
                      {isUpdating ? "Sauvegarde..." : "Sauvegarder"}
                      {unsavedChanges && (
                        <span className="absolute -top-1 -right-1 h-2 w-2 bg-orange-500 rounded-full" />
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleCancel}
                      disabled={isUpdating}
                      className="w-full sm:w-auto"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Annuler
                    </Button>
                  </>
                ) : (
                  <>
                    <Button onClick={() => setEditing(true)} className="w-full sm:w-auto">
                      <Edit className="h-4 w-4 mr-2" />
                      Modifier
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className="w-full sm:w-auto"
                    >
                      {isDeleting ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4 mr-2" />
                      )}
                      {isDeleting ? "Suppression..." : "Supprimer"}
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* ✅ Unsaved changes indicator */}
            {unsavedChanges && (
              <Alert className="mt-4 border-orange-200 bg-orange-50">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <AlertDescription className="text-orange-800">
                  Vous avez des modifications non sauvegardées.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>

        {/* ✅ Main Content with Tabs */}
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 rounded-lg">
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
              <TabsTrigger value="profile" className="gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Profil</span>
              </TabsTrigger>
              <TabsTrigger value="skills" className="gap-2">
                <Star className="h-4 w-4" />
                <span className="hidden sm:inline">Compétences</span>
              </TabsTrigger>
              <TabsTrigger value="technical" className="gap-2">
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Technique</span>
              </TabsTrigger>
              <TabsTrigger value="metadata" className="gap-2">
                <Database className="h-4 w-4" />
                <span className="hidden sm:inline">Données</span>
              </TabsTrigger>
            </TabsList>

            {/* ✅ Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Personal Information */}
                <Card className="h-fit">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Informations personnelles
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Required fields indicator */}
                    {editing && (
                      <p className="text-sm text-muted-foreground">
                        Les champs marqués d&apos;un <span className="text-red-500">*</span> sont obligatoires
                      </p>
                    )}

                    {/* Name fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstname" className="flex items-center gap-1">
                          Prénom {editing && <span className="text-red-500">*</span>}
                        </Label>
                        {editing ? (
                          <Input
                            id="firstname"
                            value={editData?.fields?.firstname || ""}
                            onChange={(e) => updateField('firstname', e.target.value)}
                            className={!editData?.fields?.firstname ? "border-red-300" : ""}
                          />
                        ) : (
                          <p className="min-h-[20px] text-sm">{fields.firstname || "Non renseigné"}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="name">Nom</Label>
                        {editing ? (
                          <Input
                            id="name"
                            value={editData?.fields?.name || ""}
                            onChange={(e) => updateField('name', e.target.value)}
                          />
                        ) : (
                          <p className="min-h-[20px] text-sm">{fields.name || "Non renseigné"}</p>
                        )}
                      </div>
                    </div>

                    {/* Surname */}
                    <div className="space-y-2">
                      <Label htmlFor="surname">Surnom</Label>
                      {editing ? (
                        <Input
                          id="surname"
                          value={editData?.fields?.surname || ""}
                          onChange={(e) => updateField('surname', e.target.value)}
                        />
                      ) : (
                        <p className="min-h-[20px] text-sm">{fields.surname || "Non renseigné"}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Email {editing && <span className="text-red-500">*</span>}
                      </Label>
                      {editing ? (
                        <Input
                          id="email"
                          type="email"
                          value={editData?.fields?.email || ""}
                          onChange={(e) => updateField('email', e.target.value)}
                          className={!editData?.fields?.email ? "border-red-300" : ""}
                        />
                      ) : (
                        <div className="flex items-center gap-2">
                          <p className="text-sm break-all">{fields.email || "Non renseigné"}</p>
                          {fields.email && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => copyToClipboard(fields.email ?? "", "Email")}
                                >
                                  <Copy className="h-3 w-3" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Copier l&apos;email</TooltipContent>
                            </Tooltip>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Téléphone
                      </Label>
                      {editing ? (
                        <Input
                          id="phone"
                          value={editData?.fields?.phone || ""}
                          onChange={(e) => updateField('phone', e.target.value)}
                        />
                      ) : (
                        <div className="flex items-center gap-2">
                          <p className="text-sm">{fields.phone || "Non renseigné"}</p>
                          {fields.phone && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => copyToClipboard(fields.phone ?? "", "Téléphone")}
                                >
                                  <Copy className="h-3 w-3" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Copier le téléphone</TooltipContent>
                            </Tooltip>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Role & Status */}
                <Card className="h-fit">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Rôle & Statut
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Role */}
                    <div className="space-y-2">
                      <Label htmlFor="role" className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4" />
                        Rôle
                      </Label>
                      {editing ? (
                        <Select
                          value={editData?.fields?.role || "bénévole"}
                          onValueChange={(value) => updateField('role', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bénévole">Bénévole</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="responsable">Responsable</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <div>
                          <Badge variant={fields.role === "admin" ? "destructive" : "secondary"}>
                            {fields.role || "bénévole"}
                          </Badge>
                        </div>
                      )}
                    </div>

                    {/* Status */}
                    <div className="space-y-2">
                      <Label htmlFor="status">Statut</Label>
                      {editing ? (
                        <Select
                          value={editData?.fields?.status || ""}
                          onValueChange={(value) => updateField('status', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un statut" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Validé">
                              <div className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                Validé
                              </div>
                            </SelectItem>
                            <SelectItem value="En attente">
                              <div className="flex items-center gap-2">
                                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                                En attente
                              </div>
                            </SelectItem>
                            <SelectItem value="Refusé">
                              <div className="flex items-center gap-2">
                                <XCircle className="h-4 w-4 text-red-600" />
                                Refusé
                              </div>
                            </SelectItem>
                            <SelectItem value="Inactif">Inactif</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <div>
                          <Badge variant={getStatusVariant(fields.status || "")} className="gap-1">
                            {getStatusIcon(fields.status || "")}
                            {fields.status || "Non défini"}
                          </Badge>
                        </div>
                      )}
                    </div>

                    {/* Quick stats */}
                    <div className="pt-4 border-t space-y-2">
                      <h4 className="font-medium text-sm">Statistiques rapides</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Tâches assignées</p>
                          <p className="font-medium">{fields.totalTaskAssigned || 0}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Txands assignés</p>
                          <p className="font-medium">{fields.assignedTxands?.length || 0}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* ✅ Enhanced Skills Tab with Beautiful Missions & Assignments */}
            <TabsContent value="skills" className="space-y-6">
              <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">

                {/* Skills & Availability - Takes 1 column */}
                <Card className="xl:col-span-1">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Star className="h-5 w-5" />
                      Compétences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Skills Section */}
                    <div className="space-y-3">
                      {editing ? (
                        <Textarea
                          id="skills"
                          value={Array.isArray(editData?.fields?.skills) ? editData?.fields?.skills.join(", ") : ""}
                          onChange={(e) => updateField('skills', e.target.value.split(",").map(s => s.trim()).filter(Boolean))}
                          placeholder="Séparer par des virgules"
                          rows={4}
                          className="text-sm"
                        />
                      ) : (
                        <div className="min-h-[80px]">
                          <div className="flex flex-wrap gap-1.5">
                            {Array.isArray(fields.skills) && fields.skills.length > 0 ? (
                              fields.skills.map((skill, index) => (
                                <Badge key={index} variant="outline" className="text-xs px-2 py-1">
                                  {skill}
                                </Badge>
                              ))
                            ) : (
                              <span className="text-xs text-muted-foreground italic">
                                Aucune compétence renseignée
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Availability */}
                    {fields.dispos && Array.isArray(fields.dispos) && fields.dispos.length > 0 && (
                      <div className="pt-3 border-t">
                        <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          Disponibilités
                        </h4>
                        <div className="space-y-1.5">
                          {fields.dispos.slice(0, 5).map((dispo, index) => (
                            <div key={index} className="flex items-center gap-2 text-xs">
                              <div className="h-2 w-2 bg-green-500 rounded-full flex-shrink-0" />
                              <span className="truncate">{dispo}</span>
                            </div>
                          ))}
                          {fields.dispos.length > 5 && (
                            <div className="text-xs text-muted-foreground italic">
                              +{fields.dispos.length - 5} autres...
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Quick Stats */}
                    <div className="pt-3 border-t">
                      <h4 className="font-medium text-sm mb-3">Statistiques</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Missions</span>
                          <Badge variant="secondary" className="h-5 text-xs">
                            {missions?.length || 0}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Affectations</span>
                          <Badge variant="secondary" className="h-5 text-xs">
                            {assignments?.length || 0}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Missions & Assignments - Takes 3 columns */}
                <div className="xl:col-span-3 space-y-6">
                  {/* Missions (Tâches) */}
                  <Card>
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <Target className="h-5 w-5 text-blue-600" />
                          Missions assignées
                          {missions && missions.length > 0 && (
                            <Badge variant="default" className="ml-2">
                              {missions.length}
                            </Badge>
                          )}
                        </CardTitle>
                        {missionsLoading && (
                          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      {missionsLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[1, 2, 3, 4].map(i => (
                            <div key={i} className="p-4 border rounded-xl">
                              <div className="flex items-start justify-between mb-3">
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-5 w-16" />
                              </div>
                              <Skeleton className="h-3 w-full mb-2" />
                              <Skeleton className="h-3 w-2/3 mb-3" />
                              <div className="flex gap-2">
                                <Skeleton className="h-5 w-20" />
                                <Skeleton className="h-5 w-16" />
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : missionsError ? (
                        <Alert variant="destructive">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>
                            Erreur lors du chargement des missions
                          </AlertDescription>
                        </Alert>
                      ) : missions && missions.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {missions.map((mission) => (
                            <div
                              key={mission.id}
                              className="group p-4 border rounded-xl hover:shadow-md hover:border-blue-200 transition-all duration-200 bg-gradient-to-br from-white to-blue-50/20"
                            >
                              {/* Header */}
                              <div className="flex items-start justify-between mb-3">
                                <h4 className="font-semibold text-sm text-gray-900 group-hover:text-blue-700 transition-colors">
                                  {mission.fields.name || "Mission sans nom"}
                                </h4>
                                <div className="flex gap-1">
                                  {mission.fields.priority && (
                                    <Badge
                                      variant="outline"
                                      className="text-xs h-5 px-2"
                                    >
                                      {mission.fields.priority}
                                    </Badge>
                                  )}
                                  <Badge
                                    variant={
                                      mission.fields.status === "À faire" ? "default" :
                                        mission.fields.status === "Terminée" ? "secondary" : "outline"
                                    }
                                    className="text-xs h-5 px-2"
                                  >
                                    {mission.fields.status === "À faire" ? "À faire" :
                                      mission.fields.status === "Terminée" ? "Terminée" :
                                        mission.fields.status || "En cours"}
                                  </Badge>
                                </div>
                              </div>

                              {/* Description */}
                              {mission.fields.description && (
                                <p className="text-xs text-gray-600 mb-3 line-clamp-2 leading-relaxed">
                                  {mission.fields.description}
                                </p>
                              )}

                              {/* Footer */}
                              <div className="flex items-center gap-3 mt-auto">
                                {mission.fields.place && (
                                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                    <MapPin className="h-3 w-3" />
                                    <span className="font-medium">{mission.fields.place}</span>
                                  </div>
                                )}
                                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                  <Hash className="h-3 w-3" />
                                  <span className="font-mono">{mission.id.slice(-6)}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <Target className="h-8 w-8 text-gray-400" />
                          </div>
                          <h3 className="font-medium text-gray-900 mb-1">Aucune mission assignée</h3>
                          <p className="text-sm text-gray-500">
                            Ce bénévole n&apos;a pas encore de missions assignées
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Assignments (Affectations) */}
                  <Card>
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <Users className="h-5 w-5 text-green-600" />
                          Affectations
                          {assignments && assignments.length > 0 && (
                            <Badge variant="default" className="ml-2">
                              {assignments.length}
                            </Badge>
                          )}
                        </CardTitle>
                        {assignmentsLoading && (
                          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      {assignmentsLoading ? (
                        <div className="space-y-3">
                          {[1, 2, 3].map(i => (
                            <div key={i} className="p-4 border rounded-xl">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex gap-2">
                                  <Skeleton className="h-5 w-20" />
                                  <Skeleton className="h-5 w-16" />
                                </div>
                                <Skeleton className="h-4 w-24" />
                              </div>
                              <div className="grid grid-cols-2 gap-3">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : assignmentsError ? (
                        <Alert variant="destructive">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>
                            Erreur lors du chargement des affectations
                          </AlertDescription>
                        </Alert>
                      ) : assignments && assignments.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {assignments.map((assignment) => (
                            <div
                              key={assignment.id}
                              className="group p-4 border rounded-xl hover:shadow-md hover:border-green-200 transition-all duration-200 bg-gradient-to-br from-white to-green-50/20"
                            >
                              {/* Header with Assignment Number and Priority */}
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-2">
                                  <h4 className="font-semibold text-sm text-gray-900 group-hover:text-green-700 transition-colors">
                                    Affectation #{assignment.fields.number || assignment.id.slice(-6)}
                                  </h4>
                                  {assignment.enriched?.priority?.isHigh && (
                                    <Badge variant="destructive" className="text-xs h-5 px-2">
                                      <AlertTriangle className="h-3 w-3 mr-1" />
                                      Priorité haute
                                    </Badge>
                                  )}
                                </div>

                                <Badge
                                  variant={
                                    assignment.fields.status === "Validé" ? "default" :
                                      assignment.fields.status === "En attente" ? "secondary" : "outline"
                                  }
                                  className="text-xs h-5 px-2"
                                >
                                  {assignment.fields.status || "En attente"}
                                </Badge>
                              </div>

                              {/* Sector Info with Color */}
                              <div className="flex items-center gap-2 mb-3">
                                <div
                                  className="h-3 w-3 rounded-full flex-shrink-0"
                                  style={{ backgroundColor: assignment.enriched?.sector?.color || '#10b981' }}
                                />
                                <span className="text-sm font-medium text-gray-700">
                                  {assignment.enriched?.sector?.name || 'Secteur non défini'}
                                </span>
                                {assignment.enriched?.sector?.description && (
                                  <span className="text-xs text-gray-500 truncate">
                                    • {assignment.enriched.sector.description}
                                  </span>
                                )}
                              </div>

                              {/* Next Timeslot Info */}
                              {assignment.enriched?.timeslots?.next && (
                                <div className="bg-gray-50 rounded-lg p-3 mb-3">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-medium text-gray-600">Prochain créneau</span>
                                    {assignment.enriched?.timing?.isToday && (
                                      <Badge variant="destructive" className="text-xs h-4 px-1.5">
                                        <Clock className="h-2.5 w-2.5 mr-1" />
                                        Aujourd&apos;hui
                                      </Badge>
                                    )}
                                    {assignment.enriched?.timing?.isTomorrow && (
                                      <Badge variant="secondary" className="text-xs h-4 px-1.5">
                                        <Calendar className="h-2.5 w-2.5 mr-1" />
                                        Demain
                                      </Badge>
                                    )}
                                  </div>

                                  <div className="text-sm font-medium text-gray-900 mb-1">
                                    {assignment.enriched.timeslots.next.name}
                                  </div>

                                  {assignment.enriched.timeslots.next.dateStart && (
                                    <div className="flex items-center gap-3 text-xs text-gray-600">
                                      <div className="flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        <span>
                                          {new Date(assignment.enriched.timeslots.next.dateStart).toLocaleDateString('fr-FR', {
                                            weekday: 'short',
                                            day: 'numeric',
                                            month: 'short'
                                          })}
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        <span>
                                          {new Date(assignment.enriched.timeslots.next.dateStart).toLocaleTimeString('fr-FR', {
                                            hour: '2-digit',
                                            minute: '2-digit'
                                          })}
                                          {assignment.enriched.timeslots.next.dateEnd && (
                                            ` - ${new Date(assignment.enriched.timeslots.next.dateEnd).toLocaleTimeString('fr-FR', {
                                              hour: '2-digit',
                                              minute: '2-digit'
                                            })}`
                                          )}
                                        </span>
                                      </div>
                                    </div>
                                  )}

                                  {/* Timing indicators */}
                                  {assignment.enriched?.timing && (
                                    <div className="mt-2 text-xs">
                                      {assignment.enriched.timing.daysUntilStart !== null && (
                                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${assignment.enriched.timing.isToday
                                          ? 'bg-red-100 text-red-800'
                                          : assignment.enriched.timing.isTomorrow
                                            ? 'bg-orange-100 text-orange-800'
                                            : assignment.enriched.timing.isThisWeek
                                              ? 'bg-yellow-100 text-yellow-800'
                                              : 'bg-gray-100 text-gray-800'
                                          }`}>
                                          {assignment.enriched.timing.daysUntilStart > 0
                                            ? `Dans ${assignment.enriched.timing.daysUntilStart} jour${assignment.enriched.timing.daysUntilStart > 1 ? 's' : ''}`
                                            : assignment.enriched.timing.daysUntilStart === 0
                                              ? "Aujourd'hui"
                                              : `Il y a ${Math.abs(assignment.enriched.timing.daysUntilStart)} jour${Math.abs(assignment.enriched.timing.daysUntilStart) > 1 ? 's' : ''}`
                                          }
                                        </span>
                                      )}
                                    </div>
                                  )}
                                </div>
                              )}

                              {/* Multiple Timeslots Indicator */}
                              {(assignment.enriched && typeof assignment.enriched.timeslots?.count === 'number' && assignment.enriched.timeslots.count > 1) && (
                                <div className="flex items-center gap-2 mb-3 text-xs text-blue-600 bg-blue-50 rounded-lg px-2 py-1">
                                  <Calendar className="h-3 w-3" />
                                  <span>
                                    {assignment.enriched.timeslots.count} créneaux au total
                                  </span>
                                </div>
                              )}

                              {/* Footer with Team and Assignment Info */}
                              <div className="grid grid-cols-2 gap-3 text-xs border-t pt-3">
                                {/* Team Info */}
                                <div className="flex items-center gap-1.5">
                                  <Users className="h-3 w-3 text-gray-500" />
                                  <span className="text-gray-600">Équipe:</span>
                                  <span className="font-medium text-gray-800">
                                    {assignment.enriched?.team?.totalVolunteers || 1}
                                    {assignment.enriched?.team?.isTeamWork ? ' personnes' : ' personne'}
                                  </span>
                                </div>

                                {/* Assignment ID */}
                                <div className="flex items-center gap-1.5 text-gray-500">
                                  <Hash className="h-3 w-3" />
                                  <span className="font-mono text-xs">
                                    {assignment.id.slice(-6)}
                                  </span>
                                </div>
                              </div>

                              {/* All Timeslots List (Collapsible) */}
                              {(assignment.enriched?.timeslots?.count ?? 0) > 1 && (
                                <details className="mt-3 text-xs">
                                  <summary className="cursor-pointer text-blue-600 hover:text-blue-800 font-medium">
                                    Voir tous les créneaux ({assignment.enriched?.timeslots?.count ?? 0})
                                  </summary>
                                  <div className="mt-2 space-y-1 pl-4 border-l-2 border-blue-100">
                                    {(assignment.enriched?.timeslots?.list ?? []).map((timeslot, index) => (
                                      <div key={timeslot.id || index} className="text-xs text-gray-600">
                                        <div className="font-medium">{timeslot.name}</div>
                                        {timeslot.dateStart && (
                                          <div className="text-gray-500">
                                            {new Date(timeslot.dateStart).toLocaleDateString('fr-FR', {
                                              weekday: 'short',
                                              day: 'numeric',
                                              month: 'short',
                                              hour: '2-digit',
                                              minute: '2-digit'
                                            })}
                                            {timeslot.duration && ` (${timeslot.duration}h)`}
                                          </div>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </details>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <Users className="h-8 w-8 text-gray-400" />
                          </div>
                          <h3 className="font-medium text-gray-900 mb-1">Aucune affectation</h3>
                          <p className="text-sm text-gray-500">
                            Ce bénévole n&apos;a pas encore d&apos;affectations
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* ✅ Technical Tab */}
            <TabsContent value="technical" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Firebase Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="h-5 w-5" />
                      Informations Firebase
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Firebase UID</Label>
                      <div className="flex items-center gap-2">
                        <code className="flex-1 font-mono text-xs bg-muted p-2 rounded break-all">
                          {fields.firebaseUid || "Non connecté"}
                        </code>
                        {fields.firebaseUid && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(fields.firebaseUid ?? "", "Firebase UID")}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Status de connexion</Label>
                      <Badge variant={fields.firebaseUid ? "default" : "secondary"} className="gap-1">
                        <div className={`h-2 w-2 rounded-full ${fields.firebaseUid ? 'bg-green-500' : 'bg-gray-400'}`} />
                        {fields.firebaseUid ? "Connecté" : "Non connecté"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Notes */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Notes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {editing ? (
                      <Textarea
                        id="notes"
                        value={editData?.fields?.notes || ""}
                        onChange={(e) => updateField('notes', e.target.value)}
                        placeholder="Ajouter des notes sur ce bénévole..."
                        rows={6}
                      />
                    ) : (
                      <div className="min-h-[120px] p-3 bg-muted rounded text-sm whitespace-pre-wrap">
                        {fields.notes || "Aucune note"}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* ✅ Metadata Tab */}
            <TabsContent value="metadata" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Métadonnées
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="space-y-1">
                      <Label className="text-xs font-medium text-muted-foreground">Créé le</Label>
                      <p className="text-sm font-mono">
                        {fields.createdAt ? new Date(fields.createdAt).toLocaleString('fr-FR') : "Non disponible"}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs font-medium text-muted-foreground">Modifié le</Label>
                      <p className="text-sm font-mono">
                        {fields.modifiedAt ? new Date(fields.modifiedAt).toLocaleString('fr-FR') : "Non disponible"}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs font-medium text-muted-foreground">ID Airtable</Label>
                      <div className="flex items-center gap-2">
                        <code className="text-xs bg-muted px-2 py-1 rounded">{volunteer.id}</code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(volunteer.id ?? "", "ID Airtable")}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs font-medium text-muted-foreground">Type</Label>
                      <Badge variant="outline">Membre</Badge>
                    </div>
                  </div>

                  {/* Raw data toggle */}
                  {process.env.NODE_ENV === 'development' && (
                    <div className="mt-6 pt-6 border-t">
                      <div className="flex items-center justify-between mb-4">
                        <Label className="text-sm font-medium">Données brutes (Développement)</Label>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowRawData(!showRawData)}
                        >
                          {showRawData ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          {showRawData ? "Masquer" : "Afficher"}
                        </Button>
                      </div>
                      {showRawData && (
                        <pre className="text-xs bg-muted p-4 rounded overflow-auto max-h-96 border">
                          {JSON.stringify(volunteer, null, 2)}
                        </pre>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </TooltipProvider>
  )
}

export default VolunteerPage