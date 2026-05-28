<script>
  import AmbientBackground from "./lib/AmbientBackground.svelte";
  import BusinessCard from "./lib/BusinessCard.svelte";
  import ServicesList from "./lib/ServicesList.svelte";
  import ActionButtons from "./lib/ActionButtons.svelte";
</script>

<AmbientBackground />

<main class="page">
  <!-- Tagline -->
  <header class="tagline">
    <h1 class="tagline-text">
      Le code au service<br />de la créativité<span class="tagline-dot">.</span>
    </h1>
    <p class="tagline-sub">Transmettre, concevoir et innover avec vous.</p>
  </header>

  <!-- 3D Business Card -->
  <BusinessCard />

  <!-- Services -->
  <ServicesList />

  <!-- Action Buttons -->
  <ActionButtons />
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
    text-align: center;
    max-width: 500px;
  }

  .tagline-text {
    font-size: 1.75rem;
    font-weight: 900;
    color: #ffffff;
    line-height: 1.15;
    letter-spacing: -0.02em;
    margin: 0;
  }

  .tagline-dot {
    color: #5a4deb;
  }

  .tagline-sub {
    font-size: 0.85rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.5);
    margin: 0.5rem 0 0;
    line-height: 1.4;
  }

  .footer {
    margin-top: auto;
    padding-top: 1rem;
  }

  .footer p {
    font-size: 0.65rem;
    color: rgba(255, 255, 255, 0.25);
    text-align: center;
    margin: 0;
  }
</style>
