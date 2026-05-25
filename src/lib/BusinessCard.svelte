<script>
  import { onMount, onDestroy } from 'svelte';

  let cardEl = $state(null);
  let tiltX = $state(0);
  let tiltY = $state(0);
  let gyroAvailable = $state(false);
  let needsPermission = $state(false);

  const MAX_TILT = 15;

  // Smooth interpolation
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let rafId = null;

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function animate() {
    currentX = lerp(currentX, targetX, 0.08);
    currentY = lerp(currentY, targetY, 0.08);
    tiltX = currentX;
    tiltY = currentY;
    rafId = requestAnimationFrame(animate);
  }

  function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
  }

  // Gyroscope handler
  function handleOrientation(e) {
    if (e.beta == null || e.gamma == null) return;
    // beta = front-back (-180..180), gamma = left-right (-90..90)
    // Normalize around "phone held upright" (beta ~90)
    targetX = clamp(-(e.beta - 60) * 0.3, -MAX_TILT, MAX_TILT);
    targetY = clamp(e.gamma * 0.4, -MAX_TILT, MAX_TILT);
  }

  // Mouse fallback for desktop
  function handleMouse(e) {
    if (gyroAvailable || !cardEl) return;
    const rect = cardEl.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    targetX = clamp(((e.clientY - cy) / (rect.height / 2)) * -MAX_TILT, -MAX_TILT, MAX_TILT);
    targetY = clamp(((e.clientX - cx) / (rect.width / 2)) * MAX_TILT, -MAX_TILT, MAX_TILT);
  }

  function handleMouseLeave() {
    if (gyroAvailable) return;
    targetX = 0;
    targetY = 0;
  }

  async function requestGyro() {
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      try {
        const perm = await DeviceOrientationEvent.requestPermission();
        if (perm === 'granted') {
          window.addEventListener('deviceorientation', handleOrientation);
          gyroAvailable = true;
          needsPermission = false;
        }
      } catch {
        needsPermission = false;
      }
    }
  }

  onMount(() => {
    // Check gyroscope availability
    if (typeof DeviceOrientationEvent !== 'undefined') {
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        // iOS — needs user gesture
        needsPermission = true;
      } else {
        // Android / other
        window.addEventListener('deviceorientation', (e) => {
          if (e.beta !== null) {
            gyroAvailable = true;
            window.addEventListener('deviceorientation', handleOrientation);
          }
        }, { once: true });
      }
    }

    rafId = requestAnimationFrame(animate);
  });

  onDestroy(() => {
    if (rafId) cancelAnimationFrame(rafId);
    window.removeEventListener('deviceorientation', handleOrientation);
  });

  // Shine position derived from tilt
  let shineX = $derived(50 + tiltY * 2);
  let shineY = $derived(50 + tiltX * 2);
</script>

<div class="card-perspective">
  {#if needsPermission}
    <button class="gyro-prompt" onclick={requestGyro}>
      ✦ Activer l'effet 3D
    </button>
  {/if}

  <div
    bind:this={cardEl}
    class="business-card"
    style="transform: rotateX({tiltX}deg) rotateY({tiltY}deg);"
    onmousemove={handleMouse}
    onmouseleave={handleMouseLeave}
    role="img"
    aria-label="Carte de visite Marill.dev"
  >
    <!-- Shine overlay -->
    <div
      class="card-shine"
      style="background: radial-gradient(circle at {shineX}% {shineY}%, rgba(255,255,255,0.15) 0%, transparent 60%);"
    ></div>

    <!-- Card content -->
    <div class="card-inner">
      <div class="card-header">
        <img src="/logo.svg" alt="Marill.dev" class="card-logo" />
        <p class="card-title">Développeur web créatif</p>
      </div>

      <div class="card-contacts">
        <a href="mailto:contact@marill.dev" class="card-link">
          <svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          contact@marill.dev
        </a>
        <a href="tel:+33600000000" class="card-link">
          <svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          06 00 00 00 00
        </a>
        <a href="https://instagram.com/marill.dev" target="_blank" rel="noopener" class="card-link">
          <svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r=".5" fill="currentColor"/></svg>
          @marill.dev
        </a>
        <a href="https://linkedin.com/in/damienmarill" target="_blank" rel="noopener" class="card-link">
          <svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
          Damien Marill
        </a>
      </div>
    </div>
  </div>
</div>

<style>
  .card-perspective {
    perspective: 800px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
    max-width: 380px;
    margin: 0 auto;
  }

  .gyro-prompt {
    font-family: 'Lato', sans-serif;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    color: var(--color-mrl-violet-soft);
    background: rgba(90, 77, 235, 0.12);
    border: 1px solid rgba(90, 77, 235, 0.25);
    border-radius: 999px;
    padding: 0.4rem 1rem;
    cursor: pointer;
    transition: all 220ms cubic-bezier(.2,0,.2,1);
  }

  .gyro-prompt:hover {
    background: rgba(90, 77, 235, 0.2);
    box-shadow: 0 0 0 4px rgba(90, 77, 235, 0.1);
  }

  .business-card {
    position: relative;
    width: 100%;
    aspect-ratio: 1.586;
    border-radius: 12px;
    background: linear-gradient(
      145deg,
      rgba(40, 42, 73, 0.9) 0%,
      rgba(4, 4, 4, 0.95) 100%
    );
    border: 1px solid rgba(255, 255, 255, 0.1);
    overflow: hidden;
    transform-style: preserve-3d;
    will-change: transform;
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.4),
      0 0 0 1px rgba(255, 255, 255, 0.05),
      inset 0 1px 0 rgba(255, 255, 255, 0.08);
  }

  .card-shine {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
    z-index: 1;
    transition: background 150ms ease;
  }

  .card-inner {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    padding: 1.25rem 1.5rem;
  }

  .card-header {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .card-logo {
    height: 1.75rem;
    width: auto;
    align-self: flex-start;
    filter: brightness(0) invert(1);
  }

  .card-title {
    font-size: 0.7rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.55);
    letter-spacing: 0.02em;
    margin: 0;
  }

  .card-contacts {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.4rem 1rem;
  }

  .card-link {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.65rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.75);
    text-decoration: none;
    transition: color 220ms ease;
  }

  .card-link:hover {
    color: #A49CFF;
  }

  .card-icon {
    width: 0.85rem;
    height: 0.85rem;
    flex-shrink: 0;
    opacity: 0.6;
  }

  /* Subtle border glow on perspective */
  .business-card::after {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: inherit;
    background: linear-gradient(
      135deg,
      rgba(90, 77, 235, 0.2) 0%,
      transparent 50%,
      rgba(254, 181, 69, 0.1) 100%
    );
    z-index: 0;
    opacity: 0.5;
    pointer-events: none;
  }
</style>
