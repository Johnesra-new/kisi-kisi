'use client'

import { useState, useEffect } from 'react'

export function Header() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      )
    }

    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-bg-primary/50 backdrop-blur-lg border-b border-border-subtle transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Left Side: Brand Logo Monogram */}
        <div className="flex items-center gap-1.5 font-mono text-sm tracking-[0.15em] font-semibold text-metallic-100 select-none group cursor-default">
          <span className="text-accent-primary group-hover:scale-110 transition-transform duration-300">[</span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-metallic-100 to-metallic-300 group-hover:text-white transition-colors duration-300">
            JOSH P.S
          </span>
          <span className="text-accent-primary group-hover:scale-110 transition-transform duration-300">]</span>
        </div>

        {/* Right Side: High-Tech Live Local Clock */}
        <div className="flex items-center gap-4 text-xs font-mono select-none">
          {/* Status Indicator */}
          <div className="hidden sm:flex items-center gap-2 text-metallic-300 border-r border-border-default pr-4 mr-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
            </span>
            <span>SYSTEM ONLINE</span>
          </div>
          
          {/* Dynamic Clock */}
          <div className="flex items-center gap-2 text-metallic-200">
            <span className="text-[10px] text-metallic-400">LOC /</span>
            <span className="tabular-nums tracking-wider text-metallic-100 font-medium">
              {time || '00:00:00 AM'}
            </span>
          </div>
        </div>

      </div>
    </header>
  )
}
