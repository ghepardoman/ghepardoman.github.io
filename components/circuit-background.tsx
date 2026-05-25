'use client'

import { useEffect, useRef } from 'react'

export function CircuitBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // PCB trace configuration - more dense grid
    const gridSize = 60

    interface Trace {
      startX: number
      startY: number
      endX: number
      endY: number
      midX: number
      midY: number
      horizontal: boolean
    }

    interface Signal {
      trace: Trace
      progress: number
      speed: number
    }

    const traces: Trace[] = []
    const signals: Signal[] = []
    const pads: { x: number; y: number; size: number }[] = []
    const vias: { x: number; y: number }[] = []

    // Create PCB traces
    const cols = Math.ceil(canvas.width / gridSize) + 2
    const rows = Math.ceil(canvas.height / gridSize) + 2

    // Create grid of potential connection points
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * gridSize
        const y = row * gridSize

        // Randomly add pads
        if (Math.random() > 0.9) {
          pads.push({ x, y, size: 4 + Math.random() * 4 })
        }

        // Randomly add vias
        if (Math.random() > 0.92) {
          vias.push({ x, y })
        }

        // Create horizontal traces
        if (col < cols - 1 && Math.random() > 0.6) {
          const nextX = (col + 1) * gridSize
          // Sometimes add a vertical jog
          if (Math.random() > 0.7 && row < rows - 1) {
            const midY = y + gridSize * (Math.random() > 0.5 ? 0.5 : -0.5)
            traces.push({
              startX: x,
              startY: y,
              endX: nextX,
              endY: y,
              midX: x + gridSize * 0.5,
              midY: midY,
              horizontal: true
            })
          } else {
            traces.push({
              startX: x,
              startY: y,
              endX: nextX,
              endY: y,
              midX: x + gridSize * 0.5,
              midY: y,
              horizontal: true
            })
          }
        }

        // Create vertical traces
        if (row < rows - 1 && Math.random() > 0.7) {
          const nextY = (row + 1) * gridSize
          traces.push({
            startX: x,
            startY: y,
            endX: x,
            endY: nextY,
            midX: x,
            midY: y + gridSize * 0.5,
            horizontal: false
          })
        }
      }
    }

    // Create signals
    const numSignals = Math.min(30, Math.floor(traces.length * 0.15))
    for (let i = 0; i < numSignals; i++) {
      const trace = traces[Math.floor(Math.random() * traces.length)]
      signals.push({
        trace,
        progress: Math.random(),
        speed: 0.008 + Math.random() * 0.012
      })
    }

    const animate = () => {
      // Clear with background color
      ctx.fillStyle = '#0a0814'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw substrate grid pattern
      ctx.strokeStyle = 'rgba(43, 28, 97, 0.08)'
      ctx.lineWidth = 1
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

      // Draw all traces (copper layer)
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      
      for (const trace of traces) {
        // Trace glow
        ctx.strokeStyle = 'rgba(43, 28, 97, 0.15)'
        ctx.lineWidth = 6
        ctx.beginPath()
        ctx.moveTo(trace.startX, trace.startY)
        if (trace.horizontal && trace.midY !== trace.startY) {
          ctx.lineTo(trace.midX, trace.startY)
          ctx.lineTo(trace.midX, trace.midY)
          ctx.lineTo(trace.endX, trace.midY)
          ctx.lineTo(trace.endX, trace.endY)
        } else {
          ctx.lineTo(trace.endX, trace.endY)
        }
        ctx.stroke()

        // Main trace
        ctx.strokeStyle = 'rgba(43, 28, 97, 0.4)'
        ctx.lineWidth = 2.5
        ctx.beginPath()
        ctx.moveTo(trace.startX, trace.startY)
        if (trace.horizontal && trace.midY !== trace.startY) {
          ctx.lineTo(trace.midX, trace.startY)
          ctx.lineTo(trace.midX, trace.midY)
          ctx.lineTo(trace.endX, trace.midY)
          ctx.lineTo(trace.endX, trace.endY)
        } else {
          ctx.lineTo(trace.endX, trace.endY)
        }
        ctx.stroke()
      }

      // Draw pads (SMD components)
      for (const pad of pads) {
        // Pad glow
        ctx.fillStyle = 'rgba(43, 28, 97, 0.3)'
        ctx.beginPath()
        ctx.arc(pad.x, pad.y, pad.size + 3, 0, Math.PI * 2)
        ctx.fill()
        
        // Pad fill
        ctx.fillStyle = 'rgba(43, 28, 97, 0.6)'
        ctx.beginPath()
        ctx.arc(pad.x, pad.y, pad.size, 0, Math.PI * 2)
        ctx.fill()

        // Pad ring
        ctx.strokeStyle = 'rgba(99, 70, 200, 0.5)'
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.arc(pad.x, pad.y, pad.size + 1.5, 0, Math.PI * 2)
        ctx.stroke()
      }

      // Draw vias
      for (const via of vias) {
        // Via outer ring
        ctx.strokeStyle = 'rgba(43, 28, 97, 0.6)'
        ctx.lineWidth = 2.5
        ctx.beginPath()
        ctx.arc(via.x, via.y, 5, 0, Math.PI * 2)
        ctx.stroke()

        // Via hole
        ctx.fillStyle = '#0a0814'
        ctx.beginPath()
        ctx.arc(via.x, via.y, 2.5, 0, Math.PI * 2)
        ctx.fill()
      }

      // Animate signals
      for (const signal of signals) {
        signal.progress += signal.speed
        if (signal.progress > 1) {
          signal.progress = 0
          signal.trace = traces[Math.floor(Math.random() * traces.length)]
          signal.speed = 0.008 + Math.random() * 0.012
        }

        const trace = signal.trace
        let x: number, y: number

        // Calculate position along trace
        if (trace.horizontal && trace.midY !== trace.startY) {
          // Complex path with jog
          const totalLen = Math.abs(trace.midX - trace.startX) + 
                          Math.abs(trace.midY - trace.startY) + 
                          Math.abs(trace.endX - trace.midX) +
                          Math.abs(trace.endY - trace.midY)
          const targetLen = signal.progress * totalLen
          
          const seg1 = Math.abs(trace.midX - trace.startX)
          const seg2 = seg1 + Math.abs(trace.midY - trace.startY)
          const seg3 = seg2 + Math.abs(trace.endX - trace.midX)
          
          if (targetLen <= seg1) {
            const t = targetLen / seg1
            x = trace.startX + (trace.midX - trace.startX) * t
            y = trace.startY
          } else if (targetLen <= seg2) {
            const t = (targetLen - seg1) / (seg2 - seg1)
            x = trace.midX
            y = trace.startY + (trace.midY - trace.startY) * t
          } else if (targetLen <= seg3) {
            const t = (targetLen - seg2) / (seg3 - seg2)
            x = trace.midX + (trace.endX - trace.midX) * t
            y = trace.midY
          } else {
            const t = (targetLen - seg3) / (totalLen - seg3)
            x = trace.endX
            y = trace.midY + (trace.endY - trace.midY) * t
          }
        } else {
          // Simple straight line
          x = trace.startX + (trace.endX - trace.startX) * signal.progress
          y = trace.startY + (trace.endY - trace.startY) * signal.progress
        }

        // Draw signal glow - BRIGHT
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 25)
        gradient.addColorStop(0, 'rgba(130, 100, 220, 0.95)')
        gradient.addColorStop(0.3, 'rgba(99, 70, 200, 0.5)')
        gradient.addColorStop(0.6, 'rgba(43, 28, 97, 0.2)')
        gradient.addColorStop(1, 'rgba(43, 28, 97, 0)')
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(x, y, 25, 0, Math.PI * 2)
        ctx.fill()

        // Draw signal core - VERY BRIGHT
        ctx.shadowColor = '#8264dc'
        ctx.shadowBlur = 20
        ctx.fillStyle = '#a088f0'
        ctx.beginPath()
        ctx.arc(x, y, 5, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
    />
  )
}
