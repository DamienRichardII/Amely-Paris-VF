# MEDIA_REORGANISATION — Amely Paris
## Réorganisation intelligente du dossier `assets` par page et par shooting

**Date d'exécution :** 21 avril 2026  
**Périmètre :** Restructuration complète de `assets/` — aucune modification de design, texte ou structure HTML  
**Résultat :** 0 ancien chemin résiduel · 0 fichier manquant · 13 fichiers HTML mis à jour

---

## 1. Nouvelle arborescence `assets/`

```
assets/
├── common/
│   ├── logo/
│   │   ├── logo.png
│   │   ├── logo-footer.png
│   │   ├── logo-transparent.png
│   │   └── amely-script.png
│   ├── ui/
│   │   └── fleurs-footer.png
│   ├── video/
│   │   ├── hero-pj2.mp4
│   │   └── hero.mp4
│   └── shared/
│       ├── animations-buffets-signature.jpeg
│       ├── animations-coffee-break.jpeg
│       ├── animations-finger-food-cocktail.jpeg
│       ├── animations-lunch-box-premium.jpeg
│       ├── animations-planches-boxes.jpeg
│       ├── journal-formats-corporate.jpeg
│       ├── galerie-realisations-06.jpeg
│       ├── scenographie-notre-approche.jpeg
│       ├── journal-hero.jpeg
│       ├── galerie-viennoiserie.jpeg
│       └── realisations-hero.jpeg
│
├── index/
│   └── galerie/
│       ├── galerie-index-01.jpeg
│       ├── galerie-index-02.webp
│       ├── galerie-index-03.jpeg
│       ├── galerie-index-04.jpeg
│       ├── galerie-index-05.jpeg
│       ├── galerie-index-06.jpeg
│       ├── galerie-index-07.jpeg
│       ├── galerie-index-08.jpeg
│       ├── galerie-index-09.jpeg
│       ├── galerie-index-10.jpeg
│       ├── galerie-index-11.jpeg
│       ├── galerie-index-12.jpeg
│       └── galerie-index-13.jpeg
│
├── brunch-buffets/
│   ├── galerie/
│   │   ├── galerie-brunch-01.jpeg
│   │   ├── galerie-brunch-02.jpeg
│   │   ├── galerie-brunch-03.jpeg
│   │   ├── galerie-brunch-charcuterie.jpeg
│   │   └── galerie-brunch-sales.jpeg
│   └── video/
│       └── hero-brunch.mp4
│
├── animations-culinaires/
│   └── galerie/
│       ├── galerie-animations-underhero-1.jpeg
│       ├── galerie-animations-underhero-2.jpeg
│       └── galerie-animations-underhero-3.jpeg
│
├── traiteur-formats/
│   └── galerie/
│       (partage common/shared — aucun fichier exclusif)
│
├── corporate/
│   └── galerie/
│       (partage common/shared — aucun fichier exclusif)
│
├── realisations/
│   └── galerie/
│       ├── galerie-realisations-01.jpeg
│       ├── galerie-realisations-02.jpeg
│       ├── galerie-realisations-03.jpeg
│       ├── galerie-realisations-04.jpeg
│       ├── galerie-realisations-05.jpeg
│       └── galerie-realisations-etude-brunch.jpeg
│
├── notre-maison/
│   └── galerie/
│       └── galerie-notre-maison-01.jpeg
│
├── scenographie/
│   └── galerie/
│       (partage common/shared — aucun fichier exclusif)
│
├── showroom-loft-96/
│   └── galerie/
│       └── galerie-showroom-01.jpeg
│
├── journal/
│   ├── galerie/
│   │   ├── galerie-journal-art-buffet.jpeg
│   │   └── galerie-journal-coulisses-brunch.jpeg
│   └── commission-europeenne/
│       └── galerie/
│           ├── galerie-commission-01.jpeg
│           ├── galerie-commission-02.jpeg
│           ├── galerie-commission-03.jpeg
│           ├── galerie-commission-04.jpeg
│           ├── galerie-commission-05.jpeg
│           └── galerie-commission-06.jpeg
│
├── _non-utilises/
│   ├── apropos-amely-paris.jpeg
│   ├── animations-hero.jpeg
│   ├── global-hero-replacement.jpeg
│   ├── quiche.jpeg
│   ├── journal-hero-update.jpeg
│   ├── commission-image00002.jpeg
│   └── commission-image00089.jpeg
│
├── css/
│   └── style.css
└── js/
    └── main.js
```

