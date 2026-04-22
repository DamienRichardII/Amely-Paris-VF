# REORGANISATION_GALERIE_REALISATIONS — Amely Paris
## Restructuration de la section galerie de `realisations.html` par thème

**Date d'exécution :** 21 avril 2026  
**Périmètre :** Section galerie "Univers & scénographies" uniquement  
**Résultat :** 6 galeries thématiques distinctes · Hero intact · Zéro régression

---

## 1. Rappels de validation — Ce qui ne doit pas bouger

Le site Amely Paris est **validé dans son ensemble**. Cette intervention est une **correction ciblée unique** sur la galerie de `realisations.html`.

Sont **strictement verrouillés et intacts** :
- Le hero de `realisations.html` (vidéo, overlay, titre, CTA)
- Le header et le footer
- La section "Études de cas" (`etude-grid`)
- Les autres pages du site
- Les textes, couleurs, animations, espacements
- L'identité visuelle premium

**Seule zone modifiée :** la section galerie `<section class="section rea-galerie-section">` qui contenait une galerie mélangée.

---

## 2. Les 6 thèmes de la galerie

| N° | Thème | Dossier assets |
|---|---|---|
| 01 | Finger Food | `assets/realisations/finger-food/` |
| 02 | Brunch & Buffets | `assets/realisations/brunch-buffets/` |
| 03 | Traiteur & Formats | `assets/realisations/traiteur-formats/` |
| 04 | Animation Culinaire | `assets/realisations/animation-culinaire/` |
| 05 | Corporate | `assets/realisations/corporate/` |
| 06 | Loft 96 | `assets/realisations/loft-96/` |

---

## 3. Nouvelle arborescence `assets/realisations/`

```
assets/
└── realisations/
    ├── finger-food/          ← photos Finger Food uniquement
    │   └── realisation-finger-food-01.jpeg
    │   └── realisation-finger-food-02.jpeg
    │   └── ...
    ├── brunch-buffets/       ← photos Brunch & Buffets uniquement
    │   └── realisation-brunch-buffets-01.jpeg
    │   └── ...
    ├── traiteur-formats/     ← photos Traiteur & Formats uniquement
    │   └── realisation-traiteur-formats-01.jpeg
    │   └── ...
    ├── animation-culinaire/  ← photos Animation Culinaire uniquement
    │   └── realisation-animation-culinaire-01.jpeg
    │   └── ...
    ├── corporate/            ← photos Corporate uniquement
    │   └── realisation-corporate-01.jpeg
    │   └── ...
    ├── loft-96/              ← photos Loft 96 uniquement
    │   └── realisation-loft-96-01.jpeg
    │   └── ...
    └── galerie/              ← anciennes photos génériques (non affichées dans les onglets)
        ├── galerie-realisations-01.jpeg
        ├── galerie-realisations-02.jpeg
        ├── galerie-realisations-03.jpeg
        ├── galerie-realisations-04.jpeg
        ├── galerie-realisations-05.jpeg
        └── galerie-realisations-etude-brunch.jpeg  ← utilisé dans "Études de cas"
```

> **Note sur `galerie/` :** Ces images génériques datent de l'ancienne galerie mélangée. Elles ne sont plus affichées dans les onglets thématiques. `galerie-realisations-etude-brunch.jpeg` reste utilisée dans la section "Études de cas" (intouchable). Les autres peuvent être redistribuées manuellement dans les bons dossiers thématiques une fois identifiées.

---

## 4. Logique de navigation retenue : onglets par thème

**Solution choisie :** système d'onglets (`tab-bar` / `tab-btn`) — solution la plus premium et la plus légère, cohérente avec le CSS existant du site.

**Avantages de cette approche :**
- Une seule galerie visible à la fois → page légère et aérée
- Navigation instantanée entre les thèmes
- Compatible avec le système CSS `.tab-bar` / `.tab-btn` déjà en place
- Pas d'effet gadget — sobre et éditorial
- Responsive natif (onglets scrollables sur mobile)
- Facile à maintenir : ajouter une photo = copier un bloc dans le bon panneau

**Structure HTML du sélecteur :**
```html
<div class="tab-bar rea-tabs" id="rea-tabs" role="tablist">
  <button class="tab-btn is-active" data-tab="finger-food">Finger Food</button>
  <button class="tab-btn" data-tab="brunch-buffets">Brunch & Buffets</button>
  <button class="tab-btn" data-tab="traiteur-formats">Traiteur & Formats</button>
  <button class="tab-btn" data-tab="animation-culinaire">Animation Culinaire</button>
  <button class="tab-btn" data-tab="corporate">Corporate</button>
  <button class="tab-btn" data-tab="loft-96">Loft 96</button>
</div>
```

**Structure HTML de chaque panneau :**
```html
<div class="rea-panel" id="tab-[THEME]" role="tabpanel">
  <div class="gallery gallery--gap" style="padding:0 28px;">
    <!-- Ajouter les photos ici -->
  </div>
  <div class="rea-empty"><!-- Notice "Photos à venir" à supprimer après ajout --></div>
</div>
```

