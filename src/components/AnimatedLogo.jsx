import { useEffect, useState } from 'react'

/* AnimatedLogo — reveals the real LMT logo (/lmtlogo.svg) as a sequence:
   1. the gold "sun" (the shield behind the M) rises up from below
   2. the "LMT" mark writes on left→right, led by a glowing pen tip
   3. the stars arc fades in above
   4. the airplane + "PRIVATE JET" line fades up below
   The logo layers are the same image clipped to horizontal bands so they
   reconstruct the complete artwork seamlessly. The rising sun is a synthetic
   gold shape sized just inside the real shield, so the real logo fully covers
   it once written in. */

const LOGO = '/lmtlogo.svg'

// horizontal bands of the logo image (top% right% bottom% left% insets):
// stars span 19-37% (two tiers), gap 38-40%, LMT 41-74%, footer ~75-85%
const BAND_STARS = '0% 0% 61% 0%'      // top — full star arc (shows 0-39%)
const BAND_MARK = '39% 0% 25% 0%'      // middle — LMT only (shows 39-75%)
const BAND_FOOT = '75% 0% 0% 0%'       // bottom — airplane + PRIVATE JET
const MARK_HIDDEN = 'inset(39% 100% 25% 0%)' // LMT clipped fully from the right
const MARK_SHOWN = `inset(${BAND_MARK})`

const WRITE_EASE = 'cubic-bezier(0.5, 0, 0.3, 1)'
const WRITE_MS = 1700

export default function AnimatedLogo({ width = 260, onComplete }) {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 250),   // sun rises
      setTimeout(() => setPhase(2), 1350),  // LMT writes
      setTimeout(() => setPhase(3), 3300),  // stars
      setTimeout(() => setPhase(4), 4000),  // airplane + private jet
      setTimeout(() => onComplete?.(), 5400),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  const h = width * 0.67
  const layer = { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain' }

  return (
    <div style={{ width, height: h, position: 'relative' }}>
      {/* rising gold sun — a disc matching the real one behind the M, sized and
         positioned to line up exactly so the real logo covers it once written in */}
      <div
        style={{
          position: 'absolute',
          left: '38.4%',
          top: '42.1%',
          width: '19.8%',
          aspectRatio: '1',
          borderRadius: '50%',
          background: 'linear-gradient(150deg, #E2C074 0%, #D2A862 38%, #B8924A 70%, #9C7E38 100%)',
          opacity: phase >= 1 ? (phase >= 3 ? 0 : 1) : 0,
          transform: phase >= 1 ? 'translateY(0) scale(1)' : 'translateY(120%) scale(0.7)',
          transformOrigin: 'center bottom',
          transition: 'transform 0.95s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.7s ease',
        }}
      />

      {/* stars arc */}
      <img
        src={LOGO}
        alt=""
        style={{
          ...layer,
          clipPath: `inset(${BAND_STARS})`,
          WebkitClipPath: `inset(${BAND_STARS})`,
          opacity: phase >= 3 ? 1 : 0,
          transform: phase >= 3 ? 'translateY(0)' : 'translateY(-6px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}
      />

      {/* LMT mark — writes on left→right */}
      <img
        src={LOGO}
        alt="LMT Private Jet"
        style={{
          ...layer,
          clipPath: phase >= 2 ? MARK_SHOWN : MARK_HIDDEN,
          WebkitClipPath: phase >= 2 ? MARK_SHOWN : MARK_HIDDEN,
          transition: `clip-path ${WRITE_MS}ms ${WRITE_EASE}, -webkit-clip-path ${WRITE_MS}ms ${WRITE_EASE}`,
        }}
      />

      {/* glowing pen tip that leads the writing */}
      <div
        style={{
          position: 'absolute',
          top: '60%',
          left: phase >= 2 ? '78%' : '20%',
          width: '2.6%',
          aspectRatio: '1',
          borderRadius: '50%',
          background: '#F4D98B',
          boxShadow: '0 0 10px 4px rgba(244, 217, 139, 0.85), 0 0 20px 8px rgba(210, 168, 98, 0.5)',
          opacity: phase === 2 ? 1 : 0,
          transform: 'translate(-50%, -50%)',
          transition: `left ${WRITE_MS}ms ${WRITE_EASE}, opacity 0.4s ease`,
        }}
      />

      {/* airplane + PRIVATE JET */}
      <img
        src={LOGO}
        alt=""
        style={{
          ...layer,
          clipPath: `inset(${BAND_FOOT})`,
          WebkitClipPath: `inset(${BAND_FOOT})`,
          opacity: phase >= 4 ? 1 : 0,
          transform: phase >= 4 ? 'translateY(0)' : 'translateY(6px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}
      />
    </div>
  )
}