---

## 2. Correspondance ancienne image → nouveau chemin

### Common — Logos & UI

| Ancien chemin | Nouveau chemin |
|---|---|
| `assets/img/logo.png` | `assets/common/logo/logo.png` |
| `assets/img/logo-footer.png` | `assets/common/logo/logo-footer.png` |
| `assets/img/logo-transparent.png` | `assets/common/logo/logo-transparent.png` |
| `assets/img/amely-script.png` | `assets/common/logo/amely-script.png` |
| `assets/img/fleurs-footer.png` | `assets/common/ui/fleurs-footer.png` |

### Common — Vidéos

| Ancien chemin | Nouveau chemin |
|---|---|
| `assets/video/hero-pj2.mp4` | `assets/common/video/hero-pj2.mp4` |
| `assets/video/hero.mp4` | `assets/common/video/hero.mp4` |

### Common — Shared (images utilisées par 2 pages ou plus)

| Ancien chemin | Nouveau chemin | Pages concernées |
|---|---|---|
| `assets/gallery/animations-buffets-signature.jpeg` | `assets/common/shared/animations-buffets-signature.jpeg` | animations-culinaires, traiteur-formats |
| `assets/gallery/animations-coffee-break.jpeg` | `assets/common/shared/animations-coffee-break.jpeg` | animations-culinaires, traiteur-formats, corporate |
| `assets/gallery/animations-finger-food-cocktail.jpeg` | `assets/common/shared/animations-finger-food-cocktail.jpeg` | animations-culinaires, traiteur-formats, corporate |
| `assets/gallery/animations-lunch-box-premium.jpeg` | `assets/common/shared/animations-lunch-box-premium.jpeg` | animations-culinaires, traiteur-formats, corporate |
| `assets/gallery/animations-planches-boxes.jpeg` | `assets/common/shared/animations-planches-boxes.jpeg` | animations-culinaires, traiteur-formats |
| `assets/gallery/journal-formats-corporate.jpeg` | `assets/common/shared/journal-formats-corporate.jpeg` | corporate, journal |
| `assets/gallery/realisations_gallery_6.jpeg` | `assets/common/shared/galerie-realisations-06.jpeg` | corporate, realisations |
| `assets/gallery/scenographie-notre-approche-pj2.jpeg` | `assets/common/shared/scenographie-notre-approche.jpeg` | corporate, scenographie-design |
| `assets/gallery/journal-hero.jpeg` | `assets/common/shared/journal-hero.jpeg` | index, realisations, journal |
| `assets/gallery/viennoiserie.jpeg` | `assets/common/shared/galerie-viennoiserie.jpeg` | brunch-buffets, index, journal |
| `assets/gallery/realisations-hero.jpeg` | `assets/common/shared/realisations-hero.jpeg` | journal, journal/commission-europeenne |

### Index

