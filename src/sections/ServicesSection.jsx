import { useNavigate } from 'react-router-dom'

const navy = '#142544'
const gold = '#B8944F'
const cream = '#FFF8ED'

const services = [
  {
    num: '01',
    title: 'On-Demand Charter',
    desc: 'Book any aircraft on your schedule, worldwide. Total flexibility with no commitments.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
        <circle cx="16" cy="16" r="13"/>
        <line x1="3" y1="16" x2="29" y2="16"/>
        <path d="M16 3a18 18 0 0 1 5 13 18 18 0 0 1-5 13 18 18 0 0 1-5-13 18 18 0 0 1 5-13z"/>
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Jet Card Programme',
    desc: "Pre-paid flight hours with guaranteed availability. Lock in today's rates.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
        <rect x="3" y="7" width="26" height="18" rx="2"/>
        <line x1="3" y1="13" x2="29" y2="13"/>
        <line x1="7" y1="20" x2="11" y2="20"/>
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Group & Event Charters',
    desc: 'Sports teams, entertainment, large groups travel handled with precision.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
        <circle cx="10" cy="11" r="4"/>
        <circle cx="22" cy="11" r="4"/>
        <path d="M2 26c0-4 3-7 8-7s8 3 8 7"/>
        <path d="M14 26c0-4 3-7 8-7s8 3 8 7"/>
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Empty Leg Deals',
    desc: 'Discounted repositioning flights for flexible travelers seeking premium value.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
        <path d="M20 4l8 8-16 16H4v-8z"/>
        <line x1="14" y1="10" x2="22" y2="18"/>
        <circle cx="22" cy="10" r="1.5" fill="currentColor"/>
      </svg>
    ),
  },
  {
    num: '05',
    title: 'Ground Transport',
    desc: 'Seamless door-to-door luxury ground connections coordinated by your concierge.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
        <path d="M5 21V14l3-7h16l3 7v7"/>
        <line x1="2" y1="21" x2="30" y2="21"/>
        <circle cx="9" cy="24" r="2.5"/>
        <circle cx="23" cy="24" r="2.5"/>
      </svg>
    ),
  },
  {
    num: '06',
    title: 'Aircraft Management',
    desc: 'We manage your aircraft with full transparency, maximizing value and reliability.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
        <path d="M16 3l10 5v8c0 7-5 13-10 16-5-3-10-9-10-16V8z"/>
        <polyline points="12 16 15 19 21 13"/>
      </svg>
    ),
  },
]

export default function ServicesSection() {
  const navigate = useNavigate()
  return (
    <section id="services" style={{ backgroundColor: cream, padding: '96px 5vw' }}>
      <div style={{
        display: 'grid', gridTemplateColumns: '0.7fr 2fr', gap: '60px',
      }} className="services-grid">

        {/* LEFT — Heading */}
        <div>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: '10px',
            letterSpacing: '4px', textTransform: 'uppercase',
            color: gold, marginBottom: '18px', fontWeight: 500,
          }}>
            What We Offer
          </p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(36px, 4vw, 52px)',
            fontWeight: 500, color: navy,
            lineHeight: 1.05, marginBottom: '18px',
          }}>
            Our Services
          </h2>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: '13px',
            color: '#666', fontWeight: 300, lineHeight: 1.7,
            marginBottom: '26px', maxWidth: '260px',
          }}>
            From takeoff to touchdown, every detail is managed with precision so you can focus on what matters most.
          </p>
          <div style={{ width: '40px', height: '2px', backgroundColor: gold, marginBottom: '30px' }} />
          <button
            onClick={() => navigate('/#contact')}
            style={{
              fontFamily: 'Inter, sans-serif', fontSize: '10px',
              letterSpacing: '2.5px', textTransform: 'uppercase', fontWeight: 500,
              background: 'transparent', color: navy,
              border: `1px solid ${navy}30`,
              padding: '13px 26px', cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              transition: 'all 0.3s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = navy; e.currentTarget.style.color = '#FFFFFF' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = navy }}
          >
            Explore All Services →
          </button>
        </div>

        {/* RIGHT — Services grid 2x3 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '0',
        }} className="services-inner-grid">
          {services.map((s, i) => (
            <div key={s.num} style={{
              display: 'flex', alignItems: 'flex-start', gap: '24px',
              padding: '32px 24px',
              borderTop: i >= 2 ? `1px solid ${navy}10` : 'none',
              borderRight: i % 2 === 0 ? `1px solid ${navy}10` : 'none',
              cursor: 'pointer',
              transition: 'background 0.3s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(184,148,79,0.05)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              <div style={{ color: gold, flexShrink: 0, marginTop: '4px' }}>
                {s.icon}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{
                  fontFamily: 'Inter, sans-serif', fontSize: '10px',
                  letterSpacing: '2px', color: gold, marginBottom: '8px', fontWeight: 600,
                }}>
                  {s.num}
                </p>
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: '22px', fontWeight: 500,
                  color: navy, marginBottom: '8px',
                }}>
                  {s.title}
                </h3>
                <p style={{
                  fontFamily: 'Inter, sans-serif', fontSize: '12px',
                  color: '#666', fontWeight: 300, lineHeight: 1.6,
                }}>
                  {s.desc}
                </p>
              </div>
              <span style={{
                color: `${navy}40`, fontSize: '16px', flexShrink: 0,
                transition: 'all 0.3s', alignSelf: 'center',
              }}>→</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .services-grid { grid-template-columns: 1fr !important; }
          .services-inner-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
