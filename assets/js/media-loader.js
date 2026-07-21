/**
 * Media loader — charge les médias administrables depuis Supabase
 * et remplace les src par défaut si un média a été assigné via l'admin.
 * En cas d'échec (réseau, Supabase indisponible, slot vide) : le média
 * codé en dur dans le HTML reste affiché tel quel. Le site ne casse jamais.
 */
(function () {
  'use strict';

  var slotEls = document.querySelectorAll('[data-slot]');
  if (!slotEls.length) return;
  if (!window.supabase || typeof window.supabase.createClient !== 'function') return;

  var SUPABASE_URL = 'https://ltwwjhapdxhpkwvpabva.supabase.co';
  var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0d3dqaGFwZHhocGt3dnBhYnZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyNjMyMjMsImV4cCI6MjA5NDgzOTIyM30.p3aUKEu2qxpygNXiI4BOXdl0VcgDw6OliLls6HbQG84';

  var client;
  try {
    client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  } catch (e) {
    return;
  }

  // Racine du site, déduite de l'emplacement réel de ce script (fonctionne aussi bien
  // en consultation locale — fichier ouvert directement depuis le disque — qu'une fois
  // le site déployé en ligne, quelle que soit la profondeur de la page appelante).
  var SITE_ROOT = (function () {
    try {
      if (document.currentScript && document.currentScript.src) {
        return document.currentScript.src.replace(/assets\/js\/media-loader\.js.*$/, '');
      }
    } catch (e) {}
    return null;
  })();

  function resolveUrl(u) {
    if (!u) return u;
    if (/^https?:\/\//i.test(u)) return u; // déjà une URL absolue (ex: Supabase Storage)
    if (SITE_ROOT && u.charAt(0) === '/') return SITE_ROOT + u.slice(1);
    return u;
  }

  // Regroupe les emplacements par page_key (1er segment du data-slot : "home.hero.video" -> "home")
  var byPage = {};
  slotEls.forEach(function (el) {
    var key = el.getAttribute('data-slot');
    if (!key) return;
    var parts = key.split('.');
    if (parts.length < 3) return;
    var pageKey = parts[0];
    byPage[pageKey] = byPage[pageKey] || [];
    byPage[pageKey].push(el);
  });

  Object.keys(byPage).forEach(function (pageKey) {
    client
      .from('media_slots')
      .select('section_key,slot_key,media_type,file_url,alt_text,updated_at')
      .eq('page_key', pageKey)
      .then(function (result) {
        if (!result || result.error || !Array.isArray(result.data)) return;

        var bySlot = {};
        result.data.forEach(function (row) {
          if (!row.file_url) return;
          var key = pageKey + '.' + row.section_key + '.' + row.slot_key;
          bySlot[key] = row;
        });

        byPage[pageKey].forEach(function (el) {
          var key = el.getAttribute('data-slot');
          var row = bySlot[key];
          if (!row) return; // pas encore administré -> on garde le média par défaut du code

          var version = row.updated_at ? '?v=' + encodeURIComponent(row.updated_at) : '';
          var url = resolveUrl(row.file_url) + version;

          try {
            if (row.media_type === 'video') {
              var source = el.querySelector('source') || el;
              if (source.tagName === 'SOURCE') {
                source.src = url;
                if (typeof el.load === 'function') el.load();
              } else if (el.tagName === 'VIDEO') {
                el.src = url;
                if (typeof el.load === 'function') el.load();
              }
            } else {
              el.src = url;
              if (row.alt_text) el.alt = row.alt_text;
            }
          } catch (e) {
            // silencieux : le média par défaut reste affiché
          }
        });
      })
      .catch(function () {
        // silencieux : le média par défaut reste affiché
      });
  });
})();
