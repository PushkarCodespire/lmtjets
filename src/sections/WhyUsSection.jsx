/* WhyUsSection — "Why fly with LMT Jets?" (matches the Figma 252:8367).
   Cream background continuous with the jet section above (#FFF8ED), with a
   cream → navy gradient at the bottom so it blends smoothly into the navy
   Fleet section instead of cutting hard. */

const NAVY = '#142544'
const GOLD = '#B8944F'
const CREAM = '#FFF8ED'

const ICON = {
  // person — VIP concierge
  concierge: (
    <svg width="30" height="30" viewBox="0 0 29.5 29.5" fill="none">
      <path d="M9.48 8.14a3.67 3.67 0 1 0 7.34 0 3.67 3.67 0 0 0-7.34 0Z" stroke={GOLD} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M4.92 22.4c0-3.67 3.3-6.42 7.33-6.42s7.33 2.75 7.33 6.42" stroke={GOLD} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  // shield + check — safety first
  safety: (
    <svg width="30" height="30" viewBox="0 0 29.5 29.5" fill="none">
      <path d="M14.48 2.56l8 3.62v5.43c0 4.52-4 8.6-8 9.95-4-1.35-8-5.43-8-9.95V6.18l8-3.62" stroke={GOLD} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M11.48 11.39l1.84 1.84 3.66-3.67" stroke={GOLD} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  // clock — 24/7 response
  response: (
    <svg width="30" height="30" viewBox="0 0 23 23" fill="none">
      <path d="M2.46 11.63a9.17 9.17 0 1 0 18.33 0 9.17 9.17 0 0 0-18.33 0Z" stroke={GOLD} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M10.48 7.65v5.5l3.67 1.83" stroke={GOLD} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  // globe — global reach
  global: (
    <svg width="30" height="30" viewBox="0 0 23 23" fill="none">
      <path d="M2.46 11.63a9.17 9.17 0 1 0 18.34 0 9.17 9.17 0 0 0-18.34 0Z" stroke={GOLD} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M2.48 12.74h18.34" stroke={GOLD} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M11.15 2.74c2.29 2.51 3.6 5.77 3.67 9.16-.07 3.4-1.38 6.66-3.67 9.17-2.29-2.51-3.6-5.77-3.67-9.17.07-3.39 1.38-6.65 3.67-9.16Z" stroke={GOLD} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
}

const benefits = [
  { icon: ICON.concierge, title: 'VIP Concierge', desc: 'From booking to landing, your personal concierge manages every detail.' },
  { icon: ICON.safety, title: 'Safety First', desc: 'Every aircraft vetted to the highest international standards.' },
  { icon: ICON.response, title: '24/7 Response', desc: 'Enquiries are now confirmed quotes within 90 minutes.' },
  { icon: ICON.global, title: 'Global Reach', desc: 'Access 5,000+ airports in over 190 countries.' },
]

export default function WhyUsSection() {
  return (
    <section
      id="why-us"
      style={{
        position: 'relative',
        background: CREAM,
        paddingTop: '120px',
      }}
    >
      <div
        className="why-grid"
        style={{
          padding: '0 5vw',
          display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '5vw',
          alignItems: 'center',
        }}
      >
        {/* LEFT — heading + benefits + button */}
        <div>
          <h2 style={{
            fontFamily: 'Arial, sans-serif',
            fontSize: 'clamp(30px, 3.3vw, 54px)',
            fontWeight: 400, color: NAVY,
            lineHeight: 1.05, letterSpacing: '0.02em',
            textTransform: 'uppercase', margin: 0,
          }}>
            Why Fly With<br />LMT Jets?
          </h2>

          <div style={{ width: '64px', height: '3px', backgroundColor: GOLD, margin: '18px 0 44px' }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '34px', marginBottom: '44px' }}>
            {benefits.map((b) => (
              <div key={b.title} style={{ display: 'flex', alignItems: 'flex-start', gap: '26px' }}>
                <span style={{ flexShrink: 0, marginTop: '2px', display: 'flex' }}>{b.icon}</span>
                <div>
                  <p style={{
                    fontFamily: 'Inter, sans-serif', fontSize: '13px',
                    fontWeight: 600, letterSpacing: '2.2px',
                    textTransform: 'uppercase', color: NAVY, margin: '0 0 7px',
                  }}>
                    {b.title}
                  </p>
                  <p style={{
                    fontFamily: 'Inter, sans-serif', fontSize: '15px',
                    fontWeight: 300, color: '#666666', lineHeight: 1.55, margin: 0,
                    maxWidth: '480px',
                  }}>
                    {b.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* LEARN MORE button */}
          <button
            style={{
              fontFamily: 'Inter, sans-serif', fontSize: '12px',
              letterSpacing: '2.8px', textTransform: 'uppercase', fontWeight: 500,
              background: '#D2A567', color: '#FFFFFF', border: '1px solid #D2A567',
              padding: '15px 38px', cursor: 'pointer', transition: 'background 0.3s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#C2924F' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#D2A567' }}
          >
            Learn More
          </button>
        </div>

        {/* RIGHT — rounded clouds image */}
        <div style={{ borderRadius: '16px', overflow: 'hidden', aspectRatio: '7 / 5' }}>
          <img
            src="/why-clouds.png"
            alt="Above the clouds"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>

      <div className="why-spacer" style={{ height: '120px' }} />

      <style>{`
        @media (max-width: 900px) {
          .why-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
        @media (max-width: 640px) {
          #why-us { padding-top: 48px !important; }
          #why-us .why-grid { padding: 0 5vw !important; gap: 32px !important; }
          #why-us h2 { font-size: clamp(26px, 7vw, 36px) !important; }
          .why-spacer { height: 48px !important; }
        }
      `}</style>
    </section>
  )
}
