/* FlyInLuxurySection — faithful port of the Jesko Jets "Fly in Luxury → Gulfstream 650ER"
   scroll section.

   Sequence (master scrubbed timeline over the 5.5×100vh .jet_scroll-area):
     0.00 → 0.32  jet rises up from below until its centre is at screen centre (large)
     0.32 → 0.46  hold — the large jet rests at centre
     0.46 → 0.62  title view slides DOWN out / spec view slides DOWN in
     0.50 → 0.76  jet scales down to the medium spec size (stays centred)
     0.78 → 1.00  exterior dissolves + same-size blueprint reveals (the morph)

   The spec view has prev/next arrows that cycle the displayed jet title.
   Aircraft details, amenities and descriptions sourced from Clay Lacy Aviation. */

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CustomEase } from 'gsap/CustomEase'
import './FlyInLuxurySection.css'

gsap.registerPlugin(ScrollTrigger, CustomEase)

// Per-jet data drives both the initial "Fly in Luxury" slide and the spec carousel.
const JETS = [
  {
    brand: 'Bombardier Global', model: '7500',
    data: {
      desc: 'Bombardier’s flagship, the Global 7500 pairs the longest range in business aviation with four true living spaces and a private bedroom suite — powered by GE Passport engines and a smooth-riding wing.',
      overview: [
        ['Maximum operating range', '14,260 km'],
        ['Speed', '516 knots'],
        ['Passenger capacity', 'Up to 19 seats'],
        ['Sleeping capacity', 'Up to 6 berths'],
        ['Endurance', 'Up to 16 hrs'],
        ['Baggage capacity', '5.52 m³'],
        ['Cruising altitude', '15,545 m'],
      ],
      dims: [['Cabin length', '16.58 m'], ['Cabin Width', '2.44 m'], ['Cabin Height', '1.89 m'], ['Lavatories', '2'], ['Wi-Fi', 'Global High-Speed Starlink']],
      directTitle: 'Direct Access to Private Travel',
      directDesc: 'Engineered for performance, the Global 7500 offers an industry-leading range of 7,700 nautical miles, delivering nonstop access to premier destinations worldwide — with a lavish cabin of four distinct living zones designed for ultimate comfort and privacy.',
      amenities: ['Four Living Zones', 'Queen Bedroom Suite', 'Apple TV + 3 HD Monitors', 'Full Galley & Espresso', 'Pũr Air HEPA Filtration'],
    },
  },
  {
    brand: 'Gulfstream', model: 'G650ER',
    data: {
      desc: 'Renowned for its speed, range and luxury, the Gulfstream G650ER combines cutting-edge technology with one of the most spacious cabins in private aviation.',
      overview: [
        ['Maximum operating range', '13,890 km'],
        ['Speed', '516 knots'],
        ['Passenger capacity', 'Up to 19 seats'],
        ['Sleeping capacity', 'Up to 6 berths'],
        ['Endurance', 'Up to 15 hrs'],
        ['Baggage capacity', '5.52 m³'],
        ['Cruising altitude', '15,545 m'],
      ],
      dims: [['Cabin length', '14.26 m'], ['Cabin Width', '2.59 m'], ['Cabin Height', '1.98 m'], ['Lavatories', '2'], ['Wi-Fi', 'High-Speed Ku-band Wi-Fi']],
      directTitle: 'Direct Access to Private Travel',
      directDesc: 'The Gulfstream G650ER features one of the most spacious cabins in its class, delivering exceptional comfort for long-range travel and excelling at nonstop international routes, with destinations like Tokyo and Dubai readily accessible.',
      amenities: ['4 HD Monitors + Apple TV', 'Panoramic Cabin Windows', 'Executive Seating & Divans', 'Lie-Flat Beds', 'Full Galley & Nespresso'],
    },
  },
  {
    brand: 'Bombardier Global', model: '6000',
    data: {
      desc: 'Built around the Rolls-Royce BR710 engine and Bombardier’s smooth-riding wing, the Global 6000 pairs intercontinental range with a wide, three-zone cabin engineered for exceptional comfort and quiet.',
      overview: [
        ['Maximum operating range', '11,112 km'],
        ['Speed', '513 knots'],
        ['Passenger capacity', 'Up to 17 seats'],
        ['Sleeping capacity', 'Up to 6 berths'],
        ['Endurance', 'Up to 13 hrs'],
        ['Baggage capacity', '5.52 m³'],
        ['Cruising altitude', '15,545 m'],
      ],
      dims: [['Cabin length', '13.18 m'], ['Cabin Width', '2.49 m'], ['Cabin Height', '1.91 m'], ['Lavatories', '2'], ['Wi-Fi', 'Ka-band High-Speed Wi-Fi']],
      directTitle: 'Direct Access to Private Travel',
      directDesc: 'The Global 6000 perfectly blends all aspects of performance with a class-leading combination of range, speed and reliability — the largest business jet that can fly from Aspen to London City Airport non-stop.',
      amenities: ['Apple TV + HD Monitors', 'Swivel Berthing Seats', '180° Reclining Seats', 'Bluetooth Streaming', 'Full Galley & Nespresso'],
    },
  },
  {
    brand: 'Bombardier Global', model: '5500',
    data: {
      desc: 'Powered by next-generation Rolls-Royce Pearl 15 engines and a redesigned wing, the Global 5500 delivers more range, more speed and the widest cabin in its class.',
      overview: [
        ['Maximum operating range', '10,186 km'],
        ['Speed', '516 knots'],
        ['Passenger capacity', 'Up to 16 seats'],
        ['Sleeping capacity', 'Up to 4 berths'],
        ['Endurance', 'Up to 12 hrs'],
        ['Baggage capacity', '5.52 m³'],
        ['Cruising altitude', '15,545 m'],
      ],
      dims: [['Cabin length', '13.18 m'], ['Cabin Width', '2.41 m'], ['Cabin Height', '1.88 m'], ['Lavatories', '2'], ['Wi-Fi', 'Ka-band High-Speed Wi-Fi']],
      directTitle: 'Direct Access to Private Travel',
      directDesc: 'Re-engineered with Rolls-Royce Pearl 15 engines, the Global 5500 pairs more range and speed with the widest cabin in its class — flying New York to São Paulo or London to Cape Town non-stop at up to Mach 0.90.',
      amenities: ['Nuage Seating', 'Apple TV + HD Monitors', 'Pũr Air HEPA Filtration', 'Three Living Zones', 'Full Galley & Espresso'],
    },
  },
  {
    brand: 'Gulfstream', model: 'G550',
    data: {
      desc: 'Featuring an advanced wing and powered by Rolls-Royce BR710 engines, the Gulfstream G550 is engineered for exceptional ultra-long range and high-altitude, all-weather performance.',
      overview: [
        ['Maximum operating range', '12,501 km'],
        ['Speed', '488 knots'],
        ['Passenger capacity', 'Up to 16 seats'],
        ['Sleeping capacity', 'Up to 6 berths'],
        ['Endurance', 'Up to 14 hrs'],
        ['Baggage capacity', '6.38 m³'],
        ['Cruising altitude', '15,545 m'],
      ],
      dims: [['Cabin length', '15.27 m'], ['Cabin Width', '2.24 m'], ['Cabin Height', '1.88 m'], ['Lavatories', '2'], ['Wi-Fi', 'Satellite High-Speed Wi-Fi']],
      directTitle: 'Direct Access to Private Travel',
      directDesc: 'One of the most trusted aircraft in international business aviation, offering intercontinental range with a refined executive cabin and exceptional ultra-long-range capability for seamless global travel between major hubs worldwide.',
      amenities: ['Four Living Areas', '3 HD Monitors + Apple TV', 'Signature Oval Windows', 'Low Cabin Altitude', 'Full Galley & Espresso'],
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
        ['Sleeping capacity', 'Up to 6 berths'],
        ['Endurance', 'Up to 14 hrs'],
        ['Baggage capacity', '6.38 m³'],
        ['Cruising altitude', '15,545 m'],
      ],
      dims: [['Cabin length', '15.27 m'], ['Cabin Width', '2.21 m'], ['Cabin Height', '1.85 m'], ['Lavatories', '2'], ['Wi-Fi', 'High-Speed Satellite Wi-Fi']],
      directTitle: 'Direct Access to Private Travel',
      directDesc: 'The original ultra-long-range Gulfstream — it opened up non-stop city pairs across the globe and still cruises high above the weather at 51,000 ft with a spacious, quiet stand-up cabin.',
      amenities: ['HD Monitors + Airshow Map', 'Three Living Zones', '14 Oval Windows', 'Crew Rest Compartment', 'Full Galley & Espresso'],
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
        ['Sleeping capacity', 'Up to 4 berths'],
        ['Endurance', 'Up to 9 hrs'],
        ['Baggage capacity', '4.78 m³'],
        ['Cruising altitude', '13,716 m'],
      ],
      dims: [['Cabin length', '13.74 m'], ['Cabin Width', '2.24 m'], ['Cabin Height', '1.85 m'], ['Lavatories', '2'], ['Wi-Fi', 'Gogo AVANCE L5 Wi-Fi']],
      directTitle: 'Direct Access to Private Travel',
      directDesc: 'The GIV-SP is a premier domestic or international business jet, with non-recirculated fresh air, 12 panoramic windows and a low 6,000-foot cabin altitude for exceptional passenger comfort.',
      amenities: ['Gogo Vision Entertainment', '12 Panoramic Windows', 'Conference & Dining Table', 'Reclining Berthable Seats', 'Full Galley & Espresso'],
    },
  },
  {
    brand: 'Dassault Falcon', model: '7X',
    data: {
      desc: 'A three-engine long-range trijet, the Dassault Falcon 7X offers exceptional efficiency and the ability to access airports unavailable to many large-cabin jets while keeping superior cabin comfort.',
      overview: [
        ['Maximum operating range', '11,019 km'],
        ['Speed', '488 knots'],
        ['Passenger capacity', 'Up to 14 seats'],
        ['Sleeping capacity', 'Up to 4 berths'],
        ['Endurance', 'Up to 11 hrs'],
        ['Baggage capacity', '3.96 m³'],
        ['Cruising altitude', '15,545 m'],
      ],
      dims: [['Cabin length', '11.92 m'], ['Cabin Width', '2.35 m'], ['Cabin Height', '1.89 m'], ['Lavatories', '2'], ['Wi-Fi', 'SatCom Direct Wi-Fi']],
      directTitle: 'Direct Access to Private Travel',
      directDesc: 'The revolutionary Falcon 7X was the first private jet with an advanced Digital Flight Control System, excelling at reaching challenging destinations like London City and high-altitude airports such as Aspen with exceptional fuel efficiency.',
      amenities: ['HD Monitors + Airshow Map', '28 Large Windows', 'Flat-Floor Three-Zone Cabin', 'Digital Flight Controls', 'Full Galley & Nespresso'],
    },
  },
  {
    brand: 'Gulfstream', model: 'G500',
    data: {
      desc: 'The Gulfstream G500 blends advanced fly-by-wire technology with luxurious comfort and panoramic windows, making it a preferred choice for corporate and executive travel.',
      overview: [
        ['Maximum operating range', '9,816 km'],
        ['Speed', '516 knots'],
        ['Passenger capacity', 'Up to 19 seats'],
        ['Sleeping capacity', 'Up to 4 berths'],
        ['Endurance', 'Up to 11 hrs'],
        ['Baggage capacity', '4.96 m³'],
        ['Cruising altitude', '15,545 m'],
      ],
      dims: [['Cabin length', '12.68 m'], ['Cabin Width', '2.35 m'], ['Cabin Height', '1.89 m'], ['Lavatories', '2'], ['Wi-Fi', 'High-Speed Starlink Wi-Fi']],
      directTitle: 'Direct Access to Private Travel',
      directDesc: 'One of the world’s premier large-cabin, long-range business jets — capable of nonstop travel throughout the Western Hemisphere and to Europe, Africa, the Middle East or Asia, with effortless operations on short and high-altitude runways.',
      amenities: ['4K LED Monitors + Apple TV', '14 Panoramic Windows', 'Heated Massage VIP Seats', 'Streaming Apps', 'Full Galley & Espresso'],
    },
  },
  {
    brand: 'Dassault Falcon', model: '900EX',
    data: {
      desc: 'The three-engine Dassault Falcon 900EX combines versatility, performance and operating efficiency with excellent transcontinental capability and steep-approach access.',
      overview: [
        ['Maximum operating range', '8,797 km'],
        ['Speed', '480 knots'],
        ['Passenger capacity', 'Up to 14 seats'],
        ['Sleeping capacity', 'Up to 4 berths'],
        ['Endurance', 'Up to 9 hrs'],
        ['Baggage capacity', '3.60 m³'],
        ['Cruising altitude', '15,545 m'],
      ],
      dims: [['Cabin length', '10.12 m'], ['Cabin Width', '2.35 m'], ['Cabin Height', '1.89 m'], ['Lavatories', '2'], ['Wi-Fi', 'Gogo AVANCE L5 Wi-Fi']],
      directTitle: 'Direct Access to Private Travel',
      directDesc: 'The Falcon 900EX EASy offers a contemporary cabin designed for elevated comfort — a trijet built for over-water routing and shorter runways, with a quiet cabin and advanced thermal-acoustic insulation that reduces noise by up to 50 percent.',
      amenities: ['HD Monitors + Airshow Map', 'Three-Zone Flat-Floor Cabin', 'Three-Engine Reliability', 'Cabin Environment Controls', 'Full Galley — Hot & Cold'],
    },
  },
  {
    brand: 'Bombardier Challenger', model: '604',
    data: {
      desc: 'A popular large-cabin aircraft, the Bombardier Challenger 604 offers comfort, reliability and value for medium and long-range missions with an exceptionally wide cabin.',
      overview: [
        ['Maximum operating range', '7,408 km'],
        ['Speed', '459 knots'],
        ['Passenger capacity', 'Up to 12 seats'],
        ['Sleeping capacity', 'Up to 3 berths'],
        ['Endurance', 'Up to 8 hrs'],
        ['Baggage capacity', '3.26 m³'],
        ['Cruising altitude', '12,497 m'],
      ],
      dims: [['Cabin length', '8.63 m'], ['Cabin Width', '2.50 m'], ['Cabin Height', '1.86 m'], ['Lavatories', '1'], ['Wi-Fi', 'Gogo ATG Wi-Fi']],
      directTitle: 'Direct Access to Private Travel',
      directDesc: 'Bombardier designed the Challenger 604 with the primary goal of passenger comfort — an exceptionally wide cabin with transcontinental capability, enabling nonstop flights across most of the continental United States.',
      amenities: ['2 Monitors + Airshow Map', 'Wide Transcontinental Cabin', 'Fold-Out Work Tables', 'DVD Player', 'Full Galley — Hot & Cold'],
    },
  },
  {
    brand: 'Embraer Legacy', model: '600',
    data: {
      desc: 'The Embraer Legacy 600 provides exceptional cabin space and comfort across three distinct zones, making it ideal for corporate groups and family travel.',
      overview: [
        ['Maximum operating range', '6,297 km'],
        ['Speed', '453 knots'],
        ['Passenger capacity', 'Up to 13 seats'],
        ['Sleeping capacity', 'Up to 4 berths'],
        ['Endurance', 'Up to 7 hrs'],
        ['Baggage capacity', '6.80 m³'],
        ['Cruising altitude', '12,497 m'],
      ],
      dims: [['Cabin length', '12.95 m'], ['Cabin Width', '2.10 m'], ['Cabin Height', '1.83 m'], ['Lavatories', '1'], ['Wi-Fi', 'Gogo AVANCE L5 Wi-Fi']],
      directTitle: 'Direct Access to Private Travel',
      directDesc: 'Fly this domestic business jet in comfort and luxury, with up to 8.4 hours of flight time reaching destinations including Anchorage, Seattle, Honolulu, Mexico City and New York.',
      amenities: ['2 Monitors + Airshow Map', 'Three Cabin Zones', 'Fold-Out Work Tables', 'DVD Player', 'Full Galley — Hot & Cold'],
    },
  },
  {
    brand: 'Gulfstream', model: 'G280',
    data: {
      desc: 'Powered by Honeywell HTF7250G engines and an advanced transonic wing, the Gulfstream G280 combines class-leading speed, range and short-field capability.',
      overview: [
        ['Maximum operating range', '6,667 km'],
        ['Speed', '482 knots'],
        ['Passenger capacity', 'Up to 10 seats'],
        ['Sleeping capacity', 'Up to 4 berths'],
        ['Endurance', 'Up to 8 hrs'],
        ['Baggage capacity', '4.36 m³'],
        ['Cruising altitude', '13,716 m'],
      ],
      dims: [['Cabin length', '7.65 m'], ['Cabin Width', '2.18 m'], ['Cabin Height', '1.91 m'], ['Lavatories', '1'], ['Wi-Fi', 'Gogo AVANCE L5 Wi-Fi']],
      directTitle: 'Direct Access to Private Travel',
      directDesc: 'From its long range and high speeds to class-leading cabin height and fuel efficiency, the G280 represents a new standard in super-midsize business jets, delivering nonstop transatlantic capability with exceptional fuel economy.',
      amenities: ['HD Monitors + Airshow Map', '100% Fresh-Air Cabin', '19 Large Windows', 'Satellite Phone', 'Galley — Nespresso & Chiller'],
    },
  },
  {
    brand: 'Bombardier Challenger', model: '300',
    data: {
      desc: 'One of the most successful super-midsize business jets ever built, the Bombardier Challenger 300 offers excellent performance and a quiet, expansive flat-floor cabin.',
      overview: [
        ['Maximum operating range', '5,741 km'],
        ['Speed', '459 knots'],
        ['Passenger capacity', 'Up to 9 seats'],
        ['Sleeping capacity', 'Up to 3 berths'],
        ['Endurance', 'Up to 7 hrs'],
        ['Baggage capacity', '3.00 m³'],
        ['Cruising altitude', '13,716 m'],
      ],
      dims: [['Cabin length', '8.72 m'], ['Cabin Width', '2.19 m'], ['Cabin Height', '1.86 m'], ['Lavatories', '1'], ['Wi-Fi', 'Gogo AVANCE L5 Wi-Fi']],
      directTitle: 'Direct Access to Private Travel',
      directDesc: 'Fast, spacious and loaded with amenities, the Challenger 300 is one of the most popular super-midsize jets — operating at 45,000 feet with a quiet, expansive, airy cabin that rivals larger aircraft.',
      amenities: ['Gogo Vision 360 Entertainment', 'Two Bulkhead Monitors', 'Quiet, Expansive Cabin', 'Cabin Environment Controls', 'Galley — Microwave & Coffee'],
    },
  },
  {
    brand: 'Gulfstream', model: 'G200',
    data: {
      desc: 'Powered by Pratt & Whitney PW306A engines, the Gulfstream G200 offers a wide, stand-up super-midsize cabin with genuine transcontinental range.',
      overview: [
        ['Maximum operating range', '6,135 km'],
        ['Speed', '470 knots'],
        ['Passenger capacity', 'Up to 10 seats'],
        ['Sleeping capacity', 'Up to 3 berths'],
        ['Endurance', 'Up to 8 hrs'],
        ['Baggage capacity', '3.54 m³'],
        ['Cruising altitude', '13,716 m'],
      ],
      dims: [['Cabin length', '7.44 m'], ['Cabin Width', '2.18 m'], ['Cabin Height', '1.91 m'], ['Lavatories', '1'], ['Wi-Fi', 'Wi-Fi Connectivity']],
      directTitle: 'Direct Access to Private Travel',
      directDesc: 'A spacious super-midsize cabin with transcontinental reach — comfortable, capable and efficient for business travel across regions, with a wide stand-up cabin and proven reliability.',
      amenities: ['HD Monitor + Airshow Map', 'Stand-Up Flat-Floor Cabin', 'Refreshment Galley', 'Cabin Entertainment', 'Power Outlets Throughout'],
    },
  },
  {
    brand: 'Cessna Citation', model: 'Sovereign',
    data: {
      desc: 'The Cessna Citation Sovereign is known for its versatility, short-runway performance and a spacious, flat-floor midsize cabin.',
      overview: [
        ['Maximum operating range', '5,926 km'],
        ['Speed', '458 knots'],
        ['Passenger capacity', 'Up to 12 seats'],
        ['Endurance', 'Up to 6 hrs'],
        ['Baggage capacity', '3.82 m³'],
        ['Cruising altitude', '14,326 m'],
      ],
      dims: [['Cabin length', '7.71 m'], ['Cabin Width', '1.68 m'], ['Cabin Height', '1.74 m'], ['Lavatories', '1'], ['Wi-Fi', 'Gogo AVANCE L5 Wi-Fi']],
      directTitle: 'Direct Access to Private Travel',
      directDesc: 'The Citation Sovereign prides itself on passenger comfort and great value — a popular midsize charter choice that combines efficiency with performance suited to corporate travel.',
      amenities: ['Personal Cabin Monitors', 'Flat-Floor Cabin', 'Cabin Environment Controls', 'DVD/CD + Power Outlets', 'Galley — Microwave & Oven'],
    },
  },
  {
    brand: 'Hawker', model: '850XP',
    data: {
      desc: 'A reliable midsize business jet, the Hawker 850XP is ideal for regional and cross-country travel with a spacious, accommodating cabin.',
      overview: [
        ['Maximum operating range', '4,630 km'],
        ['Speed', '447 knots'],
        ['Passenger capacity', 'Up to 8 seats'],
        ['Sleeping capacity', 'Up to 2 berths'],
        ['Endurance', 'Up to 5 hrs'],
        ['Baggage capacity', '1.42 m³'],
        ['Cruising altitude', '12,497 m'],
      ],
      dims: [['Cabin length', '6.49 m'], ['Cabin Width', '1.83 m'], ['Cabin Height', '1.75 m'], ['Lavatories', '1'], ['Wi-Fi', 'Gogo AVANCE L5 Wi-Fi']],
      directTitle: 'Direct Access to Private Travel',
      directDesc: 'The Hawker 850XP offers a spacious, accommodating cabin with seating for 8 and two single beds — comfortable and dependable for regional and cross-country travel, reaching 41,000 feet to fly above turbulence.',
      amenities: ['Bulkhead Monitor + Airshow', 'Two Single Beds', 'Fwd Refreshment Center', 'Cabin Environment Controls', 'DVD/CD + Power Outlets'],
    },
  },
]
const DEFAULT_JET = JETS.findIndex((j) => j.brand === 'Gulfstream' && j.model === 'G550')

