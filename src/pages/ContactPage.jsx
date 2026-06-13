import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EnquiryModal } from '../sections/ContactSection.jsx'

export default function ContactPage() {
  const [showModal, setShowModal] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormSubmitted(true)
  }

  return (
    <div className="bg-[#0B1728] min-h-screen">
      {/* Hero */}
      <div className="relative h-[40vh] flex items-end pb-12 px-8 md:px-16 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&q=80"
          alt="Contact"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-[#0B1728]/50" />
        <div className="relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#C9973A] text-[11px] tracking-[4px] uppercase mb-3"
          >
            ✦ Available 24/7
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-white font-thin uppercase"
            style={{ fontSize: 'clamp(26px, 4vw, 40px)', letterSpacing: '0.08em' }}
          >
            GET IN TOUCH
          </motion.h1>
        </div>
      </div>

      {/* Contact Cards */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-[#0F2035] border border-white/10 rounded-lg p-8 text-center hover:border-[#C9973A]/50 transition-all duration-300">
            <div className="text-3xl mb-4">📞</div>
            <h3 className="text-white text-[13px] font-bold tracking-[2px] uppercase mb-2">CALL US</h3>
            <p className="text-white/60 text-sm mb-1">+1 (888) 929-2298</p>
            <p className="text-white/40 text-[12px] mb-5">24/7 concierge line</p>
            <a href="tel:+18889292298" className="inline-block border border-[#C9973A] text-[#C9973A] text-[11px] font-bold tracking-[2px] uppercase rounded-full px-6 py-2 hover:bg-[#C9973A] hover:text-[#0B1728] transition-all duration-300">
              CALL NOW →
            </a>
          </div>
          <div className="bg-[#0F2035] border border-white/10 rounded-lg p-8 text-center hover:border-[#C9973A]/50 transition-all duration-300">
            <div className="text-3xl mb-4">💬</div>
            <h3 className="text-white text-[13px] font-bold tracking-[2px] uppercase mb-2">WHATSAPP</h3>
            <p className="text-white/60 text-sm mb-1">+1 (646) 420-0679</p>
            <p className="text-white/40 text-[12px] mb-5">Instant messaging</p>
            <a href="https://wa.me/16464200679" target="_blank" rel="noopener noreferrer" className="inline-block border border-[#C9973A] text-[#C9973A] text-[11px] font-bold tracking-[2px] uppercase rounded-full px-6 py-2 hover:bg-[#C9973A] hover:text-[#0B1728] transition-all duration-300">
              CHAT NOW →
            </a>
          </div>
          <div className="bg-[#0F2035] border border-white/10 rounded-lg p-8 text-center hover:border-[#C9973A]/50 transition-all duration-300">
            <div className="text-3xl mb-4">✉</div>
            <h3 className="text-white text-[13px] font-bold tracking-[2px] uppercase mb-2">EMAIL</h3>
            <p className="text-white/60 text-sm mb-1">info@lmtjets.com</p>
            <p className="text-white/40 text-[12px] mb-5">90-min response guarantee</p>
            <a href="mailto:info@lmtjets.com" className="inline-block border border-[#C9973A] text-[#C9973A] text-[11px] font-bold tracking-[2px] uppercase rounded-full px-6 py-2 hover:bg-[#C9973A] hover:text-[#0B1728] transition-all duration-300">
              EMAIL US →
            </a>
          </div>
        </div>

        {/* Embedded Form */}
        <div className="bg-[#0F2035] border border-white/10 rounded-xl p-8 md:p-12">
          <h2 className="text-white text-xl font-light tracking-[3px] uppercase mb-2">Request Information</h2>
          <div className="h-[2px] w-12 bg-[#C9973A] mb-8" />

          {formSubmitted ? (
            <div className="text-center py-12">
              <div className="text-[#C9973A] text-5xl mb-4">✓</div>
              <p className="text-white text-xl font-light mb-2">Enquiry Received</p>
              <p className="text-white/60">We'll be in touch within 90 minutes.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-white/50 text-[10px] tracking-[2px] uppercase block mb-2">First Name *</label>
                  <input required type="text" placeholder="John" className="w-full bg-white/5 border border-white/10 rounded text-white text-sm px-4 py-3 focus:outline-none focus:border-[#C9973A] placeholder-white/20" />
                </div>
                <div>
                  <label className="text-white/50 text-[10px] tracking-[2px] uppercase block mb-2">Last Name *</label>
                  <input required type="text" placeholder="Doe" className="w-full bg-white/5 border border-white/10 rounded text-white text-sm px-4 py-3 focus:outline-none focus:border-[#C9973A] placeholder-white/20" />
                </div>
                <div>
                  <label className="text-white/50 text-[10px] tracking-[2px] uppercase block mb-2">Email *</label>
                  <input required type="email" placeholder="john@company.com" className="w-full bg-white/5 border border-white/10 rounded text-white text-sm px-4 py-3 focus:outline-none focus:border-[#C9973A] placeholder-white/20" />
                </div>
                <div>
                  <label className="text-white/50 text-[10px] tracking-[2px] uppercase block mb-2">Phone</label>
                  <input type="tel" placeholder="+1 (212) 000-0000" className="w-full bg-white/5 border border-white/10 rounded text-white text-sm px-4 py-3 focus:outline-none focus:border-[#C9973A] placeholder-white/20" />
                </div>
                <div>
                  <label className="text-white/50 text-[10px] tracking-[2px] uppercase block mb-2">From City</label>
                  <input type="text" placeholder="New York, NY" className="w-full bg-white/5 border border-white/10 rounded text-white text-sm px-4 py-3 focus:outline-none focus:border-[#C9973A] placeholder-white/20" />
                </div>
                <div>
                  <label className="text-white/50 text-[10px] tracking-[2px] uppercase block mb-2">To City</label>
                  <input type="text" placeholder="London, UK" className="w-full bg-white/5 border border-white/10 rounded text-white text-sm px-4 py-3 focus:outline-none focus:border-[#C9973A] placeholder-white/20" />
                </div>
              </div>
              <div>
                <label className="text-white/50 text-[10px] tracking-[2px] uppercase block mb-2">Message</label>
                <textarea rows={4} placeholder="Tell us about your travel requirements..." className="w-full bg-white/5 border border-white/10 rounded text-white text-sm px-4 py-3 focus:outline-none focus:border-[#C9973A] placeholder-white/20 resize-none" />
              </div>
              <button type="submit" className="w-full md:w-auto border border-[#C9973A] text-[#C9973A] text-[12px] font-bold tracking-[2px] uppercase rounded-full px-12 py-4 hover:bg-[#C9973A] hover:text-[#0B1728] transition-all duration-300">
                SUBMIT ENQUIRY →
              </button>
            </form>
          )}
        </div>

        {/* Address */}
        <div className="text-center mt-12 text-white/40 text-[13px] font-light space-y-1">
          <p>📍 Republic Airport (FRG), Farmingdale, NY 11735</p>
          <p>✉ info@lmtjets.com | 📞 +1 (888) 929-2298</p>
        </div>
      </div>

      <AnimatePresence>
        {showModal && <EnquiryModal onClose={() => setShowModal(false)} />}
      </AnimatePresence>
    </div>
  )
}
