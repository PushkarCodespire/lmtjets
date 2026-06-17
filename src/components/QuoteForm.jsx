/* QuoteForm — "Request a Quote" inquiry form. On submit it opens the visitor's
   email client with all details pre-filled, addressed to the LMT inbox. */

import { useState } from 'react'
import { fleet } from '../data/fleet.js'
import { routings } from '../data/routings.js'

const navy = '#142544'
const gold = '#B8944F'

// Target inbox for quote requests.
const TARGET_EMAIL = 'pushkar@codespiresolutions.com'

const labelStyle = {
  fontFamily: 'Inter, sans-serif', fontSize: '9px', letterSpacing: '1.5px',
  textTransform: 'uppercase', color: 'rgba(20,37,68,0.55)', fontWeight: 600,
  marginBottom: '5px', display: 'block', whiteSpace: 'nowrap',
}
const fieldStyle = {
  width: '100%', height: '42px', fontFamily: 'Inter, sans-serif', fontSize: '13px', color: navy,
  padding: '0 2px', border: 'none', borderBottom: '1px solid rgba(20,37,68,0.20)', borderRadius: 0,
  outline: 'none', background: 'transparent', boxSizing: 'border-box', transition: 'border-color 0.2s',
  appearance: 'none', WebkitAppearance: 'none',
}
const CHEVRON = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10' fill='none' stroke='%23B8944F' stroke-width='1.5'><polyline points='2 4 5 7 8 4'/></svg>"
const selectStyle = {
  ...fieldStyle, cursor: 'pointer', paddingRight: '20px',
  backgroundImage: `url("${CHEVRON}")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 2px center',
}

export default function QuoteForm({ defaults = {}, onClose }) {
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    tripType: 'One-way',
    from: defaults.from || '', to: defaults.to || '',
    depart: defaults.date || '', returnDate: '',
    passengers: defaults.passengers || 1,
    aircraft: '', message: '',
  })
  const [sent, setSent] = useState(false)

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))
  const routeIdx = routings.findIndex(r => r.from === form.from && r.to === form.to)
  const roundTrip = form.tripType === 'Round-trip'

  const submit = (e) => {
    e.preventDefault()
    const subject = `Private Jet Quote Request — ${form.from || 'TBD'} to ${form.to || 'TBD'}`
    const lines = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone || '—'}`,
      '',
      `Trip Type: ${form.tripType}`,
      `From: ${form.from || '—'}`,
      `To: ${form.to || '—'}`,
      `Departure Date: ${form.depart || '—'}`,
      ...(roundTrip ? [`Return Date: ${form.returnDate || '—'}`] : []),
      `Passengers: ${form.passengers}`,
      `Aircraft Preference: ${form.aircraft || 'No preference'}`,
      '',
      'Message:',
      form.message || '(none)',
    ]
    window.location.href =
      `mailto:${TARGET_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`
    setSent(true)
    if (onClose) onClose()
  }

  return (
    <div id="request-quote" style={{ width: '60vw', maxWidth: '880px' }}>
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: gold, marginBottom: '8px', fontWeight: 600 }}>
        Request a Quote
      </p>
      <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(22px, 2.4vw, 30px)', fontWeight: 500, color: navy, marginBottom: '4px' }}>
        Tell us about your trip
      </h2>
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#777', fontWeight: 300, marginBottom: '24px' }}>
        We'll reply with a tailored quote, typically within 90 minutes.
      </p>

      <form onSubmit={submit}>
        <div className="quote-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 16px' }}>
          <div>
            <label style={labelStyle}>Name *</label>
            <input style={fieldStyle} type="text" required value={form.name} onChange={set('name')} placeholder="Jane Doe" />
          </div>
          <div>
            <label style={labelStyle}>Email *</label>
            <input style={fieldStyle} type="email" required value={form.email} onChange={set('email')} placeholder="jane@email.com" />
          </div>
          <div>
            <label style={labelStyle}>Phone</label>
            <input style={fieldStyle} type="tel" value={form.phone} onChange={set('phone')} placeholder="+1 (555) 000-0000" />
          </div>
          <div>
            <label style={labelStyle}>Trip Type</label>
            <select style={selectStyle} value={form.tripType} onChange={set('tripType')}>
              <option>One-way</option>
              <option>Round-trip</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>From → To</label>
            <select
              style={selectStyle}
              value={routeIdx === -1 ? '' : String(routeIdx)}
              onChange={(e) => {
                const v = e.target.value
                const r = v === '' ? { from: '', to: '' } : routings[Number(v)]
                setForm(f => ({ ...f, from: r.from, to: r.to }))
              }}
            >
              <option value="">Select a route…</option>
              {routings.map((r, i) => (
                <option key={`${r.from}-${r.to}-${i}`} value={i}>{r.from} → {r.to}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Aircraft</label>
            <select style={selectStyle} value={form.aircraft} onChange={set('aircraft')}>
              <option value="">No preference</option>
              {fleet.map(a => <option key={a.id} value={a.name}>{a.name}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Departure</label>
            <input style={fieldStyle} type="date" value={form.depart} onChange={set('depart')} />
          </div>
          {roundTrip && (
            <div>
              <label style={labelStyle}>Return</label>
              <input style={fieldStyle} type="date" value={form.returnDate} onChange={set('returnDate')} />
            </div>
          )}
          <div>
            <label style={labelStyle}>Passengers</label>
            <select style={selectStyle} value={form.passengers} onChange={set('passengers')}>
              {Array.from({ length: 19 }, (_, i) => i + 1).map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={labelStyle}>Notes</label>
            <textarea style={{ ...fieldStyle, height: 'auto', minHeight: '64px', padding: '8px 2px', resize: 'vertical' }} value={form.message} onChange={set('message')} placeholder="Catering, pets, ground transport, flexible dates…" />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', marginTop: '20px' }}>
          <button type="submit" style={{
            background: gold, color: '#FFFFFF', border: 'none',
            padding: '12px 32px', fontFamily: 'Inter, sans-serif', fontSize: '11px',
            letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600,
            cursor: 'pointer', borderRadius: '8px', transition: 'background 0.3s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = '#A6833E'}
            onMouseLeave={e => e.currentTarget.style.background = gold}>
            Send Request →
          </button>
          {sent && (
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: navy }}>
              Your email app should now open — just hit send.
            </span>
          )}
        </div>
      </form>

      <style>{`
        #request-quote input:focus,
        #request-quote select:focus,
        #request-quote textarea:focus { border-color: ${gold}; }
        @media (max-width: 640px) {
          #request-quote { width: 90vw !important; }
          .quote-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
