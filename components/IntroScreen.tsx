'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'

export function IntroScreen({ onRevealStart, onComplete }: { onRevealStart: () => void; onComplete: () => void }) {
  useEffect(() => {
    // Double check session storage inside useEffect just in case
    const playedBefore = sessionStorage.getItem('hasPlayedIntro')
    if (playedBefore) {
      onRevealStart()
      onComplete()
      return
    }

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem('hasPlayedIntro', 'true')
        onComplete()
      }
    })

    // Setup: hidden initially in GSAP but opacity-0 in CSS keeps it safe
    gsap.set(['.intro-line-1', '.intro-line-2', '.intro-line-3', '.intro-subtitle'], { opacity: 0 })

    // 1. Gentle background glow line fade in (snappy duration)
    tl.fromTo('.intro-glow-line', 
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 0.3, duration: 0.7, ease: 'power3.out' }
    )

    // 2. Kinetic typographic entrance (alternating left/right/bottom)
    // Line 1: WELCOME (Slides from LEFT with motion blur)
    .fromTo('.intro-line-1',
      { 
        x: -160,
        opacity: 0,
        filter: 'blur(12px)'
      },
      { 
        x: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1.0, 
        ease: 'power4.out' 
      },
      '-=0.55'
    )

    // Line 2: to my (Slides from RIGHT, offset, light italic)
    .fromTo('.intro-line-2',
      { 
        x: 160,
        opacity: 0,
        filter: 'blur(12px)'
      },
      { 
        x: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1.0, 
        ease: 'power4.out' 
      },
      '-=0.85'
    )

    // Line 3: DIGITAL WEB (Slides from BOTTOM, heavy bold)
    .fromTo('.intro-line-3',
      { 
        y: 50,
        opacity: 0,
        scale: 0.97,
        filter: 'blur(12px)'
      },
      { 
        y: 0,
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration: 1.0, 
        ease: 'power4.out' 
      },
      '-=0.85'
    )

    // Reveal the subtitle softly
    .fromTo('.intro-subtitle',
      { opacity: 0, y: 15, letterSpacing: '0.1em' },
      { opacity: 0.7, y: 0, letterSpacing: '0.3em', duration: 0.9, ease: 'power3.out' },
      '-=0.7'
    )

    // 3. Metallic light sweep across the completed stack
    .fromTo('.intro-sheen',
      { xPercent: -150 },
      { xPercent: 150, duration: 1.1, ease: 'power1.inOut' },
      '-=0.3'
    )

    // 4. Typographic stack scales up slightly and blurs away before shutter split
    .to('.intro-middle-container', {
      scale: 1.03,
      opacity: 0,
      filter: 'blur(10px)',
      duration: 0.55,
      ease: 'power2.in'
    }, '+=0.35')

    // 5. Mechanical split: shutters slide away vertically
    .add(() => {
      onRevealStart() // Trigger homepage render & text entry animations as shutters start parting
    })
    .to('.intro-shutter-top', {
      yPercent: -100,
      duration: 1.1,
      ease: 'expo.inOut'
    }, '-=0.15')
    .to('.intro-shutter-bottom', {
      yPercent: 100,
      duration: 1.1,
      ease: 'expo.inOut'
    }, '<')
    
    // Hide background glow splitter
    .to('.intro-glow-line', {
      opacity: 0,
      scaleY: 0,
      duration: 0.35,
      ease: 'power2.in'
    }, '<')

  }, [onRevealStart, onComplete])

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center select-none bg-transparent">
      
      {/* Upper Shutter */}
      <div className="intro-shutter-top absolute top-0 left-0 w-full h-[50vh] bg-bg-primary border-b border-white/5 z-10 flex flex-col justify-end items-center overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:30px_30px]" />
      </div>

      {/* Lower Shutter */}
      <div className="intro-shutter-bottom absolute bottom-0 left-0 w-full h-[50vh] bg-bg-primary border-t border-white/5 z-10 flex flex-col justify-start items-center overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:30px_30px]" />
      </div>

      {/* Background Splitter Grid Line */}
      <div className="intro-glow-line absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] bg-white opacity-0 z-20 origin-center pointer-events-none" style={{ boxShadow: '0 0 15px rgba(255, 255, 255, 0.4)' }} />

      {/* Center Kinetic Typographic Canvas */}
      <div className="intro-middle-container absolute z-20 flex flex-col items-start justify-center max-w-5xl px-6 pointer-events-none" style={{ perspective: '1000px' }}>
        
        <div className="relative overflow-hidden py-6 px-12 mt-2 flex flex-col items-start text-left">
          
          {/* Line 1: WELCOME (Heavy Bold Metallic, default opacity-0 to prevent FOUC) */}
          <h1 className="intro-line-1 opacity-0 text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-metallic-100 to-metallic-300 leading-none select-none uppercase">
            WELCOME
          </h1>

          {/* Line 2: to my (Thin Italic Accent Offset, default opacity-0) */}
          <h2 className="intro-line-2 opacity-0 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-light italic tracking-widest text-accent-primary leading-none select-none my-3 ml-12 sm:ml-24 md:ml-36">
            to my
          </h2>

          {/* Line 3: DIGITAL WEB (Heavy Bold Silver/Charcoal, default opacity-0) */}
          <h1 className="intro-line-3 opacity-0 text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-metallic-200 to-metallic-400 leading-none select-none uppercase">
            DIGITAL WEB
          </h1>

          {/* Subtitle (Placed correctly at bottom and default opacity-0) */}
          <div className="intro-subtitle opacity-0 text-[10px] md:text-xs font-mono font-medium text-metallic-300 uppercase mt-6 tracking-[0.3em] select-none">
            JOSH P.S — TECHNICAL LEAD
          </div>

          {/* Metallic Sheen Sweep overlay */}
          <div className="intro-sheen absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 translate-x-[-150%] pointer-events-none" />
        </div>

      </div>

    </div>
  )
}
