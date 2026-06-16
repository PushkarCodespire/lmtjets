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
  fontFamily: 'Inter, sans-serif', fontSize: '10px', letterSpacing: '2px',
  textTransform: 'uppercase', color: navy, fontWeight: 600, marginBottom: '7px', display: 'block',
}
const fieldStyle = {
  width: '100%', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: navy,
  padding: '12px 14px', border: '1px solid rgba(20,37,68,0.18)', borderRadius: '6px',
  outline: 'none', background: '#FFFFFF', boxSizing: 'border-box',
}

export default function QuoteForm({ defaults = {} }) {
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
      ...(form.tripType === 'Round-trip' ? [`Return Date: ${form.returnDate || '—'}`] : []),
      `Passengers: ${form.passengers}`,
      `Aircraft Preference: ${form.aircraft || 'No preference'}`,
      '',
      'Message:',
      form.message || '(none)',
    ]
    window.location.href =
      `mailto:${TARGET_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`
    setSent(true)
  }

  return (
    <section id="request-quote" style={{ padding: '0 48px 80px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{
          background: '#FFFFFF', border: '1px solid rgba(20,37,68,0.10)', borderRadius: '12px',
          padding: 'clamp(28px, 4vw, 48px)', boxShadow: '0 24px 60px rgba(20,37,68,0.18)',
        }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', color: gold, marginBottom: '12px', fontWeight: 600 }}>
          Request a Quote
        </p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 500, color: navy, marginBottom: '8px' }}>
          Tell us about your trip
        </h2>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#666', fontWeight: 300, lineHeight: 1.6, marginBottom: '32px', maxWidth: '520px' }}>
          Share a few details and our team will reply with a tailored quote — typically within 90 minutes.
        </p>

        <form onSubmit={submit}>
          <div className="quote-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px 24px' }}>
            <div>
              <label style={labelStyle}>Full Name *</label>
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
              <select style={{ ...fieldStyle, cursor: 'pointer' }} value={form.tripType} onChange={set('tripType')}>
                <option>One-way</option>
                <option>Round-trip</option>
              </select>
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>From → To</label>
              <select
                style={{ ...fieldStyle, cursor: 'pointer' }}
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
              <label style={labelStyle}>Departure Date</label>
              <input style={fieldStyle} type="date" value={form.depart} onChange={set('depart')} />
            </div>
            {form.tripType === 'Round-trip' ? (
              <div>
                <label style={labelStyle}>Return Date</label>
                <input style={fieldStyle} type="date" value={form.returnDate} onChange={set('returnDate')} />
              </div>
            ) : (
              <div>
                <label style={labelStyle}>Passengers</label>
                <select style={{ ...fieldStyle, cursor: 'pointer' }} value={form.passengers} onChange={set('passengers')}>
                  {Array.from({ length: 19 }, (_, i) => i + 1).map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
            )}
            {form.tripType === 'Round-trip' && (
              <div>
                <label style={labelStyle}>Passengers</label>
                <select style={{ ...fieldStyle, cursor: 'pointer' }} value={form.passengers} onChange={set('passengers')}>
                  {Array.from({ length: 19 }, (_, i) => i + 1).map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
            )}
            <div style={{ gridColumn: form.tripType === 'Round-trip' ? 'auto' : '1 / -1' }}>
              <label style={labelStyle}>Aircraft Preference</label>
              <select style={{ ...fieldStyle, cursor: 'pointer' }} value={form.aircraft} onChange={set('aircraft')}>
                <option value="">No preference</option>
                {fleet.map(a => <option key={a.id} value={a.name}>{a.name}</option>)}
              </select>
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Additional Requirements</label>
              <textarea style={{ ...fieldStyle, minHeight: '110px', resize: 'vertical' }} value={form.message} onChange={set('message')} placeholder="Catering, pets, ground transport, flexible dates…" />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '18px', flexWrap: 'wrap', marginTop: '28px' }}>
            <button type="submit" style={{
              background: gold, color: '#FFFFFF', border: 'none',
              padding: '15px 40px', fontFamily: 'Inter, sans-serif', fontSize: '11px',
              letterSpacing: '2.5px', textTransform: 'uppercase', fontWeight: 600,
              cursor: 'pointer', borderRadius: '4px', transition: 'background 0.3s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = '#A6833E'}
              onMouseLeave={e => e.currentTarget.style.background = gold}>
              Send Request →
            </button>
            {sent && (
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: navy }}>
                Your email app should now open with the details — just hit send.
              </span>
            )}
          </div>
        </form>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          #request-quote { padding: 0 5vw 60px !important; }
          .quote-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
