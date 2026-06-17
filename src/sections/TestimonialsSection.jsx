/* TestimonialsSection — stacked boarding-pass tickets (Figma 142:5431).
   Every ticket renders full content; a grey "veil" fades it to grey when it's
   behind and to navy when it's the front, so cards crossfade instead of hard-
   swapping. The front ticket lifts + fades out, the next un-greys into place,
   and the leaving ticket fades back in at the rear — all simultaneously. */

import { useState, useEffect, useRef } from 'react'
import RiseUp from '../components/RiseUp.jsx'

const NAVY = '#1c2c4a'
const GREY = '#8f8b84'
const GOLD = '#D2A567'
const CREAM = '#FFF8ED'
const PHOTO = '/amkitimage.png'

const ROT = [0, 2.6, -2.6, 4]
const TX = [0, 18, -18, 28]
const TY = [0, 13, 21, 30]
const SC = [1, 0.968, 0.936, 0.9]

const EASE = 'cubic-bezier(0.33, 0, 0.2, 1)'

const testimonials = [
  { name: 'Ankit Vij', location: 'New York, NY', quote: 'Three continents in five days, all coordinated by my LMT concierge. They handled every detail flawlessly. I never want to fly any other way.' },
  { name: 'Daren Jackson', location: 'New York, NY', quote: 'We needed a jet at 6am for an urgent board meeting in Chicago. LMT had us airborne within three hours. Exceptional, seamless service.' },
  { name: 'Mickey Paritti', location: 'Milan, IT', quote: 'The crew remembered every preference from my last flight — coffee waiting, my favourite music playing. This is what true luxury feels like.' },
  { name: 'Sofia Marchetti', location: 'London, UK', quote: 'When my flight was diverted by weather, LMT rebooked me on a new aircraft within the hour. Their crisis response is second to none.' },
]

const depth = (pos) => `translate(${TX[pos] ?? 36}px, ${TY[pos] ?? 38}px) rotate(${ROT[pos] ?? 5}deg) scale(${SC[pos] ?? 0.86})`

function Ticket({ data, veil }) {
  return (
    <div className="tk">
      <div className="tk-left">
        <div className="tk-photo"><img src={PHOTO} alt={data.name} /></div>
        <div className="tk-name">{data.name}</div>
        <div className="tk-loc">{data.location}</div>
      </div>
      <div className="tk-perf" />
      <div className="tk-right">
        <div className="tk-content">
          <div className="tk-stars">★ ★ ★ ★ ★</div>
          <p className="tk-quote">{data.quote}</p>
        </div>
        <img className="tk-barcode" src="/ticket-barcode.png" alt="" />
      </div>
      <div className="tk-veil" style={{ opacity: veil }} />
    </div>
  )
}

