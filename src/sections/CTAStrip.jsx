import { useNavigate } from 'react-router-dom'

export default function CTAStrip() {
  const navigate = useNavigate()

  return (
    <section style={{
      backgroundColor: '#F7F5F1',
      padding: '90px 40px',
      textAlign: 'center',
    }}>
      <h2 style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: 'clamp(28px, 3.4vw, 42px)',
        fontWeight: 400,
        color: '#142544',
        letterSpacing: '6px',
        textTransform: 'uppercase',
        lineHeight: 1.3,
        marginBottom: '36px',
      }}>
        Your Journey. Your Terms.<br />Uncompromising.
      </h2>

      <button
        onClick={() => navigate('/book')}
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '11px',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          fontWeight: 600,
          background: '#B8944F',
          color: '#FFFFFF',
          border: 'none',
          padding: '16px 40px',
          cursor: 'pointer',
          transition: 'all 0.3s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = '#D7B26A' }}
        onMouseLeave={e => { e.currentTarget.style.background = '#B8944F' }}
      >
        Book Now
      </button>
    </section>
  )
}
