const items = [
  {
    label: 'Est. 2018',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
  },
  {
    label: 'Farmingdale, NY',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
  },
  {
    label: '24/7 Concierge',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.86 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.77 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91A16 16 0 0 0 15 16.09l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
  },
  {
    label: 'VIP Handling',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
  },
]

export default function TrustBar() {
  return (
    <div style={{
      backgroundColor: '#142544',
      height: '64px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0',
      overflow: 'hidden',
    }}>
      {items.map((item, i) => (
        <div key={item.label} style={{ display: 'flex', alignItems: 'center' }}>

          {/* Item */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '0 28px',
          }}>
            <span style={{ color: '#B8944F', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              {item.icon}
            </span>
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '10px',
              letterSpacing: '2.5px',
              textTransform: 'uppercase',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.55)',
              whiteSpace: 'nowrap',
            }}>
              {item.label}
            </span>
          </div>

          {/* Gold separator — not after last */}
          {i < items.length - 1 && (
            <div style={{
              width: '1px',
              height: '18px',
              backgroundColor: 'rgba(184,148,79,0.35)',
              flexShrink: 0,
            }} />
          )}
        </div>
      ))}
    </div>
  )
}
