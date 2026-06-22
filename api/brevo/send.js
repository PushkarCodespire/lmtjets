// Vercel Serverless Function — handles the quote/enquiry form submission in
// PRODUCTION. The browser POSTs the Brevo payload to /api/brevo/send; this
// function attaches the API key (server-side, never exposed to the client) and
// forwards it to Brevo. Vercel auto-deploys any file under /api.
// Set BREVO_API_KEY in the Vercel project's Environment Variables.
const BREVO_API_KEY = process.env.BREVO_API_KEY

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  if (!BREVO_API_KEY) {
    res.status(500).json({ error: 'BREVO_API_KEY is not configured on the server' })
    return
  }

  try {
    const payload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body

    const r = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': BREVO_API_KEY,
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const data = await r.json().catch(() => ({}))
    res.status(r.status).json(data)
  } catch (err) {
    res.status(500).json({ error: String(err) })
  }
}
