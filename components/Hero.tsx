'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'

export function Hero({ introDone }: { introDone?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  
  // High-performance React state typewriter typing effect
  const [typedText, setTypedText] = useState('')
  const fullText = "Technical Lead (Tech Lead)"

  useEffect(() => {
    if (introDone === false) return

    // Subtitle typewriter typing effect
    let index = 0
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, index + 1))
      index++
      if (index >= fullText.length) {
        clearInterval(interval)
      }
    }, 70) // 70ms per character

    // Run the GSAP entry animation immediately!
    const tl = gsap.timeline()

    tl.fromTo('.hero-text-line',
      { y: 40, opacity: 0, rotateX: -10 },
      { y: 0, opacity: 1, rotateX: 0, duration: 1, stagger: 0.12, ease: 'power4.out' }
    )
    .fromTo(imageRef.current, 
      { scale: 0.93, opacity: 0, filter: 'blur(15px)' },
      { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 1.2, ease: 'expo.out' },
      '-=0.7'
    )
    // Smoothly reveal scroll indicator at the bottom
    .fromTo(scrollIndicatorRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.5'
    )

    // Scroll listener to fade out scroll indicator when scrolling down
    const handleScroll = () => {
      if (!scrollIndicatorRef.current) return
      const opacity = Math.max(1 - window.scrollY / 250, 0)
      gsap.set(scrollIndicatorRef.current, { opacity })
    }
    
    window.addEventListener('scroll', handleScroll)

    // Interactive Mouse Parallax Effect
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !imageRef.current) return
      
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      
      // Calculate mouse position relative to center (-1 to 1)
      const xPos = (clientX / innerWidth - 0.5) * 2
      const yPos = (clientY / innerHeight - 0.5) * 2

      // Move Image wrapper slightly
      gsap.to(imageRef.current, {
        x: xPos * 15,
        y: yPos * 15,
        rotateY: xPos * 4,
        rotateX: -yPos * 4,
        duration: 0.8,
        ease: 'power2.out'
      })

      // Move text slightly in opposite direction for depth
      gsap.to('.hero-text-parallax', {
        x: -xPos * 8,
        y: -yPos * 8,
        duration: 0.8,
        ease: 'power2.out'
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
      clearInterval(interval)
    }
  }, [introDone])

  const scrollToPortfolio = () => {
    const el = document.getElementById('portfolio')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" ref={containerRef} className="min-h-screen flex items-center justify-center pt-20 pb-12 px-6 overflow-hidden relative bg-transparent" style={{ perspective: '1000px' }}>
      
      {/* Visual background lines */}
      <div className="absolute inset-0 opacity-[0.01] pointer-events-none bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px] z-0" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
        
        {/* Text Content (Left) */}
        <div className="order-2 lg:order-1 flex flex-col justify-center lg:pr-8 hero-text-parallax">
          <p className="hero-text-line text-accent-primary font-mono text-sm mb-4 tracking-widest uppercase flex items-center gap-3">
            <span className="w-8 h-[1px] bg-accent-primary inline-block"></span>
            Hello, I&apos;m
          </p>
          
          {/* Interactive Name - JOSH P.S */}
          <h1 className="hero-text-line text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-metallic-100 via-metallic-200 to-metallic-400 mb-2 cursor-default group inline-block">
            <span className="inline-block transition-transform duration-300 hover:-translate-y-2 hover:scale-110 hover:text-white">J</span>
            <span className="inline-block transition-transform duration-300 hover:-translate-y-2 hover:scale-110 hover:text-white">O</span>
            <span className="inline-block transition-transform duration-300 hover:-translate-y-2 hover:scale-110 hover:text-white">S</span>
            <span className="inline-block transition-transform duration-300 hover:-translate-y-2 hover:scale-110 hover:text-white">H</span>
            <span className="inline-block ml-4 transition-transform duration-300 hover:-translate-y-2 hover:scale-110 hover:text-white">P</span>
            <span className="inline-block transition-transform duration-300 hover:-translate-y-2 hover:scale-110 hover:text-white">.</span>
            <span className="inline-block transition-transform duration-300 hover:-translate-y-2 hover:scale-110 hover:text-white">S</span>
          </h1>

          {/* Typewriter Subtitle */}
          <h2 className="hero-text-line text-lg sm:text-2xl md:text-3xl text-metallic-200 font-medium mb-6 relative inline-flex items-center max-w-full min-h-[40px] font-mono select-none flex-wrap">
            {typedText}
            {introDone !== false && typedText.length < fullText.length && (
              <span className="ml-1 w-1.5 h-5 sm:h-6 bg-accent-primary animate-[pulse_0.6s_infinite] inline-block shadow-glow-sm" />
            )}
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-accent-primary to-transparent opacity-50"></span>
          </h2>
          
          <div className="hero-text-line space-y-4 mb-10 text-text-secondary text-base leading-relaxed max-w-lg">
            <p className="hover:text-metallic-100 transition-colors duration-300">
              I am a Technical Lead focused on system architecture, large-scale digital product development, and leading engineering teams to deliver clean, efficient, and robust code.
            </p>
            <p className="hover:text-metallic-100 transition-colors duration-300">
              With deep expertise in both frontend and backend engineering, I translate complex business visions into innovative, scalable, and high-performance technology solutions with exceptional user experiences (UX).
            </p>
          </div>
          
          <div className="hero-text-line flex flex-wrap gap-4 items-center mb-12">
            <button 
              onClick={scrollToPortfolio}
              className="relative overflow-hidden bg-text-primary text-bg-primary px-8 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-glow-md group"
            >
              <span className="relative z-10 flex items-center gap-2">
                View Portfolio <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-metallic-200 to-metallic-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            
            <a href="/cv/josh-p-cv.pdf" download className="group px-8 py-3 rounded-full border border-border-strong hover:bg-white/5 hover:border-metallic-200 transition-all duration-300 font-medium text-metallic-100 flex items-center gap-2">
              <svg className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
              </svg>
              Download CV
            </a>
          </div>

          <div className="hero-text-line flex items-center gap-3 text-sm text-metallic-300 font-mono bg-bg-elevated w-max px-4 py-2 rounded-full border border-border-default hover:border-success/50 transition-colors duration-300 cursor-default max-w-full">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-success"></span>
            </span>
            <span>Available for new opportunities</span>
          </div>
        </div>

        {/* Photo Content (Right) */}
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
          <div 
            ref={imageRef}
            className="relative w-full max-w-[280px] sm:max-w-[340px] md:max-w-[420px] aspect-[4/5] rounded-3xl overflow-hidden border border-border-default shadow-glow-lg group opacity-0"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-glow opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10" />
            
            {/* Teks "Tech Lead" vertical watermarked text */}
            <div className="absolute -right-8 top-1/4 -rotate-90 origin-bottom-right z-30 font-display text-4xl font-bold text-white/5 pointer-events-none tracking-widest mix-blend-overlay">
              TECH LEAD
            </div>

            <Image 
              src="/profile.jpg" 
              alt="Josh P.S" 
              fill
              priority
              sizes="(max-width: 768px) 280px, (max-width: 1024px) 340px, 420px"
              className="object-cover scale-100 group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
            />
            
            {/* Border overlay & decorative elements */}
            <div className="absolute inset-0 border border-white/10 rounded-3xl z-20 pointer-events-none transition-colors duration-500 group-hover:border-accent-primary/30" />
            
            <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-accent-primary z-20 shadow-glow-sm" style={{ display: 'none' }} /> {/* hidden to not conflict with toggle */}
            <div className="absolute bottom-4 left-4 w-2 h-2 rounded-full bg-accent-primary z-20 shadow-glow-sm" />
          </div>
        </div>

      </div>

      {/* Elegant Animating Scroll Indicator */}
      <div 
        ref={scrollIndicatorRef}
        onClick={() => {
          const el = document.getElementById('about')
          if (el) el.scrollIntoView({ behavior: 'smooth' })
        }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 opacity-0 cursor-pointer pointer-events-auto group"
      >
        <span className="font-mono text-[9px] tracking-[0.25em] text-metallic-400 uppercase select-none group-hover:text-white transition-colors duration-300">SCROLL</span>
        <div className="w-5 h-8 rounded-full border border-border-strong group-hover:border-metallic-200 transition-colors duration-300 flex justify-center p-1 relative">
          <div className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-[bounce_1.5s_infinite] shadow-glow-sm" />
        </div>
      </div>

    </section>
  )
}
