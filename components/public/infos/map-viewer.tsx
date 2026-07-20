"use client"

import { useState, useRef, useCallback } from "react"
import { createPortal } from "react-dom"
import Image from "next/image"
import { X, ZoomIn, ZoomOut } from "lucide-react"

interface LegendItem {
  color: string  // classe Tailwind ou hex
  label: string  // déjà traduit par le parent
}

interface MapViewerProps {
  src: string
  alt: string
  legend?: LegendItem[]
}

export function MapViewer({ src, alt, legend }: MapViewerProps) {
  const [open, setOpen] = useState(false)
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const dragStart = useRef({ x: 0, y: 0 })
  const posStart = useRef({ x: 0, y: 0 })

  const resetView = useCallback(() => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }, [])

  const handleOpen = () => {
    resetView()
    setOpen(true)
    document.body.style.overflow = "hidden"
  }

  const handleClose = () => {
    setOpen(false)
    document.body.style.overflow = ""
  }

  const zoom = (delta: number) => {
    setScale((s) => Math.min(Math.max(s + delta, 0.5), 5))
  }

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    zoom(e.deltaY > 0 ? -0.2 : 0.2)
  }

  const handlePointerDown = (e: React.PointerEvent) => {
    setDragging(true)
    dragStart.current = { x: e.clientX, y: e.clientY }
    posStart.current = { ...position }
      ; (e.target as HTMLElement).setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging) return
    setPosition({
      x: posStart.current.x + (e.clientX - dragStart.current.x),
      y: posStart.current.y + (e.clientY - dragStart.current.y),
    })
  }

  const handlePointerUp = () => setDragging(false)

  return (
    <>
      {/* Thumbnail cliquable */}
      <button
        onClick={handleOpen}
        className="relative w-full aspect-16/10 rounded-xl overflow-hidden group cursor-zoom-in"
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 700px"
        />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <ZoomIn className="w-8 h-8 text-white drop-shadow-lg" />
        </div>
      </button>

      {/* Lightbox plein écran */}
      {open && createPortal(
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col">
          {/* Toolbar */}
          <div className="flex items-center justify-between px-4 py-3 shrink-0">
            <div className="flex items-center gap-2">
              <button
                onClick={() => zoom(0.3)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
              <button
                onClick={() => zoom(-0.3)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
              >
                <ZoomOut className="w-5 h-5" />
              </button>
              <span className="text-white/50 text-xs ml-2">
                {Math.round(scale * 100)}%
              </span>
            </div>
            <button
              onClick={handleClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Zone image zoomable */}
          <div
            className="flex-1 overflow-hidden touch-none"
            onWheel={handleWheel}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            style={{ cursor: dragging ? "grabbing" : "grab" }}
          >
            <div
              className="w-full h-full flex items-center justify-center"
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                transition: dragging ? "none" : "transform 0.15s ease-out",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={alt}
                className="max-w-[90vw] max-h-[85vh] object-contain select-none pointer-events-none"
                draggable={false}
              />
            </div>
          </div>
          {/* Légende en lightbox */}
          {legend && legend.length > 0 && (
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 px-4 py-3 shrink-0">
              {legend.map((item) => (
                <div key={item.label} className="flex items-center gap-1.5">
                  <span
                    className="w-2.5 h-2.5 rounded-sm shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-[11px] text-white/70">{item.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>,
        document.body
      )}
      {legend && legend.length > 0 && (
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3">
          {legend.map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <span
                className="w-3 h-3 rounded-sm shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs text-white/70">{item.label}</span>
            </div>
          ))}
        </div>
      )}
    </>
  )
}