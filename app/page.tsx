'use client'

import { useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { IntroScreen } from '../components/IntroScreen'
import { Header } from '../components/Header'
import { Navbar } from '../components/Navbar'
import { Hero } from '../components/Hero'
import { About } from '../components/About'
import { Portfolio } from '../components/Portfolio'
import { Contact } from '../components/Contact'

export default function Home() {
  const [revealHome, setRevealHome] = useState(false)
  const [introDone, setIntroDone] = useState(false)

  // Mount logic: scroll restoration control & intro check
  useEffect(() => {
    // Disable automatic browser scroll restoration to solve the "scroll jerk/jump" bug
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    // Force scroll to top on first mount
    window.scrollTo(0, 0)

    const playedBefore = sessionStorage.getItem('hasPlayedIntro')

    if (playedBefore) {
      setRevealHome(true)
      setIntroDone(true)
    } else {
      setRevealHome(false)
      setIntroDone(false)
    }
  }, [])

  // Absolute window-level scroll lock during the intro lifecycle.
  // This physically blocks browser wheel, touch, and scroll actions from moving the viewport
  // and guarantees the canvas stays firmly anchored at (0,0) before shutters part.
  useEffect(() => {
    if (!introDone) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
      window.scrollTo(0, 0)
    } else {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [introDone])

  // Force scroll to top exactly when home begins to reveal
  useEffect(() => {
    if (revealHome) {
      window.scrollTo(0, 0)
    }
  }, [revealHome])

  // Premium background ambient mouse glow tracking
  useEffect(() => {
    const glow = document.querySelector('.mouse-glow') as HTMLElement
    if (!glow) return

    const handleFirstMove = () => {
      gsap.to(glow, { opacity: 1, duration: 1 })
      window.removeEventListener('mousemove', handleFirstMove)
    }
    window.addEventListener('mousemove', handleFirstMove)

    const handleMouseMove = (e: MouseEvent) => {
      gsap.to(glow, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.8,
        ease: 'power2.out'
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousemove', handleFirstMove)
    }
  }, [])

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary overflow-hidden relative">
      
      {/* Dynamic background ambient glow follower */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="mouse-glow absolute w-[400px] md:w-[600px] aspect-square rounded-full bg-accent-glow/[0.04] blur-[100px] md:blur-[140px] -translate-x-1/2 -translate-y-1/2 opacity-0 pointer-events-none" />
      </div>

      {!introDone && (
        <IntroScreen 
          onRevealStart={() => setRevealHome(true)}
          onComplete={() => setIntroDone(true)} 
        />
      )}
      
      <div className={`relative z-10 ${!revealHome ? 'h-screen overflow-hidden' : ''}`}>
        {revealHome && <Header />}
        <Navbar />
        <Hero introDone={revealHome} />
        <About />
        <Portfolio />
        <Contact />
        
        {/* Footer - updated name JOSH P.S */}
        <footer className="relative z-20 py-8 text-center text-xs font-mono text-metallic-400 border-t border-border-subtle bg-bg-secondary">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p>© 2026 JOSH P.S — All Rights Reserved</p>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors">
              [↑ Back to Top]
            </button>
          </div>
        </footer>
      </div>
    </main>
  )
}
