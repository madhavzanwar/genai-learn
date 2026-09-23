'use client'

import { useEffect, useRef } from 'react'

interface ConfettiPiece {
  x: number
  y: number
  w: number
  h: number
  color: string
  vx: number
  vy: number
  rotation: number
  vRot: number
  opacity: number
}

const PALETTE = [
  '#C4B5FD', // Studio Lavender
  '#A7F3D0', // Studio Mint
  '#BAE6FD', // Studio Sky
  '#FED7AA', // Studio Peach
  '#18181B', // Studio Ink
  '#F59E0B', // Studio Gold
  '#10B981', // Emerald
]

export function ConfettiCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    // Spawn 100 particles
    const pieces: ConfettiPiece[] = Array.from({ length: 110 }).map(() => {
      const angle = (Math.random() * Math.PI) / 3 + Math.PI / 3 // mostly upwards/outwards
      const speed = Math.random() * 12 + 6
      return {
        x: width * 0.5 + (Math.random() - 0.5) * 120,
        y: height * 0.45,
        w: Math.random() * 8 + 6,
        h: Math.random() * 14 + 8,
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
        vx: (Math.random() - 0.5) * 16,
        vy: -speed,
        rotation: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 10,
        opacity: 1,
      }
    })

    let animationFrameId: number
    const startTime = performance.now()
    const DURATION = 3800 // 3.8 seconds

    const render = (now: number) => {
      const elapsed = now - startTime
      ctx.clearRect(0, 0, width, height)

      // Fade out towards the end
      const globalAlpha = elapsed > 2600 ? Math.max(0, 1 - (elapsed - 2600) / 1200) : 1

      for (const p of pieces) {
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.35 // gravity
        p.vx *= 0.985 // drag
        p.rotation += p.vRot

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rotation * Math.PI) / 180)
        ctx.globalAlpha = p.opacity * globalAlpha
        ctx.fillStyle = p.color
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
        ctx.restore()
      }

      if (elapsed < DURATION) {
        animationFrameId = requestAnimationFrame(render)
      } else {
        ctx.clearRect(0, 0, width, height)
      }
    }

    animationFrameId = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 h-full w-full"
    />
  )
}
