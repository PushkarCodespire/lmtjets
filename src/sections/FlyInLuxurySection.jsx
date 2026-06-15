/* FlyInLuxurySection — faithful port of the Jesko Jets "Fly in Luxury → Gulfstream 650ER"
   scroll section.

   Sequence (master scrubbed timeline over the 5.5×100vh .jet_scroll-area):
     0.00 → 0.32  jet rises up from below until its centre is at screen centre (large)
     0.32 → 0.46  hold — the large jet rests at centre
     0.46 → 0.62  title view slides DOWN out / spec view slides DOWN in
     0.50 → 0.76  jet scales down to the medium spec size (stays centred)
     0.78 → 1.00  exterior dissolves + same-size blueprint reveals (the morph)

   The spec view has prev/next arrows that cycle the displayed jet title. */

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CustomEase } from 'gsap/CustomEase'
import './FlyInLuxurySection.css'

gsap.registerPlugin(ScrollTrigger, CustomEase)

// Per-jet data drives both the initial "Fly in Luxury" slide and the spec carousel.
const JETS = [
  {
    brand: 'Global', model: '6000',
    data: {
      desc: 'Built around the Rolls-Royce BR710 engine and Bombardier’s smooth-riding wing, the Global 6000 pairs intercontinental range with a wide, three-zone cabin engineered for exceptional comfort and quiet.',
      overview: [
        ['Maximum operating range', '11,112 km'],
        ['Speed', '513 knots'],
        ['Passenger capacity', 'Up to 17 seats'],
        ['Endurance', 'Up to 13 hrs'],
        ['Baggage capacity', '5.52 m³'],
        ['Cruising altitude', '15,545 m'],
      ],
      dims: [['Cabin length', '13.18 m'], ['Cabin Width', '2.49 m'], ['Cabin Height', '1.91 m']],
      rightTitle: 'Ultra-long-range Aircraft',
      directTitle: 'Direct Access to Private Travel',
      directDesc: 'A true intercontinental performer — it links city pairs like New York and Dubai non-stop, cruising at Mach 0.85 in one of the quietest cabins in its class.',
    },
  },
  {
    brand: 'Global', model: '5500',
    data: {
      desc: 'Powered by next-generation Rolls-Royce Pearl 15 engines and a redesigned wing, the Global 5500 delivers more range, more speed and the widest cabin in its class.',
      overview: [
        ['Maximum operating range', '10,186 km'],
        ['Speed', '516 knots'],
        ['Passenger capacity', 'Up to 16 seats'],
        ['Endurance', 'Up to 12 hrs'],
        ['Baggage capacity', '5.52 m³'],
        ['Cruising altitude', '15,545 m'],
      ],
      dims: [['Cabin length', '13.18 m'], ['Cabin Width', '2.41 m'], ['Cabin Height', '1.88 m']],
      rightTitle: 'Ultra-long-range Aircraft',
      directTitle: 'Direct Access to Private Travel',
      directDesc: 'Re-engineered for efficiency, it flies New York to São Paulo or London to Cape Town non-stop while cruising at up to Mach 0.90.',
    },
  },
  {
    brand: 'Gulfstream', model: '550',
    data: {
      desc: 'Featuring an advanced wing and powered by Rolls-Royce BR710 engines, the Gulfstream G550 is engineered for exceptional ultra-long range and high-altitude, all-weather performance.',
      overview: [
        ['Maximum operating range', '12,501 km'],
        ['Speed', '488 knots'],
        ['Passenger capacity', 'Up to 19 seats'],
        ['Endurance', 'Up to 14 hrs'],
        ['Baggage capacity', '6.38 m³'],
        ['Cruising altitude', '15,545 m'],
      ],
      dims: [['Cabin length', '15.27 m'], ['Cabin Width', '2.24 m'], ['Cabin Height', '1.88 m']],
      rightTitle: 'Ultra-long-range Aircraft',
      directTitle: 'Direct Access to Private Travel',
      directDesc: 'A proven ultra-long-range icon — it connects New York to Tokyo or London to Singapore non-stop, in a cabin pressurised for comfort at 51,000 ft.',
    },
  },
  {
    brand: 'Gulfstream', model: 'V',
    data: {
      desc: 'Powered by Rolls-Royce BR710 engines, the Gulfstream V set the ultra-long-range standard, pairing a spacious stand-up cabin with the ability to fly high above congested airspace.',
      overview: [
        ['Maximum operating range', '11,899 km'],
        ['Speed', '488 knots'],
        ['Passenger capacity', 'Up to 18 seats'],
        ['Endurance', 'Up to 14 hrs'],
        ['Baggage capacity', '6.38 m³'],
        ['Cruising altitude', '15,545 m'],
      ],
      dims: [['Cabin length', '15.27 m'], ['Cabin Width', '2.21 m'], ['Cabin Height', '1.85 m']],
      rightTitle: 'Ultra-long-range Aircraft',
      directTitle: 'Direct Access to Private Travel',
      directDesc: 'The original ultra-long-range Gulfstream — it opened up non-stop city pairs across the globe and still cruises high above the weather at 51,000 ft.',
    },
  },
  {
    brand: 'Gulfstream', model: 'IV',
    data: {
      desc: 'Powered by Rolls-Royce Tay engines, the Gulfstream IV delivers proven large-cabin range and reliability with a quiet, comfortable three-zone cabin.',
      overview: [
        ['Maximum operating range', '7,815 km'],
        ['Speed', '459 knots'],
        ['Passenger capacity', 'Up to 19 seats'],
        ['Endurance', 'Up to 9 hrs'],
        ['Baggage capacity', '4.78 m³'],
        ['Cruising altitude', '13,716 m'],
      ],
      dims: [['Cabin length', '13.74 m'], ['Cabin Width', '2.24 m'], ['Cabin Height', '1.85 m']],
      rightTitle: 'Large-cabin Aircraft',
      directTitle: 'Direct Access to Private Travel',
      directDesc: 'A large-cabin workhorse trusted for decades — it crosses the Atlantic with ease while carrying up to 14 passengers in quiet comfort.',
    },
  },
  {
    brand: 'Gulfstream', model: '280',
    data: {
      desc: 'Powered by Honeywell HTF7250G engines and an advanced transonic wing, the Gulfstream G280 combines class-leading speed, range and short-field capability.',
      overview: [
        ['Maximum operating range', '6,667 km'],
        ['Speed', '482 knots'],
        ['Passenger capacity', 'Up to 10 seats'],
        ['Endurance', 'Up to 8 hrs'],
        ['Baggage capacity', '4.36 m³'],
        ['Cruising altitude', '13,716 m'],
      ],
      dims: [['Cabin length', '7.65 m'], ['Cabin Width', '2.18 m'], ['Cabin Height', '1.91 m']],
      rightTitle: 'Super-midsize Aircraft',
      directTitle: 'Direct Access to Private Travel',
      directDesc: 'A super-midsize standout — it flies coast-to-coast across the U.S. or London to New York with best-in-class speed and short-field capability.',
    },
  },
  {
    brand: 'Gulfstream', model: '200',
    data: {
      desc: 'Powered by Pratt & Whitney PW306A engines, the Gulfstream G200 offers a wide, stand-up super-midsize cabin with genuine transcontinental range.',
      overview: [
        ['Maximum operating range', '6,135 km'],
        ['Speed', '470 knots'],
        ['Passenger capacity', 'Up to 10 seats'],
        ['Endurance', 'Up to 8 hrs'],
        ['Baggage capacity', '3.54 m³'],
        ['Cruising altitude', '13,716 m'],
      ],
      dims: [['Cabin length', '7.44 m'], ['Cabin Width', '2.18 m'], ['Cabin Height', '1.91 m']],
      rightTitle: 'Super-midsize Aircraft',
      directTitle: 'Direct Access to Private Travel',
      directDesc: 'A spacious super-midsize cabin with transcontinental reach — comfortable, capable and efficient for business travel across regions.',
    },
  },
]
const DEFAULT_JET = JETS.findIndex((j) => j.brand === 'Gulfstream' && j.model === '550')

