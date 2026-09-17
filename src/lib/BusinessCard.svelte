<script>
  import { onMount, onDestroy } from "svelte";

  let cardEl = $state(null);
  let tiltX = $state(0);
  let tiltY = $state(0);
  let gyroAvailable = $state(false);
  let needsPermission = $state(false);
  let flipped = $state(false);

  const MAX_TILT = 15;

  // Smooth interpolation
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let rafId = null;
  let mouseActive = $state(false);
  let ambientT = 0;

  // Diagnostic overlay — append ?debug to the URL to see it.
  let debug = $state(false);
  let debugInfo = $state({
    hasAPI: false,
    needsPermission: false,
    permissionResult: "n/a",
    events: 0,
    absoluteEvents: 0,
    beta: null,
    gamma: null,
    secureContext: false,
  });

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function animate() {
    // Idle sway until a real signal (gyro or mouse) takes over — keeps the
    // card visibly alive on load instead of sitting dead-flat while we wait
    // for the browser/OS to start dispatching orientation events.
    if (!gyroAvailable && !mouseActive) {
      ambientT += 0.016;
      targetX = Math.sin(ambientT * 0.6) * 4;
      targetY = Math.cos(ambientT * 0.4) * 5;
    }

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
    debugInfo.events++;
    debugInfo.beta = e.beta;
    debugInfo.gamma = e.gamma;
    if (e.beta == null || e.gamma == null) return;
    gyroAvailable = true;
    targetX = clamp((e.beta - 60) * 0.3, -MAX_TILT, MAX_TILT);
    targetY = clamp(-e.gamma * 0.4, -MAX_TILT, MAX_TILT);
  }

  // Some Android/Chrome combos never fire plain "deviceorientation" (no
  // fused/compass heading available) but do fire the absolute variant —
  // same beta/gamma shape, so it can drive the exact same handler.
  function handleOrientationAbsolute(e) {
    debugInfo.absoluteEvents++;
    handleOrientation(e);
  }

  // Mouse fallback for desktop
  function handleMouse(e) {
    if (gyroAvailable || !cardEl) return;
    mouseActive = true;
    const rect = cardEl.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    targetX = clamp(
      ((e.clientY - cy) / (rect.height / 2)) * -MAX_TILT,
      -MAX_TILT,
      MAX_TILT,
    );
    targetY = clamp(
      ((e.clientX - cx) / (rect.width / 2)) * MAX_TILT,
      -MAX_TILT,
      MAX_TILT,
    );
  }

  function handleMouseLeave() {
    if (gyroAvailable) return;
    targetX = 0;
    targetY = 0;
  }

  let permissionRequested = false;

  async function requestGyro() {
    if (permissionRequested) return;
    if (typeof DeviceOrientationEvent?.requestPermission !== "function") return;
    permissionRequested = true;
    try {
      const perm = await DeviceOrientationEvent.requestPermission();
      debugInfo.permissionResult = perm;
      if (perm === "granted") {
        window.addEventListener("deviceorientation", handleOrientation);
        window.addEventListener(
          "deviceorientationabsolute",
          handleOrientationAbsolute,
        );
        gyroAvailable = true;
        needsPermission = false;
      }
    } catch (err) {
      debugInfo.permissionResult = "error: " + err;
      needsPermission = false;
    }
  }

  function handleCardClick() {
    // Belt-and-braces: also try on the card's own click in case the
    // page-wide listener somehow missed the first gesture.
    if (needsPermission) requestGyro();
    flipped = !flipped;
  }

  onMount(() => {
    debug = new URLSearchParams(location.search).has("debug");
    debugInfo.hasAPI = typeof DeviceOrientationEvent !== "undefined";
    debugInfo.secureContext = window.isSecureContext;

    if (typeof DeviceOrientationEvent !== "undefined") {
      if (typeof DeviceOrientationEvent.requestPermission === "function") {
        needsPermission = true;
        debugInfo.needsPermission = true;
        // This browser gates orientation data behind an explicit,
        // gesture-triggered permission prompt (iOS-style — some Android
        // browsers do this too). We can't skip that prompt, but we can
        // trigger it on the very first tap ANYWHERE on the page instead of
        // requiring the user to specifically tap the card.
        window.addEventListener("pointerdown", requestGyro, { once: true });
      } else {
        // No permission gate on this platform (Android, desktop) — listen
        // directly so the very first orientation event both proves gyro is
        // available and drives the tilt, instead of being thrown away by a
        // separate probe listener. Also listen for the "absolute" variant:
        // some Android/Chrome combos only ever fire that one.
        window.addEventListener("deviceorientation", handleOrientation);
        window.addEventListener(
          "deviceorientationabsolute",
          handleOrientationAbsolute,
        );
      }
    }

    rafId = requestAnimationFrame(animate);
  });

  onDestroy(() => {
    if (rafId) cancelAnimationFrame(rafId);
    window.removeEventListener("pointerdown", requestGyro);
    window.removeEventListener("deviceorientation", handleOrientation);
    window.removeEventListener(
      "deviceorientationabsolute",
      handleOrientationAbsolute,
    );
  });

  // Shine position derived from tilt
  let shineX = $derived(50 + tiltY * 2);
  let shineY = $derived(50 + tiltX * 2);
