import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Brevo API key comes from the environment (.env locally — git-ignored — and a
// Vercel Environment Variable in production). Never hardcoded / committed.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const BREVO_API_KEY = (env.BREVO_API_KEY || '').trim()

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        // The enquiry/quote form POSTs here; the dev proxy forwards to Brevo
        // and attaches the api-key from the environment.
        '/api/brevo/send': {
          target: 'https://api.brevo.com',
          changeOrigin: true,
          secure: true,
          rewrite: () => '/v3/smtp/email',
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              if (BREVO_API_KEY) proxyReq.setHeader('api-key', BREVO_API_KEY)
              proxyReq.setHeader('accept', 'application/json')
              proxyReq.setHeader('content-type', 'application/json')
            })
          },
        },
      },
    },
  }
})
