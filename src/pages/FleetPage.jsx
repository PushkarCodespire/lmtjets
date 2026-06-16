import { useState } from 'react'
import { motion } from 'framer-motion'
import FlipCard from '../components/FlipCard.jsx'
import { fleet } from '../data/fleet.js'

const categories = ['All', 'Light', 'Midsize', 'Super Midsize', 'Heavy', 'Ultra Long Range']

export default function FleetPage() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = fleet.filter((a) =>
    activeFilter === 'All'
      ? true
      : a.category.toLowerCase().includes(activeFilter.toLowerCase())
  )

  return (
    <div>
      {/* Hero Strip */}
      <div className="relative h-[50vh] bg-[#0B1728] flex items-end pb-12 px-8 md:px-16 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&q=80"
          alt="Fleet"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[#C9973A] text-[11px] tracking-[4px] uppercase mb-3"
          >
            ✦ La Mondiale Tours
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-white font-thin uppercase"
            style={{ fontSize: 'clamp(30px, 4vw, 45px)', letterSpacing: '0.08em' }}
          >
            OUR FLEET
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-white/60 text-sm font-light mt-2"
          >
            An exceptional charter fleet — choose your perfect journey.
          </motion.p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-[#0F2035] border-b border-white/10 px-6 py-6">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-3 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`text-[11px] font-bold tracking-[2px] uppercase rounded-full px-5 py-2 border transition-all duration-300 ${
                activeFilter === cat
                  ? 'bg-[#C9973A] border-[#C9973A] text-[#0B1728]'
                  : 'border-white/20 text-white/60 hover:border-[#C9973A] hover:text-[#C9973A]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Fleet Grid */}
      <section className="bg-[#0B1728] py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {filtered.length === 0 ? (
            <p className="text-white/50 text-center py-20">No aircraft match the selected category.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filtered.map((aircraft, i) => (
                <motion.div
                  key={aircraft.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <FlipCard aircraft={aircraft} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
