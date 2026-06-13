/* MissionCalculator.jsx
   Dynamic flight mission planner.
   - City autocomplete from a 40-airport database
   - Great-circle distance (haversine) in NM
   - Duration = NM / aircraft cruise speed (converted to knots)
   - Animated counters on result
*/

import { useState, useEffect, useMemo } from 'react'

const navy = '#142544'
const gold = '#B8944F'

/* ── 40 major airports (lat/lng) ── */
const AIRPORTS = [
  { code: 'JFK', city: 'New York',         country: 'USA',     lat: 40.6413,  lng: -73.7781 },
  { code: 'LAX', city: 'Los Angeles',      country: 'USA',     lat: 33.9416,  lng: -118.4085 },
  { code: 'MIA', city: 'Miami',            country: 'USA',     lat: 25.7959,  lng: -80.2870 },
  { code: 'ORD', city: 'Chicago',          country: 'USA',     lat: 41.9742,  lng: -87.9073 },
  { code: 'SFO', city: 'San Francisco',    country: 'USA',     lat: 37.6213,  lng: -122.3790 },
  { code: 'IAH', city: 'Houston',          country: 'USA',     lat: 29.9902,  lng: -95.3368 },
  { code: 'BOS', city: 'Boston',           country: 'USA',     lat: 42.3656,  lng: -71.0096 },
  { code: 'LAS', city: 'Las Vegas',        country: 'USA',     lat: 36.0840,  lng: -115.1537 },
  { code: 'DEN', city: 'Denver',           country: 'USA',     lat: 39.8561,  lng: -104.6737 },
  { code: 'ATL', city: 'Atlanta',          country: 'USA',     lat: 33.6407,  lng: -84.4277 },
  { code: 'FRG', city: 'Farmingdale',      country: 'USA',     lat: 40.7288,  lng: -73.4134 },
  { code: 'YYZ', city: 'Toronto',          country: 'Canada',  lat: 43.6777,  lng: -79.6248 },
  { code: 'MEX', city: 'Mexico City',      country: 'Mexico',  lat: 19.4361,  lng: -99.0719 },
  { code: 'GRU', city: 'São Paulo',        country: 'Brazil',  lat: -23.4356, lng: -46.4731 },
  { code: 'GIG', city: 'Rio de Janeiro',   country: 'Brazil',  lat: -22.8089, lng: -43.2436 },
  { code: 'EZE', city: 'Buenos Aires',     country: 'Argentina',lat: -34.8222,lng: -58.5358 },
  { code: 'LHR', city: 'London',           country: 'UK',      lat: 51.4700,  lng: -0.4543 },
  { code: 'CDG', city: 'Paris',            country: 'France',  lat: 49.0097,  lng: 2.5479 },
  { code: 'FRA', city: 'Frankfurt',        country: 'Germany', lat: 50.0379,  lng: 8.5622 },
  { code: 'AMS', city: 'Amsterdam',        country: 'Netherlands', lat: 52.3105, lng: 4.7683 },
  { code: 'ZRH', city: 'Zurich',           country: 'Switzerland', lat: 47.4647, lng: 8.5492 },
  { code: 'MAD', city: 'Madrid',           country: 'Spain',   lat: 40.4983,  lng: -3.5676 },
  { code: 'FCO', city: 'Rome',             country: 'Italy',   lat: 41.8003,  lng: 12.2389 },
  { code: 'IST', city: 'Istanbul',         country: 'Turkey',  lat: 41.2753,  lng: 28.7519 },
  { code: 'DXB', city: 'Dubai',            country: 'UAE',     lat: 25.2532,  lng: 55.3657 },
  { code: 'DOH', city: 'Doha',             country: 'Qatar',   lat: 25.2731,  lng: 51.6080 },
  { code: 'BOM', city: 'Mumbai',           country: 'India',   lat: 19.0896,  lng: 72.8656 },
  { code: 'DEL', city: 'Delhi',            country: 'India',   lat: 28.5562,  lng: 77.1000 },
  { code: 'BKK', city: 'Bangkok',          country: 'Thailand',lat: 13.6900,  lng: 100.7501 },
  { code: 'SIN', city: 'Singapore',        country: 'Singapore',lat: 1.3644,  lng: 103.9915 },
  { code: 'HKG', city: 'Hong Kong',        country: 'Hong Kong',lat: 22.3080, lng: 113.9185 },
  { code: 'PEK', city: 'Beijing',          country: 'China',   lat: 40.0799,  lng: 116.6031 },
  { code: 'PVG', city: 'Shanghai',         country: 'China',   lat: 31.1443,  lng: 121.8083 },
  { code: 'ICN', city: 'Seoul',            country: 'South Korea',lat: 37.4602,lng: 126.4407 },
  { code: 'HND', city: 'Tokyo',            country: 'Japan',   lat: 35.5494,  lng: 139.7798 },
  { code: 'SYD', city: 'Sydney',           country: 'Australia',lat: -33.9399,lng: 151.1753 },
  { code: 'MEL', city: 'Melbourne',        country: 'Australia',lat: -37.6690,lng: 144.8410 },
  { code: 'CPT', city: 'Cape Town',        country: 'South Africa',lat: -33.9648,lng: 18.6017 },
  { code: 'JNB', city: 'Johannesburg',     country: 'South Africa',lat: -26.1392,lng: 28.2460 },
  { code: 'NBO', city: 'Nairobi',          country: 'Kenya',   lat: -1.3192,  lng: 36.9278 },
]

