/* Footer — light "above the clouds" design (matches Figma 252:8779).
   Cream base with a faint clouds layer and a runway image at the bottom; the
   footer content sits transparent on top with dark text and gold headings. */

import { useNavigate } from 'react-router-dom'

const GOLD = '#D2A567'
const INK = '#1C2330'

const col = { fontFamily: 'Inter, sans-serif', fontSize: '13px', letterSpacing: '5px', textTransform: 'uppercase', color: GOLD, fontWeight: 600, marginBottom: '18px', display: 'block' }
const lnk = { fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'rgba(28,35,48,0.78)', textDecoration: 'none', display: 'block', width: 'fit-content', maxWidth: '100%', marginBottom: '10px', letterSpacing: '0.3px', lineHeight: 1.5, transition: 'color 0.2s' }
const over = (e) => { e.currentTarget.style.color = INK }
const out = (e) => { e.currentTarget.style.color = 'rgba(28,35,48,0.78)' }

export default function Footer() {
  const navigate = useNavigate()
  // Smart nav: hash links scroll to the section (navigating home first if needed);
  // plain paths route normally. Mirrors the navbar behaviour.
  const go = (to) => (e) => {
    e.preventDefault()
    if (to.startsWith('/#')) {
      const id = to.slice(2)
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
    <footer className="site-footer" style={{ position: 'relative', overflow: 'hidden', background: '#FFF8ED', color: INK }}>
      {/* ── background layers ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: 'url(/footer-clouds.png)', backgroundSize: 'cover',
        backgroundPosition: 'center top', mixBlendMode: 'luminosity', opacity: 0.45, pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, height: '55%', zIndex: 0,
        backgroundImage: 'url(/footer-road.png)', backgroundSize: 'cover',
        backgroundPosition: 'center bottom', mixBlendMode: 'lighten', opacity: 0.7, pointerEvents: 'none',
      }} />

      {/* ── content ── */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ padding: '72px 5vw 48px' }}>
          <div className="footer-grid grid grid-cols-1 md:grid-cols-4 gap-12">

            {/* COL 1 — Logo + tagline + social */}
            <div>
              <img src="/lmtlogo.svg" alt="LMT JETS" style={{ height: '72px', marginBottom: '16px' }} />
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'rgba(28,35,48,0.7)', lineHeight: 1.6, maxWidth: '230px', marginBottom: '24px' }}>
                Private aviation designed around your schedule, your standards, and your destinations.
              </p>
            </div>

            {/* COL 2 — Quick Links */}
            <div>
              <span style={col}>Quick Links</span>
              {[
                { label: 'Fleet',         to: '/book' },
                { label: 'Why LMT',       to: '/#why-us' },
                { label: 'Services',      to: '/#services' },
                { label: 'Book a Flight', to: '/book' },
                { label: 'Contact Us',    to: '/#contact' },
              ].map(({ label, to }) => (
                <a key={label} href={to} onClick={go(to)} style={lnk} onMouseEnter={over} onMouseLeave={out}>{label}</a>
              ))}
            </div>

            {/* COL 3 — New York + France */}
            <div>
              <span style={col}>New York, USA</span>
              <a href="tel:+18889292298" style={lnk} onMouseEnter={over} onMouseLeave={out}>+1 (888) 929-2298</a>
              <a href="https://wa.me/16464200679" style={lnk} onMouseEnter={over} onMouseLeave={out}>WA: +1 (646) 420-0679</a>
              <span style={lnk}>120 Gazza Blvd, Farmingdale, NY 11735</span>

              <span style={{ ...col, marginTop: '24px' }}>France, Europe</span>
              <a href="tel:+33762675959" style={lnk} onMouseEnter={over} onMouseLeave={out}>+33 7 62 67 59 59</a>
              <span style={lnk}>25 Rue Victor Hugo, 94220 Charenton-le-Pont</span>
            </div>

            {/* COL 4 — Email + badges */}
            <div>
              <span style={col}>Email</span>
              <a href="mailto:info@lmtjets.com" style={lnk} onMouseEnter={over} onMouseLeave={out}>info@lmtjets.com</a>

              <div className="flex gap-6" style={{ marginTop: '36px' }}>
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center justify-center rounded-full" style={{ width: '40px', height: '40px', border: '1px solid rgba(184,148,79,0.6)' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.3" strokeLinecap="round"><path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z"/></svg>
                  </div>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(28,35,48,0.4)', textAlign: 'center', lineHeight: 1.4 }}>VIP<br/>HANDLING</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center justify-center rounded-full" style={{ width: '40px', height: '40px', border: '1px solid rgba(184,148,79,0.6)' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.3" strokeLinecap="round"><path d="M12 2l7 4v6c0 5-3.5 9.5-7 11-3.5-1.5-7-6-7-11V6z"/><polyline points="9 12 11 14 15 10"/></svg>
                  </div>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(28,35,48,0.4)', textAlign: 'center', lineHeight: 1.4 }}>ELITE SAFETY<br/>STANDARDS</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div style={{ borderTop: '1px solid rgba(28,35,48,0.14)', padding: '18px 5vw' }}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'rgba(28,35,48,0.7)', letterSpacing: '0.3px' }}>
              © 2026 LMT Jets — La Mondiale Tours LLC. All rights reserved.
            </p>
            <div className="flex gap-6">
              {['Privacy Policy', 'Terms of Service'].map(t => (
                <a key={t} href="#" style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'rgba(28,35,48,0.7)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = GOLD}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(28,35,48,0.7)'}>
                  {t}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 640px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
          .site-footer > div > div:first-child { padding: 48px 5vw 36px !important; }
        }
      `}</style>
    </footer>
  )
}
