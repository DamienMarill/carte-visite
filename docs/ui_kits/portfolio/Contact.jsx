// Contact.jsx — form with violet focus ring & submit-flow.
const Contact = ({ sent, onSubmit }) => {
  const [focus, setFocus] = React.useState(null);
  const ring = '0 0 0 4px rgba(90,77,235,.18)';
  const fieldStyle = (name) => ({
    width: '100%', padding: '14px 16px',
    borderRadius: 10,
    border: `1.5px solid ${focus === name ? '#5A4DEB' : '#D9D9D9'}`,
    fontFamily: "'Lato', system-ui, sans-serif", fontSize: 16,
    background: 'white', boxSizing: 'border-box', outline: 'none',
    boxShadow: focus === name ? ring : 'none',
    transition: 'all 120ms cubic-bezier(.2,0,.2,1)',
  });
  return (
    <section id="contact" data-screen-label="Contact" style={{
      background: 'linear-gradient(180deg, #040404 0%, #282A49 100%)',
      padding: '120px 48px',
      color: 'white',
    }}>
      <div style={{ maxWidth: 960, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'flex-start' }}>
        <div>
          <h2 style={{
            fontFamily: "'Lato', system-ui, sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(40px, 4vw, 64px)',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            margin: 0,
          }}>Parlons-en.</h2>
          <p style={{
            color: '#A49CFF', fontFamily: "'Lato', system-ui, sans-serif",
            fontSize: 20, fontWeight: 500, marginTop: 20, lineHeight: 1.4, maxWidth: 380,
          }}>
            Une idée, un besoin, une envie floue. On démêle ensemble.
          </p>
          <div style={{ marginTop: 40, color: 'rgba(255,255,255,.7)', fontSize: 15, fontFamily: "'JetBrains Mono', monospace" }}>
            bonjour@marill.dev
          </div>
        </div>

        {sent ? (
          <div style={{
            background: 'rgba(255,255,255,.04)',
            border: '1px solid rgba(255,255,255,.12)',
            borderRadius: 12, padding: 40, textAlign: 'center',
          }}>
            <img src="../../assets/sparkler.svg" style={{ width: 100 }} />
            <div style={{ fontFamily: "'Lato', system-ui, sans-serif", fontSize: 22, fontWeight: 600, marginTop: 12 }}>
              Message reçu — merci&nbsp;!
            </div>
            <div style={{ color: 'rgba(255,255,255,.6)', marginTop: 8, fontSize: 15 }}>
              Je reviens vers vous sous 48h.
            </div>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} style={{
            display: 'grid', gap: 18,
          }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,.7)', marginBottom: 8 }}>Votre nom</label>
              <input onFocus={() => setFocus('name')} onBlur={() => setFocus(null)} style={fieldStyle('name')} placeholder="Claire Dupont" />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,.7)', marginBottom: 8 }}>Email</label>
              <input onFocus={() => setFocus('email')} onBlur={() => setFocus(null)} style={fieldStyle('email')} placeholder="claire@atelier.fr" />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,.7)', marginBottom: 8 }}>Parlez-moi de votre projet</label>
              <textarea rows="4" onFocus={() => setFocus('msg')} onBlur={() => setFocus(null)} style={{ ...fieldStyle('msg'), resize: 'none' }} placeholder="Une idée, un problème, une envie…" />
            </div>
            <button type="submit" style={{
              padding: '16px 28px',
              borderRadius: 10,
              border: 'none',
              background: '#5A4DEB',
              color: 'white',
              fontFamily: "'Lato', system-ui, sans-serif",
              fontSize: 18, fontWeight: 600,
              cursor: 'pointer',
              justifySelf: 'flex-start',
              marginTop: 4,
            }}>
              Envoyer →
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

window.Contact = Contact;
