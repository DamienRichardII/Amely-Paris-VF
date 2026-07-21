/**
 * Centre de notifications admin — cloche in-app calculée en direct depuis Supabase
 * à chaque chargement de page (et toutes les 5 min si la page reste ouverte).
 * Pas de stockage persistant : les alertes reflètent l'état actuel des données.
 * Catégories couvertes : nouveaux devis, devis non traités depuis plusieurs jours,
 * relances dues aujourd'hui, médias sans fichier, événements proches.
 * (« fichier cassé » et « nouvelle réponse client » nécessiteraient respectivement
 * une vérification réseau par média et une intégration boîte mail — non couverts ici.)
 */
(function () {
  'use strict';

  function escapeHtml(v) {
    return String(v == null ? '' : v).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  function init() {
    var topActions = document.querySelector('.top-actions');
    if (!topActions) return;
    if (!window.supabase || typeof window.supabase.createClient !== 'function') return;

    var SUPABASE_URL = 'https://ltwwjhapdxhpkwvpabva.supabase.co';
    var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0d3dqaGFwZHhocGt3dnBhYnZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyNjMyMjMsImV4cCI6MjA5NDgzOTIyM30.p3aUKEu2qxpygNXiI4BOXdl0VcgDw6OliLls6HbQG84';

    var client;
    try { client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY); } catch (e) { return; }

    var wrap = document.createElement('div');
    wrap.style.position = 'relative';
    wrap.innerHTML =
      '<button type="button" id="notifBellBtn" aria-label="Notifications" style="' +
        'border:1px solid rgba(36,25,20,.10); background:#fff; color:#241914; padding:0; width:46px; height:46px; ' +
        'border-radius:999px; cursor:pointer; display:inline-flex; align-items:center; justify-content:center; position:relative; font-size:18px;">' +
        '🔔<span id="notifBadge" style="display:none; position:absolute; top:2px; right:2px; background:#8a2e2e; color:#fff; ' +
        'font-size:10px; font-weight:700; min-width:16px; height:16px; border-radius:999px; align-items:center; justify-content:center; padding:0 3px;"></span>' +
      '</button>' +
      '<div id="notifPanel" style="display:none; position:absolute; top:54px; right:0; width:340px; max-height:420px; overflow-y:auto; ' +
        'background:#fff; border:1px solid rgba(36,25,20,.10); border-radius:18px; box-shadow:0 18px 45px rgba(36,25,20,.14); ' +
        'padding:14px; z-index:100;">' +
        '<div id="notifList" style="display:grid; gap:8px; font-size:13px;">Chargement…</div>' +
      '</div>';
    topActions.insertBefore(wrap, topActions.firstChild);

    var bellBtn = document.getElementById('notifBellBtn');
    var badge = document.getElementById('notifBadge');
    var panel = document.getElementById('notifPanel');
    var list = document.getElementById('notifList');

    bellBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      panel.style.display = panel.style.display === 'none' ? '' : 'none';
    });
    document.addEventListener('click', function (e) {
      if (!wrap.contains(e.target)) panel.style.display = 'none';
    });

    function itemHtml(icon, label, href) {
      return '<a href="' + href + '" style="display:flex; gap:8px; align-items:flex-start; padding:8px; border-radius:10px; background:#fffaf3; text-decoration:none; color:#241914;">' +
        '<span>' + icon + '</span><span>' + label + '</span></a>';
    }

    async function computeNotifications() {
      var items = [];

      try {
        var quotesRes = await client.from('quote_requests').select('id,status,follow_up_date,created_at,archived');
        if (!quotesRes.error && Array.isArray(quotesRes.data)) {
          var rows = quotesRes.data.filter(function (r) { return !r.archived; });
          var newCount = rows.filter(function (r) { return (r.status || 'nouveau') === 'nouveau'; }).length;
          if (newCount) items.push({ icon: '🆕', label: newCount + ' nouveau' + (newCount > 1 ? 'x' : '') + ' devis à traiter', href: 'devis.html' });

          var staleThreshold = new Date(); staleThreshold.setDate(staleThreshold.getDate() - 3);
          var staleCount = rows.filter(function (r) {
            return ['nouveau', 'a_contacter'].indexOf(r.status) !== -1 && new Date(r.created_at) < staleThreshold;
          }).length;
          if (staleCount) items.push({ icon: '⏳', label: staleCount + ' devis non traité' + (staleCount > 1 ? 's' : '') + ' depuis plus de 3 jours', href: 'devis.html' });

          var todayIso = new Date().toISOString().slice(0, 10);
          var followUpToday = rows.filter(function (r) {
            return r.follow_up_date === todayIso && ['accepte', 'refuse', 'cloture'].indexOf(r.status) === -1;
          }).length;
          if (followUpToday) items.push({ icon: '📞', label: followUpToday + ' relance' + (followUpToday > 1 ? 's' : '') + ' prévue' + (followUpToday > 1 ? 's' : '') + ' aujourd\'hui', href: 'devis.html' });
        }
      } catch (e) {}

      try {
        var mediaRes = await client.from('media_slots').select('id,file_url');
        if (!mediaRes.error && Array.isArray(mediaRes.data)) {
          var missing = mediaRes.data.filter(function (r) { return !r.file_url; }).length;
          if (missing) items.push({ icon: '🖼️', label: missing + ' emplacement' + (missing > 1 ? 's' : '') + ' média sans fichier', href: 'medias.html' });
        }
      } catch (e) {}

      try {
        var todayIso2 = new Date().toISOString().slice(0, 10);
        var soon = new Date(); soon.setDate(soon.getDate() + 3);
        var soonIso = soon.toISOString().slice(0, 10);
        var eventsRes = await client.from('events').select('id,title,event_date,status').gte('event_date', todayIso2).lte('event_date', soonIso).neq('status', 'annule');
        if (!eventsRes.error && Array.isArray(eventsRes.data) && eventsRes.data.length) {
          items.push({ icon: '📅', label: eventsRes.data.length + ' événement' + (eventsRes.data.length > 1 ? 's' : '') + ' dans les 3 prochains jours', href: 'agenda.html' });
        }
      } catch (e) {}

      return items;
    }

    async function refresh() {
      var items = await computeNotifications();
      if (!items.length) {
        badge.style.display = 'none';
        list.innerHTML = '<div style="color:#7e6a5f;text-align:center;padding:12px;">Rien à signaler pour le moment.</div>';
        return;
      }
      badge.style.display = 'flex';
      badge.textContent = items.length > 9 ? '9+' : String(items.length);
      list.innerHTML = items.map(function (it) { return itemHtml(it.icon, escapeHtml(it.label), it.href); }).join('');
    }

    refresh();
    setInterval(refresh, 5 * 60 * 1000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