/* ── Haversine — great-circle distance in nautical miles ── */
function distanceNM(lat1, lng1, lat2, lng2) {
  const R = 3440.065 // Earth's radius in NM
  const toRad = d => d * Math.PI / 180
  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)
  const a = Math.sin(dLat/2) ** 2 +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLng/2) ** 2
  return Math.round(2 * R * Math.asin(Math.sqrt(a)))
}

/* ── Autocomplete dropdown input ── */
function CityField({ label, value, onChange, onSelect, suggestions, placeholder }) {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ position: 'relative' }}>
      <p style={{
        fontFamily: 'Inter, sans-serif', fontSize: '9px',
        letterSpacing: '2px', color: 'rgba(255,255,255,0.50)',
        marginBottom: '6px', textTransform: 'uppercase',
      }}>
        {label}
      </p>
      <input
        type="text"
        value={value}
        onChange={e => { onChange(e.target.value); setOpen(true) }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 200)}
        placeholder={placeholder}
        style={{
          background: 'transparent', border: 'none',
          borderBottom: '1px solid rgba(255,255,255,0.30)',
          color: '#FFFFFF', padding: '6px 0',
          width: '100%', outline: 'none',
          fontFamily: 'Inter, sans-serif', fontSize: '14px',
        }}
      />
      {open && suggestions.length > 0 && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0,
          background: '#FFFFFF', color: navy,
          marginTop: '4px', borderRadius: '4px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
          maxHeight: '240px', overflowY: 'auto',
          zIndex: 20,
        }}>
          {suggestions.slice(0, 6).map(a => (
            <div key={a.code}
              onMouseDown={e => { e.preventDefault(); onSelect(a) }}
              style={{
                padding: '10px 14px',
                cursor: 'pointer',
                borderBottom: '1px solid rgba(0,0,0,0.06)',
                fontFamily: 'Inter, sans-serif', fontSize: '13px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(184,148,79,0.08)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <div>
                <strong style={{ color: navy }}>{a.city}</strong>
                <span style={{ color: '#999', marginLeft: '8px', fontSize: '11px' }}>{a.country}</span>
              </div>
              <span style={{ color: gold, fontFamily: 'monospace', fontSize: '11px', fontWeight: 700 }}>{a.code}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ── Animated counter ── */
function AnimatedNumber({ value, duration = 800 }) {
  const [display, setDisplay] = useState(0)
  useEffect(() => {
    if (value === 0) { setDisplay(0); return }
    const start = display
    const t0 = performance.now()
    let raf
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / duration)
      const eased = 1 - Math.pow(1 - p, 3)  // ease-out cubic
      setDisplay(Math.round(start + (value - start) * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])
  return display.toLocaleString()
}

/* ── MAIN ── */
export default function MissionCalculator({ aircraft }) {
  const [fromQuery, setFromQuery] = useState('')
  const [toQuery,   setToQuery]   = useState('')
  const [from,      setFrom]      = useState(null)
  const [to,        setTo]        = useState(null)
  const [calc,      setCalc]      = useState({ nm: 0, hrs: 0, mins: 0 })
  const [error,     setError]     = useState('')

  const fromSuggestions = useMemo(() => {
    const q = fromQuery.toLowerCase().trim()
    if (!q) return AIRPORTS.slice(0, 6)
    return AIRPORTS.filter(a =>
      a.city.toLowerCase().includes(q) ||
      a.code.toLowerCase().includes(q) ||
      a.country.toLowerCase().includes(q)
    )
  }, [fromQuery])

  const toSuggestions = useMemo(() => {
    const q = toQuery.toLowerCase().trim()
    if (!q) return AIRPORTS.slice(0, 6)
    return AIRPORTS.filter(a =>
      a.city.toLowerCase().includes(q) ||
      a.code.toLowerCase().includes(q) ||
      a.country.toLowerCase().includes(q)
    )
  }, [toQuery])

  const handleSelectFrom = (a) => { setFrom(a); setFromQuery(`${a.city} (${a.code})`) }
  const handleSelectTo   = (a) => { setTo(a);   setToQuery(`${a.city} (${a.code})`) }

  const calculate = () => {
    setError('')
    if (!from || !to) { setError('Please select both departure and arrival airports.'); return }
    if (from.code === to.code) { setError('Departure and arrival must be different.'); return }

    const nm = distanceNM(from.lat, from.lng, to.lat, to.lng)

    // Aircraft speed stored as mph — convert to knots (1 kt = 1.15078 mph)
    const knots = aircraft.speed / 1.15078
    const totalHours = nm / knots
    const hrs = Math.floor(totalHours)
    const mins = Math.round((totalHours - hrs) * 60)

    // Range check
    if (nm > aircraft.range) {
      setError(`Route is ${nm.toLocaleString()} NM — exceeds the ${aircraft.name}'s ${aircraft.range.toLocaleString()} NM range. Consider a fuel stop.`)
    }

    setCalc({ nm, hrs, mins })
  }

  const withinRange = calc.nm > 0 && calc.nm <= aircraft.range

  return (
    <section style={{ padding: '60px 48px', background: '#7A7064', color: '#FFFFFF' }}>
      <div style={{
        maxWidth: '1320px', margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1.3fr 1fr 1fr', gap: '40px',
        alignItems: 'start',
      }} className="mission-grid">

        {/* LEFT — Inputs */}
        <div>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: '10px',
            letterSpacing: '4px', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.70)', marginBottom: '20px', fontWeight: 600,
          }}>
            Consider Your Mission
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <CityField
              label="Departure"
              value={fromQuery}
              onChange={setFromQuery}
              onSelect={handleSelectFrom}
              suggestions={fromSuggestions}
              placeholder="Search city or code"
            />
            <CityField
              label="Arrival"
              value={toQuery}
              onChange={setToQuery}
              onSelect={handleSelectTo}
              suggestions={toSuggestions}
              placeholder="Search city or code"
            />
          </div>

          <button
            onClick={calculate}
            style={{
              background: '#FFFFFF', color: navy, border: 'none',
              borderRadius: '50px', padding: '10px 28px',
              fontFamily: 'Inter, sans-serif', fontSize: '10px',
              letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600,
              cursor: 'pointer', transition: 'transform 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
            Calculate
          </button>

          {error && (
            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: '11px',
              color: '#FFD27F', marginTop: '16px', maxWidth: '420px', lineHeight: 1.5,
            }}>
              ⚠ {error}
            </p>
          )}
          {!error && (
            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: '9px',
              color: 'rgba(255,255,255,0.50)', marginTop: '18px',
            }}>
              *Values are estimates based on great-circle distance and {Math.round(aircraft.speed/1.15078)} knots cruise speed.
            </p>
          )}
        </div>

        {/* CENTER — Jet icon */}
        <div style={{ textAlign: 'center', alignSelf: 'center' }}>
          <svg width="120" height="60" viewBox="0 0 100 50"
               fill="rgba(255,255,255,0.30)"
               style={{
                 transform: withinRange ? 'translateX(0)' : 'translateX(0)',
                 transition: 'transform 0.5s',
               }}>
            <path d="M50 4 L55 18 L95 26 L95 30 L55 32 L52 46 L60 50 L60 52 L40 52 L40 50 L48 46 L45 32 L5 30 L5 26 L45 18 Z"/>
          </svg>
          {withinRange && (
            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: '10px',
              letterSpacing: '2px', color: gold, marginTop: '8px',
            }}>
              ✓ Within Range
            </p>
          )}
        </div>

        {/* RIGHT — Results */}
        <div style={{ background: '#FFFFFF', padding: '20px 24px', color: navy }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            paddingBottom: '14px', borderBottom: '1px solid rgba(8,21,45,0.10)',
          }}>
            <span style={{
              fontFamily: 'Inter, sans-serif', fontSize: '10px',
              letterSpacing: '2px', color: '#777',
            }}>
              DISTANCE
            </span>
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '28px', fontWeight: 500,
              fontVariantNumeric: 'lining-nums',
            }}>
              <AnimatedNumber value={calc.nm} />
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#999', marginLeft: '4px' }}>NM</span>
            </span>
          </div>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            paddingTop: '14px', gap: '20px',
          }}>
            <span style={{
              fontFamily: 'Inter, sans-serif', fontSize: '10px',
              letterSpacing: '2px', color: '#777',
            }}>
              DURATION
            </span>
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '28px', fontWeight: 500,
              fontVariantNumeric: 'lining-nums',
            }}>
              <AnimatedNumber value={calc.hrs} />
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#999', margin: '0 8px 0 4px' }}>HRS</span>
              <AnimatedNumber value={calc.mins} />
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#999', marginLeft: '4px' }}>MIN</span>
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .mission-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
