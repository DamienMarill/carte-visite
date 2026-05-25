<script>
  const services = [
    { label: 'Développement web sur-mesure', desc: 'Sites, apps, API — du concept au déploiement.' },
    { label: 'Applications mobiles', desc: 'PWA & Capacitor pour une présence native.' },
    { label: 'Design UI/UX', desc: 'Interfaces intuitives, pensées pour vos utilisateurs.' },
    { label: 'Conseil & formation', desc: 'Transmettre, concevoir et innover avec vous.' },
  ];
</script>

<section class="services">
  <h2 class="services-title">Mes services</h2>
  <ul class="services-list">
    {#each services as service}
      <li class="services-item">
        <span class="services-dot"></span>
        <div>
          <span class="services-label">{service.label}</span>
          <span class="services-desc">{service.desc}</span>
        </div>
      </li>
    {/each}
  </ul>
</section>

<style>
  .services {
    width: 100%;
    max-width: 380px;
    margin: 0 auto;
  }

  .services-title {
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.4);
    margin: 0 0 0.75rem;
  }

  .services-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .services-item {
    display: flex;
    align-items: flex-start;
    gap: 0.6rem;
    padding: 0.6rem 0.75rem;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.06);
    transition: background 220ms ease;
  }

  .services-item:hover {
    background: rgba(255, 255, 255, 0.06);
  }

  .services-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #5A4DEB;
    flex-shrink: 0;
    margin-top: 0.45rem;
    box-shadow: 0 0 6px rgba(90, 77, 235, 0.4);
  }

  .services-label {
    display: block;
    font-size: 0.85rem;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.9);
    line-height: 1.3;
  }

  .services-desc {
    display: block;
    font-size: 0.7rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.45);
    line-height: 1.4;
    margin-top: 0.1rem;
  }
</style>
