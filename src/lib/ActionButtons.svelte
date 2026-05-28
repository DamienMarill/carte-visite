<script>
  import { onMount } from "svelte";

  let installPrompt = $state(null);
  let installed = $state(false);

  const vcardData = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "FN:Damien Marill",
    "N:Marill;Damien;;;",
    "ORG:Marill.dev",
    "TITLE:Développeur web créatif / consultant IA",
    "TEL;TYPE=CELL:+33786813083",
    "EMAIL:pro@marill.dev",
    "URL:https://marill.dev",
    "X-SOCIALPROFILE;TYPE=instagram:https://instagram.com/damien.marill",
    "X-SOCIALPROFILE;TYPE=linkedin:https://linkedin.com/in/dmarill",
    "END:VCARD",
  ].join("\r\n");

  async function addContact() {
    const file = new File([vcardData], "marill-dev.vcf", {
      type: "text/vcard",
    });

    if (navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({ files: [file] });
        return;
      } catch {
        // User cancelled — fall through
      }
    }

    // Fallback: download
    const blob = new Blob([vcardData], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "marill-dev.vcf";
    a.click();
    URL.revokeObjectURL(url);
  }

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

<div class="actions">
  <button class="action-btn action-primary" onclick={addContact}>
    <svg
      class="action-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <line x1="19" y1="8" x2="19" y2="14" />
      <line x1="22" y1="11" x2="16" y2="11" />
    </svg>
    Ajouter à mes contacts
  </button>

  {#if installPrompt && !installed}
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
  {/if}
</div>

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
    border-radius: 8px;
    font-family: "Lato", sans-serif;
    font-size: 0.85rem;
    font-weight: 700;
    cursor: pointer;
    border: none;
    text-decoration: none;
    transition: all 220ms cubic-bezier(0.2, 0, 0.2, 1);
  }

  .action-btn:active {
    transform: scale(0.98);
  }

  .action-primary {
    background: #5a4deb;
    color: #ffffff;
    box-shadow: 0 2px 12px rgba(90, 77, 235, 0.3);
  }

  .action-primary:hover {
    background: #4e42d4;
    box-shadow:
      0 0 0 6px rgba(90, 77, 235, 0.18),
      0 2px 12px rgba(90, 77, 235, 0.3);
  }

  .action-secondary {
    background: rgba(255, 255, 255, 0.06);
    color: rgba(255, 255, 255, 0.85);
    border: 1px solid rgba(255, 255, 255, 0.12);
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