</script>

<div class="card-perspective">
  {#if debug}
    <pre class="gyro-debug">{JSON.stringify(
      { ...debugInfo, gyroAvailable, mouseActive, tiltX: +tiltX.toFixed(1), tiltY: +tiltY.toFixed(1) },
      null,
      2,
    )}</pre>
  {/if}

  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    bind:this={cardEl}
    class="card-gyro"
    style="transform: rotateX({tiltX}deg) rotateY({tiltY}deg);"
    onmousemove={handleMouse}
    onmouseleave={handleMouseLeave}
    onclick={handleCardClick}
  >
    <div class="card-flipper" class:is-flipped={flipped}>
      <!-- FRONT -->
      <div class="card-face card-front" inert={flipped}>
        <div
          class="card-shine"
          style="background: radial-gradient(circle at {shineX}% {shineY}%, rgba(255,255,255,0.15) 0%, transparent 60%);"
        ></div>

        <div class="card-inner">
          <div class="card-name-block">
            <p class="card-name">Damien Marill<span class="card-name-dot"></span></p>
            <div class="card-underline"></div>
          </div>

          <ul class="card-services">
            <li>Développement web</li>
            <li>Accompagnement &amp; formation</li>
            <li>Conseil IA</li>
            <li>Intégration IA</li>
            <li>Hébergement &amp; maintenance</li>
          </ul>

          <div class="flex flex-col gap-2 text-2xl">
            <div class="flex justify-center">
              <a
                      href="tel:+33769002289"
                      class="card-link"
                      onclick={(e) => e.stopPropagation()}
              >
                <svg
                        class="card-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                ><path
                        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"
                /></svg
                >
                07 69 00 22 89
              </a>
            </div>
            <div class="flex justify-between gap-4">
              <a
                      href="https://linkedin.com/in/dmarill"
                      target="_blank"
                      rel="noopener"
                      class="card-link"
                      onclick={(e) => e.stopPropagation()}
              >
                <svg
                        class="card-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                ><path
                        d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"
                /><rect x="2" y="9" width="4" height="12" /><circle
                        cx="4"
                        cy="4"
                        r="2"
                /></svg
                >
                linkedin.com/in/dmarill
              </a>
              <a
                      href="mailto:pro@marill.dev"
                      class="card-link"
                      onclick={(e) => e.stopPropagation()}
              >
                <svg
                        class="card-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                ><rect x="2" y="4" width="20" height="16" rx="2" /><path
                        d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"
                /></svg
                >
                pro@marill.dev
              </a>
            </div>
            <div class="flex justify-between gap-4">
              <a
                      href="https://marill.dev"
                      target="_blank"
                      rel="noopener"
                      class="card-link"
                      onclick={(e) => e.stopPropagation()}
              >
                <svg
                        class="card-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                ><circle cx="12" cy="12" r="10" /><path
                        d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"
                /><path d="M2 12h20" /></svg
                >
                marill.dev
              </a>
              <a
                      href="https://github.com/damienmarill"
                      target="_blank"
                      rel="noopener"
                      class="card-link card-link-github"
                      onclick={(e) => e.stopPropagation()}
              >
                <svg
                        class="card-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                ><path
                        d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
                /><path d="M9 18c-4.51 2-5-2-7-2" /></svg
                >
                github.com/damienmarill
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- BACK (easter egg) -->
      <div class="card-face card-back" inert={!flipped}>
        <div
          class="card-shine"
          style="background: radial-gradient(circle at {100 -
            shineX}% {shineY}%, rgba(255,255,255,0.12) 0%, transparent 60%);"
        ></div>

        <div class="card-inner back-content">
          <div class="speech-bubble">
            <p>Yahaha, tu m'as trouvé !</p>
          </div>
          <img src="/meika.png" alt="Meika" class="meika-img" />
        </div>
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
    max-width: 420px;
    margin: 0 auto;
  }

  .gyro-debug {
    width: 100%;
    max-width: 420px;
    margin: 0;
    padding: 0.6rem 0.8rem;
    background: rgba(0, 0, 0, 0.7);
    color: #6cffb0;
    font-family: monospace;
    font-size: 0.65rem;
    line-height: 1.4;
    border-radius: var(--radius-md);
    white-space: pre-wrap;
    word-break: break-all;
  }

  .card-gyro {
    position: relative;
    width: 100%;
    aspect-ratio: 1.586;
    transform-style: preserve-3d;
    will-change: transform;
    cursor: pointer;
  }

  .card-flipper {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .card-flipper.is-flipped {
    transform: rotateY(180deg);
  }

  .card-face {
    position: absolute;
    inset: 0;
    border-radius: var(--radius-lg);
    background:
      url('/assets/card-bg.jpg') center / cover no-repeat,
      var(--color-deep-night);
    border: 1px solid var(--border-night);
    overflow: hidden;
    backface-visibility: hidden;
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.4),
      0 0 0 1px rgba(255, 255, 255, 0.05),
      var(--shadow-inset-primary);
  }

  .card-back {
    transform: rotateY(180deg);
  }

  .card-shine {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
    z-index: 1;
  }

  .card-inner {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    padding: 1.1rem 1.25rem;
  }

  .card-name-block {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .card-name {
    display: flex;
    align-items: end;
    gap: 0.5rem;
    font-family: var(--font-display);
    font-weight: var(--weight-extrabold);
    font-size: 1.7rem;
    color: #ffffff;
    letter-spacing: -0.01em;
    margin: 0;
  }

  .card-name-dot {
    width: 0.7rem;
    height: 0.7rem;
    border-radius: 50%;
    background: var(--color-blouge);
    flex-shrink: 0;
    margin-bottom: 0.65rem;
  }

  .card-underline {
    width: 8rem;
    height: 3px;
    background: rgba(255, 255, 255, 0.25);
  }

  .card-services {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem 0.7rem;
  }

  .card-services li {
    position: relative;
    padding-left: 0.65rem;
    font-size: 0.68rem;
    color: rgba(255, 255, 255, 0.9);
    white-space: nowrap;
  }

  .card-services li::before {
    content: "•";
    position: absolute;
    left: 0;
    color: var(--color-blouge);
  }

  .card-contacts {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.45rem 0.5rem;
  }

  .card-contacts .card-link:first-child {
    grid-column: 1 / -1;
  }

  .card-link {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    min-width: 0;
    font-size: 1rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.75);
    text-decoration: none;
    transition: color 220ms ease;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .card-link:hover {
    color: color-mix(in oklab, var(--color-blouge), white 20%);
  }

  .card-icon {
    width: 0.9rem;
    height: 0.9rem;
    flex-shrink: 0;
    opacity: 1;
  }

  /* --- BACK FACE --- */
  .back-content {
    flex-direction: row;
    align-items: flex-end;
    justify-content: flex-end;
    gap: 0.5rem;
  }

  .speech-bubble {
    position: relative;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 12px 12px 4px 12px;
    padding: 0.5rem 0.75rem;
    max-width: 55%;
    align-self: flex-end;
    margin-bottom: 6rem;
  }

  .speech-bubble::after {
    content: "";
    position: absolute;
    right: -6px;
    bottom: 8px;
    width: 0;
    height: 0;
    border-left: 6px solid rgba(255, 255, 255, 0.1);
    border-top: 4px solid transparent;
    border-bottom: 4px solid transparent;
  }

  .speech-bubble p {
    margin: 0;
    font-size: 1rem;
    font-weight: 700;
    font-style: italic;
    color: rgba(255, 255, 255, 0.85);
    line-height: 1.3;
  }

  .meika-img {
    width: 10rem;
    height: 10rem;
    object-fit: contain;
    border-radius: 8px;
    flex-shrink: 0;
    filter: drop-shadow(0 2px 8px color-mix(in oklab, var(--color-blouge), transparent 70%));
  }

  /* Subtle border glow — blouge to peach, the Sakura Night signature pair */
  .card-front::after {
    content: "";
    position: absolute;
    inset: -1px;
    border-radius: inherit;
    background: linear-gradient(
      135deg,
      color-mix(in oklab, var(--color-blouge), transparent 80%) 0%,
      transparent 50%,
      color-mix(in oklab, var(--color-peach), transparent 90%) 100%
    );
    z-index: 0;
    opacity: 0.5;
    pointer-events: none;
  }
</style>
