// Projects.jsx — a 2-column grid of project cards.
const Projects = ({ onOpen }) => {
  const items = [
    { slug: 'compote',   title: 'La compote qui dépote', year: 2025, tags: ['React', 'DA'],
      blurb: 'Refonte complète d\u2019une plateforme éditoriale indépendante. Du wireframe à la mise en prod.',
      tint: 'linear-gradient(135deg, #5A4DEB 0%, #A49CFF 100%)' },
    { slug: 'atelier',   title: 'Atelier des étincelles', year: 2024, tags: ['Next.js', 'CMS'],
      blurb: 'Site vitrine pour un collectif d\u2019artisans. Langue de l\u2019ouvrage, pas du marketing.',
      tint: 'linear-gradient(135deg, #282A49, #040404)' },
    { slug: 'nuit',      title: 'Nuit étincelle',         year: 2024, tags: ['Webflow', 'Direction artistique'],
      blurb: 'Une app de journal nocturne. Très peu de mots, beaucoup de silence.',
      tint: 'linear-gradient(135deg, #FEB545, #DE5FCA)' },
    { slug: 'orvault',   title: 'Ville d\u2019Orvault',    year: 2023, tags: ['Accessibilité', 'Accompagnement'],
      blurb: 'Accompagnement technique de la refonte du portail municipal. En binôme avec les agents.',
      tint: 'linear-gradient(135deg, #48C0F7, #BCEAFF)' },
  ];
  return (
    <section id="projets" data-screen-label="Projets" style={{
      background: '#F5F5F5',
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
        }}>
          Mes projets <span style={{ color: '#8C8C8C', fontWeight: 500 }}>(la compote qui dépote)</span>
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 28,
          marginTop: 56,
        }}>
          {items.map((it, i) => (
            <article key={it.slug} className="mrl-project-card" onClick={() => onOpen(it)}
              style={{
                background: 'white',
                borderRadius: 4,
                padding: 20,
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(0,0,0,.10), 0 0 2px rgba(0,0,0,.08), 0 0 0 1px rgba(0,0,0,.06)',
                transition: 'all 220ms cubic-bezier(.2,0,.2,1)',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,.12), 0 0 0 1px rgba(0,0,0,.06)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)';    e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,.10), 0 0 2px rgba(0,0,0,.08), 0 0 0 1px rgba(0,0,0,.06)'; }}>
              <div style={{
                height: 280, borderRadius: 2, background: it.tint,
                position: 'relative', overflow: 'hidden',
              }}>
                {i === 0 && <img src="../../assets/sparkler.svg" style={{ position: 'absolute', right: 20, bottom: 20, height: 180, opacity: .7 }} />}
              </div>
              <div style={{ marginTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
                <div>
                  <h3 style={{
                    fontFamily: "'Lato', system-ui, sans-serif",
                    fontWeight: 700, fontSize: 26, margin: 0, color: '#1E1E1E',
                  }}>{it.title}</h3>
                  <p style={{
                    fontFamily: "'Lato', system-ui, sans-serif",
                    color: '#525252', fontSize: 16, lineHeight: 1.5, margin: '10px 0 0', maxWidth: 520,
                  }}>{it.blurb}</p>
                </div>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#8C8C8C',
                }}>{it.year}</div>
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
                {it.tags.map(t => (
                  <span key={t} style={{
                    padding: '4px 12px', borderRadius: 999,
                    background: 'rgba(90,77,235,.08)', color: '#5A4DEB',
                    fontFamily: "'Lato', system-ui, sans-serif",
                    fontSize: 13, fontWeight: 500,
                  }}>{t}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

window.Projects = Projects;
