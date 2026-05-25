// Testimonials.jsx — "Ils m'ont fait confiance" quote rail.
const Testimonials = () => {
  const quotes = [
    { q: 'Une écoute rare, une exécution calme. Le genre de collaboration qu\u2019on raconte.', a: 'Camille B.', r: 'Direction produit, atelier indépendant' },
    { q: 'Il ne nous a pas juste livré un site. Il nous a laissé une équipe qui comprend ce qu\u2019elle fait.',  a: 'Mathieu R.', r: 'Cofondateur, studio Nuit étincelle' },
    { q: 'Pragmatique, drôle, exigeant. Dans cet ordre, et au bon moment.', a: 'Léa F.',     r: 'Designer, ville d\u2019Orvault' },
  ];
  return (
    <section id="confiance" data-screen-label="Confiance" style={{
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
        }}>Ils m'ont fait confiance</h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 24,
          marginTop: 56,
        }}>
          {quotes.map((q, i) => (
            <figure key={i} style={{
              margin: 0,
              padding: 28,
              background: 'white',
              borderRadius: 4,
              boxShadow: '0 2px 6px rgba(0,0,0,.10), 0 0 2px rgba(0,0,0,.08), 0 0 0 1px rgba(0,0,0,.06)',
            }}>
              <img src="../../assets/spark-small.svg" style={{ width: 32, opacity: .85 }} />
              <blockquote style={{
                fontFamily: "'Lato', system-ui, sans-serif",
                fontSize: 20, lineHeight: 1.5, margin: '18px 0 20px',
                color: '#1E1E1E', fontWeight: 500,
              }}>«&nbsp;{q.q}&nbsp;»</blockquote>
              <figcaption style={{
                fontFamily: "'Lato', system-ui, sans-serif",
                fontSize: 14, color: '#525252',
              }}>
                <div style={{ fontWeight: 600, color: '#1E1E1E' }}>{q.a}</div>
                <div style={{ marginTop: 2 }}>{q.r}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

window.Testimonials = Testimonials;
