"use client"

import HomeTopbar from "@/components/layout/home-topbar"
import Timeline from "@/components/timeline"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"

const array = [
  {
    status: "Ouverture des portes",
    comment: "Les portes du festival s'ouvrent à 10h00.",
    createdAt: "19h00",
  },
  {
    status: "Concert de l'artiste A",
    comment: "Le concert de l'artiste A commence à 11h00.",
    createdAt: "20h00",
  },
  {
    status: "Concert de l'artiste B",
    comment: "Le concert de l'artiste B commence à 21h00.",
    createdAt: "21h00",
  },
]

export default function AuthPage() {
  const [mode, setMode] = useState<"vendredi" | "samedi">("vendredi")
  return (
    <div className="w-full flex flex-col bg-muted min-h-screen">
      <HomeTopbar />
      <h2 className="text-center text-2xl font-bold mt-10">
        Programmation
      </h2>
      <div className="w-full flex flex-col items-center justify-center mt-10 px-4">
        <Tabs value={mode} onValueChange={v => setMode(v as "vendredi" | "samedi")}>
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="vendredi">Agorrilak 1 Août</TabsTrigger>
            <TabsTrigger value="samedi">Agorrilak 2 Août</TabsTrigger>
          </TabsList>
          <TabsContent value="vendredi" className="relative">
            <h3 className="text-lg font-semibold mb-4">Vendredi 1 Août</h3>
            <p className="mb-4">Programme de la journée du vendredi...</p>
            <Timeline array={array} />
          </TabsContent>
          <TabsContent value="samedi">
            <h3 className="text-lg font-semibold mb-4">Samedi 2 Août</h3>
            <p className="mb-4">Programme de la journée du samedi...</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}