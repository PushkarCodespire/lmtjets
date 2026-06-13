/* TestimonialsSection — stacked boarding-pass tickets (Figma 142:5431).
   The top ticket flies away (up + fade), revealing the tilted ticket behind it,
   which straightens into the front. The removed ticket settles back invisibly at
   the rear of the stack and fades in. All tickets use the Ankit Vij portrait. */

import { useState, useEffect, useRef } from 'react'

const NAVY = '#16294a'
const GOLD = '#D2A567'
const CREAM = '#FFF8ED'
const PHOTO = '/amkitimage.png'

const ROT = [0, 6, -6, 9, -9]      // fan rotation per depth
const TY = [0, 9, 18, 27, 36]      // px down per depth
const SC = [1, 0.955, 0.91, 0.865] // scale per depth

const testimonials = [
  { name: 'Ankit Vij', location: 'New York, NY', quote: 'Three continents in five days, all coordinated by my LMT concierge. They handled every detail flawlessly. I never want to fly any other way.' },
  { name: 'Daren Jackson', location: 'New York, NY', quote: 'We needed a jet at 6am for an urgent board meeting in Chicago. LMT had us airborne within three hours. Exceptional, seamless service.' },
  { name: 'Mickey Paritti', location: 'Milan, IT', quote: 'The crew remembered every preference from my last flight — coffee waiting, my favourite music playing. This is what true luxury feels like.' },
  { name: 'Sofia Marchetti', location: 'London, UK', quote: 'When my flight was diverted by weather, LMT rebooked me on a new aircraft within the hour. Their crisis response is second to none.' },
]

const depth = (pos) => `rotate(${ROT[pos] ?? 0}deg) translateY(${TY[pos] ?? 40}px) scale(${SC[pos] ?? 0.82})`

function Ticket({ data }) {
  return (
    <div className="tk">
      <div className="tk-left">
        <div className="tk-photo"><img src={PHOTO} alt={data.name} /></div>
        <div className="tk-name">{data.name}</div>
        <div className="tk-loc">{data.location}</div>
      </div>
      <div className="tk-perf">
        <span className="tk-notch tk-notch-top" />
        <span className="tk-notch tk-notch-bot" />
      </div>
      <div className="tk-right">
        <div className="tk-content">
          <div className="tk-stars">★ ★ ★ ★ ★</div>
          <p className="tk-quote">{data.quote}</p>
        </div>
        <img className="tk-barcode" src="/ticket-barcode.png" alt="" />
      </div>
    </div>
  )
}

export default function TestimonialsSection() {
  const [order, setOrder] = useState(testimonials.map((_, i) => i))
  const [exiting, setExiting] = useState(null)  // id flying away
  const [landed, setLanded] = useState(null)    // id snapping to the rear (no transition)
  const orderRef = useRef(order)
  useEffect(() => { orderRef.current = order }, [order])

  const advance = () => {
    if (exiting !== null) return
    const front = orderRef.current[0]
    setExiting(front)
    setOrder([...orderRef.current.slice(1), front])
    setTimeout(() => {
      setExiting(null)
      setLanded(front)                       // place at rear with no transition + invisible
      setTimeout(() => setLanded(null), 60)  // then let it fade in
    }, 520)
  }

  useEffect(() => {
    const t = setInterval(advance, 4500)
    return () => clearInterval(t)
  }, [])

  return (
    <section style={{ background: CREAM, padding: '96px 5vw 120px' }}>
      <div className="tk-stack">
        {order.map((id, pos) => {
          let style
          if (id === exiting) {
            style = { zIndex: 40, animation: 'tkExit 0.52s cubic-bezier(0.4,0,0.2,1) forwards' }
          } else if (id === landed) {
            style = { zIndex: 30 - pos, transform: depth(pos), transition: 'none', opacity: 0 }
          } else {
            style = {
              zIndex: 30 - pos, transform: depth(pos),
              transition: 'transform 0.55s cubic-bezier(0.4,0,0.2,1), opacity 0.5s',
              opacity: pos > 3 ? 0 : 1,
            }
          }
          return (
            <div key={id} className="tk-slot" style={style}
              onClick={pos === 0 && exiting === null ? advance : undefined}>
              <Ticket data={testimonials[id]} />
            </div>
          )
        })}
      </div>

      <style>{`
        .tk-stack { position: relative; max-width: 1080px; margin: 0 auto; aspect-ratio: 1292 / 400; }
        .tk-slot { position: absolute; inset: 0; transform-origin: center 60%; will-change: transform, opacity; }
        .tk-slot:first-child { cursor: pointer; }

        @keyframes tkExit {
          0%   { transform: rotate(0deg) translateY(0) scale(1); opacity: 1; }
          100% { transform: rotate(-7deg) translateY(-72%) scale(1.05); opacity: 0; }
        }

        .tk {
          width: 100%; height: 100%; display: flex; background: ${NAVY};
          border-radius: 14px; overflow: hidden;
          box-shadow: 0 34px 64px rgba(20,37,68,0.30);
        }
        .tk-left {
          flex: 0 0 30%; display: flex; flex-direction: column;
          align-items: center; justify-content: center; padding: 5% 5%; text-align: center;
        }
        .tk-photo {
          width: 52%; aspect-ratio: 176 / 211; border: 1.5px solid rgba(255,255,255,0.9);
          border-radius: clamp(20px, 2.6vw, 44px); overflow: hidden; margin-bottom: 8%;
        }
        .tk-photo img { width: 100%; height: 100%; object-fit: cover; }
        .tk-name { font-family: Arial, sans-serif; color: #fff; font-size: clamp(15px, 2vw, 27px); line-height: 1.15; }
        .tk-loc { font-family: Inter, sans-serif; color: rgba(255,255,255,0.6); font-size: clamp(11px, 1.15vw, 16px); margin-top: 7px; }

        .tk-perf { position: relative; width: 0; border-left: 2px dashed rgba(255,255,255,0.22); }
        .tk-notch { position: absolute; left: -11px; width: 22px; height: 22px; border-radius: 999px; background: ${CREAM}; }
        .tk-notch-top { top: -11px; }
        .tk-notch-bot { bottom: -11px; }

        .tk-right { flex: 1; display: flex; min-width: 0; }
        .tk-content { flex: 1; display: flex; flex-direction: column; justify-content: center; padding: 5% 3% 5% 6%; min-width: 0; }
        .tk-stars { color: ${GOLD}; font-size: clamp(12px, 1.2vw, 15px); letter-spacing: 3px; margin-bottom: 5%; }
        .tk-quote { font-family: Arial, sans-serif; color: #fff; font-size: clamp(13px, 2vw, 30px); line-height: 1.4; margin: 0; }
        .tk-barcode { height: 100%; width: clamp(56px, 9%, 118px); object-fit: cover; flex-shrink: 0; }

        @media (max-width: 760px) {
          .tk-stack { aspect-ratio: 1000 / 580; }
          .tk { flex-direction: column; }
          .tk-left { flex: 0 0 auto; padding: 20px; }
          .tk-photo { width: 96px; }
          .tk-perf, .tk-barcode { display: none; }
          .tk-content { padding: 20px; }
        }
      `}</style>
    </section>
  )
}
