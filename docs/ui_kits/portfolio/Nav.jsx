// Nav.jsx — top navigation bar.
// On Night hero, transparent. Becomes glass (blur + dark translucent) after scroll > 80.
const Nav = ({ scrolled, theme = 'night', active, onNav }) => {
  const isNight = theme === 'night';
  const links = [
    { id: 'projets', label: 'Projets' },
    { id: 'cv',      label: 'CV' },
    { id: 'contact', label: 'Contact' },
  ];
  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 40,
      padding: '24px 48px',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      background: scrolled
        ? (isNight ? 'rgba(4,4,4,0.55)' : 'rgba(250,250,247,0.8)')
        : 'transparent',
      backdropFilter: scrolled ? 'blur(14px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
      borderBottom: scrolled ? `1px solid ${isNight ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}` : '1px solid transparent',
      transition: 'all 220ms cubic-bezier(.2,0,.2,1)',
      color: isNight ? 'white' : '#1E1E1E',
    }}>
      <a href="#" onClick={(e) => { e.preventDefault(); onNav('home'); }} style={{
        fontFamily: "'Lato', system-ui, sans-serif",
        fontWeight: 800, fontSize: 32, letterSpacing: '-0.02em',
        color: 'inherit', textDecoration: 'none',
      }}>
        Marill<span style={{ color: isNight ? '#A49CFF' : '#5A4DEB' }}>.</span>dev
      </a>
      <div style={{ display: 'flex', gap: 36 }}>
        {links.map(l => (
          <a key={l.id} href={`#${l.id}`}
             onClick={(e) => { e.preventDefault(); onNav(l.id); }}
             style={{
               color: active === l.id ? (isNight ? '#A49CFF' : '#5A4DEB') : 'inherit',
               fontFamily: "'Lato', system-ui, sans-serif",
               fontWeight: 500, fontSize: 18,
               textDecoration: 'underline',
               textUnderlineOffset: 4,
               textDecorationThickness: active === l.id ? 2 : 1,
               transition: 'all 160ms',
             }}
             onMouseEnter={e => { e.currentTarget.style.textDecorationThickness = '2px'; e.currentTarget.style.textUnderlineOffset = '5px'; }}
             onMouseLeave={e => { if (active !== l.id) { e.currentTarget.style.textDecorationThickness = '1px'; e.currentTarget.style.textUnderlineOffset = '4px'; } }}>
            {l.label}
          </a>
        ))}
      </div>
    </nav>
  );
};

window.Nav = Nav;
