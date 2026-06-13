import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function FlipCard({ aircraft }) {
  const [flipped, setFlipped] = useState(false)
  const navigate = useNavigate()

  // Clicking the card body → go to detail page
  const handleCardClick = () => {
    if (!flipped) navigate(`/fleet/${aircraft.id}`)
  }

  // Clicking ↻ button → flip (stop propagation so card click doesn't fire)
  const handleFlip = (e) => {
    e.stopPropagation()
    setFlipped(f => !f)
  }

  return (
    <div className="flip-card h-[460px]" style={{ cursor: flipped ? 'default' : 'pointer' }}>
      <div className={`flip-card-inner ${flipped ? 'flipped' : ''}`}>

        {/* ── FRONT ── */}
        <div
          className="flip-card-front bg-[#0B1728] rounded-lg overflow-hidden border border-white/5 relative"
          onClick={handleCardClick}
        >
          <img
            src={aircraft.image}
            alt={aircraft.name}
            className="w-full h-[260px] object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="p-5 relative">
            <p className="text-[#C9973A] text-[10px] tracking-[3px] uppercase mb-1 font-light">
              {aircraft.category}
            </p>
            <h3 className="text-white text-[18px] font-light tracking-[2px] uppercase mb-3">
              {aircraft.name}
            </h3>
            <div className="flex gap-5 text-white/40 text-[11px] tracking-[1px]">
              <span>{aircraft.passengers} pax</span>
              <span>{aircraft.range} nm</span>
              <span>{aircraft.speed} mph</span>
            </div>
          </div>

          {/* ↻ flip button — bottom right */}
          <button
            onClick={handleFlip}
            className="absolute bottom-4 right-4 w-8 h-8 border border-[#C9973A]/50 rounded-full
                       flex items-center justify-center text-[#C9973A] text-[14px]
                       hover:bg-[#C9973A] hover:text-[#0B1728] hover:border-[#C9973A]
                       transition-all duration-200"
            aria-label="View specs"
            title="View specifications"
          >
            ↻
          </button>
        </div>

        {/* ── BACK (specs) ── */}
        <div
          className="flip-card-back rounded-lg p-6 flex flex-col justify-between"
          style={{ background: 'linear-gradient(145deg, #C9973A 0%, #A07828 100%)' }}
        >
          {/* Back header */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[#0B1728]/60 text-[9px] tracking-[3px] uppercase">{aircraft.category}</p>
                <h3 className="text-[#0B1728] text-[16px] font-bold tracking-[2px] uppercase leading-tight mt-0.5">
                  {aircraft.name}
                </h3>
              </div>
              {/* ↩ flip back */}
              <button
                onClick={handleFlip}
                className="w-8 h-8 border border-[#0B1728]/30 rounded-full flex items-center justify-center
                           text-[#0B1728]/60 text-[14px] hover:bg-[#0B1728]/10 transition-all flex-shrink-0"
                aria-label="Flip back"
              >
                ↺
              </button>
            </div>

            {/* Specs table */}
            <div className="space-y-[9px] text-[12px] text-[#0B1728]">
              {[
                ['Range',       `${aircraft.range} nm`],
                ['Passengers',  `${aircraft.passengers}`],
                ['Speed',       `${aircraft.speed} mph`],
                ['Cabin Height',`${aircraft.cabinHeight} ft`],
                ['Wi-Fi',        aircraft.wifi ? 'Yes' : 'No'],
                ['Catering',     aircraft.catering ? 'Available' : 'On request'],
              ].map(([label, val]) => (
                <div key={label} className="flex justify-between border-b border-[#0B1728]/15 pb-[9px]">
                  <span className="text-[#0B1728]/60 font-light">{label}</span>
                  <span className="font-semibold">{val}</span>
                </div>
              ))}
            </div>

            <p className="text-[#0B1728]/55 text-[11px] mt-3 font-light leading-relaxed">
              Best for: {aircraft.bestFor}
            </p>
          </div>

          {/* Back CTAs */}
          <div className="flex flex-col gap-2 mt-4">
            <Link
              to={`/fleet/${aircraft.id}`}
              className="block text-center bg-[#0B1728] text-white text-[10px] font-bold
                         tracking-[2.5px] uppercase py-2.5 px-4 rounded-full
                         hover:bg-[#0B1728]/85 transition-all duration-200"
            >
              FULL DETAILS →
            </Link>
            <Link
              to={`/book?aircraft=${aircraft.id}`}
              className="block text-center border border-[#0B1728]/40 text-[#0B1728] text-[10px]
                         font-bold tracking-[2.5px] uppercase py-2.5 px-4 rounded-full
                         hover:bg-[#0B1728]/10 transition-all duration-200"
            >
              BOOK THIS JET
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
