import { useNavigate } from 'react-router-dom'

export default function HeroSection() {
  const navigate = useNavigate()

  const scrollToFleet = () => {
    document.getElementById('fleet')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero-section">

      <video
        autoPlay
        loop
        muted
        playsInline
        src="/hero.mov"
        poster="/hero-bg.png"
        className="hero-video"
      />

      <div className="hero-gradient-left" />

      <div className="hero-gradient-bottom" />

      <div className="hero-content-wrap">
        <div className="hero-content">
          <p className="hero-item hero-tag">
            Private Aviation
          </p>

          <h1 className="hero-item hero-heading">
            Where<br />Luxury<br />Takes Off
          </h1>

          <p className="hero-item hero-sub">
            Private aviation designed around your schedule,
            your standards, and your destinations.
          </p>

          <div className="hero-item hero-buttons">
            <button
              onClick={() => navigate('/book')}
              className="hero-btn-primary"
            >
              Book Your Flight
            </button>
            <button
              onClick={scrollToFleet}
              className="hero-btn-secondary"
            >
              Explore Our Fleet
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          position: relative; width: 100%; height: 100vh; min-height: 100vh;
          overflow: hidden; background-color: #142544; margin: 0;
        }
        .hero-video {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          object-fit: cover; object-position: center center; display: block;
          transform: scale(1.04); transform-origin: center center;
        }
        .hero-gradient-left {
          position: absolute; inset: 0;
          background: linear-gradient(to right, #8fb8cf 0%, rgba(143,184,207,0) 54%);
        }
        .hero-gradient-bottom {
          position: absolute; left: 0; right: 0; bottom: 0; height: 34vh; z-index: 1;
          pointer-events: none;
          background: linear-gradient(to bottom, rgba(143,184,207,0) 0%, rgba(143,184,207,0.7) 62%, #8fb8cf 86%, #8fb8cf 100%);
        }
        .hero-content-wrap {
          position: relative; z-index: 2; min-height: 100vh;
          display: flex; flex-direction: column;
        }
        .hero-content {
          flex: 1; display: flex; flex-direction: column; justify-content: center;
          padding: 0 48px; max-width: 720px;
        }
        .hero-tag {
          font-family: Inter, sans-serif; font-size: 11.32px;
          font-weight: 400; letter-spacing: 4.12px;
          line-height: 16.98px; text-transform: uppercase;
          color: #E6C26D; margin-bottom: 20px;
        }
        .hero-heading {
          font-family: Arial, sans-serif; font-size: 90.54px;
          font-weight: 400; color: #FFFFFF;
          line-height: 86.01px; letter-spacing: -1.03px;
          text-transform: uppercase; margin-bottom: 24px;
        }
        .hero-sub {
          font-family: Inter, sans-serif; font-size: 24px;
          font-weight: 300; color: #FFFFFF;
          line-height: 28.57px; margin-bottom: 36px;
        }
        .hero-buttons {
          display: flex; gap: 14px; flex-wrap: wrap;
        }
        .hero-btn-primary {
          font-family: Inter, sans-serif; font-size: 14px;
          letter-spacing: 2.5px; text-transform: uppercase; font-weight: 600;
          background: #D2A567; color: #FFFFFF;
          border: none; padding: 16px 30px;
          cursor: pointer; transition: all 0.3s;
        }
        .hero-btn-primary:hover { background: #DDB67E; }
        .hero-btn-secondary {
          font-family: Inter, sans-serif; font-size: 14px;
          letter-spacing: 2.5px; text-transform: uppercase; font-weight: 500;
          background: transparent; color: rgba(255,255,255,0.85);
          border: 1px solid rgba(255,255,255,0.40);
          padding: 16px 31px; cursor: pointer; transition: all 0.3s;
        }
        .hero-btn-secondary:hover { border-color: #FFFFFF; }

        @media (max-width: 768px) {
          .hero-content {
            padding: 0 24px; max-width: 100%;
            justify-content: flex-end; padding-bottom: 18vh;
          }
          .hero-heading {
            font-size: clamp(40px, 12vw, 64px);
            line-height: 0.95; letter-spacing: -0.5px;
          }
          .hero-sub {
            font-size: 16px; line-height: 1.45;
            margin-bottom: 28px;
          }
          .hero-tag {
            font-size: 10px; letter-spacing: 3px; margin-bottom: 14px;
          }
          .hero-btn-primary, .hero-btn-secondary {
            font-size: 12px; padding: 14px 22px; letter-spacing: 2px;
            flex: 1; text-align: center; min-width: 0;
          }
          .hero-gradient-left {
            background: linear-gradient(to right, rgba(143,184,207,0.7) 0%, rgba(143,184,207,0) 70%);
          }
        }
      `}</style>
    </section>
  )
}
