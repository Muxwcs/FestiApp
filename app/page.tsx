"use client"

import HomeTopbar from "@/components/layout/home-topbar"
import Timeline from "@/components/timeline"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Emojis, TimelineCategory, TimelineDay, TimelinePlace } from "@/lib/enums"
import { useState } from "react"

const fridayArray = [
  {
    category: TimelineCategory.FESTIVAL,
    place: TimelinePlace.FESTIVAL,
    emojis: Emojis.FESTIVAL,
    day: TimelineDay.FRIDAY,
    title: Emojis.FESTIVAL + " Ouverture des portes",
    comment: "Les portes du festival s'ouvrent à 19h00.",
    hour: "19h00",
    imageSrc: ""
  },
  {
    category: TimelineCategory.CONCERT,
    place: TimelinePlace.SECOND_STAGE,
    emojis: Emojis.SECOND_STAGE,
    day: TimelineDay.FRIDAY,
    title: Emojis.DJ_SET + " DJ Set Sheriff",
    comment: "Entrez dans la danse, ça commence à 20h00.",
    hour: "20h00",
    imageSrc: ""
  },
  {
    category: TimelineCategory.CONCERT,
    place: TimelinePlace.MAIN_STAGE,
    emojis: Emojis.MAIN_STAGE,
    day: TimelineDay.FRIDAY,
    title: Emojis.CONCERT + " Spartak Dementziala",
    comment: "Le concert de l'artiste Spartak Dementziala commence à 21h00.",
    hour: "21h00",
    imageSrc: "/bands/spartak-dementziala.webp"
  },
  {
    category: TimelineCategory.CONCERT,
    place: TimelinePlace.SECOND_STAGE,
    emojis: Emojis.SECOND_STAGE,
    day: TimelineDay.FRIDAY,
    title: Emojis.CONCERT + " Sherrif Mouloud y el Zorro Loco",
    comment: "Le concert de l'artiste Sherrif Mouloud y el Zorro Loco commence à 22h00.",
    hour: "22h00",
    imageSrc: "/bands/sheriff-mouloud-el-zorro-loco.webp"
  },
  {
    category: TimelineCategory.CONCERT,
    place: TimelinePlace.MAIN_STAGE,
    emojis: Emojis.MAIN_STAGE,
    day: TimelineDay.FRIDAY,
    title: Emojis.CONCERT + " Xutik",
    comment: "Le concert de l'artiste Xutik y el Zorro Loco commence à 22h30.",
    hour: "22h30",
    imageSrc: "/bands/xutik.webp"
  },
  {
    category: TimelineCategory.CONCERT,
    place: TimelinePlace.SECOND_STAGE,
    emojis: Emojis.SECOND_STAGE,
    day: TimelineDay.FRIDAY,
    title: Emojis.CONCERT + " Sherrif Mouloud y el Zorro Loco",
    comment: "Le 2ème slot de Sherrif Mouloud y el Zorro Loco commence à 00h00.",
    hour: "00h00",
    imageSrc: "/bands/sheriff-mouloud-el-zorro-loco-live.webp"
  },
  {
    category: TimelineCategory.CONCERT,
    place: TimelinePlace.MAIN_STAGE,
    emojis: Emojis.MAIN_STAGE,
    day: TimelineDay.FRIDAY,
    title: Emojis.CONCERT + " Txaptrax",
    comment: "Le concert de l'artiste Txaptrax commence à 00h30.",
    hour: "00h30",
    imageSrc: "/bands/txaptrax.webp"
  },
  {
    category: TimelineCategory.FESTIVAL,
    place: TimelinePlace.FESTIVAL,
    emojis: Emojis.FESTIVAL,
    day: TimelineDay.FRIDAY,
    title: Emojis.CLOSING + " Fermeture des portes",
    comment: "Les portes du festival ferment à 02h00.",
    hour: "02h00",
    imageSrc: ""
  },
]

