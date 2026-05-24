'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'

type Tab = 'projects' | 'certificates' | 'techStack'

export function Portfolio() {
  const [activeTab, setActiveTab] = useState<Tab>('projects')

  useEffect(() => {
    // 1. Header stretch and reveal
    gsap.fromTo('.portfolio-header-text',
      { x: -30, opacity: 0 },
      { 
        x: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: {
          trigger: '#portfolio',
          start: 'top 75%',
        }
      }
    )
    gsap.fromTo('.portfolio-header-line',
      { scaleX: 0 },
      { 
        scaleX: 1, duration: 1.2, ease: 'expo.out', transformOrigin: 'left center',
        scrollTrigger: {
          trigger: '#portfolio',
          start: 'top 75%',
        }
      }
    )

    // 2. Tabs panel reveal
    gsap.fromTo('.portfolio-tabs-nav',
      { y: 20, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
        scrollTrigger: {
          trigger: '.portfolio-tabs-nav',
          start: 'top 80%',
        }
      }
    )

    // 3. Grid content container slide-in
    gsap.fromTo('.portfolio-reveal-container',
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1.0, ease: 'power4.out',
        scrollTrigger: {
          trigger: '.portfolio-reveal-container',
          start: 'top 80%',
        }
      }
    )
  }, [])

  const tabVariants = {
    initial: { opacity: 0, y: 20, filter: 'blur(4px)' },
    animate: { 
      opacity: 1, y: 0, filter: 'blur(0px)',
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }
    },
    exit: { 
      opacity: 0, y: -20, filter: 'blur(4px)',
      transition: { duration: 0.25 }
    }
  }

  const tabs: { id: Tab, label: string }[] = [
    { id: 'projects', label: 'Projects' },
    { id: 'certificates', label: 'Certificates' },
    { id: 'techStack', label: 'Tech Stack' }
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'projects':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Dummy Project Cards */}
            {[1, 2, 3].map(i => (
              <div key={i} className="group relative rounded-2xl border border-border-default bg-bg-elevated overflow-hidden hover:-translate-y-2 hover:shadow-glow-md transition-all duration-300">
                <div className="aspect-video bg-bg-secondary w-full border-b border-border-subtle" />
                <div className="p-6">
                  <h4 className="text-xl font-display mb-2 text-metallic-100">Project {i}</h4>
                  <p className="text-sm text-text-secondary mb-4 line-clamp-2">A high-performance web application built with Next.js and Tailwind.</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="text-xs px-2 py-1 rounded bg-white/5 border border-white/10 font-mono text-metallic-300">Next.js</span>
                    <span className="text-xs px-2 py-1 rounded bg-white/5 border border-white/10 font-mono text-metallic-300">Tailwind</span>
                  </div>
                  <button className="text-accent-primary font-mono text-sm group-hover:text-metallic-100 flex items-center gap-2">
                    View Project <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      case 'certificates':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map(i => (
              <div key={i} className="flex gap-6 p-6 rounded-2xl border border-border-default bg-bg-elevated hover:border-accent-primary transition-colors">
                <div className="w-24 h-24 bg-bg-secondary rounded-lg flex-shrink-0" />
                <div className="flex flex-col justify-center">
                  <h4 className="text-lg font-display mb-1 text-metallic-100">Advanced React Certificate</h4>
                  <p className="text-sm text-metallic-400 font-mono mb-4">Meta • 2026</p>
                  <button className="text-sm font-medium text-text-secondary hover:text-white transition-colors">View Credential →</button>
                </div>
              </div>
            ))}
          </div>
        )
      case 'techStack':
        return (
          <div className="flex flex-wrap gap-4">
            {['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Python'].map(tech => (
              <div key={tech} className="inline-flex items-center gap-2 px-4 py-2 bg-bg-elevated border border-border-default rounded-full font-mono text-sm text-metallic-200 hover:border-accent-primary hover:-translate-y-1 hover:shadow-glow-sm transition-all duration-300">
                {tech}
              </div>
            ))}
          </div>
        )
    }
  }

  return (
    <section id="portfolio" className="min-h-screen py-24 px-6 border-t border-border-subtle bg-bg-primary">
      <div className="max-w-7xl mx-auto w-full">
        <div className="mb-16 flex items-center gap-4">
          <h2 className="portfolio-header-text text-4xl md:text-5xl font-display text-text-primary">PORTFOLIO</h2>
          <div className="portfolio-header-line h-[1px] flex-1 bg-border-strong ml-4 relative">
            <span className="absolute right-0 top-1/2 -translate-y-1/2 font-mono text-xs text-metallic-400 bg-bg-primary pl-4">03</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="portfolio-tabs-nav flex gap-8 border-b border-border-default mb-12 relative overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 font-mono text-sm tracking-wider uppercase transition-colors whitespace-nowrap ${
                activeTab === tab.id ? 'text-metallic-100' : 'text-metallic-400 hover:text-metallic-200'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-accent-primary"
                  style={{ width: '100%' }} // Note: layoutId handles position/size interpolation, but relative width works better in flex if wrapped. Let's just use absolute bottom.
                  initial={false}
                />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={tabVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="portfolio-reveal-container min-h-[400px]"
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  )
}
