import { useNavigate } from 'react-router-dom'

export default function HeroSection() {
  const navigate = useNavigate()

  const scrollToFleet = () => {
    document.getElementById('fleet')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section style={{ position: 'relative', width: '100%', height: '100vh', minHeight: '100vh', overflow: 'hidden', backgroundColor: '#142544', margin: 0 }}>

      {/* Background video — loops, muted, autoplay */}
      <video
        autoPlay
        loop
        muted
        playsInline
        src="/hero-video.mp4"
        poster="/hero-bg.png"
        style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          objectPosition: 'center center',
          display: 'block',
          transform: 'scale(1.04)',
          transformOrigin: 'center center',
        }}
      />

      {/* Left-side gradient overlay (like Figma Rectangle 38) */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to right, #0b1c4d 0%, rgba(20,37,68,0) 54%)',
      }} />

      {/* Content wrapper */}
      <div style={{
        position: 'relative', zIndex: 2,
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column',
      }}>

        {/* Hero content — center-left */}
        <div style={{
          flex: 1,
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: '0 48px',
          maxWidth: '720px',
        }}>
          <p className="hero-item" style={{
            fontFamily: 'Inter, sans-serif', fontSize: '11.32px',
            fontWeight: 400, letterSpacing: '4.12px',
            lineHeight: '16.98px', textTransform: 'uppercase',
            color: '#E6C26D', marginBottom: '20px',
            animationDelay: '0.15s',
          }}>
            Private Aviation
          </p>

          <h1 className="hero-item" style={{
            fontFamily: 'Arial, sans-serif',
            fontSize: '90.54px',
            fontWeight: 400, color: '#FFFFFF',
            lineHeight: '86.01px', letterSpacing: '-1.03px',
            textTransform: 'uppercase', marginBottom: '24px',
            animationDelay: '0.35s',
          }}>
            Where<br />Luxury<br />Takes Off
          </h1>

          <p className="hero-item" style={{
            fontFamily: 'Inter, sans-serif', fontSize: '24px',
            fontWeight: 300, color: '#FFFFFF',
            lineHeight: '28.57px', marginBottom: '36px',
            whiteSpace: 'nowrap',
            animationDelay: '0.55s',
          }}>
            Private aviation designed around your schedule,<br />
            your standards, and your destinations.
          </p>

          {/* Buttons */}
          <div className="hero-item" style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', animationDelay: '0.7s' }}>
            <button
              onClick={() => navigate('/book')}
              style={{
                fontFamily: 'Inter, sans-serif', fontSize: '14px',
                letterSpacing: '2.5px', textTransform: 'uppercase', fontWeight: 600,
                background: '#D2A567', color: '#FFFFFF',
                border: 'none', padding: '16px 30px',
                cursor: 'pointer', transition: 'all 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#DDB67E' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#D2A567' }}
            >
              Book Your Flight
            </button>
            <button
              onClick={scrollToFleet}
              style={{
                fontFamily: 'Inter, sans-serif', fontSize: '14px',
                letterSpacing: '2.5px', textTransform: 'uppercase', fontWeight: 500,
                background: 'transparent', color: 'rgba(255,255,255,0.85)',
                border: '1px solid rgba(255,255,255,0.40)',
                padding: '16px 31px', cursor: 'pointer', transition: 'all 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#FFFFFF' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.40)' }}
            >
              Explore Our Fleet
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
