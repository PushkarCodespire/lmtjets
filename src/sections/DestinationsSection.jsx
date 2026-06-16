/* DestinationsSection — "Fly anywhere ✈ [city]" rotator + globe with the
   "Global 8000" factoid card (Figma 252:8652 globe, 212:6898 card). */

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Globe3D from '../components/Globe3D.jsx'

const CITIES = ['Zurich', 'Mykonos', 'Sydney', 'Nice', 'Milan', 'New York', 'Lagos', 'Dubai', 'Tokyo', 'London']
const ITEM_H = 54
const VISIBLE = 5
const CENTER = (VISIBLE - 1) / 2

export default function DestinationsSection() {
  const listRef = useRef(null)

  useEffect(() => {
    const list = listRef.current
    if (!list) return
    const items = Array.from(list.children)
    const n = CITIES.length
    let idx = n

    const setCurrent = (k) => items.forEach((el, i) => el.classList.toggle('is-current', i === k))
    gsap.set(list, { y: -(idx - CENTER) * ITEM_H })
    setCurrent(idx)

    const step = () => {
      idx += 1
      setCurrent(idx)
      gsap.to(list, {
        y: -(idx - CENTER) * ITEM_H, duration: 0.6, ease: 'power2.out',
        onComplete: () => {
          if (idx >= n * 2) { idx -= n; gsap.set(list, { y: -(idx - CENTER) * ITEM_H }); setCurrent(idx) }
        },
      })
    }
    const tl = gsap.timeline({ repeat: -1 })
    tl.to({}, { duration: 1.0 }).call(step)
    return () => { tl.kill() }
  }, [])

  const rows = [...CITIES, ...CITIES, ...CITIES]

  return (
    <section id="destinations" className="dest">
      {/* ── Fly anywhere rotator ── */}
      <div className="dest-row-wrap">
        <div className="dest-row">
          <span className="dest-label">Fly anywhere</span>
          <span className="dest-line" />
          <span className="dest-plane">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.4 19.2 21.6 12 2.4 4.8 2.4 10.2 15 12 2.4 13.8z" />
            </svg>
          </span>
          <span className="dest-line" />
          <div className="dest-viewport" style={{ height: VISIBLE * ITEM_H }}>
            <div className="dest-list" ref={listRef}>
              {rows.map((c, i) => (
                <div className="dest-item" key={i} style={{ height: ITEM_H }}>{c}</div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Globe + Global 8000 card ── */}
      <div className="dest-globe">
        <div className="dest-globe-img"><Globe3D /></div>

        <div className="g8-card">
          <div className="g8-number">
            <span className="g8-global">Global</span>
            <span className="g8-big">8000.</span>
            <img className="g8-barcode" src="/ticket-barcode.png" alt="" />
          </div>
          <div className="g8-arranged">Successfully arranged</div>
          <img className="g8-logo" src="/lmtlogo.svg" alt="LMT" />
          <p className="g8-desc">
            The longest-range business jet ever certified. Transpacific, nonstop,
            at the quietest cabin altitude in the category.
          </p>
          <button className="g8-btn" onClick={() => { window.location.href = '/book' }}>Book Now</button>
        </div>
      </div>

      <style>{`
        .dest { background: #FFF8ED; padding: 60px 5vw 90px; }

        .dest-row-wrap { display: flex; justify-content: center; }
        .dest-row { display: flex; align-items: center; gap: 2vw; font-family: Inter, sans-serif; }
        .dest-label { color: #142544; font-weight: 500; font-size: clamp(20px, 2vw, 30px); white-space: nowrap; }
        .dest-line { width: clamp(48px, 6vw, 96px); height: 1px; background: rgba(20,37,68,0.28); }
        .dest-plane { color: #B8944F; display: flex; align-items: center; }
        .dest-viewport {
          position: relative; overflow: hidden; width: 14em;
          -webkit-mask-image: linear-gradient(180deg, transparent 0%, #000 28%, #000 72%, transparent 100%);
          mask-image: linear-gradient(180deg, transparent 0%, #000 28%, #000 72%, transparent 100%);
        }
        .dest-list { will-change: transform; }
        .dest-item {
          display: flex; align-items: center; font-size: clamp(20px, 2vw, 30px); font-weight: 500;
          color: rgba(20,37,68,0.22); transition: color 0.4s ease; white-space: nowrap;
        }
        .dest-item.is-current { color: #142544; }

        /* globe */
        .dest-globe { position: relative; max-width: 1340px; margin: 24px auto 0; height: clamp(580px, 60vw, 860px); }
        .dest-globe-img {
          position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
          width: clamp(480px, 66vw, 860px); aspect-ratio: 1;
        }

        /* Global 8000 card */
        .g8-card {
          position: absolute; left: 0; bottom: 4%; z-index: 2;
          width: clamp(300px, 33%, 420px);
          background: #FFF8ED; padding: 36px 34px 34px;
          display: flex; flex-direction: column; align-items: flex-start;
          box-shadow: 0 30px 70px rgba(20,37,68,0.12);
        }
        .g8-number { position: relative; width: 100%; color: #312726; font-family: Arial, sans-serif; line-height: 0.95; }
        .g8-global { display: block; font-size: clamp(22px, 2.2vw, 38px); letter-spacing: 1px; }
        .g8-big { display: block; font-size: clamp(54px, 6.2vw, 92px); letter-spacing: -2px; }
        .g8-barcode { position: absolute; top: 0; right: 0; width: 30px; height: clamp(110px, 14vh, 150px); object-fit: cover; }
        .g8-arranged {
          font-family: Arial, sans-serif; font-weight: 700; font-size: 13px;
          letter-spacing: 1px; text-transform: uppercase; color: #312726; margin-top: 40px;
        }
        .g8-logo { height: 64px; width: auto; margin-top: 36px; }
        .g8-desc {
          font-family: Arial, sans-serif; font-size: 15px; color: #312726;
          line-height: 1.4; max-width: 270px; margin-top: 16px;
        }
        .g8-btn {
          align-self: flex-start; margin-top: 30px;
          background: #D2A567; color: #fff; border: none; cursor: pointer;
          font-family: Inter, sans-serif; font-weight: 600; font-size: 11px;
          letter-spacing: 3px; text-transform: uppercase; padding: 16px 40px;
          transition: background 0.3s;
        }
        .g8-btn:hover { background: #C2924F; }

        @media (max-width: 900px) {
          .dest-row { gap: 3vw; }
          .dest-viewport { width: 8em; }
          .dest-globe { min-height: auto; display: flex; flex-direction: column; align-items: center; height: auto !important; }
          .dest-globe-img { position: relative !important; left: auto !important; top: auto !important; transform: none !important; width: 70vw !important; overflow: hidden !important; }
          .dest-globe-img canvas { width: 100% !important; height: 100% !important; }
          .g8-card { position: static; width: 100%; max-width: 420px; margin-top: -40px; }
        }
        @media (max-width: 640px) {
          .dest { padding: 40px 5vw 60px !important; }
          .dest-row { flex-wrap: wrap; justify-content: center; }
          .dest-label { font-size: clamp(16px, 4.5vw, 22px) !important; }
          .dest-item { font-size: clamp(16px, 4.5vw, 22px) !important; }
          .dest-line { width: clamp(24px, 5vw, 48px) !important; }
          .dest-globe-img { width: 90vw !important; height: 90vw !important; overflow: hidden !important; border-radius: 50% !important; }
          .dest-globe-img canvas { width: 100% !important; height: 100% !important; }
          .g8-card { padding: 24px 20px 24px !important; margin-top: -16px; }
          .g8-big { font-size: clamp(40px, 12vw, 60px) !important; }
          .g8-global { font-size: clamp(18px, 5vw, 28px) !important; }
        }
      `}</style>
    </section>
  )
}
