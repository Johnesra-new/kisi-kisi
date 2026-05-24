'use client'

import { useState, useEffect } from 'react'
import { gsap } from 'gsap'

export function Contact() {
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  useEffect(() => {
    // 1. Header stretch and reveal
    gsap.fromTo('.contact-header-text',
      { x: -30, opacity: 0 },
      { 
        x: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: {
          trigger: '#contact',
          start: 'top 75%',
        }
      }
    )
    gsap.fromTo('.contact-header-line',
      { scaleX: 0 },
      { 
        scaleX: 1, duration: 1.2, ease: 'expo.out', transformOrigin: 'left center',
        scrollTrigger: {
          trigger: '#contact',
          start: 'top 75%',
        }
      }
    )

    // 2. Social connections card reveal
    gsap.fromTo('.contact-social-item',
      { x: -40, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact-social-item',
          start: 'top 85%',
        }
      }
    )

    // 3. Contact form slide-in
    gsap.fromTo('.contact-form-wrap',
      { x: 40, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 1.0, ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact-form-wrap',
          start: 'top 80%',
        }
      }
    )
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('loading')
    // Simulate network request
    setTimeout(() => {
      setFormState('success')
    }, 1500)
  }

  return (
    <section id="contact" className="min-h-screen py-24 px-6 border-t border-border-subtle bg-bg-primary">
      <div className="max-w-7xl mx-auto w-full">
        <div className="mb-16 flex items-center gap-4">
          <h2 className="contact-header-text text-4xl md:text-5xl font-display text-text-primary">LET&apos;S CONNECT</h2>
          <div className="contact-header-line h-[1px] flex-1 bg-border-strong ml-4 relative">
            <span className="absolute right-0 top-1/2 -translate-y-1/2 font-mono text-xs text-metallic-400 bg-bg-primary pl-4">04</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Social Links */}
          <div>
            <h3 className="text-2xl font-display mb-8 text-metallic-100">Get in Touch</h3>
            <div className="space-y-6">
              {[
                { 
                  icon: (
                    <svg className="w-4 h-4 text-accent-primary group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                  label: 'Email', 
                  value: 'stivenjoshpetersiburian@gmail.com', 
                  url: 'mailto:stivenjoshpetersiburian@gmail.com' 
                },
                { 
                  icon: (
                    <svg className="w-4 h-4 text-accent-primary group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  ), 
                  label: 'Instagram', 
                  value: '@stivenjoshps_', 
                  url: 'https://www.instagram.com/stivenjoshps_?igsh=bmQ2N29ldGZyMG9j' 
                },
                { 
                  icon: (
                    <svg className="w-4 h-4 text-accent-primary group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                  ), 
                  label: 'GitHub', 
                  value: 'github.com/Johnesra-new', 
                  url: 'https://github.com/Johnesra-new' 
                },
              ].map((social, i) => (
                <a key={i} href={social.url} target="_blank" rel="noopener noreferrer" className="contact-social-item flex flex-col group w-max">
                  <span className="text-text-secondary font-mono text-xs mb-1.5 flex items-center gap-2.5">
                    <span className="group-hover:scale-110 transition-transform duration-300">{social.icon}</span> {social.label}
                  </span>
                  <span className="text-lg text-metallic-200 group-hover:text-white transition-colors duration-300 relative">
                    {social.value}
                    <span className="absolute left-0 bottom-0 w-full h-[1px] bg-accent-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-wrap">
            <h3 className="text-2xl font-display mb-8 text-metallic-100">Send a Message</h3>
            {formState === 'success' ? (
              <div className="p-6 bg-success/10 border border-success/20 rounded-xl text-success flex items-center gap-4">
                <span className="text-2xl">✓</span>
                <p>Message sent successfully! I&apos;ll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-xs font-mono text-text-secondary mb-2">Name</label>
                  <input required type="text" id="name" className="w-full bg-bg-elevated border border-border-default rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-primary transition-colors" placeholder="John Doe" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-mono text-text-secondary mb-2">Email</label>
                  <input required type="email" id="email" className="w-full bg-bg-elevated border border-border-default rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-primary transition-colors" placeholder="john@example.com" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs font-mono text-text-secondary mb-2">Message</label>
                  <textarea required id="message" rows={4} className="w-full bg-bg-elevated border border-border-default rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-primary transition-colors resize-none" placeholder="Hello Josh..." />
                </div>
                <button 
                  disabled={formState === 'loading'}
                  type="submit" 
                  className="bg-metallic-200 text-bg-primary font-medium px-8 py-3 rounded-full hover:bg-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {formState === 'loading' ? 'Sending...' : 'Send Message →'}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