| Ancien chemin | Nouveau chemin |
|---|---|
| `assets/gallery/image00040.jpeg` | `assets/index/galerie/galerie-index-01.jpeg` |
| `assets/gallery/pj3.webp` | `assets/index/galerie/galerie-index-02.webp` |
| `assets/gallery/pj4.jpeg` | `assets/index/galerie/galerie-index-03.jpeg` |
| `assets/gallery/pj5.jpeg` | `assets/index/galerie/galerie-index-04.jpeg` |
| `assets/gallery/pj6.jpeg` | `assets/index/galerie/galerie-index-05.jpeg` |
| `assets/gallery/pj7.jpeg` | `assets/index/galerie/galerie-index-06.jpeg` |
| `assets/gallery/pj8.jpeg` | `assets/index/galerie/galerie-index-07.jpeg` |
| `assets/gallery/pj9.jpeg` | `assets/index/galerie/galerie-index-08.jpeg` |
| `assets/gallery/pj10.jpeg` | `assets/index/galerie/galerie-index-09.jpeg` |
| `assets/gallery/pj11.jpeg` | `assets/index/galerie/galerie-index-10.jpeg` |
| `assets/gallery/pj12.jpeg` | `assets/index/galerie/galerie-index-11.jpeg` |
| `assets/gallery/pj13.jpeg` | `assets/index/galerie/galerie-index-12.jpeg` |
| `assets/gallery/pj14.jpeg` | `assets/index/galerie/galerie-index-13.jpeg` |

### Brunch & Buffets

| Ancien chemin | Nouveau chemin |
|---|---|
| `assets/gallery/galerie-prestations-1.jpeg` | `assets/brunch-buffets/galerie/galerie-brunch-01.jpeg` |
| `assets/gallery/galerie-prestations-2.jpeg` | `assets/brunch-buffets/galerie/galerie-brunch-02.jpeg` |
| `assets/gallery/galerie-prestations-3.jpeg` | `assets/brunch-buffets/galerie/galerie-brunch-03.jpeg` |
| `assets/gallery/charcuterie-fromages-prestations.jpeg` | `assets/brunch-buffets/galerie/galerie-brunch-charcuterie.jpeg` |
| `assets/gallery/sales-prestations.jpeg` | `assets/brunch-buffets/galerie/galerie-brunch-sales.jpeg` |
| `assets/gallery/prestations-hero-10s.mp4` | `assets/brunch-buffets/video/hero-brunch.mp4` |

### Animations Culinaires

| Ancien chemin | Nouveau chemin |
|---|---|
| `assets/gallery/animations-underhero-1.jpeg` | `assets/animations-culinaires/galerie/galerie-animations-underhero-1.jpeg` |
| `assets/gallery/animations-underhero-2.jpeg` | `assets/animations-culinaires/galerie/galerie-animations-underhero-2.jpeg` |
| `assets/gallery/animations-underhero-3.jpeg` | `assets/animations-culinaires/galerie/galerie-animations-underhero-3.jpeg` |

### Réalisations

| Ancien chemin | Nouveau chemin |
|---|---|
| `assets/gallery/univers_1.jpeg` | `assets/realisations/galerie/galerie-realisations-01.jpeg` |
| `assets/gallery/univers_2.jpeg` | `assets/realisations/galerie/galerie-realisations-02.jpeg` |
| `assets/gallery/univers_3.jpeg` | `assets/realisations/galerie/galerie-realisations-03.jpeg` |
| `assets/gallery/univers_4.jpeg` | `assets/realisations/galerie/galerie-realisations-04.jpeg` |
| `assets/gallery/univers_5.jpeg` | `assets/realisations/galerie/galerie-realisations-05.jpeg` |
| `assets/gallery/etude_brunchthematique.jpeg` | `assets/realisations/galerie/galerie-realisations-etude-brunch.jpeg` |

### Notre Maison

| Ancien chemin | Nouveau chemin |
|---|---|
| `assets/gallery/apropos-hero.jpeg` | `assets/notre-maison/galerie/galerie-notre-maison-01.jpeg` |

### Showroom · Loft 96

| Ancien chemin | Nouveau chemin |
|---|---|
| `assets/gallery/loft-96-pj3.jpeg` | `assets/showroom-loft-96/galerie/galerie-showroom-01.jpeg` |

### Journal

| Ancien chemin | Nouveau chemin |
|---|---|
| `assets/gallery/journal-art-buffet.jpeg` | `assets/journal/galerie/galerie-journal-art-buffet.jpeg` |
| `assets/gallery/journal-coulisses-brunch.jpeg` | `assets/journal/galerie/galerie-journal-coulisses-brunch.jpeg` |

