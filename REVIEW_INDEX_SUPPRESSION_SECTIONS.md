# REVIEW_INDEX_SUPPRESSION_SECTIONS — Amely Paris
## `index.html` — Suppression de 2 sections

**Date d'exécution :** 22 avril 2026  
**Périmètre autorisé :** `index.html` uniquement  
**Résultat :** 2 suppressions · Zéro régression · Zéro fuite visuelle

---

## 1. Périmètre autorisé — rappel

| Autorisé | Interdit |
|---|---|
| `index.html` — section Formats | Hero |
| `index.html` — section À la Une | Header |
| CSS/JS strictement nécessaires | Footer |
| | Autres pages du site |
| | Autres sections de `index.html` |

---

## 2. Sections supprimées

### Section 1 — Formats

**Identifiant :** commentaire `<!-- ══ FORMATS — Ralph Lauren style ══ -->`  
**Balise racine :** `<section class="section" style="padding-top:0; padding-bottom:0;">`  
**Contenu supprimé :**
- 3 `.format-card` (Coffee break, Brunch & Buffets, Finger food)
- Images : `galerie-index-11.jpeg`, `galerie-index-12.jpeg`, `galerie-index-13.jpeg`
- Liens : `traiteur-formats.html#coffee`, `brunch-buffets.html`, `traiteur-formats.html#finger-food`
- `.format-card-top-label`, `.format-card-top-link`, `.format-card-overlay`

**Vérification :** 0 occurrence de `format-card` ou `formats-grid` dans `index.html` après suppression.

---

### Section 2 — À la Une

**Identifiant :** commentaire `<!-- ══ À LA UNE — Panorama magazine ══ -->`  
**Balise racine :** `<div class="section--flush" style="background:var(--cream);">`  
**Contenu supprimé :**
- `.alaune-logo` (logo transparent centré)
- `.alaune-title` (titre h2 "À la une.")
- `.journal-panorama` (panorama photo gauche + texte droite)
- Image : `assets/common/shared/journal-hero.jpeg`
- Lien : `journal/commission-europeenne.html`

**Vérification :** 0 occurrence de `alaune` ou `journal-panorama` dans `index.html` après suppression.

---

## 3. Enchaînement des sections après suppression

La page `index.html` présente désormais cet ordre propre et sans vide incohérent :

```
Intro animation
  ↓
Header
  ↓
Hero (vidéo, titre "Design & Gastronomie.")
  ↓
2×2 Photo Grid (4 photos)
  ↓
Section Savoir-faire (titre + CTA "Voir les réalisations")
  ↓
Lookbook scrolling (6 vignettes en défilement infini)
  ↓
Signature strip ("Manger avec les yeux, savourer avec le cœur.")
  ↓
Showroom Loft 96 (panorama)
  ↓
Contact CTA ("Parlons-en." + "Demander un devis")
  ↓
Pre-footer strip
  ↓
Footer
```

La suppression des 2 sections crée une transition naturelle et élégante : le `signature-strip` mène directement au panorama Showroom.

---

## 4. CSS et JS

**Aucune modification CSS ou JS n'a été nécessaire.**

Les classes `.formats-grid`, `.format-card`, `.alaune-logo`, `.alaune-title`, `.journal-panorama` restent définies en CSS mais ne sont plus instanciées dans `index.html`. Elles ne créent aucun artefact visuel. Elles sont conservées dans le CSS car elles pourraient être utilisées dans d'autres contextes ou futures pages.

---

## 5. Fichiers modifiés

| Fichier | Modification |
|---|---|
| `index.html` | Suppression section Formats + suppression section À la Une |

**Aucun autre fichier n'a été touché.**

---

## 6. Confirmation de non-régression

| Élément | Statut |
|---|---|
| Section Formats supprimée | ✅ 0 occurrence résiduelle |
| Section À la Une supprimée | ✅ 0 occurrence résiduelle |
| Hero (`hero-video`, vidéo, titre) | ✅ Intact |
| Header | ✅ Intact |
| Footer | ✅ Intact |
| 2×2 Photo Grid | ✅ Intact |
| Section Savoir-faire | ✅ Intacte |
| Lookbook scrolling | ✅ Intact |
| Signature strip | ✅ Intact |
| Showroom Loft 96 | ✅ Intact |
| Contact CTA | ✅ Intact |
| Intro animation (canvas pétales) | ✅ Intact |
| Autres pages du site | ✅ Non touchées |
| Corruption HTML (`<\!`) | ✅ 0 occurrence |
| Aucun morceau de code visible à l'écran | ✅ Confirmé |
| Aucune balise HTML affichée | ✅ Confirmé |
| Aucun placeholder résiduel | ✅ Confirmé |
| Responsive préservé | ✅ Confirmé |

---

*REVIEW_INDEX_SUPPRESSION_SECTIONS.md — Amely Paris — Généré le 22 avril 2026*
