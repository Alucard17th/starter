'use client'

import {useEffect, useMemo, useRef, useState} from 'react'

export default function SectionDotsBackground() {
  const [mounted, setMounted] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const resizeObserverRef = useRef<ResizeObserver | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const palette = useMemo(() => {
    return [
      {r: 96, g: 165, b: 250},
      {r: 250, g: 204, b: 21},
      {r: 125, g: 211, b: 252},
      {r: 148, g: 163, b: 184},
    ]
  }, [])

  useEffect(() => {
    if (!mounted) return

    const canvas = canvasRef.current
    if (!canvas) return

    const parent = canvas.parentElement
    if (!parent) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.max(1, Math.floor(window.devicePixelRatio || 1))

    type Particle = {
      x: number
      y: number
      vx: number
      vy: number
      radius: number
      alpha: number
      color: {r: number; g: number; b: number}
    }

    let width = 0
    let height = 0
    const particles: Particle[] = []

    const resize = () => {
      const rect = parent.getBoundingClientRect()
      width = Math.max(1, Math.floor(rect.width))
      height = Math.max(1, Math.floor(rect.height))

      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Re-seed particles on resize for a fresh pattern per section.
      particles.length = 0
      const count = Math.min(46, Math.max(18, Math.floor((width * height) / 42000)))
      for (let i = 0; i < count; i += 1) {
        const c = palette[Math.floor(Math.random() * palette.length)]
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() * 2 - 1) * 0.03,
          vy: (Math.random() * 2 - 1) * 0.03,
          radius: 2.2 + Math.random() * 4.5,
          alpha: 0.55 + Math.random() * 0.25,
          color: c,
        })
      }
    }

    resize()

    resizeObserverRef.current = new ResizeObserver(() => {
      resize()
    })
    resizeObserverRef.current.observe(parent)

    let lastTs = performance.now()
    const tick = (ts: number) => {
      const dt = Math.min(34, ts - lastTs)
      lastTs = ts

      // Clear
      ctx.clearRect(0, 0, width, height)

      // Draw particles
      for (const p of particles) {
        p.x += p.vx * dt
        p.y += p.vy * dt

        // gentle drift
        if (p.x < -10) p.x = width + 10
        if (p.x > width + 10) p.x = -10
        if (p.y < -10) p.y = height + 10
        if (p.y > height + 10) p.y = -10

        ctx.beginPath()
        ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.alpha})`
        ctx.shadowColor = 'rgba(59, 130, 246, 0.25)'
        ctx.shadowBlur = 10
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fill()
      }

      rafRef.current = window.requestAnimationFrame(tick)
    }

    rafRef.current = window.requestAnimationFrame(tick)

    return () => {
      if (rafRef.current != null) {
        window.cancelAnimationFrame(rafRef.current)
      }
      rafRef.current = null
      resizeObserverRef.current?.disconnect()
      resizeObserverRef.current = null
    }
  }, [mounted, palette])

  if (!mounted) return null

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{
          mixBlendMode: 'multiply',
        }}
      />
    </div>
  )
}
