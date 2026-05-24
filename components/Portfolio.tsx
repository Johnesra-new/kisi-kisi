'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import Image from 'next/image'
import { client } from '../lib/sanity/client'
import { PROJECTS_QUERY, CERTIFICATES_QUERY } from '../lib/sanity/queries'

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

type Tab = 'projects' | 'certificates' | 'techStack'

export function Portfolio() {
  const [activeTab, setActiveTab] = useState<Tab>('projects')
  const [projects, setProjects] = useState<Project[]>([])
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [projectsData, certificatesData] = await Promise.all([
          client.fetch(PROJECTS_QUERY),
          client.fetch(CERTIFICATES_QUERY)
        ])
        setProjects(projectsData || [])
        setCertificates(certificatesData || [])
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
  }, [isLoading])

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
        const categories = [
          {
            title: 'FRONTEND ARCHITECTURE',
            skills: [
              {
                name: 'React.js',
                role: 'Core UI Framework',
                level: '92%',
                desc: 'SPA interface building, custom Hooks optimization, state managers, and component lifecycle synchronization.',
                icon: (
                  <svg className="w-5 h-5 text-[#61DAFB]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <ellipse rx="10" ry="4.5" cx="12" cy="12" transform="rotate(30 12 12)" />
                    <ellipse rx="10" ry="4.5" cx="12" cy="12" transform="rotate(90 12 12)" />
                    <ellipse rx="10" ry="4.5" cx="12" cy="12" transform="rotate(150 12 12)" />
                    <circle r="1.5" cx="12" cy="12" fill="currentColor" />
                  </svg>
                )
              },
              {
                name: 'Next.js 14',
                role: 'Server Framework',
                level: '90%',
                desc: 'Server-Side Rendering (SSR), Static Generation (SSG), folder routing layouts, and search engine optimization.',
                icon: (
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2a10 10 0 0110 10c0 2.2-.7 4.2-1.9 5.9l-8.5-11.4c.1 0 .2-.1.4-.1zm-2.8 3c-.7 1.1-1.2 2.5-1.2 4.2 0 3.5 2.1 5.8 4.9 5.8 1.4 0 2.6-.6 3.3-1.6l-7-9.4z" fill="currentColor" />
                  </svg>
                )
              },
              {
                name: 'TypeScript',
                role: 'Type Safe Language',
                level: '88%',
                desc: 'Static compile-time safety, clean object-oriented designs, interface schema models, and refactoring security.',
                icon: (
                  <svg className="w-5 h-5 text-[#3178C6]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M1 1h22v22H1V1zm17.9 11.5c-.7-.4-1.5-.6-2.4-.6-1.5 0-2.3.7-2.3 1.9 0 1.2.9 1.6 2.4 2.2 1.8.7 3.1 1.4 3.1 3.5 0 2.4-1.9 3.8-4.8 3.8-1.7 0-3.3-.6-4.2-1.2l1-2.4c.9.6 2.2 1.1 3.2 1.1 1.4 0 2-.6 2-1.5 0-1.1-.9-1.5-2.5-2.2-1.9-.8-3.1-1.7-3.1-3.6 0-2.2 1.8-3.6 4.4-3.6 1.5 0 2.8.4 3.7.9l-1 2.4zM4.9 9.1H13V12H10.4v9.3H7.4V12H4.9V9.1z" />
                  </svg>
                )
              },
              {
                name: 'Tailwind CSS',
                role: 'Styling Engine',
                level: '95%',
                desc: 'Utility structural system layout, customized theme tokens, HSL color harmony, and responsive media setups.',
                icon: (
                  <svg className="w-5 h-5 text-[#38BDF8]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M12 6.002C9 3 3 6.002 3 12c0 5 6 3 9 5.998 3-3 9-1 9-5.998 0-6-6-8.998-9-5.998z" />
                    <path d="M12 9.002c-2-2-6 0-6 4 0 3.3 4 2 6 4 2-2 6-.7 6-4 0-4-4-6-6-4z" />
                  </svg>
                )
              }
            ]
          },
          {
            title: 'BACKEND & DATABASES',
            skills: [
              {
                name: 'Node.js',
                role: 'API Runtime',
                level: '86%',
                desc: 'Scalable event-driven servers, Express middleware systems, package module configurations, and asynchronous services.',
                icon: (
                  <svg className="w-5 h-5 text-[#339933]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M12 2L4 6.5v11L12 22l8-4.5v-11L12 2zM6 8.5l6-3.5 6 3.5v7l-6 3.5-6-3.5v-7z" />
                  </svg>
                )
              },
              {
                name: 'PostgreSQL',
                role: 'Relational DB',
                level: '82%',
                desc: 'Structured database tables, optimized query indexing, referential integrity relations, and JSONB document pipelines.',
                icon: (
                  <svg className="w-5 h-5 text-[#4169E1]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M12 3a9 9 0 00-9 9c0 4.5 3.3 8.2 7.7 8.9v-5.2h-2v-3.7h2v-2.8c0-2 1.2-3.1 3-3.1.9 0 1.8.2 1.8.2v2h-1c-1 0-1.3.6-1.3 1.3v1.4h2.3l-.4 3.7h-1.9v5.2c4.4-.7 7.7-4.4 7.7-8.9a9 9 0 00-9-9z" />
                  </svg>
                )
              },
              {
                name: 'Python',
                role: 'Logic & Scripting',
                level: '80%',
                desc: 'Automation routines, data manipulation algorithms, modular program structures, and fast script prototyping.',
                icon: (
                  <svg className="w-5 h-5 text-[#3776AB]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M12 2a4 4 0 00-4 4v2h4v1H8a4 4 0 00-4 4v3a4 4 0 004 4h1v-2a3 3 0 013-3h4a3 3 0 013 3v2h1a4 4 0 004-4v-3a4 4 0 00-4-4h-4V8h4a4 4 0 004-4V3a4 4 0 00-4-4H12z" />
                  </svg>
                )
              }
            ]
          },
          {
            title: 'TOOLING & WORKFLOWS',
            skills: [
              {
                name: 'Git & GitHub',
                role: 'Version Control',
                level: '90%',
                desc: 'Trunk branch coordinating, remote code syncing, command-line tracking, and collaborative merge releases.',
                icon: (
                  <svg className="w-5 h-5 text-[#F05032]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <circle cx="12" cy="18" r="3" />
                    <circle cx="12" cy="6" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <path d="M12 9v6M9 12h6" />
                  </svg>
                )
              },
              {
                name: 'Sanity CMS',
                role: 'Headless Studio',
                level: '85%',
                desc: 'Decoupled schema creation, GROQ endpoint queries, document relationships, and headless content databases.',
                icon: (
                  <svg className="w-5 h-5 text-[#F03E2F]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M12 3L3 7v10l9 4 9-4V7l-9-4zm7 4.5v7.2l-7 3.1-7-3.1V7.5l7-3.1 7 3.1z" />
                  </svg>
                )
              }
            ]
          }
        ]

        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full mt-4">
            {categories.map((cat, catIdx) => (
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
