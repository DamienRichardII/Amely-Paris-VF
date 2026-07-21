/**
 * Posts listing — ajoute dynamiquement les réalisations/articles créés depuis
 * l'admin (table "posts") aux grilles existantes de realisations.html et
 * journal.html, en plus des cartes codées en dur. N'affiche que les éléments
 * publiés. En cas d'échec, la grille codée en dur reste inchangée.
 */
(function () {
  'use strict';

  var grid = document.getElementById('etudeGrid') || document.getElementById('journalGrid');
  if (!grid) return;
  if (!window.supabase || typeof window.supabase.createClient !== 'function') return;

  var TYPE = document.getElementById('etudeGrid') ? 'realisation' : 'journal';
  var LINK_LABEL = TYPE === 'realisation' ? 'Voir la galerie' : 'Lire l’article';

  var SUPABASE_URL = 'https://ltwwjhapdxhpkwvpabva.supabase.co';
  var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0d3dqaGFwZHhocGt3dnBhYnZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyNjMyMjMsImV4cCI6MjA5NDgzOTIyM30.p3aUKEu2qxpygNXiI4BOXdl0VcgDw6OliLls6HbQG84';

  function escapeHtml(v) {
    return String(v == null ? '' : v).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  var client;
  try { client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY); } catch (e) { return; }

  function formatDate(iso) {
    if (!iso) return '';
    var d = new Date(iso + 'T00:00:00');
    if (isNaN(d.getTime())) return '';
    return d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });
  }

  client.from('posts').select('title,slug,category,excerpt,cover_image_url,event_date,display_order')
    .eq('type', TYPE).eq('status', 'published').order('display_order')
    .then(function (result) {
      if (!result || result.error || !Array.isArray(result.data) || !result.data.length) return;

      var html = result.data.map(function (p) {
        var href = 'post.html?slug=' + encodeURIComponent(p.slug);
        if (TYPE === 'realisation') {
          var bg = p.cover_image_url
            ? 'background-image:url(\'' + p.cover_image_url.replace(/'/g, '%27') + '\');background-size:cover;background-position:center;'
            : 'background:var(--ink);';
          return (
            '<div class="etude-card fade-in" style="' + bg + '">' +
              '<div class="etude-card-overlay">' +
                (p.category ? '<span class="kicker">' + escapeHtml(p.category) + '</span>' : '') +
                '<h3>' + escapeHtml(p.title) + '</h3>' +
                (p.excerpt ? '<p>' + escapeHtml(p.excerpt) + '</p>' : '') +
                '<a href="' + href + '" class="btn btn--ghost">' + LINK_LABEL + '</a>' +
              '</div>' +
            '</div>'
          );
        }
        var kicker = [formatDate(p.event_date), p.category].filter(Boolean).join(' · ');
        return (
          '<div class="journal-card journal-card--overlay fade-in" style="position:relative;">' +
            (p.cover_image_url ? '<img loading="lazy" src="' + escapeHtml(p.cover_image_url) + '" alt="' + escapeHtml(p.title) + '">' : '') +
            '<div class="journal-card-body">' +
              (kicker ? '<span class="kicker">' + escapeHtml(kicker) + '</span>' : '') +
              '<h3>' + escapeHtml(p.title) + '</h3>' +
            '</div>' +
            '<a href="' + href + '" style="position:absolute;inset:0;z-index:2;"></a>' +
          '</div>'
        );
      }).join('');
      grid.insertAdjacentHTML('beforeend', html);
    })
    .catch(function () {});
})();
