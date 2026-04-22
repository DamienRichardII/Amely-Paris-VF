# REVIEW_MODIFICATIONS_PHOTOS_GALERIES_ASSETS — Amely Paris
## Corrections multi-pages : photos · galeries · assets

**Date d'exécution :** 22 avril 2026  
**Périmètre autorisé :** `animations-culinaires.html` · `corporate.html` · `journal.html` · `realisations.html` · `assets/css/style.css` · arborescence `assets/`  
**Résultat :** 12 interventions · 2 pages créées · 17 dossiers assets · Zéro régression

---

## 1. Périmètre autorisé — rappel

| Autorisé | Interdit |
|---|---|
| `animations-culinaires.html` | Header |
| `corporate.html` | Footer |
| `journal.html` | Heroes des pages |
| `realisations.html` | Autres pages du site |
| `assets/css/style.css` (ajouts mineurs) | Couleurs, typo, animations globales |
| Arborescence `assets/` | Design hors périmètre |

---

## 2. Modifications page par page

---

### PAGE `animations-culinaires.html`

#### A. Suppression des 3 photos sous le hero

**Bloc supprimé :**
```
section.section--flush → editorial.editorial--3 contenant 3 ed-cells :
- galerie-animations-underhero-1.jpeg  (Bar à pizzas · feu de bois)
- galerie-animations-underhero-2.jpeg  (Bar à pâtes artisanales)
- galerie-animations-underhero-3.jpeg  (Plancha minute)
```

La page enchaîne désormais directement du hero vers la section `#formats`.

#### B. Remplacement des 5 intitulés et chemins images

| Avant | Après | Kicker | Nouveau chemin image |
|---|---|---|---|
| Coffee break & Petit-déjeuner | **Burger** | Animation | `assets/animations-culinaires/burger/animation-burger-01.jpeg` |
| Lunch box premium | **Brochette de poulet satay** | Animation | `assets/animations-culinaires/brochette-poulet-satay/animation-brochette-poulet-satay-01.jpeg` |
| Finger food & Cocktail | **Animation Orientale** | Animation | `assets/animations-culinaires/animation-orientale/animation-orientale-01.jpeg` |
| Buffets signature | **Animation Sandwich** | Animation | `assets/animations-culinaires/animation-sandwich/animation-sandwich-01.jpeg` |
| Planches & Boxes | **Animation plancha & viandes** | Animation | `assets/animations-culinaires/animation-plancha-viandes/animation-plancha-viandes-01.jpeg` |

**Structure préservée :** `.formats-grid` avec 5 `.format-card` — même logique d'overlay, mêmes proportions, même responsive.

#### Non-régression `animations-culinaires.html`

| Élément | Statut |
|---|---|
| Hero (vidéo hero-pj2.mp4, titre, CTA) | ✅ Intact |
| Banner text | ✅ Intact |
| Section #formats (structure) | ✅ Intacte |
| Header & Footer | ✅ Intacts |
| section--flush | ✅ Supprimée (0 occurrence) |

---

### PAGE `corporate.html`

#### A. Suppression des 3 photos sous le hero

**Bloc supprimé :**
```
section.section--flush → editorial.editorial--3 contenant 3 ed-cells :
- journal-formats-corporate.jpeg  (Formats corporate)
- scenographie-notre-approche.jpeg  (Scénographie & brand)
- galerie-realisations-06.jpeg  (Références)
```

#### B. Remplacement des 3 thèmes dans la section process

| Avant | Après | Nouveau chemin image |
|---|---|---|
| Petit-déjeuner & Coffee break | **Noël Central Seine** | `assets/corporate/noel-central-seine/corporate-noel-central-seine-01.jpeg` |
| Lunch box premium | **Noël SOCC** | `assets/corporate/noel-socc/corporate-noel-socc-01.jpeg` |
| Cocktail & Finger food | **Halloween** | `assets/corporate/halloween/corporate-halloween-01.jpeg` |

