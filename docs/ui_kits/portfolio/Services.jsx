// Services.jsx — three paper cards.
const Services = () => {
  const items = [
    { k: '01', t: 'Concevoir',   d: 'Des interfaces qui respirent. Sur-mesure, avec vous, des premiers schémas jusqu\u2019aux pixels.' },
    { k: '02', t: 'Transmettre', d: 'Ateliers, mentorat, code reviews. Je laisse derrière moi une équipe plus autonome qu\u2019avant.' },
    { k: '03', t: 'Innover',     d: 'Prototypes rapides, exploration, petites promesses tenues. Le bon risque, pris ensemble.' },
  ];
  return (
    <section id="services" data-screen-label="Services" style={{
      background: '#FAFAF7',
      padding: '120px 48px',
    }}>
      <div style={{ maxWidth: 1500, margin: '0 auto' }}>
        <h2 style={{
          fontFamily: "'Lato', system-ui, sans-serif",
          fontWeight: 700,
          fontSize: 'clamp(40px, 4vw, 64px)',
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
          margin: 0,
          color: '#1E1E1E',
        }}>Mes services</h2>
        <p style={{
          fontFamily: "'Lato', system-ui, sans-serif",
          color: '#525252', fontSize: 20, maxWidth: 640, marginTop: 16, lineHeight: 1.5,
        }}>
          Trois postures, toujours combinées. Pas de produit en kit — chaque collaboration commence par une conversation.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 24,
          marginTop: 64,
        }}>
          {items.map(it => (
            <article key={it.k} className="mrl-service-card" style={{
              background: 'white',
              borderRadius: 4,
              padding: 32,
              boxShadow: '0 2px 6px rgba(0,0,0,.10), 0 0 2px rgba(0,0,0,.08), 0 0 0 1px rgba(0,0,0,.06)',
              transition: 'all 220ms cubic-bezier(.2,0,.2,1)',
            }}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 14, color: '#5A4DEB', letterSpacing: '.08em',
              }}>{it.k}</div>
              <h3 style={{
                fontFamily: "'Lato', system-ui, sans-serif",
                fontWeight: 700, fontSize: 32, marginTop: 16, marginBottom: 12,
                color: '#1E1E1E', letterSpacing: '-0.02em',
              }}>{it.t}</h3>
              <p style={{
                fontFamily: "'Lato', system-ui, sans-serif",
                fontSize: 17, lineHeight: 1.5, color: '#525252', margin: 0,
              }}>{it.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

window.Services = Services;
