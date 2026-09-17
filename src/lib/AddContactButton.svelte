<script>
  const vcardData = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "FN:Damien Marill",
    "N:Marill;Damien;;;",
    "ORG:Marill.dev",
    "TITLE:Développeur web créatif / consultant IA",
    "TEL;TYPE=CELL:+33769002289",
    "EMAIL:pro@marill.dev",
    "URL:https://marill.dev",
    "X-SOCIALPROFILE;TYPE=linkedin:https://linkedin.com/in/dmarill",
    "X-SOCIALPROFILE;TYPE=github:https://github.com/damienmarill",
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

  .action-primary {
    background: var(--color-blouge);
    color: #ffffff;
    box-shadow:
      var(--shadow-inset-primary),
      0 2px 12px color-mix(in oklab, var(--color-blouge), transparent 70%);
  }

  .action-primary:hover {
    background: color-mix(in oklab, var(--color-blouge), transparent 10%);
    box-shadow:
      var(--shadow-inset-primary),
      0 0 0 6px color-mix(in oklab, var(--color-blouge), transparent 82%),
      0 2px 12px color-mix(in oklab, var(--color-blouge), transparent 70%);
  }

  .action-icon {
    width: 1.1rem;
    height: 1.1rem;
    flex-shrink: 0;
  }
</style>