#### C. Ajout de 5 nouvelles entrées dans la section process

| Thème | Chemin image |
|---|---|
| **Star Wars** | `assets/corporate/process/star-wars/process-star-wars-01.jpeg` |
| **Staffmatch** | `assets/corporate/process/staffmatch/process-staffmatch-01.jpeg` |
| **Corporate Bobigny** | `assets/corporate/process/corporate-bobigny/process-corporate-bobigny-01.jpeg` |
| **Académie des métiers des arts et métiers** | `assets/corporate/process/academie-metiers-arts-metiers/process-academie-metiers-arts-metiers-01.jpeg` |
| **Eneixia anniversaire 10 ans** | `assets/corporate/process/eneixia-anniversaire-10-ans/process-eneixia-anniversaire-10-ans-01.jpeg` |

**Grille utilisée :** `.editorial.editorial--4` — 4 colonnes × 2 lignes = 8 événements.  
**Cellules :** `.ed-cell.ed-cell--medium` (52vh) — proportions adaptées à la grille 4 colonnes.  
**Responsive :** 4 cols → 2 cols (1024px) → 1 col (768px). Section entière homogène et pensée comme telle dès l'origine.

**Nouveau CSS ajouté (style.css) :**
```css
.editorial--4{grid-template-columns:repeat(4,1fr);}
@media(max-width:1024px){.editorial--4{grid-template-columns:1fr 1fr;}}
@media(max-width:768px){.editorial--4{grid-template-columns:1fr;}}
```

#### Non-régression `corporate.html`

| Élément | Statut |
|---|---|
| Hero (vidéo hero-pj2.mp4, titre, CTA) | ✅ Intact |
| Banner text (Séminaire · Cocktail · ...) | ✅ Intact |
| Section "Impact" + CTA | ✅ Intacts |
| Kicker "Process" + bouton "Démarrer un projet" | ✅ Conservés |
| section--flush | ✅ Supprimée (0 occurrence) |
| Header & Footer | ✅ Intacts |

---

### PAGE `journal.html`

#### Section "À la une" — 6 cartes → 2 cartes

**Cartes supprimées :**
- Brunch signature — printemps 2026
- Dans les coulisses d'un brunch gastronomique
- Viennoiseries & douceurs — notre sélection
- L'art du buffet comme décor vivant
- Formats corporate — élégance et efficacité

**Cartes conservées :**

| Carte | Statut |
|---|---|
| Commission européenne (lien → `journal/commission-europeenne.html`) | ✅ Conservée intacte |
| Noël — placeholder premium | ✅ Créé |

**Placeholder Noël :** carte `.journal-card` avec fond `var(--paper)`, bordure discrète `var(--line)`, kicker doré "Noël" et mention "Photo à venir". Aucun élément cassé, aucune impression de vide — structure propre et prête à accueillir la photo.

**Grille :** `.journal-grid.journal-grid--2` — 2 colonnes côte à côte.

**Nouveau CSS ajouté :**
```css
.journal-grid--2{grid-template-columns:1fr 1fr;max-width:900px;}
@media(max-width:768px){.journal-grid--2{grid-template-columns:1fr;}}
```

#### Non-régression `journal.html`

| Élément | Statut |
|---|---|
| Hero (vidéo, titre, CTA "Découvrir") | ✅ Intact |
| Lien Commission européenne | ✅ Intact |
| Header & Footer | ✅ Intacts |

---

### PAGE `realisations.html`

#### A. Suppression de la section "Études de cas"

**Bloc supprimé :**
```
section.section--paper → etude-grid contenant 2 etude-cards :
- Commission européenne (Corporate · Janvier 2026)
- Décor & gourmandise (Brunch · Thématique)
```

#### B. Suppression des 6 thèmes galerie (système onglets)

**Supprimés :**
- Finger Food (tab + panneau + rea-empty)
- Brunch & Buffets (tab + panneau + rea-empty)
- Traiteur & Formats (tab + panneau + rea-empty)
- Animation Culinaire (tab + panneau + rea-empty)
- Corporate (tab + panneau + rea-empty)
- Loft 96 (tab + panneau + rea-empty)

