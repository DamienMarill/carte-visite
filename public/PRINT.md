# Carte de visite imprimable — Marill.dev

Deux fichiers pour la fabrication de la vraie carte :

- **`carte-print.html`** — page web au format exact (recto + verso), à ouvrir dans un navigateur.
- **`card.svg`** — recréation vectorielle des deux faces, à donner à un imprimeur ou à ouvrir dans Illustrator/Inkscape.

## Format

- Carte finale (après coupe) : **85 × 55 mm** (format carte bancaire ISO/CR80).
- Fond perdu (bleed) : **3 mm** de chaque côté → chaque face fait **91 × 61 mm**.
- Zone de sécurité : texte et logo restent à **7 mm** des bords (3 mm fond perdu + 4 mm de marge).
- Une ligne pointillée fine indique la limite de coupe (85 × 55 mm) sur chaque face — repère visuel, pas un vrai repère d'imprimeur professionnel (voir plus bas).

## Obtenir un PDF

1. Ouvrir `carte-print.html` dans Chrome/Edge (double-clic, ou via le site déployé : `https://<ton-domaine>/carte-print.html`).
2. `Ctrl+P` → Destination : « Enregistrer au format PDF ».
3. Format de papier : Chrome détecte automatiquement le format déclaré par la page (91 × 61 mm) — sinon choisir « Format personnalisé » et saisir 91 × 61 mm.
4. Marges : **Aucune**. Désactiver « En-têtes et pieds de page ».
5. Le PDF obtenu contient 2 pages (recto, verso), texte et formes en vectoriel, images (fond étoilé, QR code) en raster — c'est normal et standard pour un fichier d'impression.

## Passer en CMJN

Le HTML/CSS et le SVG sont en **RVB** (c'est une limite du web, pas un oubli). Aucun outil de conversion CMJN (Inkscape, Ghostscript, Scribus) n'était installé sur cette machine au moment de la génération — la conversion reste donc à faire, par l'une de ces méthodes :

- **Le plus simple** : la plupart des imprimeurs (en ligne ou en boutique) acceptent un PDF RVB et **convertissent eux-mêmes** en CMJN à l'impression avec leur profil couleur (souvent **FOGRA39** / *PSO Coated v3* en Europe). Demande-leur confirmation avant envoi.
- **Conversion toi-même** : ouvrir `card.svg` dans **Inkscape** (gratuit) → `Fichier > Propriétés du document` ou `Extensions > Couleur` pour appliquer un profil ICC CMJN, puis exporter en PDF. Inkscape peut aussi récupérer et embarquer l'image du QR code externe automatiquement à l'ouverture.
- **Scribus** (mise en page pro, gratuit) permet d'importer le SVG, de gérer les profils ICC CMJN et de générer un vrai PDF/X prêt-imprimeur avec repères de coupe normalisés.

## Repères de coupe

Les repères ici sont une **ligne pointillée à la limite de coupe**, simple et suffisante pour une découpe manuelle ou un massicot réglé visuellement. Un imprimeur professionnel préfère souvent ses propres **repères en dehors du fond perdu** (petites croix aux 4 coins, générées par son propre gabarit) — si tu passes par un imprimeur avec gabarit, utilise plutôt leur template et recopie le contenu de `card.svg` dedans.

## QR code

Le QR code (verso, vers `https://marill.dev`) est chargé depuis `api.qrserver.com` — une image externe, donc **une connexion internet est nécessaire** au moment d'ouvrir la page ou d'exporter le PDF/de convertir le SVG. Une fois le PDF exporté ou le SVG converti (Inkscape embarque l'image), il n'y a plus de dépendance réseau.

## Polices

`Bricolage Grotesque` et `Lato` sont chargées depuis Google Fonts dans `carte-print.html` — fonctionnent telles quelles à l'impression PDF depuis un navigateur (les polices sont incluses dans le PDF exporté). Dans `card.svg`, en revanche, le texte reste éditable et dépend des polices installées sur la machine qui l'ouvre : si l'imprimeur n'a pas ces polices, **vectoriser le texte** avant envoi (Inkscape : sélectionner tout → `Chemin > Objet en chemin` ; Illustrator : `Texte > Créer les contours`).