const saturdayArray = [
  {
    category: TimelineCategory.FESTIVAL,
    place: TimelinePlace.FESTIVAL,
    emojis: Emojis.FESTIVAL,
    day: TimelineDay.SATURDAY,
    title: Emojis.FESTIVAL + " Ouverture des portes",
    comment: "Les portes du festival s'ouvrent à 19h00.",
    hour: "19h00",
    imageSrc: ""
  },
  {
    category: TimelineCategory.CONCERT,
    place: TimelinePlace.SECOND_STAGE,
    emojis: Emojis.SECOND_STAGE,
    day: TimelineDay.SATURDAY,
    title: Emojis.DJ_SET + " DJ Set Send Love Collective " + Emojis.SKATE + " Skate",
    comment: "Entrez dans la danse, ça commence à 19h00.",
    hour: "19h00",
    imageSrc: "/bands/send-love-collective.webp"
  },
  {
    category: TimelineCategory.CONCERT,
    place: TimelinePlace.MAIN_STAGE,
    emojis: Emojis.MAIN_STAGE,
    day: TimelineDay.SATURDAY,
    title: Emojis.CONCERT + " Bacano Banda",
    comment: "Le concert de l'artiste Bacano Banda commence à 19h30.",
    hour: "19h30",
    imageSrc: "/bands/bacano-banda.webp"
  },
  {
    category: TimelineCategory.CONCERT,
    place: TimelinePlace.SECOND_STAGE,
    emojis: Emojis.SECOND_STAGE,
    day: TimelineDay.SATURDAY,
    title: Emojis.DJ_SET + " Send Love Collective " + Emojis.SKATE + " Skate",
    comment: "Entrez dans la danse, ça commence à 21h00.",
    hour: "21h00",
    imageSrc: "/bands/send-love-collective.webp"
  },
  {
    category: TimelineCategory.CONCERT,
    place: TimelinePlace.MAIN_STAGE,
    emojis: Emojis.MAIN_STAGE,
    day: TimelineDay.SATURDAY,
    title: Emojis.CONCERT + " Vaudou Game",
    comment: "Le concert de l'artiste Vaudou Game commence à 21h45.",
    hour: "21h45",
    imageSrc: "/bands/vaudou-game.webp"
  },
  {
    category: TimelineCategory.CONCERT,
    place: TimelinePlace.SECOND_STAGE,
    emojis: Emojis.SECOND_STAGE,
    day: TimelineDay.SATURDAY,
    title: Emojis.DJ_SET + " Send Love Collective ",
    comment: "Entrez dans la danse, ça commence à 23h15.",
    hour: "23h15",
    imageSrc: "/bands/send-love-collective.webp"
  },
  {
    category: TimelineCategory.CONCERT,
    place: TimelinePlace.MAIN_STAGE,
    emojis: Emojis.MAIN_STAGE,
    day: TimelineDay.SATURDAY,
    title: Emojis.CONCERT + " Ghetto Kumbe",
    comment: "Le concert de l'artiste Ghetto Kumbe, commence à 00h00.",
    hour: "00h00",
    imageSrc: "/bands/ghetto-kumbe-banner.webp"
  },
  {
    category: TimelineCategory.FESTIVAL,
    place: TimelinePlace.FESTIVAL,
    emojis: Emojis.FESTIVAL,
    day: TimelineDay.SATURDAY,
    title: Emojis.CLOSING + " Fermeture des portes",
    comment: "Les portes du festival ferment à 02h00.",
    hour: "02h00",
    imageSrc: ""
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
        <Tabs value={mode} onValueChange={v => setMode(v as "vendredi" | "samedi")} className="w-full max-w-3xl">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="vendredi">Agorrilak 1 Août</TabsTrigger>
            <TabsTrigger value="samedi">Agorrilak 2 Août</TabsTrigger>
          </TabsList>
          <TabsContent value="vendredi" className="relative">
            <h3 className="text-lg font-semibold mb-4">Vendredi 1 Août</h3>
            <p className="mb-4">Programme de la journée du vendredi...</p>
            <Timeline array={fridayArray} showedItems={4} />
          </TabsContent>
          <TabsContent value="samedi" className="relative">
            <h3 className="text-lg font-semibold mb-4">Samedi 2 Août</h3>
            <p className="mb-4">Programme de la journée du samedi...</p>
            <Timeline array={saturdayArray} showedItems={4} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}