Le script JS de navigation par onglets a également été supprimé (devenu inutile).

#### C. 2 nouveaux thèmes : Brunch Mariage

**Structure choisie :** `.etude-grid` (2 colonnes, déjà défini en CSS) avec 2 `.etude-card` premium — composant natif du site, même logique overlay, même proportion 4:3, même niveau éditorial.

| Thème | CTA | Page dédiée |
|---|---|---|
| **Brunch Mariage · Nainvilles les roches** | Voir la galerie | `realisations/brunch-mariage-nainvilles.html` |
| **Brunch Mariage · Nadia & Christophe** | Voir la galerie | `realisations/brunch-mariage-nadia-christophe.html` |

Les 2 cartes utilisent `background:var(--ink)` pour un rendu premium immédiat sans photo. Le texte (kicker doré + titre blanc + description + CTA ghost) est parfaitement lisible sur fond sombre. Dès que les photos sont ajoutées, elles remplaceront naturellement le fond.

**Pages galerie créées :**
- `realisations/brunch-mariage-nainvilles.html` — structure complète (header, title, gallery vide prête, placeholder, footer)
- `realisations/brunch-mariage-nadia-christophe.html` — identique

#### Non-régression `realisations.html`

| Élément | Statut |
|---|---|
| Hero plein écran (vidéo, titre, CTA) | ✅ Intact |
| Header & Footer | ✅ Intacts |
| tab-btn (onglets) | ✅ Supprimés (0 occurrence) |
| Script JS onglets | ✅ Supprimé |

---

## 3. Nouvelle arborescence `assets/`

### Dossiers créés

```
assets/
├── animations-culinaires/
│   ├── burger/                          ← photos Burger
│   ├── brochette-poulet-satay/          ← photos Brochette de poulet satay
│   ├── animation-orientale/             ← photos Animation Orientale
│   ├── animation-sandwich/              ← photos Animation Sandwich
│   └── animation-plancha-viandes/       ← photos Animation plancha & viandes
│
├── corporate/
│   ├── noel-central-seine/              ← photos Noël Central Seine
│   ├── noel-socc/                       ← photos Noël SOCC
│   ├── halloween/                       ← photos Halloween
│   └── process/
│       ├── star-wars/                   ← photos Star Wars
│       ├── staffmatch/                  ← photos Staffmatch
│       ├── corporate-bobigny/           ← photos Corporate Bobigny
│       ├── academie-metiers-arts-metiers/ ← photos Académie des métiers
│       └── eneixia-anniversaire-10-ans/ ← photos Eneixia 10 ans
│
├── journal/
│   └── a-la-une/
│       ├── commission-europeenne/       ← photos article Commission européenne
│       └── noel/                        ← photos article Noël (à venir)
│
├── realisations/
│   ├── brunch-mariage-nainvilles-les-roches/  ← photos galerie Nainvilles
│   └── brunch-mariage-nadia-christophe/       ← photos galerie Nadia & Christophe
```

### Convention de nommage

```
animation-burger-01.jpeg
animation-brochette-poulet-satay-01.jpeg
animation-orientale-01.jpeg
animation-sandwich-01.jpeg
animation-plancha-viandes-01.jpeg
corporate-noel-central-seine-01.jpeg
corporate-noel-socc-01.jpeg
corporate-halloween-01.jpeg
process-star-wars-01.jpeg
process-staffmatch-01.jpeg
process-corporate-bobigny-01.jpeg
process-academie-metiers-arts-metiers-01.jpeg
process-eneixia-anniversaire-10-ans-01.jpeg
realisation-brunch-mariage-nainvilles-les-roches-01.jpeg
realisation-brunch-mariage-nadia-christophe-01.jpeg
```

---

## 4. Fichiers modifiés

