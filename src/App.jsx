import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import HomePage from './pages/HomePage.jsx'
import FleetDetailPage from './pages/FleetDetailPage.jsx'
import BookNowPage from './pages/BookNowPage.jsx'
import AnimatedLogo from './components/AnimatedLogo.jsx'

gsap.registerPlugin(ScrollTrigger)

// Scroll to top on every route (pathname) change — hash navigations are left
// alone so in-page anchor scrolling still works.
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function App() {
  const [splashDone, setSplashDone] = useState(false)
  const [splashFading, setSplashFading] = useState(false)

  const handleSplashComplete = () => {
    setSplashFading(true)
    setTimeout(() => setSplashDone(true), 600)
  }

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    })
    window.__lenis = lenis

    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [])

  return (
    <div className="min-h-screen">
      {!splashDone && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: '#FFF8ED',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: splashFading ? 0 : 1,
            transition: 'opacity 0.6s ease',
            pointerEvents: splashFading ? 'none' : 'auto',
          }}
        >
          <AnimatedLogo width={260} onComplete={handleSplashComplete} />
        </div>
      )}
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/fleet/:id" element={<FleetDetailPage />} />
        <Route path="/book" element={<BookNowPage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
