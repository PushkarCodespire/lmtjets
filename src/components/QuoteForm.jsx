/* QuoteForm — "Request a Quote" inquiry form. On submit it emails the details
   via Brevo (through the Vite dev proxy at /api/brevo/send, which injects the
   API key server-side). Replies route back to the visitor. */

import { useState } from 'react'
import { fleet } from '../data/fleet.js'
import { routings } from '../data/routings.js'

const navy = '#142544'
const gold = '#B8944F'

// Brevo send: sender uses Brevo's auto-authenticated subdomain (SPF/DKIM/DMARC
// handled by Brevo — no DNS access needed) so Gmail/Yahoo don't block it.
// Switch to a sender on an authenticated lmtjets.com once DNS is set up.
const SENDER_EMAIL = 'kasapu@11407029.brevosend.com'
const SENDER_NAME = 'LMT Jets Website'
const TARGET_EMAIL = 'sagarkasapu2003@gmail.com'

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
    aircraft: defaults.aircraft || '', message: '',
  })
  // status: 'idle' | 'sending' | 'sent' | 'error'
  const [status, setStatus] = useState('idle')

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))
  const routeIdx = routings.findIndex(r => r.from === form.from && r.to === form.to)
  const roundTrip = form.tripType === 'Round-trip'

  const submit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending')

    const subject = `Private Jet Quote Request — ${form.from || 'TBD'} to ${form.to || 'TBD'}`
    const rows = [
      ['Name', form.name],
      ['Email', form.email],
      ['Phone', form.phone || '—'],
      ['Trip Type', form.tripType],
      ['From', form.from || '—'],
      ['To', form.to || '—'],
      ['Departure Date', form.depart || '—'],
      ...(roundTrip ? [['Return Date', form.returnDate || '—']] : []),
      ['Passengers', String(form.passengers)],
      ['Aircraft Preference', form.aircraft || 'No preference'],
      ['Message', form.message || '(none)'],
    ]
    const esc = (s) => String(s).replace(/[<>&]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]))
    const htmlContent =
      `<h2 style="font-family:Arial,sans-serif;color:#142544">New Quote Request</h2>` +
      `<table style="font-family:Arial,sans-serif;font-size:14px;color:#333;border-collapse:collapse">` +
      rows.map(([k, v]) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#888;vertical-align:top">${k}</td>` +
        `<td style="padding:6px 0"><strong>${esc(v)}</strong></td></tr>`).join('') +
      `</table>`

    try {
      const res = await fetch('/api/brevo/send', {
        method: 'POST',
        headers: { 'content-type': 'application/json', accept: 'application/json' },
        body: JSON.stringify({
          sender: { name: SENDER_NAME, email: SENDER_EMAIL },
          to: [{ email: TARGET_EMAIL }],
          ...(form.email ? { replyTo: { email: form.email, name: form.name || form.email } } : {}),
          subject,
          htmlContent,
        }),
      })
      if (!res.ok) throw new Error(`Brevo responded ${res.status}`)
      setStatus('sent')
      setTimeout(() => { if (onClose) onClose() }, 1800)
    } catch (err) {
      console.error('Quote send failed:', err)
      setStatus('error')
    }
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
          <button type="submit" disabled={status === 'sending' || status === 'sent'} style={{
            background: status === 'sending' || status === 'sent' ? '#C9B790' : gold,
            color: '#FFFFFF', border: 'none',
            padding: '12px 32px', fontFamily: 'Inter, sans-serif', fontSize: '11px',
            letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600,
            cursor: status === 'sending' || status === 'sent' ? 'default' : 'pointer',
            borderRadius: '8px', transition: 'background 0.3s',
          }}
            onMouseEnter={e => { if (status === 'idle' || status === 'error') e.currentTarget.style.background = '#A6833E' }}
            onMouseLeave={e => { if (status === 'idle' || status === 'error') e.currentTarget.style.background = gold }}>
            {status === 'sending' ? 'Sending…' : status === 'sent' ? 'Sent ✓' : 'Send Request →'}
          </button>
          {status === 'sent' && (
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: navy }}>
              Thank you — your request has been sent. We'll reply shortly.
            </span>
          )}
          {status === 'error' && (
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#B00020' }}>
              Sorry, something went wrong sending your request. Please try again or email {TARGET_EMAIL}.
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
