import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  {
    label: 'FLEET',
    to: '/#fleet',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16l-9-9-9 9"/>
        <path d="M3 12l4-4 2 2 4-4 2 2 4-4"/>
        <path d="M2 20h20"/>
      </svg>
    ),
  },
  {
    label: 'WHY LMT',
    to: '/#why-us',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4"/>
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
      </svg>
    ),
  },
  {
    label: 'SERVICES',
    to: '/#services',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
      </svg>
    ),
  },
  {
    label: 'BOOK A FLIGHT',
    to: '/book',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
  },
  {
    label: 'CONTACT US',
    to: '/#contact',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <polyline points="2,4 12,13 22,4"/>
      </svg>
    ),
  },
]

const socialLinks = [
  { label: 'Facebook', href: 'https://www.facebook.com', icon: <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg> },
  { label: 'Instagram', href: 'https://www.instagram.com', icon: <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg> },
  { label: 'LinkedIn', href: 'https://www.linkedin.com', icon: <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg> },
  { label: 'X', href: 'https://x.com', icon: <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
  { label: 'YouTube', href: 'https://www.youtube.com', icon: <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon fill="#fff" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg> },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleNavClick = (to) => {
    setMenuOpen(false)
    if (to.startsWith('/#')) {
      const id = to.replace('/#', '')
      if (window.location.pathname !== '/') {
        navigate('/')
        setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 300)
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      navigate(to)
    }
  }

  return (
    <>
      {/* ── Top navbar ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
        style={{
          height: '84px',
          background: scrolled ? 'rgba(255,255,255,0.96)' : 'rgba(255,255,255,0.80)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          boxShadow: scrolled ? '0 1px 24px rgba(0,0,0,0.07)' : 'none',
        }}
      >
        <div
          className="flex items-center justify-between h-full"
          style={{ paddingLeft: '2vw', paddingRight: '2vw' }}
        >

          {/* LEFT — menu icon */}
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="flex items-center justify-center w-8 h-8 bg-transparent border-none cursor-pointer p-0 z-10 relative"
          >
            <img src="/menu.svg" alt="" style={{ width: '24px', height: 'auto', display: 'block' }} />
          </button>

          {/* CENTER — LMT logo */}
          <button
            onClick={() => { setMenuOpen(false); navigate('/') }}
            className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer bg-transparent border-none p-0"
          >
            <img
              src="/lmtlogo1.png"
              alt="LMT JETS"
              style={{ height: '56px', width: 'auto', display: 'block' }}
            />
          </button>

          {/* RIGHT — Book A Jet (always visible) */}
          <button
            onClick={() => navigate('/book')}
            className="z-10 relative flex items-center gap-2"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '13px',
              letterSpacing: '0.5px',
              fontWeight: 500,
              borderRadius: '6px',
              padding: '10px 24px',
              border: 'none',
              background: '#B8944F',
              color: '#FFFFFF',
              cursor: 'pointer',
              transition: 'background 0.3s, transform 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#A6833E'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#B8944F'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            Book A Jet
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 16l-9-9-9 9"/>
              <path d="M3 12l4-4 2 2 4-4 2 2 4-4"/>
            </svg>
          </button>
        </div>
      </nav>

      {/* ── Sidebar overlay ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Dark backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[99]"
              style={{ backgroundColor: 'rgba(8,21,45,0.55)' }}
              onClick={() => setMenuOpen(false)}
            />

            {/* LEFT sliding panel */}
            <div
              key="sidebar"
              className="fixed top-0 left-0 bottom-0 z-[100] flex flex-col"
              style={{
                width: '300px',
                backgroundColor: '#FFFFFF',
                boxShadow: '6px 0 50px rgba(0,0,0,0.15)',
                transform: 'translateX(0)',
                animation: 'sidebarSlideIn 0.42s cubic-bezier(0.4,0,0.2,1) forwards',
              }}
            >
              {/* Top: close button only */}
              <div className="flex items-center justify-end px-6 py-5 border-b"
                style={{ borderColor: 'rgba(0,0,0,0.07)' }}>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center bg-transparent border-none cursor-pointer"
                  style={{ color: 'rgba(0,0,0,0.35)', width: '32px', height: '32px', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#1C1C1C'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(0,0,0,0.35)'}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
                    <line x1="1" y1="1" x2="17" y2="17" />
                    <line x1="17" y1="1" x2="1" y2="17" />
                  </svg>
                </button>
              </div>

              {/* Nav links with icons */}
              <nav className="flex flex-col px-6 pt-6 flex-1">
                {navLinks.map((link, i) => (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.to)}
                    className="flex items-center w-full text-left bg-transparent border-none cursor-pointer rounded-lg transition-all duration-200"
                    style={{ padding: '12px 10px', marginBottom: '2px', gap: '14px' }}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(184,148,79,0.07)' }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent' }}
                  >
                    {/* Icon — fixed 20px width */}
                    <span style={{ color: '#B8944F', flexShrink: 0, width: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {link.icon}
                    </span>
                    {/* Label */}
                    <span style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '11px',
                      letterSpacing: '2px',
                      textTransform: 'uppercase',
                      fontWeight: 500,
                      color: '#142544',
                    }}>
                      {link.label}
                    </span>
                  </button>
                ))}
              </nav>

              {/* Bottom: 24/7 contact + socials */}
              <div className="flex-shrink-0"
                style={{ padding: '20px 24px 24px', borderTop: '1px solid rgba(0,0,0,0.07)' }}>

                {/* "24/7 CONCIERGE" heading */}
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '9px',
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  color: '#B8944F',
                  marginBottom: '12px',
                  fontWeight: 500,
                }}>
                  24/7 Concierge
                </p>

                {/* Contact info */}
                {[
                  { href: 'tel:+18889292298',               text: '+1 (888) 929-2298' },
                  { href: 'https://wa.me/16464200679',       text: 'WA: +1 (646) 420-0679' },
                  { href: 'mailto:info@lmtjets.com',         text: 'info@lmtjets.com' },
                  { href: null,                              text: '120 Gazza Blvd, Farmingdale, NY 11735' },
                ].map(({ href, text }) => {
                  const style = {
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '11px',
                    color: 'rgba(0,0,0,0.45)',
                    display: 'block',
                    marginBottom: '6px',
                    textDecoration: 'none',
                    lineHeight: 1.5,
                    transition: 'color 0.2s',
                  }
                  return href ? (
                    <a key={text} href={href} style={style}
                      onMouseEnter={e => e.currentTarget.style.color = '#B8944F'}
                      onMouseLeave={e => e.currentTarget.style.color = 'rgba(0,0,0,0.45)'}>
                      {text}
                    </a>
                  ) : (
                    <span key={text} style={style}>{text}</span>
                  )
                })}

                {/* Social icons */}
                <div className="flex items-center gap-3 mt-4">
                  {socialLinks.map(({ label, href, icon }) => (
                    <a key={label} href={href} target="_blank" rel="noreferrer"
                      aria-label={label}
                      className="flex items-center justify-center rounded-full transition-all duration-200"
                      style={{
                        width: '30px', height: '30px',
                        border: '1px solid rgba(0,0,0,0.10)',
                        color: 'rgba(0,0,0,0.40)',
                        textDecoration: 'none',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = '#B8944F'; e.currentTarget.style.color = '#B8944F' }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.10)'; e.currentTarget.style.color = 'rgba(0,0,0,0.40)' }}
                    >
                      {icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
