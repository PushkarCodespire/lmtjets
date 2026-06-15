import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { fleet } from '../data/fleet.js'

const navy = '#142544'
const gold = '#B8944F'

// Hourly rate map by category — based on real-world industry charter rates
const HOURLY_RATES = {
  'Super Midsize':     { rate: 6500,  amenities: ['WiFi', 'Lavatory', 'Catering', 'Stand-up Cabin'] },
  'Heavy Jet':         { rate: 8500,  amenities: ['WiFi', 'Lavatory', 'Catering', 'Three Living Zones'] },
  'Ultra Long Range':  { rate: 12500, amenities: ['Ka-band WiFi', 'Crew Rest', 'Full Galley', 'Private Stateroom'] },
}

export default function BookNowPage() {
  const navigate = useNavigate()
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [date, setDate] = useState('')
  const [pax, setPax] = useState(1)
  const [searched, setSearched] = useState(false)
  const [sortBy, setSortBy] = useState('Recommended')

  // Filter fleet by passenger capacity, then sort
  const results = useMemo(() => {
    const filtered = fleet.filter(a => a.passengers >= pax)
    const enriched = filtered.map(a => {
      const cat = HOURLY_RATES[a.category] || HOURLY_RATES['Midsize Jet']
      const total = Math.round(cat.rate * 2.0) // 2 hour estimate
      return { ...a, hourly: cat.rate, estimatedTotal: total, amenitiesShown: cat.amenities }
    })
    if (sortBy === 'Price (Low)')  return [...enriched].sort((a, b) => a.hourly - b.hourly)
    if (sortBy === 'Price (High)') return [...enriched].sort((a, b) => b.hourly - a.hourly)
    if (sortBy === 'Range')        return [...enriched].sort((a, b) => b.range - a.range)
    return enriched
  }, [pax, sortBy])

  const handleSearch = () => {
    setSearched(true)
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

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
        </div>

        {/* ─── Search bar ─── */}
        <div style={{
          position: 'relative', zIndex: 3,
          maxWidth: '1400px', margin: '0 auto',
          padding: '0 48px 40px',
        }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: '8px',
            padding: '20px 24px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr auto',
            gap: '20px',
            alignItems: 'end',
            boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
          }} className="search-bar">

            {/* FROM */}
            <SearchField label="From" icon={<PinIcon />}>
              <input
                type="text" value={from} onChange={e => setFrom(e.target.value)}
                placeholder="New York, NY"
                style={inputBase}
              />
            </SearchField>

            {/* TO */}
            <SearchField label="To" icon={<PinIcon />}>
              <input
                type="text" value={to} onChange={e => setTo(e.target.value)}
                placeholder="Miami, FL"
                style={inputBase}
              />
            </SearchField>

            {/* DATE */}
            <SearchField label="Date" icon={<CalIcon />}>
              <input
                type="text" value={date} onChange={e => setDate(e.target.value)}
                onFocus={e => e.target.type = 'date'}
                onBlur={e => { if (!e.target.value) e.target.type = 'text' }}
                placeholder="dd-mm-yyyy"
                style={inputBase}
              />
            </SearchField>

            {/* PASSENGERS */}
            <SearchField label="Passengers" icon={<PaxIcon />}>
              <select value={pax} onChange={e => setPax(Number(e.target.value))}
                style={{ ...inputBase, appearance: 'none', cursor: 'pointer' }}>
                {Array.from({ length: 19 }, (_, i) => i + 1).map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </SearchField>

            {/* SEARCH BUTTON */}
            <button
              onClick={handleSearch}
              style={{
                background: gold, color: '#FFFFFF', border: 'none',
                padding: '20px 36px',
                fontFamily: 'Inter, sans-serif', fontSize: '11px',
                letterSpacing: '2.5px', textTransform: 'uppercase', fontWeight: 600,
                cursor: 'pointer', borderRadius: '4px',
                transition: 'background 0.3s', whiteSpace: 'nowrap',
                height: '60px',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#D7B26A'}
              onMouseLeave={e => e.currentTarget.style.background = gold}>
              Search Jets →
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════ RESULTS ═══════════ */}
      <section id="results" style={{ backgroundColor: '#FFF8ED', padding: '64px 48px', maxWidth: '1400px', margin: '0 auto' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '36px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: '10px',
              letterSpacing: '4px', textTransform: 'uppercase',
              color: gold, marginBottom: '12px', fontWeight: 600,
            }}>
              Available Aircraft For Your Journey
            </p>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(28px, 3vw, 38px)',
              fontWeight: 500, color: navy, marginBottom: '12px',
            }}>
              We found {results.length} available aircraft
            </h2>
            {/* Filter summary */}
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'rgba(20,37,68,0.55)' }}>
              <FilterChip icon={<PaxIcon size={12} />}>From <strong style={{ color: navy }}>{from || 'New York, NY'}</strong></FilterChip>
              <FilterChip icon={<PinIcon size={12} />}>To <strong style={{ color: navy }}>{to || 'Miami, FL'}</strong></FilterChip>
              <FilterChip icon={<CalIcon size={12} />}>On <strong style={{ color: navy }}>{date || 'dd-mm-yyyy'}</strong></FilterChip>
              <FilterChip icon={<PaxIcon size={12} />}><strong style={{ color: navy }}>{pax} Passenger{pax > 1 ? 's' : ''}</strong></FilterChip>
            </div>
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
              <option style={{ background: '#FFF8ED' }}>Price (Low)</option>
              <option style={{ background: '#FFF8ED' }}>Price (High)</option>
              <option style={{ background: '#FFF8ED' }}>Range</option>
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
              <AircraftCard key={a.id} aircraft={a} onClick={() => navigate(`/fleet/${a.id}`)} />
            ))}
          </div>
        )}

        {/* Disclaimer */}
        <p style={{
          textAlign: 'center', marginTop: '40px',
          fontFamily: 'Inter, sans-serif', fontSize: '11px',
          color: 'rgba(20,37,68,0.40)', fontStyle: 'italic',
        }}>
          *Pricing is an estimate and may vary based on availability, routing, and aircraft positioning.
        </p>
      </section>

      <style>{`
        @media (max-width: 1100px) {
          .search-bar { grid-template-columns: 1fr 1fr !important; }
          .search-bar button { grid-column: 1 / -1 !important; }
        }
        @media (max-width: 700px) {
          .search-bar { grid-template-columns: 1fr !important; }
          .ac-card { grid-template-columns: 1fr !important; }
          .ac-img { aspect-ratio: 16/9 !important; }
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

function AircraftCard({ aircraft, onClick }) {
  return (
    <div style={{
      background: '#FFFFFF',
      borderRadius: '6px', overflow: 'hidden',
      display: 'grid', gridTemplateColumns: '300px 1fr 240px',
      transition: 'all 0.3s',
      boxShadow: '0 2px 12px rgba(20,37,68,0.08)',
    }} className="ac-card"
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 28px rgba(20,37,68,0.14)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = '0 2px 12px rgba(20,37,68,0.08)'}>

      {/* IMAGE */}
      <div style={{ overflow: 'hidden', aspectRatio: '4/3' }} className="ac-img">
        <img src={aircraft.image} alt={aircraft.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(e) => { e.currentTarget.src = '/hero-bg.png' }} />
      </div>

      {/* MIDDLE — Details */}
      <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h3 style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: '26px', fontWeight: 500, color: navy,
          textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px',
        }}>
          {aircraft.name}
        </h3>
        <p style={{
          fontFamily: 'Inter, sans-serif', fontSize: '10px',
          letterSpacing: '2.5px', textTransform: 'uppercase',
          color: gold, fontWeight: 600, marginBottom: '20px',
        }}>
          {aircraft.category}
        </p>

        {/* Specs row */}
        <div style={{ display: 'flex', gap: '32px', marginBottom: '18px', flexWrap: 'wrap' }}>
          <SpecItem icon={<PaxIcon size={16} />} value={aircraft.passengers} label="Passengers" />
          <SpecItem icon={<RangeIcon />} value={`${aircraft.range.toLocaleString()} NM`} label="Range" />
          <SpecItem icon={<SpeedIcon />} value={`${aircraft.speed} mph`} label="Cruise Speed" />
        </div>

        {/* Amenities */}
        <div style={{
          display: 'flex', gap: '4px', flexWrap: 'wrap', alignItems: 'center',
          fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#666',
        }}>
          {aircraft.amenitiesShown.map((a, i) => (
            <span key={a} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: gold, fontSize: '10px' }}>●</span>
              {a}
              {i < aircraft.amenitiesShown.length - 1 && <span style={{ width: '4px' }} />}
            </span>
          ))}
        </div>
      </div>

      {/* RIGHT — Price + actions */}
      <div style={{
        padding: '24px 24px', borderLeft: `1px solid ${navy}10`,
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
      }}>
        <p style={{
          fontFamily: 'Inter, sans-serif', fontSize: '9px',
          letterSpacing: '2.5px', textTransform: 'uppercase',
          color: '#999', marginBottom: '4px',
        }}>
          Starting From
        </p>
        <p style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: '32px', fontWeight: 500, color: navy,
          lineHeight: 1, marginBottom: '4px',
        }}>
          ${aircraft.hourly.toLocaleString()}<span style={{ fontFamily: 'Inter', fontSize: '12px', color: '#666', marginLeft: '4px' }}>/ HR</span>
        </p>
        <p style={{
          fontFamily: 'Inter, sans-serif', fontSize: '11px',
          color: '#999', marginBottom: '18px',
        }}>
          Estimated Total: ${aircraft.estimatedTotal.toLocaleString()}*
        </p>
        <button onClick={onClick}
          style={{
            background: gold, color: '#FFFFFF', border: 'none',
            padding: '12px 18px',
            fontFamily: 'Inter, sans-serif', fontSize: '10px',
            letterSpacing: '2.5px', textTransform: 'uppercase', fontWeight: 600,
            cursor: 'pointer', borderRadius: '3px', marginBottom: '8px',
            transition: 'background 0.3s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#D7B26A'}
          onMouseLeave={e => e.currentTarget.style.background = gold}>
          View Aircraft
        </button>
        <button
          style={{
            background: 'transparent', color: navy,
            border: `1px solid ${navy}30`,
            padding: '12px 18px',
            fontFamily: 'Inter, sans-serif', fontSize: '10px',
            letterSpacing: '2.5px', textTransform: 'uppercase', fontWeight: 500,
            cursor: 'pointer', borderRadius: '3px',
            transition: 'all 0.3s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = navy; e.currentTarget.style.color = '#FFFFFF' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = navy }}>
          Request Quote
        </button>
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
