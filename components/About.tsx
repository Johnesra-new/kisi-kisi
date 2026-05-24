'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'

export function About() {
  useEffect(() => {
    // 1. Header stretch and reveal
    gsap.fromTo('.about-header-text',
      { x: -30, opacity: 0 },
      { 
        x: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: {
          trigger: '#about',
          start: 'top 75%',
        }
      }
    )
    gsap.fromTo('.about-header-line',
      { scaleX: 0 },
      { 
        scaleX: 1, duration: 1.2, ease: 'expo.out', transformOrigin: 'left center',
        scrollTrigger: {
          trigger: '#about',
          start: 'top 75%',
        }
      }
    )

    // 2. Profile photo scaling & dynamic entry
    gsap.fromTo('.about-photo-wrap',
      { scale: 0.85, opacity: 0, rotate: -6 },
      {
        scale: 1, opacity: 1, rotate: 0, duration: 1.2, ease: 'power4.out',
        scrollTrigger: {
          trigger: '.about-photo-wrap',
          start: 'top 80%',
        }
      }
    )

    // 3. Biography details stagger reveal
    gsap.fromTo('.about-bio-item',
      { y: 35, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-bio-item',
          start: 'top 85%',
        }
      }
    )
  }, [])

  return (
    <section id="about" className="min-h-screen py-24 px-6 border-t border-border-subtle bg-bg-primary relative">
      <div className="max-w-7xl mx-auto w-full">
        <div className="mb-20 flex items-center gap-4">
          <h2 className="about-header-text text-4xl md:text-5xl font-display text-text-primary">ABOUT ME</h2>
          <div className="about-header-line h-[1px] flex-1 bg-border-strong ml-4 relative">
            <span className="absolute right-0 top-1/2 -translate-y-1/2 font-mono text-xs text-metallic-400 bg-bg-primary pl-4">02</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Photo Side */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start about-photo-wrap">
            <div className="relative w-[270px] h-[270px] sm:w-[320px] sm:h-[320px]">
              {/* Rotating Ring */}
              <div className="absolute -inset-4 rounded-full border border-dashed border-metallic-400 animate-[spin_20s_linear_infinite]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-accent-primary rounded-full shadow-glow-sm" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-accent-primary rounded-full shadow-glow-sm" />
              </div>
              
              {/* Anime Profile Photo - centered on character's face using object-[35%_center] */}
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-border-default shadow-glow-md bg-bg-secondary relative group">
                <Image 
                  src="/profile_about.png" 
                  alt="Josh P.S Anime Profile" 
                  fill
                  sizes="(max-width: 640px) 270px, 320px"
                  className="object-cover object-[35%_center] transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-bg-elevated to-bg-secondary flex items-center justify-center -z-10">
                  <span className="text-4xl font-mono text-metallic-300 opacity-20">JOSH P.S</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h3 className="about-bio-item text-3xl font-display mb-2 text-text-primary">Josh P.S</h3>
            <p className="about-bio-item text-accent-primary font-mono text-sm mb-6 uppercase tracking-wider font-semibold">TECHNICAL LEAD</p>
            
            <div className="about-bio-item w-full h-[1px] bg-border-subtle mb-6" />

            <div className="about-bio-item space-y-4 text-text-secondary leading-relaxed mb-8">
              <p>
                I am just a high school kid with a deep fascination for the digital world—blending clean lines of backend code with high-performance workflows. Behind the screen, I’m a passionate backend builder who loves logic, a boy who enjoys games, and someone who thrives on embracing life’s adventures.
              </p>
              <p>
                I don&apos;t just write algorithms; I architect the hidden backbones of modern web apps, turning complex server-side problems into elegant, highly scalable digital solutions.
              </p>
            </div>

            <div className="about-bio-item w-full h-[1px] bg-border-subtle mb-6" />

            <ul className="about-bio-item space-y-4 font-mono text-sm text-metallic-200 mb-10">
              <li className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-bg-elevated border border-border-default flex items-center justify-center shadow-glow-sm">
                  <svg className="w-4 h-4 text-accent-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <span>SMAN 1 KANDANGAN</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-bg-elevated border border-border-default flex items-center justify-center shadow-glow-sm">
                  <svg className="w-4 h-4 text-accent-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span>Solitary Worker</span>
              </li>
            </ul>

            <div className="about-bio-item">
              <a href="/cv/josh-p-cv.pdf" download className="inline-flex items-center gap-2 px-6 py-3 border border-border-strong rounded-full text-metallic-100 hover:bg-white/5 transition-colors relative overflow-hidden group">
                <span className="relative z-10 flex items-center gap-2 font-medium">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                  Download CV
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