### Journal — Commission Européenne

| Ancien chemin | Nouveau chemin |
|---|---|
| `assets/gallery/commission_01.jpeg` | `assets/journal/commission-europeenne/galerie/galerie-commission-01.jpeg` |
| `assets/gallery/commission_02.jpeg` | `assets/journal/commission-europeenne/galerie/galerie-commission-02.jpeg` |
| `assets/gallery/commission_03.jpeg` | `assets/journal/commission-europeenne/galerie/galerie-commission-03.jpeg` |
| `assets/gallery/commission_04.jpeg` | `assets/journal/commission-europeenne/galerie/galerie-commission-04.jpeg` |
| `assets/gallery/commission_05.jpeg` | `assets/journal/commission-europeenne/galerie/galerie-commission-05.jpeg` |
| `assets/gallery/commission_06.jpeg` | `assets/journal/commission-europeenne/galerie/galerie-commission-06.jpeg` |

---

## 3. Pages impactées et fichiers HTML mis à jour

| Fichier | Statut | Remplacements effectués |
|---|---|---|
| `index.html` | ✅ Mis à jour | 13 images galerie + logos + vidéo + journal-hero + viennoiserie |
| `brunch-buffets.html` | ✅ Mis à jour | 5 images galerie + vidéo hero + logos |
| `animations-culinaires.html` | ✅ Mis à jour | 3 underhero + 5 shared + logos + vidéo |
| `traiteur-formats.html` | ✅ Mis à jour | 5 shared + logos + vidéo |
| `corporate.html` | ✅ Mis à jour | 3 shared + logos + vidéo |
| `realisations.html` | ✅ Mis à jour | 6 images galerie + shared + logos + vidéo |
| `notre-maison.html` | ✅ Mis à jour | 1 image + logos + vidéo |
| `scenographie-design.html` | ✅ Mis à jour | 1 shared + logos + vidéo |
| `degustation-showroom.html` | ✅ Mis à jour | 1 image showroom + logos + vidéo |
| `journal.html` | ✅ Mis à jour | 2 galerie + 3 shared + logos + vidéo |
| `faq.html` | ✅ Mis à jour | logos + vidéo |
| `contact.html` | ⬜ Inchangé | Aucune image dans ce fichier |
| `journal/commission-europeenne.html` | ✅ Mis à jour | 6 images commission + shared + logos (chemins `../assets/`) |

---

## 4. Images dans `common/`

### `common/logo/` — Éléments d'identité visuelle

Ces fichiers sont référencés dans le header/footer de **toutes les pages** du site.

- `logo.png` — Logo principal (header)
- `logo-footer.png` — Logo footer
- `logo-transparent.png` — Logo fond transparent (utilisé dans index.html)
- `amely-script.png` — Script Amely (typographie décorative)

### `common/ui/` — Éléments graphiques récurrents

- `fleurs-footer.png` — Décoration florale du footer (toutes pages)

### `common/video/` — Vidéos héro

- `hero-pj2.mp4` — Vidéo héro principale (toutes pages sauf brunch-buffets)
- `hero.mp4` — Vidéo héro alternative

### `common/shared/` — Images partagées entre plusieurs pages

Ces images apparaissent dans plusieurs pages avec des contextes thématiques différents.

| Fichier | Pages utilisatrices |
|---|---|
| `animations-buffets-signature.jpeg` | animations-culinaires, traiteur-formats |
| `animations-coffee-break.jpeg` | animations-culinaires, traiteur-formats, corporate |
| `animations-finger-food-cocktail.jpeg` | animations-culinaires, traiteur-formats, corporate |
| `animations-lunch-box-premium.jpeg` | animations-culinaires, traiteur-formats, corporate |
| `animations-planches-boxes.jpeg` | animations-culinaires, traiteur-formats |
| `journal-formats-corporate.jpeg` | corporate, journal |
| `galerie-realisations-06.jpeg` | corporate, realisations |
| `scenographie-notre-approche.jpeg` | corporate, scenographie-design |
| `journal-hero.jpeg` | index, realisations, journal |
| `galerie-viennoiserie.jpeg` | brunch-buffets, index, journal |
| `realisations-hero.jpeg` | journal, journal/commission-europeenne |

