import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fleet } from '../data/fleet.js'

const CARDS_PER_PAGE = 4

export default function FleetSection() {
  const [page, setPage] = useState(0)
  const navigate = useNavigate()

  const totalPages = Math.ceil(fleet.length / CARDS_PER_PAGE)
  const visible = fleet.slice(page * CARDS_PER_PAGE, page * CARDS_PER_PAGE + CARDS_PER_PAGE)

  const [animKey, setAnimKey] = useState(0)

  const prev = () => {
    setAnimKey(k => k + 1)
    setPage(p => (p - 1 + totalPages) % totalPages)
  }
  const next = () => {
    setAnimKey(k => k + 1)
    setPage(p => (p + 1) % totalPages)
  }

  return (
    <section id="fleet" style={{ backgroundColor: '#142544', padding: '96px 48px' }}>

      {/* Centered heading */}
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <p style={{
          fontFamily: 'Inter, sans-serif', fontSize: '10px',
          letterSpacing: '4px', textTransform: 'uppercase',
          color: '#B8944F', marginBottom: '18px',
        }}>
          Our Aircraft
        </p>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 'clamp(40px, 5vw, 64px)',
          fontWeight: 500, color: '#FFFFFF',
          letterSpacing: '6px', textTransform: 'uppercase',
          marginBottom: '16px',
        }}>
          Our Fleet
        </h2>
        <p style={{
          fontFamily: 'Inter, sans-serif', fontSize: '13px',
          fontWeight: 300, color: 'rgba(255,255,255,0.55)',
        }}>
          From light jets to ultra-long-range — find your perfect aircraft.
        </p>
      </div>

      {/* Carousel with arrows */}
      <div style={{ position: 'relative', maxWidth: '1400px', margin: '0 auto' }}>

        {totalPages > 1 && (
          <>
            <button
              onClick={prev}
              className="fleet-arrow fleet-arrow-prev"
              style={{
                position: 'absolute', left: '-60px', top: '40%',
                transform: 'translateY(-50%)',
                width: '44px', height: '44px',
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.25)',
                background: 'transparent',
                color: 'rgba(255,255,255,0.60)',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.3s',
                zIndex: 5,
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#B8944F'; e.currentTarget.style.color = '#B8944F' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.color = 'rgba(255,255,255,0.60)' }}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="10 3 5 8 10 13" />
              </svg>
            </button>
            <button
              onClick={next}
              className="fleet-arrow fleet-arrow-next"
              style={{
                position: 'absolute', right: '-60px', top: '40%',
                transform: 'translateY(-50%)',
                width: '44px', height: '44px',
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.25)',
                background: 'transparent',
                color: 'rgba(255,255,255,0.60)',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.3s',
                zIndex: 5,
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#B8944F'; e.currentTarget.style.color = '#B8944F' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.color = 'rgba(255,255,255,0.60)' }}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="6 3 11 8 6 13" />
              </svg>
            </button>
          </>
        )}

        {/* 4-card grid — re-mounts on page change to trigger flip animation */}
        <div
          key={animKey}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '20px',
            perspective: '1200px',
          }}
        >
          {visible.map(aircraft => (
            <div
              key={aircraft.id}
              onClick={() => navigate(`/fleet/${aircraft.id}`)}
              className="fleet-card-flip"
              style={{
                background: '#0D1B38',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '4px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'border-color 0.3s, box-shadow 0.3s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(184,148,79,0.40)'
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(184,148,79,0.15)'
                const vid = e.currentTarget.querySelector('video')
                if (vid) { vid.style.opacity = '1'; vid.currentTime = 0; vid.play().catch(()=>{}) }
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                e.currentTarget.style.boxShadow = 'none'
                const vid = e.currentTarget.querySelector('video')
                if (vid) { vid.style.opacity = '0'; vid.pause() }
              }}
            >
              {/* Image + Video overlay (video appears on hover) */}
              <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '4/3' }}>
                <img
                  src={aircraft.image}
                  alt={aircraft.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }}
                  onError={(e) => { e.currentTarget.src = '/hero-bg.png' }}
                />
                {aircraft.heroVideo && (
                  <video
                    muted loop playsInline preload="metadata"
                    style={{
                      width: '100%', height: '100%',
                      objectFit: 'cover',
                      position: 'absolute', inset: 0,
                      opacity: 0,
                      transition: 'opacity 0.5s ease',
                      pointerEvents: 'none',
                    }}
                  >
                    <source src={aircraft.heroVideo} type="video/mp4" />
                  </video>
                )}
              </div>
              <div style={{ padding: '20px' }}>
                <p style={{
                  fontFamily: 'Inter, sans-serif', fontSize: '9px',
                  letterSpacing: '3px', textTransform: 'uppercase',
                  color: '#B8944F', marginBottom: '6px',
                }}>
                  {aircraft.category}
                </p>
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: '20px', fontWeight: 500,
                  color: '#FFFFFF', marginBottom: '14px',
                  textTransform: 'uppercase', letterSpacing: '1px',
                  fontVariantNumeric: 'lining-nums',
                  fontFeatureSettings: '"lnum" 1, "tnum" 1',
                }}>
                  {aircraft.name}
                </h3>
                <div style={{
                  display: 'flex', gap: '14px',
                  fontFamily: 'Inter, sans-serif', fontSize: '11px',
                  color: 'rgba(255,255,255,0.50)',
                  paddingBottom: '14px',
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                }}>
                  <span>👤 {aircraft.passengers} Passengers</span>
                  <span>↔ {aircraft.range} NM Range</span>
                </div>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  marginTop: '14px',
                  fontFamily: 'Inter, sans-serif', fontSize: '10px',
                  letterSpacing: '2px', textTransform: 'uppercase',
                  color: '#B8944F',
                }}>
                  View Aircraft <span>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      {totalPages > 1 && (
        <div style={{
          display: 'flex', justifyContent: 'center', gap: '6px',
          marginTop: '40px',
        }}>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              style={{
                width: i === page ? '24px' : '6px', height: '3px',
                background: i === page ? '#B8944F' : 'rgba(255,255,255,0.25)',
                border: 'none', cursor: 'pointer',
                transition: 'all 0.3s', padding: 0, borderRadius: '2px',
              }}
            />
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .fleet-arrow { display: none !important; }
        }
      `}</style>
    </section>
  )
}
