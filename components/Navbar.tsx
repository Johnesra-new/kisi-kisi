'use client'

import { useEffect, useState, useRef } from 'react'

const sections = [
  { id: 'home', label: 'HOME' },
  { id: 'about', label: 'ABOT' },
  { id: 'portfolio', label: 'PORT' },
  { id: 'contact', label: 'CONT' }
]

export function Navbar() {
  const [activeSection, setActiveSection] = useState('home')
  const isScrollingRef = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      // If we are scroll-transitioning via navigation click, disable active section override
      if (isScrollingRef.current) return

      // 30% from top of screen acts as the activation hot-zone line
      const scrollPos = window.scrollY + window.innerHeight * 0.3
      const isBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50

      if (isBottom) {
        setActiveSection('contact')
        return
      }

      let active = 'home'
      for (const section of sections) {
        const el = document.getElementById(section.id)
        if (el) {
          const rect = el.getBoundingClientRect()
          const top = rect.top + window.scrollY
          const height = el.offsetHeight
          if (scrollPos >= top && scrollPos < top + height) {
            active = section.id
          }
        }
      }
      setActiveSection(active)
    }

    window.addEventListener('scroll', handleScroll)
    
    // Run immediately after layout has stabilized
    const timer = setTimeout(handleScroll, 100)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timer)
    }
  }, [])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      isScrollingRef.current = true
      setActiveSection(id) // Snappy instant update on click

      const lenis = (window as unknown as { lenis?: { scrollTo: (target: string, options?: { duration: number; onComplete?: () => void }) => void } }).lenis
      if (lenis) {
        lenis.scrollTo(`#${id}`, { 
          duration: 1.2,
          onComplete: () => {
            // Delay unlocking slightly to let scroll position settle perfectly
            setTimeout(() => {
              isScrollingRef.current = false
            }, 50)
          }
        })
      } else {
        el.scrollIntoView({ behavior: 'smooth' })
        setTimeout(() => {
          isScrollingRef.current = false
        }, 800)
      }
    }
  }

  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-40 bg-bg-primary/70 backdrop-blur-md border border-border-subtle rounded-xl p-4 flex flex-col items-start gap-4 hidden md:flex min-w-[80px]">
      {sections.map((section) => {
        const isActive = activeSection === section.id
        return (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`relative font-mono text-xs tracking-widest transition-all duration-300 hover:translate-x-1 pl-4 text-left w-full ${
              isActive ? 'text-metallic-100' : 'text-metallic-400'
            }`}
          >
            {isActive && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-accent-primary rounded-full shadow-glow-sm" />
            )}
            {section.label}
          </button>
        )
      })}
    </nav>
  )
}
