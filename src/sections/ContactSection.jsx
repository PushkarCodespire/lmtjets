/* ContactSection — "Get In Touch" (matches Figma 252:8778).
   Cream background, contact rows with action links, address, and a jet-interior
   image on the right. */

import RiseUp from '../components/RiseUp.jsx'

const NAVY = '#142544'
const GOLD = '#B8944F'
const CREAM = '#FFF8ED'

const ROWS = [
  {
    label: 'Call us', value: '+1 (888) 929-2298', action: 'Call now', href: 'tel:+18889292298',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={NAVY} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp', value: '+1 (646) 420-0679', action: 'Chat now', href: 'https://wa.me/16464200679',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={NAVY} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
      </svg>
    ),
  },
  {
    label: 'Enquire', value: 'Send us a message', action: 'Send enquiry', href: 'mailto:info@lmtjets.com',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={NAVY} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 6-10 7L2 6" />
      </svg>
    ),
  },
]

export default function ContactSection() {
  return (
    <section id="contact" style={{ background: CREAM, padding: '110px 5vw 120px' }}>
      <div className="contact-grid" style={{
        display: 'grid', gridTemplateColumns: '1fr 0.82fr', gap: '5vw', alignItems: 'center',
      }}>
        {/* LEFT — heading + rows + address */}
        <div>
          <RiseUp>
            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 500,
              letterSpacing: '5px', textTransform: 'uppercase', color: GOLD, margin: 0,
            }}>
              Reach Us
            </p>
            <h2 style={{
              fontFamily: 'Arial, sans-serif', fontSize: 'clamp(28px, 3vw, 44px)',
              fontWeight: 400, color: NAVY, margin: '16px 0 14px', lineHeight: 1.05,
            }}>
              Get In Touch
            </h2>
            <div style={{ width: '48px', height: '2.4px', backgroundColor: GOLD }} />
            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 300,
              color: '#666666', margin: '24px 0 30px',
            }}>
              Available 24 hours a day, 7 days a week.
            </p>
          </RiseUp>

          {ROWS.map((r) => (
            <RiseUp key={r.label}>
            <a
              href={r.href}
              target={r.href.startsWith('http') ? '_blank' : undefined}
              rel={r.href.startsWith('http') ? 'noreferrer' : undefined}
              className="contact-row"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '26px 0', borderTop: '1px solid rgba(20,37,68,0.08)',
                textDecoration: 'none',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '26px' }}>
                <span style={{
                  width: '54px', height: '54px', borderRadius: '999px', flexShrink: 0,
                  border: '1px solid rgba(184,148,79,0.31)',
                  display: 'grid', placeItems: 'center',
                }}>
                  {r.icon}
                </span>
                <span>
                  <span style={{
                    display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '11px',
                    fontWeight: 400, letterSpacing: '2.4px', textTransform: 'uppercase',
                    color: '#999999', marginBottom: '5px',
                  }}>
                    {r.label}
                  </span>
                  <span style={{
                    display: 'block', fontFamily: 'Arial, sans-serif', fontSize: '21px',
                    color: NAVY, lineHeight: 1.2,
                  }}>
                    {r.value}
                  </span>
                </span>
              </span>
              <span className="contact-action" style={{
                fontFamily: 'Inter, sans-serif', fontSize: '11.5px', fontWeight: 600,
                letterSpacing: '3.25px', textTransform: 'uppercase', color: GOLD,
                whiteSpace: 'nowrap',
              }}>
                {r.action} →
              </span>
            </a>
            </RiseUp>
          ))}

          {/* address */}
          <div style={{ borderTop: '1px solid rgba(20,37,68,0.08)', paddingTop: '36px', marginTop: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '13px', marginBottom: '10px' }}>
              <svg width="11" height="16" viewBox="0 0 24 24" fill={GOLD}>
                <path d="M12 2a8 8 0 0 0-8 8c0 5.4 8 12 8 12s8-6.6 8-12a8 8 0 0 0-8-8Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
              </svg>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#666666' }}>
                120 Gazza Blvd, Farmingdale, NY 11735 — Republic Airport (FRG)
              </span>
            </div>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#666666', paddingLeft: '24px' }}>
              info@lmtjets.com
            </span>
          </div>
        </div>

        {/* RIGHT — jet interior image */}
        <RiseUp>
          <div style={{ borderRadius: '14px', overflow: 'hidden', aspectRatio: '659 / 685' }}>
            <img
              src="/contact-jet.png"
              alt="Private jet interior"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </RiseUp>
      </div>

      <style>{`
        .contact-row .contact-action { transition: letter-spacing 0.3s, color 0.3s; }
        .contact-row:hover .contact-action { color: ${NAVY}; }
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
        @media (max-width: 640px) {
          #contact { padding: 64px 5vw 72px !important; }
          .contact-row { flex-direction: column !important; align-items: flex-start !important; gap: 12px !important; padding: 20px 0 !important; }
          .contact-row .contact-action { padding-left: 80px; }
        }
      `}</style>
    </section>
  )
}
