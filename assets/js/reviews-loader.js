/**
 * Reviews loader — charge les avis clients publiés depuis Supabase et les injecte
 * dans la section "Ils nous ont fait confiance" de la page d'accueil.
 * Si aucun avis n'est publié (ou en cas d'erreur réseau/Supabase), la section
 * entière est masquée plutôt que d'afficher un contenu fictif comme réel.
 */
(function () {
  'use strict';

  var track = document.getElementById('reviewsTrack');
  var section = document.getElementById('reviewsSection');
  if (!track || !section) return;
  if (!window.supabase || typeof window.supabase.createClient !== 'function') {
    section.style.display = 'none';
    return;
  }

  var SUPABASE_URL = 'https://ltwwjhapdxhpkwvpabva.supabase.co';
  var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0d3dqaGFwZHhocGt3dnBhYnZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyNjMyMjMsImV4cCI6MjA5NDgzOTIyM30.p3aUKEu2qxpygNXiI4BOXdl0VcgDw6OliLls6HbQG84';

  var client;
  try {
    client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  } catch (e) {
    section.style.display = 'none';
    return;
  }

  function escapeHtml(v) {
    return String(v == null ? '' : v)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function starsHtml(rating) {
    var r = Math.max(0, Math.min(5, Number(rating) || 0));
    return new Array(r + 1).join('★');
  }

  function renderCard(row) {
    return (
      '<article class="review-card">' +
        '<div class="review-stars" aria-label="' + r_(row.rating) + ' sur 5 étoiles">' + starsHtml(row.rating) + '</div>' +
        '<p class="review-text">« ' + escapeHtml(row.testimonial) + ' »</p>' +
        '<div class="review-author">' +
          '<span class="review-name">' + escapeHtml(row.author_name) + '</span>' +
          (row.service_type ? '<span class="review-type">' + escapeHtml(row.service_type) + '</span>' : '') +
        '</div>' +
      '</article>'
    );
  }
  function r_(n) { return Math.max(0, Math.min(5, Number(n) || 0)); }

  client
    .from('reviews')
    .select('author_name,rating,testimonial,service_type,featured,display_order')
    .eq('status', 'published')
    .then(function (result) {
      if (!result || result.error || !Array.isArray(result.data) || !result.data.length) {
        section.style.display = 'none';
        return;
      }
      var rows = result.data.slice().sort(function (a, b) {
        if (!!b.featured !== !!a.featured) return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        return a.display_order - b.display_order;
      });
      track.innerHTML = rows.map(renderCard).join('');
    })
    .catch(function () {
      section.style.display = 'none';
    });
})();
