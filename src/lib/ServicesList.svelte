<script>
  const services = [
    {
      label: "Développement web",
      desc: "Sites, apps, API. Du concept au déploiement, réalisés sur mesure selon vos besoins.",
    },
    {
      label: "Conseil IA",
      desc: "J'analyse vos habitudes de travail pour identifier où l'IA peut vous faire gagner du temps et réduire votre charge mentale. Et je l'implémente.",
    },
    {
      label: "Intégration IA",
      desc: "Enrichissez vos applications de fonctionnalités que le code seul ne peut pas offrir : analyse, génération, classification, automatisation complexe.",
    },
    {
      label: "Accompagnement & formation",
      desc: "Vous donner les clés pour être autonome et innover, avec une méthodologie ludique et adaptative.",
    },
    {
      label: "Hébergement & maintenance",
      desc: "La garantie d'un service fiable, sécurisé et souverain, hébergé en France.",
    },
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
    font-family: var(--font-display);
    font-size: 1.1rem;
    font-weight: var(--weight-semibold);
    line-height: var(--leading-tight);
    color: var(--text-night-strong);
    margin: 0 0 0.85rem;
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
    padding: 0.85rem 1rem;
    border-radius: var(--radius-lg);
    background: var(--surface-night-card);
    border: 1px solid var(--border-night);
    transition: background var(--duration-base) var(--ease-out);
  }

  .services-item:hover {
    background: color-mix(in oklab, var(--surface-night-card), white 6%);
  }

  .services-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--color-blouge);
    flex-shrink: 0;
    margin-top: 0.45rem;
    box-shadow: 0 0 6px color-mix(in oklab, var(--color-blouge), transparent 60%);
  }

  .services-label {
    display: block;
    font-family: var(--font-display);
    font-size: 0.85rem;
    font-weight: var(--weight-semibold);
    color: var(--text-night-strong);
    line-height: var(--leading-snug);
  }

  .services-desc {
    display: block;
    font-size: 0.7rem;
    font-weight: 400;
    color: var(--text-night-body);
    line-height: var(--leading-relaxed);
    margin-top: 0.15rem;
  }
</style>
