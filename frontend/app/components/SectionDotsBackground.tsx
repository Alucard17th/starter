'use client'

import {useEffect, useMemo, useRef, useState} from 'react'

export default function SectionDotsBackground() {
  const [mounted, setMounted] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const resizeObserverRef = useRef<ResizeObserver | null>(null)
  const visibilityObserverRef = useRef<IntersectionObserver | null>(null)

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

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      'matchMedia' in window &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isSmallScreen =
      typeof window !== 'undefined' &&
      'matchMedia' in window &&
      window.matchMedia('(max-width: 640px)').matches

    const dpr = prefersReducedMotion || isSmallScreen ? 1 : Math.max(1, Math.floor(window.devicePixelRatio || 1))

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
    let running = true

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
      const baseCount = prefersReducedMotion || isSmallScreen ? 18 : 46
      const density = prefersReducedMotion || isSmallScreen ? 68000 : 42000
      const count = Math.min(baseCount, Math.max(12, Math.floor((width * height) / density)))
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
      if (!running) return
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
        ctx.shadowColor = prefersReducedMotion || isSmallScreen ? 'transparent' : 'rgba(59, 130, 246, 0.25)'
        ctx.shadowBlur = prefersReducedMotion || isSmallScreen ? 0 : 10
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fill()
      }

      rafRef.current = window.requestAnimationFrame(tick)
    }

    rafRef.current = window.requestAnimationFrame(tick)

    visibilityObserverRef.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry) return
        if (entry.isIntersecting) {
          if (!running) {
            running = true
            lastTs = performance.now()
            rafRef.current = window.requestAnimationFrame(tick)
          }
        } else {
          running = false
          if (rafRef.current != null) {
            window.cancelAnimationFrame(rafRef.current)
          }
          rafRef.current = null
        }
      },
      {threshold: 0.01},
    )
    visibilityObserverRef.current.observe(parent)

    return () => {
      if (rafRef.current != null) {
        window.cancelAnimationFrame(rafRef.current)
      }
      rafRef.current = null
      resizeObserverRef.current?.disconnect()
      resizeObserverRef.current = null
      visibilityObserverRef.current?.disconnect()
      visibilityObserverRef.current = null
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
