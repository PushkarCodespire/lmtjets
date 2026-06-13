import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import HomePage from './pages/HomePage.jsx'
import FleetDetailPage from './pages/FleetDetailPage.jsx'
import BookNowPage from './pages/BookNowPage.jsx'

gsap.registerPlugin(ScrollTrigger)

function App() {
  // Initialize Lenis smooth scroll, synced with GSAP ScrollTrigger (Jesko's secret sauce)
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
      <Navbar />
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
