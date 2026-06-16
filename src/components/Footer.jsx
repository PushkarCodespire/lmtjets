/* Footer — light "above the clouds" design (matches Figma 252:8779).
   Cream base with a faint clouds layer and a runway image at the bottom; the
   footer content sits transparent on top with dark text and gold headings. */

import { Link } from 'react-router-dom'

const GOLD = '#D2A567'
const INK = '#1C2330'

const socialLinks = [
  { label: 'Facebook',  href: 'https://www.facebook.com',  icon: <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg> },
  { label: 'Instagram', href: 'https://www.instagram.com', icon: <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg> },
  { label: 'LinkedIn',  href: 'https://www.linkedin.com',  icon: <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg> },
  { label: 'X',         href: 'https://x.com',            icon: <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
  { label: 'YouTube',   href: 'https://www.youtube.com',  icon: <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z"/></svg> },
]

const col = { fontFamily: 'Inter, sans-serif', fontSize: '13px', letterSpacing: '5px', textTransform: 'uppercase', color: GOLD, fontWeight: 600, marginBottom: '18px', display: 'block' }
const lnk = { fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'rgba(28,35,48,0.78)', textDecoration: 'none', display: 'block', marginBottom: '10px', letterSpacing: '0.3px', lineHeight: 1.5, transition: 'color 0.2s' }
const over = (e) => { e.currentTarget.style.color = INK }
const out = (e) => { e.currentTarget.style.color = 'rgba(28,35,48,0.78)' }

export default function Footer() {
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

            {/* COL 1 — Logo + tagline + social */}
            <div>
              <img src="/lmtlogo.svg" alt="LMT JETS" style={{ height: '72px', marginBottom: '16px' }} />
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'rgba(28,35,48,0.7)', lineHeight: 1.6, maxWidth: '230px', marginBottom: '24px' }}>
                Private aviation designed around your schedule, your standards, and your destinations.
              </p>
              <div className="flex items-center gap-2.5">
                {socialLinks.map(({ label, href, icon }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                    className="flex items-center justify-center rounded-full transition-all duration-200"
                    style={{ width: '30px', height: '30px', border: '1px solid rgba(28,35,48,0.18)', color: 'rgba(28,35,48,0.55)', textDecoration: 'none' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.color = GOLD }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(28,35,48,0.18)'; e.currentTarget.style.color = 'rgba(28,35,48,0.55)' }}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* COL 2 — Quick Links */}
            <div>
              <span style={col}>Quick Links</span>
              {[
                { label: 'Fleet',         to: '/#fleet' },
                { label: 'Why LMT',       to: '/#why-us' },
                { label: 'Services',      to: '/#services' },
                { label: 'Book a Flight', to: '/book' },
                { label: 'Contact Us',    to: '/#contact' },
              ].map(({ label, to }) => (
                <Link key={label} to={to} style={lnk} onMouseEnter={over} onMouseLeave={out}>{label}</Link>
              ))}
            </div>

            {/* COL 3 — Contact + badges */}
            <div>
              <span style={col}>Contact</span>
              <a href="tel:+18889292298" style={lnk} onMouseEnter={over} onMouseLeave={out}>+1 (888) 929-2298</a>
              <a href="https://wa.me/16464200679" style={lnk} onMouseEnter={over} onMouseLeave={out}>WA: +1 (646) 420-0679</a>
              <a href="mailto:info@lmtjets.com" style={lnk} onMouseEnter={over} onMouseLeave={out}>info@lmtjets.com</a>
              <span style={lnk}>120 Gazza Blvd, Farmingdale, NY 11735</span>

              <div className="flex gap-6 mt-6">
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
              © 2024 LMT Jets — La Mondiale Tours LLC. All rights reserved.
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
        @media (max-width: 640px) {
          .site-footer .grid { gap: 36px !important; }
          .site-footer > div > div:first-child { padding: 48px 5vw 36px !important; }
        }
      `}</style>
    </footer>
  )
}
