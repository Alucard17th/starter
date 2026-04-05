'use client'

import {useEffect, useMemo, useState} from 'react'

type Dot = {
  id: number
  size: number
  leftVw: number
  topVh: number
  duration: number
  delay: number
  opacity: number
  color: string
  x1: number
  y1: number
  x2: number
  y2: number
  rot: number
}

export default function FlyingDotsBackground() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const dots = useMemo<Dot[]>(() => {
    const count = 42
    return Array.from({length: count}).map((_, i) => {
      const size = 2 + Math.random() * 5
      const leftVw = Math.random() * 100
      const topVh = Math.random() * 100
      const duration = 10 + Math.random() * 18
      const delay = Math.random() * 6
      const opacity = 0.18 + Math.random() * 0.22

      const palette = [
        'rgba(147, 197, 253, 0.9)', // light blue
        'rgba(254, 230, 138, 0.9)', // light yellow
        'rgba(186, 230, 253, 0.9)', // very light cyan
        'rgba(226, 232, 240, 0.9)', // subtle slate
      ]
      const color = palette[Math.floor(Math.random() * palette.length)]

      const x1 = (Math.random() * 2 - 1) * 180
      const y1 = (Math.random() * 2 - 1) * 180
      const x2 = (Math.random() * 2 - 1) * 220
      const y2 = (Math.random() * 2 - 1) * 220
      const rot = (Math.random() * 2 - 1) * 25
      return {id: i, size, leftVw, topVh, duration, delay, opacity, color, x1, y1, x2, y2, rot}
    })
  }, [])

  if (!mounted) return null

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-10 overflow-hidden"
    >
      {dots.map((d) => (
        <span
          key={d.id}
          className="absolute rounded-full"
          style={{
            width: `${d.size}px`,
            height: `${d.size}px`,
            left: `${d.leftVw}vw`,
            top: `${d.topVh}vh`,
            opacity: d.opacity,
            animation: `fly-dot-${d.id} ${d.duration}s ease-in-out ${d.delay}s infinite`,
            backgroundColor: d.color,
            mixBlendMode: 'multiply',
            filter: 'blur(0.15px)',
            boxShadow: '0 0 14px rgba(59, 130, 246, 0.18)',
          }}
        />
      ))}

      <style jsx>{`
        ${dots
          .map(
            (d) => `
          @keyframes fly-dot-${d.id} {
            0% {
              transform: translate3d(0, 0, 0) rotate(0deg);
            }
            50% {
              transform: translate3d(${d.x1}px, ${d.y1}px, 0) rotate(${d.rot}deg);
            }
            100% {
              transform: translate3d(${d.x2}px, ${d.y2}px, 0) rotate(${-d.rot}deg);
            }
          }
        `,
          )
          .join('')}
      `}</style>
    </div>
  )
}
