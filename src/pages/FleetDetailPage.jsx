import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fleet } from '../data/fleet.js'
import RangeMap from '../components/RangeMap.jsx'
import MissionCalculator from '../components/MissionCalculator.jsx'

const navy = '#142544'
const gold = '#B8944F'
const cream = '#F7F5F1'

export default function FleetDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const aircraft = fleet.find(a => a.id === id)
  const [gIdx, setGIdx] = useState(0)

  if (!aircraft) {
    return (
      <div style={{ minHeight: '100vh', background: navy, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: 'rgba(255,255,255,0.60)', marginBottom: '16px', fontFamily: 'Inter' }}>Aircraft not found.</p>
          <button onClick={() => navigate('/fleet')} style={{ color: gold, fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'Inter' }}>
            ← Back to Fleet
          </button>
        </div>
      </div>
    )
  }

  const specs = [
    { label: 'Passenger Capacity', value: `Up to ${aircraft.passengers} Passengers*`, sub: '+1 Cabin Crew' },
    { label: 'Range',              value: `${aircraft.range.toLocaleString()} NM`,     sub: aircraft.category },
    { label: 'Max Cruising Speed', value: `${aircraft.speed} KNOTS`,                    sub: `Mach ${(aircraft.speed / 661.5).toFixed(3)}` },
    { label: 'Max Operating Altitude', value: `${aircraft.altitude.toLocaleString()} FT`, sub: '' },
    { label: 'Baggage Capacity',   value: `${aircraft.baggage} FT³`,                    sub: '' },
    { label: 'Endurance',          value: `Up to ${aircraft.endurance} HRS`,            sub: '(Standard Crew)' },
  ]

  const specIcons = {
    'Passenger Capacity': '👤',
    'Range': '↔',
    'Max Cruising Speed': '✈',
    'Max Operating Altitude': '▲',
    'Baggage Capacity': '🧳',
    'Endurance': '⏱',
  }

  return (
    <div style={{ backgroundColor: cream, color: navy, minHeight: '100vh' }}>

      {/* ── 1. HERO — full screen like homepage ── */}
      <section style={{ position: 'relative', height: '100vh', minHeight: '600px', backgroundColor: navy, overflow: 'hidden' }}>
        {aircraft.heroVideo ? (
          <video
            autoPlay loop muted playsInline
            poster={aircraft.image}
            style={{
              position: 'absolute',
              top: 0, left: 0,
              width: '100%', height: '100%',
              objectFit: 'cover',
              objectPosition: 'center center',
              display: 'block',
              transform: 'scale(1.04)',
              transformOrigin: 'center center',
              opacity: 0.85,
            }}
          >
            <source src={aircraft.heroVideo} type="video/mp4" />
          </video>
        ) : (
          <img src={aircraft.image} alt={aircraft.name}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
            onError={(e) => { e.currentTarget.src = '/hero-bg.png' }} />
        )}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,21,45,0.95) 0%, rgba(8,21,45,0.50) 50%, rgba(8,21,45,0.20) 100%)' }} />

        <div style={{ position: 'relative', zIndex: 2, height: '100%', padding: '120px 48px 96px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', maxWidth: '720px' }}>
          <p style={{ fontFamily: 'Inter', fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', color: gold, marginBottom: '14px' }}>
            {aircraft.category}
          </p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(40px, 5.5vw, 78px)', fontWeight: 500, color: '#FFFFFF', lineHeight: 1.0, marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '-0.5px' }}>
            {aircraft.name}
          </h1>
          <p style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 300, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, marginBottom: '36px', maxWidth: '420px' }}>
            {aircraft.tagline} Crafted to take you farther.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button onClick={() => navigate(`/book?aircraft=${aircraft.id}`)} style={{ fontFamily: 'Inter', fontSize: '10px', letterSpacing: '2.5px', textTransform: 'uppercase', fontWeight: 600, background: gold, color: navy, border: 'none', padding: '14px 28px', cursor: 'pointer' }}>
              Book This Aircraft
            </button>
            <button onClick={() => navigate('/#contact')} style={{ fontFamily: 'Inter', fontSize: '10px', letterSpacing: '2.5px', textTransform: 'uppercase', fontWeight: 500, background: 'transparent', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.40)', padding: '14px 28px', cursor: 'pointer' }}>
              Request Quote
            </button>
          </div>
        </div>
      </section>

      {/* ── 2. STORY + SPECS ── */}
      <section style={{ padding: '80px 48px', maxWidth: '1320px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '64px', alignItems: 'start' }} className="detail-grid">
          {/* Story */}
          <div>
            <p style={{ fontFamily: 'Inter', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: gold, marginBottom: '20px' }}>
              Exclusively at LMT
            </p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 500, color: navy, lineHeight: 1.05, marginBottom: '24px', whiteSpace: 'pre-line' }}>
              {aircraft.storyline}
            </h2>
            <p style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 300, color: '#555', lineHeight: 1.75, marginBottom: '32px' }}>
              {aircraft.storyDesc}
            </p>
            <a onClick={() => navigate('/#contact')} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: 'Inter', fontSize: '10px', letterSpacing: '2.5px', textTransform: 'uppercase', color: gold, cursor: 'pointer', textDecoration: 'none' }}>
              Inquire Now →
            </a>
          </div>

          {/* Specs table */}
          <div>
            {specs.map(s => (
              <div key={s.label} style={{ display: 'flex', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid rgba(8,21,45,0.08)', gap: '20px' }}>
                <div style={{ width: '40px', height: '40px', flexShrink: 0, borderRadius: '50%', border: `1px solid ${gold}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: gold, fontSize: '14px' }}>
                  {specIcons[s.label]}
                </div>
                <div style={{ flex: 1, fontFamily: 'Inter', fontSize: '10px', letterSpacing: '2.5px', textTransform: 'uppercase', color: '#666', fontWeight: 500 }}>
                  {s.label}
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: navy, marginBottom: '2px' }}>{s.value}</p>
                  {s.sub && <p style={{ fontFamily: 'Inter', fontSize: '11px', color: '#999', fontWeight: 300 }}>{s.sub}</p>}
                </div>
              </div>
            ))}
            <p style={{ fontFamily: 'Inter', fontSize: '10px', color: '#999', marginTop: '16px', fontStyle: 'italic' }}>
              *Based on cabin configuration.
            </p>
          </div>
        </div>
      </section>

      {/* ── 3. CABIN DIMENSIONS + AMENITIES ── */}
      <section style={{ padding: '40px 48px 80px', maxWidth: '1320px', margin: '0 auto', borderTop: '1px solid rgba(8,21,45,0.08)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '64px' }} className="detail-grid">
          {/* Cabin dims */}
          <div style={{ paddingTop: '40px' }}>
            <p style={{ fontFamily: 'Inter', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: gold, marginBottom: '20px' }}>
              Cabin Dimensions & Configurations
            </p>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(28px, 3vw, 38px)', fontWeight: 500, color: navy, lineHeight: 1.1, marginBottom: '36px' }}>
              Space designed<br />around you.
            </h3>

            {/* Cabin floorplan placeholder */}
            <div style={{ background: '#FFFFFF', border: '1px solid rgba(8,21,45,0.10)', padding: '28px', position: 'relative' }}>
              <p style={{ fontFamily: 'Inter', fontSize: '11px', color: '#999', letterSpacing: '1px', marginBottom: '20px' }}>
                DAY VIEW
              </p>
              <div style={{ height: '110px', background: 'linear-gradient(180deg, #F5F0E8 0%, #E8DEC9 100%)', borderRadius: '60px / 30px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '0 30px' }}>
                {Array.from({ length: aircraft.passengers > 12 ? 8 : Math.min(aircraft.passengers, 6) }).map((_, i) => (
                  <div key={i} style={{ width: '18px', height: '14px', background: '#B8944F', borderRadius: '3px' }} />
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '14px', fontFamily: 'Inter', fontSize: '10px', color: '#777', letterSpacing: '1px' }}>
                <span>← {aircraft.cabinLength} FT {Math.round((aircraft.cabinLength % 1) * 12)} IN →</span>
                <span>{aircraft.cabinHeight} FT {Math.round((aircraft.cabinHeight % 1) * 12)} IN ↕</span>
              </div>
            </div>
          </div>

          {/* Amenities box */}
          <div style={{ background: '#FFFFFF', border: '1px solid rgba(8,21,45,0.08)', padding: '32px', marginTop: '40px' }}>
            <p style={{ fontFamily: 'Inter', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: navy, fontWeight: 600, marginBottom: '8px' }}>
              Cabin Amenities
            </p>
            <div style={{ width: '32px', height: '2px', backgroundColor: gold, marginBottom: '24px' }} />
            {aircraft.amenities.map(a => (
              <div key={a} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '11px 0', borderBottom: '1px solid rgba(8,21,45,0.06)' }}>
                <span style={{ color: gold, fontSize: '14px' }}>✓</span>
                <span style={{ fontFamily: 'Inter', fontSize: '13px', color: navy, fontWeight: 400 }}>{a}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. CABIN GALLERY ── */}
      <section style={{ padding: '80px 48px', maxWidth: '1320px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '32px' }}>
          <p style={{ fontFamily: 'Inter', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: navy, fontWeight: 600 }}>
            Discover the {aircraft.name.split(' ').slice(-1)[0]}
          </p>
          <a style={{ fontFamily: 'Inter', fontSize: '10px', letterSpacing: '2.5px', textTransform: 'uppercase', color: gold, cursor: 'pointer' }}>
            View Gallery →
          </a>
        </div>

        <div style={{ position: 'relative' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }} className="gallery-grid">
            {aircraft.gallery.slice(0, 4).map((src, i) => (
              <div key={i} style={{ aspectRatio: '4/3', overflow: 'hidden', cursor: 'pointer' }}>
                <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. MISSION CALCULATOR — dynamic ── */}
      <MissionCalculator aircraft={aircraft} />

      {/* ── 6. GLOBAL REACH ── */}
      <section style={{ padding: '64px 48px', background: '#E8E4DD' }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '48px', alignItems: 'center' }} className="detail-grid">
          <div>
            <p style={{ fontFamily: 'Inter', fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', color: navy, fontWeight: 600, marginBottom: '16px' }}>
              Global Without Compromise
            </p>
            <p style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 300, color: '#555', lineHeight: 1.7, marginBottom: '20px' }}>
              The {aircraft.name} offers one of the longest ranges in business aviation — connecting you to over 5,000 airports in more than 190 countries.
            </p>
            <a style={{ fontFamily: 'Inter', fontSize: '10px', letterSpacing: '2.5px', textTransform: 'uppercase', color: gold, cursor: 'pointer' }}>
              View Range Map →
            </a>
          </div>
          <RangeMap range={aircraft.range} aircraftName={aircraft.name} />
        </div>
      </section>

      {/* ── 7. SAFETY ── */}
      <section style={{ position: 'relative', minHeight: '320px', background: navy, color: '#FFFFFF', overflow: 'hidden' }}>
        <img src="https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=1600&q=85" alt=""
          style={{ position: 'absolute', right: 0, top: 0, width: '50%', height: '100%', objectFit: 'cover', opacity: 0.4 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(8,21,45,0.95) 30%, rgba(8,21,45,0.40) 100%)' }} />

        <div style={{ position: 'relative', zIndex: 2, padding: '64px 48px', maxWidth: '1320px', margin: '0 auto' }}>
          <p style={{ fontFamily: 'Inter', fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', marginBottom: '14px' }}>
            Safety Is Our Standard
          </p>
          <p style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 300, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, maxWidth: '500px', marginBottom: '24px' }}>
            With more than 150 aircraft in service, the {aircraft.name} family is among the most trusted ultra long-range aircraft in the sky.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '440px' }}>
            {[
              'Enhanced vision systems for safer landings',
              'Dual auto-brake system for optimal stopping',
              'Predictive landing performance for maximum safety',
              'Advanced flight deck & data protection',
            ].map(t => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontFamily: 'Inter', fontSize: '13px', color: 'rgba(255,255,255,0.80)' }}>
                <span style={{ color: gold }}>✓</span> {t}
              </div>
            ))}
          </div>
          <a style={{ display: 'inline-flex', marginTop: '24px', fontFamily: 'Inter', fontSize: '10px', letterSpacing: '2.5px', textTransform: 'uppercase', color: gold, cursor: 'pointer' }}>
            Learn More About Our Safety Standards →
          </a>
        </div>
      </section>

      {/* ── 8. CTA ── */}
      <section style={{ padding: '80px 48px', textAlign: 'center', background: cream }}>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 500, color: navy, letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '32px' }}>
          Let's Take the Next Step
        </h3>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <button onClick={() => navigate('/#contact')} style={{ background: gold, color: '#FFFFFF', border: 'none', padding: '14px 32px', fontFamily: 'Inter', fontSize: '10px', letterSpacing: '2.5px', textTransform: 'uppercase', fontWeight: 600, cursor: 'pointer' }}>
            Contact Us
          </button>
          <button style={{ background: 'transparent', color: navy, border: `1px solid ${navy}40`, padding: '14px 32px', fontFamily: 'Inter', fontSize: '10px', letterSpacing: '2.5px', textTransform: 'uppercase', fontWeight: 500, cursor: 'pointer' }}>
            {aircraft.name} Brochure
          </button>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .detail-grid { grid-template-columns: 1fr !important; }
          .mission-grid { grid-template-columns: 1fr !important; }
          .gallery-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  )
}
