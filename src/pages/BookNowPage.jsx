import { useState, useMemo, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { fleet } from '../data/fleet.js'
import QuoteForm from '../components/QuoteForm.jsx'

const navy = '#142544'
const gold = '#B8944F'

export default function BookNowPage() {
  const [params] = useSearchParams()
  const [from, setFrom] = useState(params.get('from') || '')
  const [to, setTo] = useState(params.get('to') || '')
  const [date, setDate] = useState('')
  const [pax] = useState(1)
  const [sortBy, setSortBy] = useState('Recommended')
  const [showForm, setShowForm] = useState(params.get('quote') === '1')
  const [formClosing, setFormClosing] = useState(false)

  // Aircraft can be deep-linked by id (e.g. from the Fleet Detail page); map it
  // to the name the QuoteForm's select expects so it pre-selects correctly.
  const aircraftName = fleet.find(a => a.id === params.get('aircraft'))?.name || ''

  const closeForm = () => {
    setFormClosing(true)
    setTimeout(() => { setShowForm(false); setFormClosing(false) }, 600)
  }

  // Filter fleet by passenger capacity, then sort
  const results = useMemo(() => {
    const filtered = fleet.filter(a => a.passengers >= pax)
    if (sortBy === 'Range')      return [...filtered].sort((a, b) => b.range - a.range)
    if (sortBy === 'Passengers') return [...filtered].sort((a, b) => b.passengers - a.passengers)
    return filtered
  }, [pax, sortBy])

  return (
    <div style={{ backgroundColor: '#FFF8ED', minHeight: '100vh' }}>

      {/* ═══════════ HERO ═══════════ */}
      <section style={{ position: 'relative', minHeight: '600px', overflow: 'hidden' }}>
        <img
          src="/hero-bg.png"
          alt="Private jet at sunset"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1920&q=90' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(8,21,45,0.92) 0%, rgba(8,21,45,0.45) 60%, rgba(8,21,45,0.20) 100%)',
        }} />

        <div style={{ position: 'relative', zIndex: 2, padding: '140px 48px 48px', maxWidth: '1400px', margin: '0 auto' }}>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: '11px',
            letterSpacing: '4px', textTransform: 'uppercase',
            color: gold, marginBottom: '20px', fontWeight: 600,
          }}>
            Book Your Flight
          </p>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(48px, 6vw, 86px)',
            fontWeight: 500, color: '#FFFFFF',
            lineHeight: 0.95, letterSpacing: '-1px',
            textTransform: 'uppercase', marginBottom: '24px',
            maxWidth: '600px',
          }}>
            Find Your<br />Perfect Jet
          </h1>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: '14px',
            fontWeight: 300, color: 'rgba(255,255,255,0.70)',
            lineHeight: 1.7, marginBottom: '36px',
            maxWidth: '440px',
          }}>
            Instant quotes. 90-minute confirmation.<br />Worldwide coverage.
          </p>
          <button
            onClick={() => setShowForm(true)}
            style={{
              background: gold, color: '#FFFFFF', border: 'none',
              padding: '16px 44px', fontFamily: 'Inter, sans-serif', fontSize: '11px',
              letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 600,
              cursor: 'pointer', borderRadius: '8px', transition: 'background 0.3s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#A6833E'}
            onMouseLeave={e => e.currentTarget.style.background = gold}
          >
            Request a Quote
          </button>
        </div>

      </section>

      {/* ═══════════ FULLSCREEN QUOTE OVERLAY ═══════════ */}
      {showForm && (
        <div
          className="quote-overlay"
          style={{
            position: 'fixed', inset: 0, zIndex: 999,
            background: 'rgba(255,248,237,0.97)',
            backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            overflowY: 'auto',
            animation: formClosing
              ? 'quoteSlideDown 0.6s cubic-bezier(0.7, 0, 0.84, 0) both'
              : 'quoteSlideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both',
          }}
        >
          <button
            onClick={closeForm}
            aria-label="Close"
            style={{
              position: 'fixed', top: '28px', right: '32px', zIndex: 1000,
              background: 'none', border: 'none', cursor: 'pointer',
              color: navy, fontSize: '28px', lineHeight: 1,
              width: '44px', height: '44px', display: 'grid', placeItems: 'center',
              borderRadius: '50%', transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(20,37,68,0.08)'}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}
          >
            ✕
          </button>
          <QuoteForm defaults={{ from, to, date, passengers: pax, aircraft: aircraftName }} onClose={closeForm} />
        </div>
      )}

      {/* ═══════════ RESULTS ═══════════ */}
      <section id="results" style={{ backgroundColor: '#FFF8ED', padding: '64px 48px', maxWidth: '1400px', margin: '0 auto' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '36px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: '10px',
              letterSpacing: '4px', textTransform: 'uppercase',
              color: gold, marginBottom: '12px', fontWeight: 600,
            }}>
              Charter Fleet
            </p>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(28px, 3vw, 38px)',
              fontWeight: 500, color: navy,
            }}>
              {results.length} aircraft available
            </h2>
          </div>

          {/* Sort dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'rgba(20,37,68,0.55)', letterSpacing: '1px' }}>Sort by</span>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}
              style={{
                background: 'rgba(20,37,68,0.04)',
                border: '1px solid rgba(20,37,68,0.18)',
                color: navy,
                padding: '8px 28px 8px 14px',
                fontFamily: 'Inter, sans-serif', fontSize: '12px',
                borderRadius: '4px', cursor: 'pointer', outline: 'none',
                appearance: 'none',
                backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10' fill='none' stroke='%23B8944F' stroke-width='1.5'><polyline points='2 4 5 7 8 4'/></svg>")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 10px center',
              }}>
              <option style={{ background: '#FFF8ED' }}>Recommended</option>
              <option style={{ background: '#FFF8ED' }}>Range</option>
              <option style={{ background: '#FFF8ED' }}>Passengers</option>
            </select>
          </div>
        </div>

        {/* Aircraft cards */}
        {results.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'rgba(20,37,68,0.50)' }}>
            <p style={{ fontFamily: 'Inter', fontSize: '14px' }}>No aircraft match your passenger count. Try fewer passengers.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {results.map(a => (
              <AircraftCard key={a.id} aircraft={a} />
            ))}
          </div>
        )}
      </section>

      <style>{`
        @keyframes quoteSlideUp {
          from { transform: translateY(100%); }
          to   { transform: translateY(0);    }
        }
        @keyframes quoteSlideDown {
          from { transform: translateY(0);    }
          to   { transform: translateY(100%); }
        }
        @media (max-width: 700px) {
          .ac-card { grid-template-columns: 1fr !important; }
          .ac-img { aspect-ratio: 16/9 !important; }
          .ac-specs { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  )
}

/* ───────── Sub-components ───────── */

const inputBase = {
  width: '100%',
  background: 'transparent',
  border: 'none',
  fontFamily: 'Inter, sans-serif',
  fontSize: '15px',
  color: navy,
  fontWeight: 500,
  outline: 'none',
  padding: '6px 0 8px',
  borderBottom: '1px solid rgba(0,0,0,0.12)',
}

function SearchField({ label, icon, children }) {
  return (
    <div>
      <p style={{
        fontFamily: 'Inter, sans-serif', fontSize: '10px',
        letterSpacing: '2.5px', textTransform: 'uppercase',
        color: navy, fontWeight: 600, marginBottom: '4px',
      }}>
        {label}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ color: gold, flexShrink: 0 }}>{icon}</span>
        <div style={{ flex: 1 }}>{children}</div>
      </div>
    </div>
  )
}

function AircraftCard({ aircraft }) {
  const cardRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: '0px 0px -80px 0px', threshold: 0.05 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const specs = [
    { icon: <PaxIcon size={16} />, value: `Up to ${aircraft.passengers}`, label: 'Passengers' },
    { icon: <RangeIcon />, value: `${aircraft.range.toLocaleString()} NM`, label: 'Range' },
    { icon: <SpeedIcon />, value: `${aircraft.speed} kts`, label: 'Cruise Speed' },
    ...(aircraft.sleepingCapacity ? [{ icon: <BedIcon />, value: `Up to ${aircraft.sleepingCapacity}`, label: 'Sleeping' }] : []),
    { icon: <BagIcon />, value: `${aircraft.baggage} ft³`, label: 'Baggage' },
    { icon: <WifiIcon />, value: aircraft.wifiType || 'Wi-Fi', label: 'Connectivity' },
  ]
  return (
    <div ref={cardRef} style={{
      background: '#FFFFFF',
      borderRadius: '8px', overflow: 'hidden',
      display: 'grid', gridTemplateColumns: '320px 1fr',
      transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s',
      boxShadow: '0 2px 12px rgba(20,37,68,0.08)',
      transform: visible ? 'translateY(0)' : 'translateY(60px)',
    }} className="ac-card"
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 28px rgba(20,37,68,0.14)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = '0 2px 12px rgba(20,37,68,0.08)'}>

      {/* IMAGE */}
      <div style={{ overflow: 'hidden' }} className="ac-img">
        <img src={aircraft.image} alt={aircraft.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(e) => { e.currentTarget.src = '/hero-bg.png' }} />
      </div>

      {/* DETAILS */}
      <div style={{ padding: '26px 30px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <p style={{
          fontFamily: 'Inter, sans-serif', fontSize: '10px',
          letterSpacing: '2.5px', textTransform: 'uppercase',
          color: gold, fontWeight: 600, marginBottom: '6px',
        }}>
          {aircraft.category}
        </p>
        <h3 style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: '26px', fontWeight: 500, color: navy,
          textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px',
        }}>
          {aircraft.name}
        </h3>
        <p style={{
          fontFamily: 'Inter, sans-serif', fontSize: '13px',
          color: '#666', fontWeight: 300, lineHeight: 1.6, marginBottom: '22px', maxWidth: '660px',
        }}>
          {aircraft.description}
        </p>

        {/* Specs grid */}
        <div className="ac-specs" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '16px 24px', marginBottom: '22px' }}>
          {specs.map(s => <SpecItem key={s.label} icon={s.icon} value={s.value} label={s.label} />)}
        </div>

        {/* Amenities */}
        <div style={{
          display: 'flex', gap: '8px 18px', flexWrap: 'wrap', alignItems: 'center',
          fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#666',
        }}>
          {aircraft.amenities.slice(0, 6).map(a => (
            <span key={a} style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
              <span style={{ color: gold, fontSize: '9px' }}>●</span>
              {a}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function SpecItem({ icon, value, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <span style={{ color: gold }}>{icon}</span>
      <div>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: navy, fontWeight: 600, lineHeight: 1.2 }}>{value}</p>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', color: '#999', letterSpacing: '0.5px' }}>{label}</p>
      </div>
    </div>
  )
}

function FilterChip({ icon, children }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'rgba(20,37,68,0.55)' }}>
      <span style={{ color: gold }}>{icon}</span>
      {children}
    </span>
  )
}

/* ───────── Icons ───────── */
const PinIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
)
const CalIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <rect x="3" y="5" width="18" height="16" rx="2"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
    <line x1="8" y1="3" x2="8" y2="7"/>
    <line x1="16" y1="3" x2="16" y2="7"/>
  </svg>
)
const PaxIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <circle cx="12" cy="8" r="4"/>
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
  </svg>
)
const RangeIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <polyline points="3 21 9 15 12 18 21 9"/>
    <polyline points="14 9 21 9 21 16"/>
  </svg>
)
const SpeedIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/>
    <polyline points="12 7 12 12 15 14"/>
  </svg>
)
const BedIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
    <path d="M7 10V8a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"/>
  </svg>
)
const BagIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <rect x="5" y="8" width="14" height="12" rx="2"/>
    <path d="M9 8V6a3 3 0 0 1 6 0v2"/>
  </svg>
)
const WifiIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <path d="M5 12.5a10 10 0 0 1 14 0"/>
    <path d="M8.5 16a5 5 0 0 1 7 0"/>
    <circle cx="12" cy="19" r="0.8" fill="currentColor"/>
  </svg>
)