export default function TestimonialsSection() {
  const [order, setOrder] = useState(testimonials.map((_, i) => i))
  const [exiting, setExiting] = useState(null)
  const [landed, setLanded] = useState(null)
  const orderRef = useRef(order)
  useEffect(() => { orderRef.current = order }, [order])

  const advance = () => {
    if (exiting !== null) return
    const front = orderRef.current[0]
    setExiting(front)
    setOrder([...orderRef.current.slice(1), front])
    setTimeout(() => {
      setExiting(null)
      setLanded(front)
      setTimeout(() => setLanded(null), 50)
    }, 620)
  }

  useEffect(() => {
    const t = setInterval(advance, 5000)
    return () => clearInterval(t)
  }, [])

  return (
    <section style={{ background: CREAM, padding: '110px 5vw 130px' }}>
      <RiseUp className="tk-stack">
        {order.map((id, pos) => {
          let style, veil
          if (id === exiting) {
            style = { zIndex: 40, animation: `tkExit 0.62s ${EASE} forwards` }
            veil = 0 // leaves as navy
          } else if (id === landed) {
            style = { zIndex: 30 - pos, transform: depth(pos), transition: 'none', opacity: 0 }
            veil = 1 // returns greyed
          } else {
            style = {
              zIndex: 30 - pos, transform: depth(pos), opacity: 1,
              transition: `transform 0.62s ${EASE}, opacity 0.55s ${EASE}`,
            }
            veil = pos === 0 ? 0 : 1
          }
          return (
            <div key={id} className="tk-slot" style={style}
              onClick={pos === 0 && exiting === null ? advance : undefined}>
              <Ticket data={testimonials[id]} veil={veil} />
            </div>
          )
        })}
      </RiseUp>

      <style>{`
        .tk-stack { position: relative; max-width: 1080px; margin: 0 auto; aspect-ratio: 1292 / 400; }
        .tk-slot { position: absolute; inset: 0; transform-origin: center 62%; will-change: transform, opacity; }
        .tk-slot:first-child { cursor: pointer; }

        @keyframes tkExit {
          0%   { transform: translate(0,0) rotate(0deg) scale(1); opacity: 1; }
          100% { transform: translate(0,-55%) rotate(-5deg) scale(1.02); opacity: 0; }
        }

        .tk {
          position: relative; width: 100%; height: 100%; display: flex; background: ${NAVY};
          --zig: 18px; --zigw: 11px;
          -webkit-mask:
            linear-gradient(#000 0 0) 0 0 / calc(100% - var(--zigw)) 100% no-repeat,
            conic-gradient(from -45deg at right, #0000 25%, #000 0) 100% 0 / var(--zigw) var(--zig);
          mask:
            linear-gradient(#000 0 0) 0 0 / calc(100% - var(--zigw)) 100% no-repeat,
            conic-gradient(from -45deg at right, #0000 25%, #000 0) 100% 0 / var(--zigw) var(--zig);
          border-radius: 14px;
          transform: translateZ(0); backface-visibility: hidden;
        }
        /* grey veil that fades between back (grey) and front (navy) */
        .tk-veil {
          position: absolute; inset: 0; background: ${GREY}; z-index: 5;
          pointer-events: none; transition: opacity 0.55s ${EASE};
        }

        .tk-left {
          flex: 0 0 30%; display: flex; flex-direction: column;
          align-items: center; justify-content: center; padding: 5%; text-align: center;
        }
        .tk-photo {
          width: 52%; aspect-ratio: 176 / 211; border: 1.5px solid rgba(255,255,255,0.9);
          border-radius: clamp(20px, 2.6vw, 44px); overflow: hidden; margin-bottom: 8%;
        }
        .tk-photo img { width: 100%; height: 100%; object-fit: cover; }
        .tk-name { font-family: Arial, sans-serif; color: #fff; font-size: clamp(15px, 2vw, 27px); line-height: 1.15; }
        .tk-loc { font-family: Inter, sans-serif; color: rgba(255,255,255,0.6); font-size: clamp(11px, 1.15vw, 16px); margin-top: 7px; }

        .tk-perf { position: relative; width: 0; border-left: 2px dotted rgba(255,255,255,0.4); }
        .tk-perf::before, .tk-perf::after {
          content: ''; position: absolute; left: -11px; width: 22px; height: 22px;
          border-radius: 999px; background: ${CREAM};
        }
        .tk-perf::before { top: -11px; }
        .tk-perf::after { bottom: -11px; }

        .tk-right { flex: 1; display: flex; min-width: 0; padding-right: 1.5%; }
        .tk-content { flex: 1; display: flex; flex-direction: column; justify-content: center; padding: 5% 3% 5% 6%; min-width: 0; }
        .tk-stars { color: ${GOLD}; font-size: clamp(12px, 1.2vw, 15px); letter-spacing: 3px; margin-bottom: 5%; }
        .tk-quote { font-family: Arial, sans-serif; color: #fff; font-size: clamp(13px, 2vw, 30px); line-height: 1.4; margin: 0; }
        .tk-barcode { height: 84%; align-self: center; width: clamp(56px, 9%, 116px); object-fit: contain; flex-shrink: 0; }

        @media (max-width: 760px) {
          .tk-stack { aspect-ratio: 1292 / 480; }
          .tk { --zig: 14px; --zigw: 8px; border-radius: 10px; }
          .tk-left { flex: 0 0 28%; padding: 4%; }
          .tk-photo { width: 48%; border-radius: 14px; }
          .tk-name { font-size: clamp(11px, 3vw, 16px) !important; }
          .tk-loc { font-size: clamp(9px, 2.2vw, 12px) !important; margin-top: 4px !important; }
          .tk-stars { font-size: clamp(9px, 2vw, 12px) !important; letter-spacing: 2px; margin-bottom: 4%; }
          .tk-quote { font-size: clamp(11px, 3vw, 17px) !important; line-height: 1.35; }
          .tk-content { padding: 4% 2% 4% 5%; }
          .tk-barcode { width: clamp(28px, 7%, 48px); }
          .tk-perf::before, .tk-perf::after { left: -8px; width: 16px; height: 16px; }
        }
      `}</style>
    </section>
  )
}
