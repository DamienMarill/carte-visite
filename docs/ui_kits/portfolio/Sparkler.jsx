// Sparkler.jsx — wraps the motif with a subtle twinkle animation.
const Sparkler = ({ size = 240, variant = 'full', style = {}, delay = 0 }) => {
  const src = variant === 'small' ? '../../assets/spark-small.svg' : '../../assets/sparkler.svg';
  return (
    <img src={src} alt="" aria-hidden="true"
      style={{
        width: size, height: 'auto',
        animation: `mrl-twinkle 2s ease-in-out ${delay}ms infinite`,
        ...style,
      }} />
  );
};

window.Sparkler = Sparkler;
