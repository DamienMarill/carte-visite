<script>
  function downloadVCard() {
    const vcard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'FN:Damien Marill',
      'N:Marill;Damien;;;',
      'ORG:Marill.dev',
      'TITLE:Développeur web créatif',
      'TEL;TYPE=CELL:+33600000000',
      'EMAIL:contact@marill.dev',
      'URL:https://marill.dev',
      'X-SOCIALPROFILE;TYPE=instagram:https://instagram.com/marill.dev',
      'X-SOCIALPROFILE;TYPE=linkedin:https://linkedin.com/in/damienmarill',
      'END:VCARD'
    ].join('\r\n');

    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'marill-dev.vcf';
    a.click();
    URL.revokeObjectURL(url);
  }
</script>

<div class="actions">
  <button class="action-btn action-primary" onclick={downloadVCard}>
    <svg class="action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <line x1="19" y1="8" x2="19" y2="14"/>
      <line x1="22" y1="11" x2="16" y2="11"/>
    </svg>
    Ajouter à mes contacts
  </button>

  <button class="action-btn action-secondary" disabled title="Bientôt disponible">
    <svg class="action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="2" y="5" width="20" height="14" rx="2"/>
      <line x1="2" y1="10" x2="22" y2="10"/>
    </svg>
    Enregistrer dans Wallet
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
    border-radius: 8px;
    font-family: 'Lato', sans-serif;
    font-size: 0.85rem;
    font-weight: 700;
    cursor: pointer;
    border: none;
    transition: all 220ms cubic-bezier(.2,0,.2,1);
  }

  .action-btn:active {
    transform: scale(0.98);
  }

  .action-primary {
    background: #5A4DEB;
    color: #ffffff;
    box-shadow: 0 2px 12px rgba(90, 77, 235, 0.3);
  }

  .action-primary:hover {
    background: #4e42d4;
    box-shadow: 0 0 0 6px rgba(90, 77, 235, 0.18), 0 2px 12px rgba(90, 77, 235, 0.3);
  }

  .action-secondary {
    background: rgba(255, 255, 255, 0.06);
    color: rgba(255, 255, 255, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .action-secondary:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.1);
  }

  .action-secondary:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .action-icon {
    width: 1.1rem;
    height: 1.1rem;
    flex-shrink: 0;
  }
</style>
