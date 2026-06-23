import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const navLinks = [
  { label: 'FLEET', to: '/book' },
  { label: 'WHY LMT', to: '/#why-us' },
  { label: 'SERVICES', to: '/#services' },
  { label: 'BOOK A FLIGHT', to: '/book' },
  { label: 'CONTACT US', to: '/#contact' },
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
      if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true })
      else window.scrollTo(0, 0)
    }
  }

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-400 nav-bar"
        style={{
          background: menuOpen
            ? 'rgba(255,255,255,1)'
            : scrolled ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,1)',
          backdropFilter: menuOpen ? 'none' : 'blur(10px)',
          WebkitBackdropFilter: menuOpen ? 'none' : 'blur(10px)',
          borderBottom: menuOpen ? 'none' : '1px solid rgba(0,0,0,0.06)',
          boxShadow: !menuOpen && scrolled ? '0 1px 24px rgba(0,0,0,0.07)' : 'none',
        }}
      >
        <div
          className="flex items-center justify-between h-full"
          style={{ paddingLeft: '2vw', paddingRight: '2vw' }}
        >
          <button
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="flex items-center justify-center bg-transparent border-none cursor-pointer p-0 z-10 relative"
            style={{ width: '32px', height: '32px' }}
          >
            <div className="nav-burger" data-open={menuOpen}>
              <span />
              <span />
              <span />
            </div>
          </button>

          <button
            onClick={() => { setMenuOpen(false); navigate('/') }}
            className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer bg-transparent border-none p-0"
          >
            <img
              src="/lmtlogo.svg"
              alt="LMT JETS"
              className="nav-logo"
            />
          </button>

          <button
            onClick={() => navigate('/book')}
            className="z-10 relative flex items-center gap-2 nav-book-btn"
            style={{
              fontFamily: 'Inter, sans-serif',
              letterSpacing: '0.5px',
              fontWeight: 500,
              borderRadius: '6px',
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
            <span className="nav-book-text">Book A Jet</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 16l-9-9-9 9"/>
              <path d="M3 12l4-4 2 2 4-4 2 2 4-4"/>
            </svg>
          </button>
        </div>
      </nav>

      <div
        className="nav-overlay"
        data-open={menuOpen}
        onClick={(e) => { if (e.target === e.currentTarget) setMenuOpen(false) }}
      >
        <div className="nav-overlay-content">
          <div className="nav-overlay-links">
            {navLinks.map((link, i) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.to)}
                className="nav-overlay-link"
                style={{ transitionDelay: menuOpen ? `${0.08 + i * 0.06}s` : '0s' }}
                data-open={menuOpen}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="nav-overlay-bottom" style={{ transitionDelay: menuOpen ? '0.5s' : '0s' }} data-open={menuOpen}>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '9px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: '#B8944F',
              marginBottom: '14px',
              fontWeight: 500,
            }}>
              24/7 Concierge
            </p>

            {[
              { href: 'tel:+18889292298', text: '+1 (888) 929-2298' },
              { href: 'https://wa.me/16464200679', text: 'WA: +1 (646) 420-0679' },
              { href: 'mailto:info@lmtjets.com', text: 'info@lmtjets.com' },
              { href: null, text: '120 Gazza Blvd, Farmingdale, NY 11735' },
            ].map(({ href, text }) => {
              const s = {
                fontFamily: 'Inter, sans-serif', fontSize: '12px',
                color: 'rgba(0,0,0,0.45)', display: 'block', marginBottom: '6px',
                textDecoration: 'none', lineHeight: 1.5, transition: 'color 0.2s',
              }
              return href ? (
                <a key={text} href={href} style={s}
                  onMouseEnter={e => e.currentTarget.style.color = '#B8944F'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(0,0,0,0.45)'}>
                  {text}
                </a>
              ) : (
                <span key={text} style={s}>{text}</span>
              )
            })}
          </div>
        </div>
      </div>

      <style>{`
        .nav-bar { height: 84px; }
        .nav-logo { height: 74px; width: auto; display: block; }
        .nav-book-btn { font-size: 13px; padding: 10px 24px; }
        .nav-book-text { }

        .nav-burger {
          width: 24px; height: 18px;
          position: relative; display: flex; flex-direction: column;
          justify-content: center; gap: 5px;
        }
        .nav-burger span {
          display: block; width: 100%; height: 2.5px;
          background: #142544; border-radius: 2px;
          transition: transform 0.35s cubic-bezier(0.77,0,0.18,1),
                      opacity 0.25s ease;
          transform-origin: center;
        }
        .nav-burger[data-open="true"] span:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }
        .nav-burger[data-open="true"] span:nth-child(2) {
          opacity: 0;
        }
        .nav-burger[data-open="true"] span:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }

        .nav-overlay {
          position: fixed; inset: 0; z-index: 49;
          background: rgba(255,255,255,0.97);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.4s cubic-bezier(0.4,0,0.2,1),
                      visibility 0s 0.4s;
          padding-top: 84px;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }
        .nav-overlay[data-open="true"] {
          opacity: 1;
          visibility: visible;
          transition: opacity 0.4s cubic-bezier(0.4,0,0.2,1),
                      visibility 0s 0s;
        }

        .nav-overlay-content {
          min-height: 100%; display: flex; flex-direction: column;
          justify-content: center; padding: 0 8vw 40px;
        }

        .nav-overlay-links {
          display: flex; flex-direction: column; gap: 6px;
        }

        .nav-overlay-link {
          font-family: Arial, sans-serif;
          font-size: clamp(28px, 4vw, 48px);
          font-weight: 400;
          color: #142544;
          text-transform: uppercase;
          letter-spacing: 2px;
          background: none; border: none; cursor: pointer;
          text-align: left; padding: 10px 0;
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.45s cubic-bezier(0.4,0,0.2,1),
                      transform 0.45s cubic-bezier(0.4,0,0.2,1),
                      color 0.2s ease;
        }
        .nav-overlay-link[data-open="true"] {
          opacity: 1;
          transform: translateY(0);
        }
        .nav-overlay-link:hover {
          color: #B8944F;
        }

        .nav-overlay-bottom {
          margin-top: 48px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.4s cubic-bezier(0.4,0,0.2,1),
                      transform 0.4s cubic-bezier(0.4,0,0.2,1);
        }
        .nav-overlay-bottom[data-open="true"] {
          opacity: 1;
          transform: translateY(0);
        }

        @media (max-width: 640px) {
          .nav-bar { height: 64px; }
          .nav-logo { height: 50px; }
          .nav-book-btn { font-size: 11px; padding: 8px 14px; }
          .nav-book-text { display: none; }
          .nav-overlay { padding-top: 64px; }
          .nav-overlay-content { padding: 8vh 6vw 40px; justify-content: flex-start; }
          .nav-overlay-link { font-size: 24px; letter-spacing: 1px; padding: 8px 0; }
          .nav-overlay-bottom { margin-top: 32px; }
        }
      `}</style>
    </>
  )
}
