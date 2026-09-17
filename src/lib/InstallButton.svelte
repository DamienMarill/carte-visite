<script>
  import { onMount } from "svelte";

  let installPrompt = $state(null);
  let installed = $state(false);

  async function installApp() {
    if (!installPrompt) return;
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === "accepted") {
      installed = true;
    }
    installPrompt = null;
  }

  onMount(() => {
    // Check if already installed (standalone mode)
    if (window.matchMedia("(display-mode: standalone)").matches) {
      installed = true;
    }

    // Capture the install prompt before the browser shows it
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      installPrompt = e;
    });

    window.addEventListener("appinstalled", () => {
      installed = true;
      installPrompt = null;
    });
  });
</script>

{#if installPrompt && !installed}
  <div class="actions">
    <button class="action-btn action-secondary" onclick={installApp}>
      <svg
        class="action-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      Installer l'app
    </button>
  </div>
{/if}

<style>
  .actions {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    width: 100%;
    max-width: 380px;
    margin: 0 auto;
  }

  .action-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
    padding: 0.75rem 1rem;
    border-radius: var(--radius-md);
    font-family: var(--font-body);
    font-size: 0.85rem;
    font-weight: 700;
    cursor: pointer;
    border: none;
    text-decoration: none;
    transition: all var(--duration-base) var(--ease-out);
  }

  .action-btn:active {
    transform: scale(0.98);
  }

  .action-secondary {
    background: rgba(255, 255, 255, 0.06);
    color: rgba(255, 255, 255, 0.85);
    border: var(--border-width) solid var(--border-night);
  }

  .action-secondary:hover {
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.05);
  }

  .action-icon {
    width: 1.1rem;
    height: 1.1rem;
    flex-shrink: 0;
  }
</style>
