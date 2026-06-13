/* Globe3D — interactive WebGL globe (globe.gl) matching the Jesko reference:
   dark sphere with silver continents (globe-map.svg) and gold flight arcs.
   Auto-rotates; rotation speeds up while scrolling and eases back to normal. */

import { useEffect, useRef } from 'react'
import Globe from 'globe.gl'
import * as THREE from 'three'

const BASE_SPEED = 0.8       // normal auto-rotate speed
const MAX_SPEED = 11         // cap while scrolling fast
const ARC_COLOR = ['rgba(233,199,150,0)', '#E9C796', 'rgba(233,199,150,0)']

const rand = (n) => (Math.random() - 0.5) * n

export default function Globe3D({ className }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const arcs = Array.from({ length: 14 }, () => ({
      startLat: rand(150), startLng: rand(360),
      endLat: rand(150), endLng: rand(360),
      color: ARC_COLOR,
    }))
    const points = arcs.flatMap((a) => [
      { lat: a.startLat, lng: a.startLng },
      { lat: a.endLat, lng: a.endLng },
    ])

    const world = Globe()(el)
      .globeImageUrl('/globe-map.svg')
      .backgroundColor('rgba(0,0,0,0)')
      .showAtmosphere(false)
      .width(el.clientWidth)
      .height(el.clientHeight)
      .arcsData(arcs)
      .arcColor('color')
      .arcStroke(0.4)
      .arcDashLength(0.5)
      .arcDashGap(0.22)
      .arcDashAnimateTime(6000)
      .arcsTransitionDuration(0)
      .pointsData(points)
      .pointColor(() => '#E9C796')
      .pointAltitude(0)
      .pointRadius(0.42)
      .pointResolution(8)

    // dark, matte sphere
    const mat = world.globeMaterial()
    mat.color = new THREE.Color('#0c1422')
    mat.shininess = 2
    mat.specular = new THREE.Color('#10325a')

    world.pointOfView({ lat: 12, lng: -40, altitude: 2.1 })

    const controls = world.controls()
    controls.enableZoom = false
    controls.enablePan = false
    controls.autoRotate = true
    controls.autoRotateSpeed = BASE_SPEED

    // ── scroll → speed boost, eases back ──
    let speed = BASE_SPEED
    let lastY = window.scrollY
    const onWheel = (e) => { speed = Math.min(speed + Math.abs(e.deltaY) * 0.018, MAX_SPEED) }
    const onScroll = () => {
      const y = window.scrollY
      speed = Math.min(speed + Math.abs(y - lastY) * 0.03, MAX_SPEED)
      lastY = y
    }
    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })

    let raf
    const tick = () => {
      controls.autoRotateSpeed = speed
      speed += (BASE_SPEED - speed) * 0.045   // ease back to normal
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const onResize = () => world.width(el.clientWidth).height(el.clientHeight)
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      if (typeof world._destructor === 'function') world._destructor()
      el.innerHTML = ''
    }
  }, [])

  return <div ref={ref} className={className} style={{ width: '100%', height: '100%' }} />
}
