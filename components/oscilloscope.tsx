'use client'

import { useEffect, useRef } from 'react'

interface OscilloscopeProps {
  className?: string
}

export function Oscilloscope({ className }: OscilloscopeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let time = 0

    const draw = () => {
      ctx.fillStyle = 'rgba(8, 6, 18, 0.15)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw grid
      ctx.strokeStyle = 'rgba(43, 28, 97, 0.2)'
      ctx.lineWidth = 0.5
      const gridSize = 20
      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }
      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Draw main sine wave
      ctx.strokeStyle = '#2b1c61'
      ctx.lineWidth = 2
      ctx.shadowColor = '#2b1c61'
      ctx.shadowBlur = 10
      ctx.beginPath()
      for (let x = 0; x < canvas.width; x++) {
        const y = canvas.height / 2 + Math.sin((x + time) * 0.03) * 30 + Math.sin((x + time) * 0.07) * 15
        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()

      // Draw secondary wave
      ctx.strokeStyle = 'rgba(34, 197, 94, 0.6)'
      ctx.lineWidth = 1.5
      ctx.shadowColor = 'rgba(34, 197, 94, 0.8)'
      ctx.beginPath()
      for (let x = 0; x < canvas.width; x++) {
        const y = canvas.height / 2 + Math.sin((x + time * 0.7) * 0.05) * 20 + Math.cos((x + time) * 0.02) * 25
        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()

      ctx.shadowBlur = 0
      time += 2

      requestAnimationFrame(draw)
    }

    draw()
  }, [])

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={150}
      className={className}
    />
  )
}