export default function FlyInLuxurySection() {
  const rootRef = useRef(null)
  const [jetIndex, setJetIndex] = useState(DEFAULT_JET)
  const jet = JETS[jetIndex]
  const data = jet.data

  const prevJet = () => setJetIndex((i) => (i - 1 + JETS.length) % JETS.length)
  const nextJet = () => setJetIndex((i) => (i + 1) % JETS.length)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    if (!CustomEase.get('In')) CustomEase.create('In', '0.5,0,0.75,0')

    const q = (s) => root.querySelector(s)

    const ctx = gsap.context(() => {
      root.querySelectorAll('[data-reveal]').forEach((el) => {
        gsap.set(el, { visibility: 'visible' })
        gsap.from(el, {
          filter: 'blur(24px)', opacity: 0, yPercent: 16, duration: 1, ease: 'power2.out',
          scrollTrigger: { trigger: root, start: 'top 75%', toggleActions: 'play none none reverse' },
        })
      })

      gsap.set(q('.jet-imgs'), { xPercent: -50, yPercent: -50 }) // centre the (oversized) jet box

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: q('.jet_scroll-area'), start: 'top top', end: 'bottom bottom', scrub: 1 },
      })

      // 1) jet rises from below until its centre is at screen centre (stays large)
      tl.fromTo(q('.light-bg'), { opacity: 0 }, { opacity: 1, duration: 0.46 }, 0)
        .fromTo(q('.jet'), { yPercent: 120 }, { yPercent: 0, duration: 0.32 }, 0)
      // (hold 0.32 → 0.46: the large jet rests at centre)
      // 2) once centred, title slides down out / spec slides down in
        .fromTo([q('.jet-w'), q('.spec-w')], { yPercent: 0 }, { yPercent: 100, duration: 0.16 }, 0.46)
      // 3) jet scales down to the medium "spec" size, staying centred
        .fromTo(q('.jet-imgs'), { scale: 1 }, { scale: 0.45, ease: 'In', duration: 0.26 }, 0.50)
      // 4) exterior dissolves out, same-size blueprint reveals from behind
        .fromTo(q('.img-jet'), { '--mask-size': '100% 150%' }, { '--mask-size': '100% 0%', duration: 0.2 }, 0.78)
        .fromTo(q('.blueprint'),
          { '--mask-size': '100% 0%', '--mask-y': '200%' },
          { '--mask-size': '100% 150%', '--mask-y': '50%', duration: 0.2 }, 0.78)
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} id="fly-in-luxury" className="jj-flight">
      <div className="jet_scroll-area">
        <div className="jet-switcher">

          {/* backdrop */}
          <div className="light-bg" />

          {/* ── TITLE VIEW ── */}
          <div className="jet-w">
            <div className="title-row">
              <h2 className="h1" data-reveal>Fly&nbsp;&nbsp;in</h2>
              <h2 className="h1" data-reveal>Luxury</h2>
            </div>
            <div className="title-sub" data-reveal>
              <h3 className="p5">Luxury<br />that moves<br />with you</h3>
            </div>
            <div className="title-desc" data-reveal>
              <div className="line-h" />
              <div className="title-desc_head">
                <div className="l1">{jet.brand}</div>
                <div className="l1"><strong>{jet.model}</strong></div>
              </div>
              {data?.desc && <p className="p7">{data.desc}</p>}
            </div>
          </div>

          {/* ── SPEC VIEW ── */}
          <div className="spec-w">
            <div className="spec-s">
              <div className="line-h" />
              <div className="spec-row">

                <div className="spec-s_left">
                  <div className="spec-s_left_top">
                    <div className="p5">{jet.brand}</div>
                    <div className="h2" style={{ marginTop: '1vw' }}>{jet.model}</div>
                  </div>
                  <div className="spec-s_left_bot">
                    {data?.overview && (
                      <div className="spec-block">
                        <div className="line-h" />
                        <div className="spec-grid" style={{ marginTop: '1vw' }}>
                          {data.overview.map(([k, v]) => (
                            <div className="l1-item" key={k}>
                              <div className="l1 text-gray">{k}</div>
                              <div className="l1">{v}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {data?.dims && (
                      <div className="spec-block">
                        <div className="line-h" />
                        <div className="l1 text-gray" style={{ margin: '1vw 0' }}>Specification</div>
                        {data.dims.map(([k, v]) => (
                          <div className="spec-pair" key={k}>
                            <div className="l1">{k}</div>
                            <div className="l1">{v}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="spec-s_center" />

                <div className="spec-s_right">
                  <div className="spec-s_right_top">
                    {data?.rightTitle && (
                      <>
                        <div className="line-h" />
                        <h2 className="p5" style={{ marginTop: '1vw' }}>{data.rightTitle}</h2>
                        <div style={{ height: '2.4vw' }} />
                      </>
                    )}
                    {data?.directTitle && (
                      <>
                        <div className="line-h" />
                        <h3 className="l1" style={{ margin: '1vw 0 1.2vw' }}>{data.directTitle}</h3>
                        <p className="p7">{data.directDesc}</p>
                      </>
                    )}
                  </div>

                  {/* jet switcher: progress timeline + arrows */}
                  <div className="spec-switcher">
                    <div className="spec-progress">
                      <span className="spec-progress-fill" key={jetIndex} onAnimationEnd={nextJet} />
                    </div>
                    <div className="spec-arrows">
                      <button type="button" aria-label="Previous jet" onClick={prevJet}>
                        <svg width="40%" height="40%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M15 18l-6-6 6-6" />
                        </svg>
                      </button>
                      <button type="button" aria-label="Next jet" onClick={nextJet}>
                        <svg width="40%" height="40%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 6l6 6-6 6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── JET (exterior + blueprint, cross-masked) ── */}
          <div className="jet">
            <div className="jet-imgs">
              <img className="img-jet" src="/jetmodel.png" alt="Private jet exterior" />
              <img className="blueprint" src="/jet-blueprint.avif" alt="Private jet cabin blueprint" />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
