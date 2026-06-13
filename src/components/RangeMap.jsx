/* RangeMap.jsx
   Stylized world map showing aircraft reach from Farmingdale, NY (Republic Airport).
   - Dots represent continents (luxury aviation style)
   - Gold star marks NY base
   - Curved arcs reveal each destination within the aircraft's range
   - Labels show distance in NM
*/

import { useState, useEffect } from 'react'

const NY = { x: 280, y: 200 }  // Farmingdale, NY position on map

// Destinations with x/y SVG coordinates and great-circle distance (NM) from NY
const DESTINATIONS = [
  { name: 'Miami',       x: 290,  y: 290,  nm: 1000  },
  { name: 'Los Angeles', x: 145,  y: 220,  nm: 2150  },
  { name: 'London',      x: 510,  y: 165,  nm: 2997  },
  { name: 'Paris',       x: 530,  y: 180,  nm: 3158  },
  { name: 'São Paulo',   x: 365,  y: 405,  nm: 4200  },
  { name: 'Dubai',       x: 660,  y: 240,  nm: 5840  },
  { name: 'Tokyo',       x: 880,  y: 215,  nm: 5860  },
  { name: 'Beijing',     x: 825,  y: 215,  nm: 5950  },
  { name: 'Mumbai',      x: 720,  y: 260,  nm: 6800  },
  { name: 'Hong Kong',   x: 850,  y: 255,  nm: 7000  },
  { name: 'Singapore',   x: 825,  y: 305,  nm: 9550  },
  { name: 'Sydney',      x: 925,  y: 395,  nm: 9680  },
]

// Curved bezier arc from origin to destination
function arcPath(from, to) {
  const dx = to.x - from.x
  const dy = to.y - from.y
  const mx = (from.x + to.x) / 2
  const my = (from.y + to.y) / 2 - Math.abs(dx) * 0.18  // curve upward
  return `M ${from.x} ${from.y} Q ${mx} ${my} ${to.x} ${to.y}`
}

// Generate continent dots — abstract dotted world map (Vista Jet style)
const CONTINENT_DOTS = (() => {
  // Hard-coded landmass regions as ellipses, dot every 14px
  const regions = [
    { cx: 175, cy: 200, rx: 95,  ry: 75 },   // N. America
    { cx: 345, cy: 360, rx: 55,  ry: 75 },   // S. America
    { cx: 530, cy: 200, rx: 70,  ry: 65 },   // Europe / W. Asia
    { cx: 550, cy: 320, rx: 90,  ry: 75 },   // Africa
    { cx: 770, cy: 245, rx: 130, ry: 80 },   // Asia
    { cx: 920, cy: 380, rx: 50,  ry: 30 },   // Australia
  ]
  const dots = []
  regions.forEach(r => {
    for (let y = r.cy - r.ry; y <= r.cy + r.ry; y += 14) {
      for (let x = r.cx - r.rx; x <= r.cx + r.rx; x += 14) {
        const nx = (x - r.cx) / r.rx
        const ny = (y - r.cy) / r.ry
        if (nx * nx + ny * ny <= 1) dots.push({ x, y })
      }
    }
  })
  return dots
})()

export default function RangeMap({ range = 6000, aircraftName = '' }) {
  const [animateArcs, setAnimateArcs] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setAnimateArcs(true), 200)
    return () => clearTimeout(t)
  }, [range])

  const reachable = DESTINATIONS.filter(d => d.nm <= range)
  const unreachable = DESTINATIONS.filter(d => d.nm > range)

  return (
    <div style={{
      width: '100%', position: 'relative',
      background: '#FFFFFF', borderRadius: '4px',
      padding: '20px', overflow: 'hidden',
    }}>
      <svg viewBox="0 0 1000 480" style={{ width: '100%', height: 'auto', display: 'block' }}>
        {/* ── World dots ── */}
        {CONTINENT_DOTS.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r="1.5" fill="rgba(8,21,45,0.18)" />
        ))}

        {/* ── Arcs to reachable destinations ── */}
        {reachable.map((d, i) => (
          <g key={d.name}>
            <path
              d={arcPath(NY, d)}
              fill="none"
              stroke="#B8944F"
              strokeWidth="1.2"
              strokeDasharray="3 3"
              opacity={animateArcs ? 0.75 : 0}
              style={{
                transition: `opacity 0.5s ease ${i * 0.08}s, stroke-dashoffset 0.6s`,
              }}
            />
            <circle cx={d.x} cy={d.y} r="4" fill="#B8944F"
              opacity={animateArcs ? 1 : 0}
              style={{ transition: `opacity 0.5s ease ${i * 0.08 + 0.2}s` }} />
            <text
              x={d.x + 8} y={d.y - 6}
              fontSize="10"
              fontFamily="Inter, sans-serif"
              fontWeight="600"
              fill="#142544"
              opacity={animateArcs ? 1 : 0}
              style={{ transition: `opacity 0.5s ease ${i * 0.08 + 0.3}s` }}
            >
              {d.name}
            </text>
            <text
              x={d.x + 8} y={d.y + 6}
              fontSize="8"
              fontFamily="Inter, sans-serif"
              fill="#999"
              opacity={animateArcs ? 1 : 0}
              style={{ transition: `opacity 0.5s ease ${i * 0.08 + 0.35}s` }}
            >
              {d.nm.toLocaleString()} nm
            </text>
          </g>
        ))}

        {/* ── Unreachable cities (faded grey, no arc) ── */}
        {unreachable.map(d => (
          <g key={d.name} opacity="0.35">
            <circle cx={d.x} cy={d.y} r="2.5" fill="#999" />
            <text x={d.x + 6} y={d.y - 3} fontSize="9" fontFamily="Inter, sans-serif" fill="#999">
              {d.name}
            </text>
          </g>
        ))}

        {/* ── NY base — star + pulse ── */}
        <circle cx={NY.x} cy={NY.y} r="14" fill="#B8944F" opacity="0.15">
          <animate attributeName="r" values="14;22;14" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.15;0;0.15" dur="2.4s" repeatCount="indefinite" />
        </circle>
        <circle cx={NY.x} cy={NY.y} r="6" fill="#B8944F" stroke="#FFFFFF" strokeWidth="2" />
        <text x={NY.x - 5} y={NY.y - 12}
          fontSize="11" fontWeight="700" fontFamily="Inter, sans-serif" fill="#142544">
          NY
        </text>
        <text x={NY.x - 26} y={NY.y + 26}
          fontSize="8" fontFamily="Inter, sans-serif" fill="#666" letterSpacing="1">
          FARMINGDALE, NY
        </text>
      </svg>

      {/* Summary footer */}
      <div style={{
        marginTop: '12px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#666',
        flexWrap: 'wrap', gap: '8px',
      }}>
        <span>
          <span style={{ color: '#B8944F', fontWeight: 700 }}>{reachable.length}</span> destinations within range
        </span>
        <span style={{ color: '#999' }}>
          Max range: <strong style={{ color: '#142544', fontFamily: "'Cormorant Garamond', serif", fontSize: '14px' }}>{range.toLocaleString()} NM</strong>
        </span>
      </div>
    </div>
  )
}
