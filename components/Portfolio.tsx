'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import Image from 'next/image'
import { client } from '../lib/sanity/client'
import { PROJECTS_QUERY, CERTIFICATES_QUERY, TECH_STACK_QUERY } from '../lib/sanity/queries'

interface Project {
  _id: string
  title: string
  slug?: { current: string }
  description?: string
  thumbnail?: string
  techStack?: string[]
  liveUrl?: string
  githubUrl?: string
  isFeatured?: boolean
  status?: string
  publishedAt?: string
}

interface Certificate {
  _id: string
  name: string
  issuer?: string
  issuedAt?: string
  credentialUrl?: string
  thumbnail?: string
  category?: string
}

interface TechStackItem {
  _id: string
  name: string
  icon?: string
  category?: string
  proficiency?: number
  role?: string
  description?: string
}

interface MappedSkill {
  name: string
  role: string
  level: string
  desc: string
  icon: React.ReactNode
}

type Tab = 'projects' | 'certificates' | 'techStack'

export function Portfolio() {
  const [activeTab, setActiveTab] = useState<Tab>('projects')
  const [projects, setProjects] = useState<Project[]>([])
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [techStack, setTechStack] = useState<TechStackItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [projectsData, certificatesData, techStackData] = await Promise.all([
          client.fetch(PROJECTS_QUERY),
          client.fetch(CERTIFICATES_QUERY),
          client.fetch(TECH_STACK_QUERY)
        ])
        setProjects(projectsData || [])
        setCertificates(certificatesData || [])
        setTechStack(techStackData || [])
      } catch (err) {
        console.error("Error fetching portfolio data from Sanity:", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

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
  }, [isLoading]) // Re-run animation setup once data is loaded and components render

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

  const getGroupedTechStack = () => {
    const categoriesMap: { [key: string]: { title: string, skills: MappedSkill[] } } = {
      frontend: { title: 'FRONTEND ARCHITECTURE', skills: [] },
      backend: { title: 'BACKEND & DATABASES', skills: [] },
      tools: { title: 'TOOLING & WORKFLOWS', skills: [] }
    }

    techStack.forEach(skill => {
      const cat = skill.category || 'frontend'
      let targetKey = 'frontend'
      if (cat === 'frontend') {
        targetKey = 'frontend'
      } else if (cat === 'backend' || cat === 'database') {
        targetKey = 'backend'
      } else {
        targetKey = 'tools'
      }

      let levelPct = '100%'
      if (skill.proficiency) {
        if (skill.proficiency <= 5) {
          levelPct = `${skill.proficiency * 20}%`
        } else {
          levelPct = `${skill.proficiency}%`
        }
      }

      categoriesMap[targetKey].skills.push({
        name: skill.name,
        role: skill.role || 'Developer Tool',
        level: levelPct,
        desc: skill.description || 'Custom technology integrated into building highly scalable architectures and web applications.',
        icon: skill.icon ? (
          <Image src={skill.icon} alt={skill.name} width={20} height={20} className="w-5 h-5 object-contain" />
        ) : (
          <span className="w-5 h-5 flex items-center justify-center font-mono text-[10px] text-metallic-400">
            {skill.name.slice(0, 2).toUpperCase()}
          </span>
        )
      })
    })

    return Object.values(categoriesMap).filter(cat => cat.skills.length > 0)
  }

  const renderTabContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-accent-primary border-t-transparent animate-spin" />
          <span className="font-mono text-xs text-metallic-400 tracking-widest uppercase">Fetching portfolio...</span>
        </div>
      )
    }

    switch (activeTab) {
      case 'projects':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.length === 0 ? (
              <div className="col-span-full py-16 text-center border border-dashed border-border-subtle rounded-2xl bg-bg-secondary/10">
                <p className="font-mono text-sm text-metallic-400 mb-2">No projects found.</p>
                <p className="text-xs text-metallic-500">Go to your Sanity Studio online and add projects to show here!</p>
              </div>
            ) : (
              projects.map(project => (
                <div key={project._id} className="group relative rounded-2xl border border-border-default bg-bg-elevated overflow-hidden hover:-translate-y-2 hover:shadow-glow-md transition-all duration-300">
                  <div className="aspect-video w-full border-b border-border-subtle relative overflow-hidden bg-bg-secondary">
                    {project.thumbnail ? (
                      <Image 
                        src={project.thumbnail} 
                        alt={project.title} 
                        fill 
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-metallic-400 font-mono text-xs bg-bg-secondary">No Preview</div>
                    )}
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-display mb-2 text-metallic-100">{project.title}</h4>
                    <p className="text-sm text-text-secondary mb-4 line-clamp-2">{project.description || 'No description provided.'}</p>
                    {project.techStack && project.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.techStack.map((tech: string) => (
                          <span key={tech} className="text-xs px-2 py-1 rounded bg-white/5 border border-white/10 font-mono text-metallic-300">{tech}</span>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center gap-4">
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-accent-primary font-mono text-sm hover:text-white flex items-center gap-1">
                          Live Demo <span>→</span>
                        </a>
                      )}
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-metallic-400 font-mono text-sm hover:text-white flex items-center gap-1">
                          GitHub <span>↗</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )
      case 'certificates':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {certificates.length === 0 ? (
              <div className="col-span-full py-16 text-center border border-dashed border-border-subtle rounded-2xl bg-bg-secondary/10">
                <p className="font-mono text-sm text-metallic-400 mb-2">No certificates found.</p>
                <p className="text-xs text-metallic-500">Go to your Sanity Studio online and add certificates to show here!</p>
              </div>
            ) : (
              certificates.map(cert => (
                <div key={cert._id} className="flex gap-6 p-6 rounded-2xl border border-border-default bg-bg-elevated hover:border-accent-primary transition-colors">
                  <div className="w-24 h-24 bg-bg-secondary rounded-lg flex-shrink-0 relative overflow-hidden border border-border-subtle flex items-center justify-center">
                    {cert.thumbnail ? (
                      <Image 
                        src={cert.thumbnail} 
                        alt={cert.name} 
                        fill 
                        className="object-cover"
                        sizes="96px"
                      />
                    ) : (
                      <svg className="w-8 h-8 text-metallic-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                      </svg>
                    )}
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4 className="text-lg font-display mb-1 text-metallic-100">{cert.name}</h4>
                    <p className="text-sm text-metallic-400 font-mono mb-4">
                      {cert.issuer} {cert.issuedAt ? `• ${new Date(cert.issuedAt).getFullYear()}` : ''}
                    </p>
                    {cert.credentialUrl && (
                      <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-text-secondary hover:text-white transition-colors">
                        View Credential →
                      </a>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )
      case 'techStack':
        const groupedCategories = getGroupedTechStack()
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full mt-4">
            {groupedCategories.length === 0 ? (
              <div className="col-span-full py-16 text-center border border-dashed border-border-subtle rounded-2xl bg-bg-secondary/10">
                <p className="font-mono text-sm text-metallic-400 mb-2">No technologies found.</p>
                <p className="text-xs text-metallic-500">Go to your Sanity Studio online and add tech stack to show here!</p>
              </div>
            ) : (
              groupedCategories.map((cat, catIdx) => (
                <div key={catIdx} className="space-y-6 bg-bg-secondary/40 border border-border-subtle rounded-2xl p-6 hover:border-border-strong transition-colors duration-300">
                  <h3 className="text-xs font-mono font-bold tracking-[0.2em] text-metallic-300 border-b border-border-subtle pb-3">
                    {cat.title}
                  </h3>
                  
                  <div className="space-y-4">
                    {cat.skills.map((skill, skillIdx) => (
                      <div key={skillIdx} className="group relative rounded-xl border border-border-default bg-bg-elevated/40 p-4 hover:border-accent-primary/40 hover:shadow-glow-sm hover:-translate-y-1 transition-all duration-300 cursor-default">
                        
                        {/* Title & Icon Header */}
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2.5">
                            <span className="p-1.5 rounded-lg bg-bg-secondary border border-border-subtle flex items-center justify-center group-hover:border-accent-primary/20 transition-colors w-8 h-8">
                              {skill.icon}
                            </span>
                            <div>
                              <h4 className="font-mono text-sm font-semibold text-metallic-100 group-hover:text-white transition-colors">
                                {skill.name}
                              </h4>
                              <span className="text-[10px] text-metallic-400 font-mono">
                                {skill.role}
                              </span>
                            </div>
                          </div>
                          
                          {/* Gauge Label */}
                          <span className="font-mono text-[10px] font-bold text-accent-primary bg-accent-primary/5 px-2 py-0.5 rounded border border-accent-primary/10">
                            {skill.level}
                          </span>
                        </div>
                        
                        {/* Short Description */}
                        <p className="text-xs text-text-secondary leading-relaxed font-mono mb-3.5 group-hover:text-metallic-200 transition-colors">
                          {skill.desc}
                        </p>

                        {/* Glowing Linear Progress Bar */}
                        <div className="w-full h-1 bg-bg-secondary rounded-full overflow-hidden border border-border-subtle">
                          <div 
                            className="h-full bg-gradient-to-r from-accent-dim via-accent-primary to-white rounded-full shadow-glow-sm"
                            style={{ width: skill.level }}
                          />
                        </div>

                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
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
                  style={{ width: '100%' }}
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
