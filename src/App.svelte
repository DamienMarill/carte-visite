<script>
  import AmbientBackground from "./lib/AmbientBackground.svelte";
  import BusinessCard from "./lib/BusinessCard.svelte";
  import ServicesList from "./lib/ServicesList.svelte";
  import ActionButtons from "./lib/ActionButtons.svelte";
</script>

<AmbientBackground />

<main class="page">
  <!-- Hero / recto -->
  <header class="tagline">
    <img src="/assets/deco/left_star.svg" alt="" aria-hidden="true" class="doodle doodle-left" />
    <img src="/assets/deco/right_star.svg" alt="" aria-hidden="true" class="doodle doodle-right" />
    <img src="/assets/deco/sparkles.svg" alt="" aria-hidden="true" class="doodle doodle-sparkles" />
    <img src="/assets/deco/code.svg" alt="" aria-hidden="true" class="doodle doodle-code" />
    <img src="/assets/deco/laravel.svg" alt="" aria-hidden="true" class="doodle doodle-laravel" />
    <img src="/assets/deco/angular.svg" alt="" aria-hidden="true" class="doodle doodle-angular" />

    <img src="/logo.svg" alt="Marill.dev" class="hero-logo" />

    <h1 class="tagline-text mb-4">
      Le code au service<br />de la créativité<span class="tagline-dot">.</span>
    </h1>
    <p class="tagline-sub">
      <span class="chip chip-sky">Transmettre</span>,
      <span class="chip chip-peach">concevoir</span>
      et
      <span class="chip chip-blouge">innover</span>
      avec VOUS.
    </p>
  </header>

  <!-- 3D Business Card -->
  <BusinessCard />

  <!-- Services -->
  <ServicesList />

  <!-- Action Buttons -->
  <ActionButtons />

  <footer class="legal-footer">
    <p>Entrepreneur salarié — La Maison des Entrepreneurs · BGE Coop</p>
  </footer>
</main>

<style>
  .page {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    min-height: 100dvh;
    padding: 3rem 1.5rem 2rem;
  }

  .tagline {
    position: relative;
    text-align: center;
    max-width: 500px;
  }

  .hero-logo {
    height: 1.75rem;
    width: auto;
    margin: 0 auto 1.5rem;
  }

  .tagline-text {
    font-family: var(--font-display);
    font-size: 1.75rem;
    font-weight: var(--weight-extrabold);
    color: #ffffff;
    line-height: var(--leading-tight);
    letter-spacing: -0.02em;
  }

  .tagline-dot {
    color: var(--color-blouge);
  }

  .tagline-sub {
    font-size: 0.85rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.6);
    margin: 0.75rem 0 0;
    line-height: 1.6;
  }

  .chip {
    display: inline-block;
    color: #ffffff;
    font-family: var(--font-display);
    font-weight: var(--weight-semibold);
    padding: 1px 8px;
    border-radius: var(--radius-sm);
    white-space: nowrap;
  }

  .chip-sky {
    background: var(--color-sky);
    transform: rotate(-1deg);
  }

  .chip-peach {
    background: var(--color-peach);
    color: #1e1e1e;
    transform: rotate(0.5deg);
  }

  .chip-blouge {
    background: var(--color-blouge);
    transform: rotate(-2deg);
  }

  .doodle {
    position: absolute;
    pointer-events: none;
    animation: marill-tremble var(--tremble-duration-min) ease-in-out infinite;
  }

  .doodle-left {
    top: -1.75rem;
    left: -1.5rem;
    width: 2.25rem;
    height: 2.25rem;
    animation-duration: 7.4s;
  }

  .doodle-right {
    top: -1rem;
    right: -1.75rem;
    width: 2rem;
    height: 2rem;
    animation-duration: 8.6s;
    animation-delay: -2.3s;
  }

  .doodle-sparkles {
    bottom: -2rem;
    right: 1rem;
    width: 2.75rem;
    height: auto;
    opacity: 0.8;
    animation-duration: 9.1s;
    animation-delay: -4.7s;
  }

  .doodle-code {
    top: -2.5rem;
    right: 35%;
    width: 2.5rem;
    height: auto;
    opacity: 0.55;
    animation-duration: 6.9s;
    animation-delay: -1.1s;
  }

  .doodle-laravel {
    bottom: 30%;
    right: -0.5rem;
    width: 3rem;
    height: auto;
    opacity: 0.7;
    animation-duration: 8.2s;
    animation-delay: -3.6s;
  }

  .doodle-angular {
    bottom: 1.5rem;
    left: -1.5rem;
    width: 4.5rem;
    height: auto;
    opacity: 0.7;
    animation-duration: 7.7s;
    animation-delay: -5.9s;
  }

  .legal-footer {
    margin-top: auto;
    padding-top: 1rem;
    width: 100%;
  }

  .legal-footer p {
    font-size: 0.65rem;
    color: rgba(255, 255, 255, 0.25);
    text-align: center;
    margin: 0;
  }
</style>