export default function FlyInLuxurySection() {
  const rootRef = useRef(null)
  const [jetIndex, setJetIndex] = useState(DEFAULT_JET)
  const jet = JETS[jetIndex]
  const data = jet.data

  const prevJet = () => setJetIndex((i) => (i - 1 + JETS.length) % JETS.length)
  const nextJet = () => setJetIndex((i) => (i + 1) % JETS.length)

  // Per-jet skeleton/floorplan image, named "Brand-Model.png" (spaces → hyphens).
  // Falls back to the generic blueprint if a jet's file is missing.
  const blueprintSrc = `/${jet.brand.replace(/\s+/g, '-')}-${String(jet.model).replace(/\s+/g, '-')}.png`

  // Shrink the large model name to fit its column so long names (e.g. "Sovereign",
  // "900EX") are never clipped.
  const modelRef = useRef(null)
  useLayoutEffect(() => {
    const fit = () => {
      const el = modelRef.current
      if (!el) return
      el.style.fontSize = ''
      const avail = el.parentElement?.clientWidth || 0
      if (avail && el.scrollWidth > avail) {
        const base = parseFloat(getComputedStyle(el).fontSize)
        el.style.fontSize = `${Math.floor((base * avail) / el.scrollWidth)}px`
      }
    }
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [jetIndex])

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
                    <div className="h2" ref={modelRef} style={{ marginTop: '1vw', whiteSpace: 'nowrap' }}>{jet.model}</div>
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
                    {data?.directTitle && (
                      <>
                        <h3 className="l1" style={{ margin: '0 0 1.2vw' }}>{data.directTitle}</h3>
                        <p className="p7">{data.directDesc}</p>
                      </>
                    )}
                    {data?.amenities && (
                      <div className="spec-amenities">
                        <div className="line-h" />
                        <h3 className="l1" style={{ margin: '1vw 0 0.9vw' }}>Amenities</h3>
                        <div className="amenity-grid">
                          {data.amenities.map((a) => (
                            <div className="l1 amenity-item" key={a}>{a}</div>
                          ))}
                        </div>
                      </div>
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
              <img className="blueprint" src={blueprintSrc} onError={(e) => { e.currentTarget.src = '/jet-blueprint.avif' }} alt="Private jet cabin blueprint" />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
