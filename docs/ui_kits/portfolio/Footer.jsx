// Footer.jsx — compact paper footer.
const Footer = () => (
  <footer data-screen-label="Footer" style={{
    background: '#FAFAF7',
    padding: '48px',
    borderTop: '1px solid rgba(0,0,0,.06)',
  }}>
    <div style={{
      maxWidth: 1500, margin: '0 auto',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16,
    }}>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <img src="../../assets/logo-marill.svg" style={{ height: 28 }} />
        <span style={{ color: '#8C8C8C', fontFamily: "'Lato', system-ui, sans-serif", fontSize: 14 }}>
          © {new Date().getFullYear()} — basé à Nantes, disponible partout.
        </span>
      </div>
      <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
        <a href="#" style={{ color: '#1E1E1E', fontFamily: "'Lato', system-ui, sans-serif", fontSize: 14, textDecoration: 'underline', textUnderlineOffset: 3 }}>GitHub</a>
        <a href="#" style={{ color: '#1E1E1E', fontFamily: "'Lato', system-ui, sans-serif", fontSize: 14, textDecoration: 'underline', textUnderlineOffset: 3 }}>LinkedIn</a>
        <a href="mailto:bonjour@marill.dev" style={{ color: '#5A4DEB', fontFamily: "'Lato', system-ui, sans-serif", fontSize: 14, textDecoration: 'underline', textUnderlineOffset: 3, fontWeight: 500 }}>bonjour@marill.dev</a>
      </div>
    </div>
  </footer>
);

window.Footer = Footer;