| Fichier | Type d'intervention |
|---|---|
| `animations-culinaires.html` | Suppression 3 photos sous hero · Remplacement 5 intitulés + chemins images |
| `corporate.html` | Suppression 3 photos sous hero · Remplacement 3 thèmes process · Ajout 5 thèmes process |
| `journal.html` | Réduction section À la une : 6 → 2 cartes · Placeholder Noël |
| `realisations.html` | Suppression galerie 6 onglets · Suppression études de cas · Suppression JS onglets · 2 nouveaux blocs brunch mariage |
| `assets/css/style.css` | Ajout `.editorial--4` + `.journal-grid--2` (responsive complet) |

## 5. Fichiers créés

| Fichier | Contenu |
|---|---|
| `realisations/brunch-mariage-nainvilles.html` | Page galerie stub — header + intro + gallery vide + footer |
| `realisations/brunch-mariage-nadia-christophe.html` | Page galerie stub — header + intro + gallery vide + footer |

---

## 6. Sections prêtes pour futurs ajouts de photos

| Section | Comment ajouter les photos |
|---|---|
| `animations-culinaires.html` — format-cards | Déposer les photos dans le dossier du thème, remplacer le `src` de l'`img` correspondant |
| `corporate.html` — process 8 cellules | Déposer les photos dans le dossier du thème (ex : `corporate/noel-central-seine/`), remplacer le `src` |
| `journal.html` — placeholder Noël | Déposer la photo dans `assets/journal/a-la-une/noel/`, ajouter un `img` dans la `.journal-card` placeholder et retirer le style `display:flex` |
| `realisations.html` — 2 cartes brunch | Ajouter un `img` dans chaque `etude-card` (avant `etude-card-overlay`), retirer le `background:var(--ink)` inline |
| `realisations/brunch-mariage-nainvilles.html` | Ajouter des `a > img` dans le `div.gallery#galerie-nainvilles`, retirer le bloc placeholder |
| `realisations/brunch-mariage-nadia-christophe.html` | Ajouter des `a > img` dans le `div.gallery#galerie-nadia-christophe`, retirer le bloc placeholder |

---

## 7. Checklist finale

| Critère | Résultat |
|---|---|
| `animations-culinaires.html` : nouveaux intitulés (Burger, Brochette de poulet satay, Animation Orientale, Animation Sandwich, Animation plancha & viandes) | ✅ |
| `animations-culinaires.html` : 3 photos sous hero supprimées | ✅ |
| `corporate.html` : 3 photos sous hero supprimées | ✅ |
| `corporate.html` : Noël Central Seine, Noël SOCC, Halloween présents | ✅ |
| `corporate.html` : 5 ajouts process (Star Wars, Staffmatch, Corporate Bobigny, Académie, Eneixia) | ✅ |
| `corporate.html` : section process homogène (8 cellules, editorial--4, même proportions) | ✅ |
| `journal.html` : section À la une réduite à 2 emplacements | ✅ |
| `journal.html` : Commission européenne conservée intacte | ✅ |
| `journal.html` : placeholder Noël propre et premium | ✅ |
| `realisations.html` : section étude de cas supprimée | ✅ |
| `realisations.html` : 6 anciens thèmes supprimés | ✅ |
| `realisations.html` : 2 nouveaux blocs brunch mariage présents | ✅ |
| CTA "Voir la galerie" branché sur pages dédiées | ✅ |
| Pages galerie stub créées (Nainvilles + Nadia & Christophe) | ✅ |
| Arborescence assets claire et exploitable | ✅ |
| Aucun morceau de code visible à l'écran | ✅ |
| Aucune balise HTML affichée | ✅ |
| Aucune régression hero | ✅ |
| Aucune régression header / footer | ✅ |
| Responsive préservé (editorial--4, journal-grid--2 responsive) | ✅ |
| Code propre, fermé, sans classe morte | ✅ |

---

*REVIEW_MODIFICATIONS_PHOTOS_GALERIES_ASSETS.md — Amely Paris — Généré le 22 avril 2026*
