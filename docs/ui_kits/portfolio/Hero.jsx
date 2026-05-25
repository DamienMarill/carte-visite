// Hero.jsx — Night-mode hero. Based on /V1/Home2.
const Hero = ({ onContact }) => {
  return (
    <section data-screen-label="Hero" style={{
      position: 'relative',
      minHeight: '84vh',
      padding: '80px 48px 120px',
      background: 'linear-gradient(180deg, #040404 0%, #282A49 100%)',
      color: 'white',
      overflow: 'hidden',
    }}>
      {/* stars */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, opacity: .35, pointerEvents: 'none' }}>
        {Array.from({ length: 42 }).map((_, i) => (
          <span key={i} style={{
            position: 'absolute',
            left: `${(i * 73) % 100}%`,
            top:  `${(i * 37 + 11) % 100}%`,
            width: (i % 5 === 0) ? 3 : 2,
            height: (i % 5 === 0) ? 3 : 2,
            borderRadius: '50%',
            background: 'white',
            opacity: ((i * 13) % 10) / 22 + .25,
          }} />
        ))}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.1fr .9fr',
        gap: 48,
        alignItems: 'center',
        maxWidth: 1500,
        margin: '80px auto 0',
        position: 'relative',
      }}>
        <div>
          <h1 style={{
            fontFamily: "'Lato', system-ui, sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(40px, 5vw, 80px)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            margin: 0,
            color: 'white',
          }}>
            Le code au service<br/>de la créativité.
          </h1>
          <p style={{
            fontFamily: "'Lato', system-ui, sans-serif",
            fontWeight: 500,
            fontSize: 'clamp(20px, 1.6vw, 28px)',
            color: '#A49CFF',
            marginTop: 28,
            maxWidth: 580,
            lineHeight: 1.35,
          }}>
            Transmettre, concevoir et innover avec vous.
          </p>
          <div style={{ marginTop: 40, display: 'flex', gap: 16, alignItems: 'center' }}>
            <button onClick={onContact} className="mrl-cta-primary" style={{
              padding: '16px 28px',
              borderRadius: 10,
              border: 'none',
              background: '#5A4DEB',
              color: 'white',
              fontFamily: "'Lato', system-ui, sans-serif",
              fontSize: 18, fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 160ms cubic-bezier(.2,0,.2,1)',
            }}>
              Prendre contact →
            </button>
            <a href="#projets" style={{
              color: 'white', fontFamily: "'Lato', system-ui, sans-serif",
              fontWeight: 500, fontSize: 18, textDecoration: 'underline', textUnderlineOffset: 4,
            }}>
              Voir les projets
            </a>
          </div>
        </div>

        <div style={{ position: 'relative', height: 480 }}>
          <Sparkler size={300} style={{ position: 'absolute', top: 10, right: 40 }} />
          <Sparkler size={160} delay={600} style={{ position: 'absolute', bottom: 20, left: 40 }} />
        </div>
      </div>
    </section>
  );
};

window.Hero = Hero;
