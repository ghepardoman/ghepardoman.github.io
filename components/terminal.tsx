'use client'

import { useState, useEffect } from 'react'
import { Check, Copy } from 'lucide-react'

interface TerminalProps {
  commands: string[]
  className?: string
}

export function Terminal({ commands, className }: TerminalProps) {
  const [copied, setCopied] = useState(false)
  const [typedLines, setTypedLines] = useState<string[]>([])
  const [currentLine, setCurrentLine] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)

  useEffect(() => {
    if (currentLine >= commands.length) return

    const command = commands[currentLine]
    if (currentChar < command.length) {
      const timeout = setTimeout(() => {
        setTypedLines(prev => {
          const newLines = [...prev]
          newLines[currentLine] = command.slice(0, currentChar + 1)
          return newLines
        })
        setCurrentChar(c => c + 1)
      }, 30 + Math.random() * 20)
      return () => clearTimeout(timeout)
    } else {
      const timeout = setTimeout(() => {
        setCurrentLine(l => l + 1)
        setCurrentChar(0)
      }, 500)
      return () => clearTimeout(timeout)
    }
  }, [currentLine, currentChar, commands])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(commands.join('\n'))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={`relative rounded-lg border border-border bg-card overflow-hidden ${className}`}>
      {/* Terminal header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-secondary/50">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="text-xs font-mono text-muted-foreground">bash</span>
        <button
          onClick={handleCopy}
          className="p-1.5 rounded hover:bg-secondary transition-colors"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Copy className="w-4 h-4 text-muted-foreground" />
          )}
        </button>
      </div>

      {/* Terminal content */}
      <div className="p-4 font-mono text-sm">
        {typedLines.map((line, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className="text-[#2b1c61] select-none">$</span>
            <span className="text-foreground">
              {line}
              {i === currentLine && currentLine < commands.length && (
                <span className="animate-blink ml-0.5 inline-block w-2 h-4 bg-foreground align-middle" />
              )}
            </span>
          </div>
        ))}
        {currentLine >= commands.length && typedLines.length > 0 && (
          <div className="flex items-start gap-2 mt-2">
            <span className="text-[#2b1c61] select-none">$</span>
            <span className="animate-blink inline-block w-2 h-4 bg-foreground" />
          </div>
        )}
      </div>
    </div>
  )
}
