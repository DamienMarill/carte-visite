# carte-visite

Projet initialisé avec **Svelte (Vite, sans SSR)**, **Tailwind CSS** et **DaisyUI**.

## Scripts

- `npm run dev` : lance le serveur de développement
- `npm run build` : génère le build de production
- `npm run preview` : prévisualise le build

## Déploiement GitHub Pages

Le workflow `.github/workflows/deploy-pages.yml` se déclenche sur chaque `push` vers `main` et publie le contenu de `dist` sur GitHub Pages.

### Configuration GitHub Pages à faire une fois

1. Ouvre le dépôt sur GitHub.
2. Va dans **Settings > Pages**.
3. Dans **Build and deployment**, choisis **Source: GitHub Actions**.
4. Vérifie que les actions ont le droit d’écrire :
   - **Settings > Actions > General > Workflow permissions**
   - Sélectionne **Read and write permissions**.
5. Fais un commit sur `main` pour déclencher le premier déploiement.
6. L’URL du site apparaît dans l’onglet **Actions** (job `deploy`) puis dans **Settings > Pages**.