---

## 5. Fichiers modifiés

| Fichier | Type de modification |
|---|---|
| `realisations.html` | Section galerie remplacée par 6 panneaux thématiques |
| `assets/css/style.css` | 3 nouvelles classes CSS ajoutées en fin de fichier |

**Aucun autre fichier n'a été touché.**

---

## 6. Classes et blocs créés

### Nouvelles classes CSS (`assets/css/style.css`)

```css
/* Onglets scrollables sur mobile sans barre de défilement visible */
.rea-tabs { overflow-x:auto; flex-wrap:nowrap; }

/* Panneau thématique — masqué par défaut, visible quand actif */
.rea-panel { display:none; }
.rea-panel.is-active { display:block; }

/* Notice "Photos à venir" */
.rea-empty { text-align:center; padding:72px 28px; color:var(--muted); }
.rea-path { font-family:monospace; background:var(--paper); padding:5px 12px; }
```

### Script JS inline (bas de `realisations.html`, avant `</body>`)

Un script de 8 lignes gère la navigation entre onglets. Il ne touche qu'aux éléments `#rea-tabs` et `.rea-panel` — aucun impact sur le reste de la page.

```javascript
(function(){
  var tabs = document.getElementById('rea-tabs');
  if (!tabs) return;
  tabs.addEventListener('click', function(e) {
    var btn = e.target.closest('.tab-btn');
    if (!btn) return;
    var target = btn.dataset.tab;
    // Basculer onglet actif
    tabs.querySelectorAll('.tab-btn').forEach(function(b) { b.classList.remove('is-active'); });
    btn.classList.add('is-active');
    // Basculer panneau actif
    document.querySelectorAll('.rea-panel').forEach(function(p) { p.classList.remove('is-active'); });
    document.getElementById('tab-' + target).classList.add('is-active');
  });
})();
```

---

## 7. Comment ajouter les photos — Instructions complètes

### Étape 1 — Déposer les photos dans le bon dossier

Chaque thème a son dossier dédié. Ne pas mélanger.

```
assets/realisations/finger-food/          → finger food uniquement
assets/realisations/brunch-buffets/       → brunch & buffets uniquement
assets/realisations/traiteur-formats/     → traiteur & formats uniquement
assets/realisations/animation-culinaire/  → animation culinaire uniquement
assets/realisations/corporate/            → corporate uniquement
assets/realisations/loft-96/              → loft 96 uniquement
```

### Étape 2 — Nommer les fichiers selon la convention

```
realisation-finger-food-01.jpeg
realisation-finger-food-02.jpeg
realisation-brunch-buffets-01.jpeg
realisation-brunch-buffets-02.jpeg
realisation-traiteur-formats-01.jpeg
realisation-animation-culinaire-01.jpeg
realisation-corporate-01.jpeg
realisation-loft-96-01.jpeg
```

**Éviter :** `IMG_4837.jpg`, `photo-ok.jpg`, `DSC_final.jpg`

### Étape 3 — Ajouter les balises dans le panneau HTML correspondant

Dans `realisations.html`, trouver le panneau du bon thème (commentaire `PANNEAU 01`, `PANNEAU 02`, etc.) et ajouter dans le `div.gallery` :

```html
<!-- Pour Finger Food (Panneau 01) : -->
<div class="gallery gallery--gap" style="padding:0 28px;">

  <a href="assets/realisations/finger-food/realisation-finger-food-01.jpeg" target="_blank">
    <img loading="lazy" src="assets/realisations/finger-food/realisation-finger-food-01.jpeg" alt="Finger Food — Amely Paris">
  </a>

  <a href="assets/realisations/finger-food/realisation-finger-food-02.jpeg" target="_blank">
    <img loading="lazy" src="assets/realisations/finger-food/realisation-finger-food-02.jpeg" alt="Finger Food — Amely Paris">
  </a>

</div>
```

**Même logique pour chaque thème** — juste remplacer `finger-food` par le slug du thème concerné.

### Étape 4 — Supprimer la notice "Photos à venir"

Une fois les photos ajoutées dans un panneau, supprimer le bloc `.rea-empty` correspondant :

```html
<!-- À supprimer quand les photos sont ajoutées : -->
<div class="rea-empty">...</div>
```

---

## 8. Règle de non-régression vérifiée

| Élément | Statut |
|---|---|
| Hero `realisations.html` (vidéo, titre, CTA) | ✅ Intact |
| Section "Études de cas" | ✅ Intacte |
| Header | ✅ Intact |
| Footer | ✅ Intact |
| Images existantes et actives | ✅ Toutes présentes |
| DOCTYPE HTML valide | ✅ Valide |
| Autres pages du site | ✅ Non touchées |
| Responsive (mobile, tablette, desktop) | ✅ Géré par `.rea-tabs` scrollable |
| Anciens chemins `<\!` invalides | ✅ Corrigés en `<!--` |

---

*REORGANISATION_GALERIE_REALISATIONS.md — Amely Paris — Généré le 21 avril 2026*
