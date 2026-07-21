/**
 * Content loader — charge les textes administrables depuis Supabase et remplace
 * le texte par défaut codé en dur si une valeur a été renseignée via l'admin.
 * En cas d'échec (réseau, Supabase indisponible, champ vide) : le texte codé en
 * dur dans le HTML reste affiché tel quel. Le site ne casse jamais.
 */
(function () {
  'use strict';

  var contentEls = document.querySelectorAll('[data-content]');
  if (!contentEls.length) return;
  if (!window.supabase || typeof window.supabase.createClient !== 'function') return;

  var SUPABASE_URL = 'https://ltwwjhapdxhpkwvpabva.supabase.co';
  var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0d3dqaGFwZHhocGt3dnBhYnZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyNjMyMjMsImV4cCI6MjA5NDgzOTIyM30.p3aUKEu2qxpygNXiI4BOXdl0VcgDw6OliLls6HbQG84';

  var client;
  try {
    client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  } catch (e) {
    return;
  }

  // Regroupe par page_key (1er segment de "page.section.champ")
  var byPage = {};
  contentEls.forEach(function (el) {
    var key = el.getAttribute('data-content');
    if (!key) return;
    var parts = key.split('.');
    if (parts.length < 3) return;
    var pageKey = parts[0];
    byPage[pageKey] = byPage[pageKey] || [];
    byPage[pageKey].push(el);
  });

  Object.keys(byPage).forEach(function (pageKey) {
    client
      .from('site_content')
      .select('section_key,field_key,value')
      .eq('page_key', pageKey)
      .then(function (result) {
        if (!result || result.error || !Array.isArray(result.data)) return;

        var byField = {};
        result.data.forEach(function (row) {
          if (row.value == null || row.value === '') return;
          byField[pageKey + '.' + row.section_key + '.' + row.field_key] = row.value;
        });

        byPage[pageKey].forEach(function (el) {
          var value = byField[el.getAttribute('data-content')];
          if (value == null) return; // pas encore administré -> texte par défaut conservé
          try { el.textContent = value; } catch (e) {}
        });
      })
      .catch(function () {});
  });
})();