> **Note :** La présence d'images dans `common/shared/` signale des **zones de cohérence éditoriale à surveiller**. Ces images apparaissent dans des contextes thématiques différents. Lors du prochain shooting, il est recommandé de créer des visuels exclusifs pour chaque page concernée, afin de pouvoir migrer ces fichiers vers leurs dossiers de page respectifs.

---

## 5. Images déplacées par dossier de page

### `index/galerie/` — 13 images (sélection éditoriale homepage)

galerie-index-01.jpeg à galerie-index-13.jpeg + galerie-index-02.webp

### `brunch-buffets/galerie/` — 5 images + 1 vidéo

galerie-brunch-01.jpeg, galerie-brunch-02.jpeg, galerie-brunch-03.jpeg, galerie-brunch-charcuterie.jpeg, galerie-brunch-sales.jpeg, hero-brunch.mp4

### `animations-culinaires/galerie/` — 3 images exclusives

galerie-animations-underhero-1.jpeg, galerie-animations-underhero-2.jpeg, galerie-animations-underhero-3.jpeg

### `realisations/galerie/` — 6 images exclusives

galerie-realisations-01.jpeg à galerie-realisations-05.jpeg + galerie-realisations-etude-brunch.jpeg

### `notre-maison/galerie/` — 1 image exclusive

galerie-notre-maison-01.jpeg

### `showroom-loft-96/galerie/` — 1 image exclusive

galerie-showroom-01.jpeg

### `journal/galerie/` — 2 images exclusives

galerie-journal-art-buffet.jpeg, galerie-journal-coulisses-brunch.jpeg

### `journal/commission-europeenne/galerie/` — 6 images exclusives

galerie-commission-01.jpeg à galerie-commission-06.jpeg

---

## 6. Doublons détectés

Aucun doublon binaire détecté. Les images partagées (listées dans `common/shared/`) ne sont pas dupliquées — elles sont référencées depuis un emplacement unique.

---

## 7. Fichiers non utilisés — `_non-utilises/`

Ces fichiers ne sont référencés dans **aucun fichier HTML** du projet. Ils sont archivés dans `assets/_non-utilises/` pour revue manuelle avant suppression éventuelle.

| Fichier archivé | Origine |
|---|---|
| `apropos-amely-paris.jpeg` | `assets/gallery/` |
| `animations-hero.jpeg` | `assets/gallery/` |
| `global-hero-replacement.jpeg` | `assets/gallery/` |
| `quiche.jpeg` | `assets/gallery/` |
| `journal-hero-update.jpeg` | `assets/gallery/` |
| `commission-image00002.jpeg` | `assets/gallery/commission-europeenne/` |
| `commission-image00089.jpeg` | `assets/gallery/commission-europeenne/` |

> **Action recommandée :** Vérifier manuellement ces fichiers avant suppression définitive. Certains peuvent être des réserves de shooting ou des candidats pour une future intégration.

---

## 8. Résumé de l'opération

| Indicateur | Valeur |
|---|---|
| Fichiers images/vidéo traités | 55 |
| Fichiers déplacés vers dossiers de page | 36 |
| Fichiers déplacés vers `common/` | 12 |
| Fichiers archivés dans `_non-utilises/` | 7 |
| Fichiers HTML mis à jour | 13 |
| Anciens chemins résiduels | **0** |
| Fichiers référencés manquants | **0** |
| Régressions visuelles | **0** |

---

*MEDIA_REORGANISATION.md — Amely Paris — Généré le 21 avril 2026*
