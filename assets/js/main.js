(() => {
  'use strict';

  /* ── Video hero autoplay fix ── */
  const video = document.getElementById('hero-video');
  if (video) {
    video.play().catch(() => {
      // Autoplay blocked — show poster frame silently
    });
  }

  /* ── Header scroll + nav hover white band ── */
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // White band + dropdown persistence on desktop
    const navRoot = header.querySelector('.primary-nav');
    const dropdownItems = header.querySelectorAll('.nav-item.has-dropdown');
    let navTimeout;

    const openNavState = () => {
      clearTimeout(navTimeout);
      header.classList.add('nav-open');
    };

    const closeNavState = () => {
      navTimeout = setTimeout(() => {
        const hoveredDropdown = header.querySelector('.nav-item.has-dropdown:hover, .dropdown:hover');
        const hoveredNav = navRoot && navRoot.matches(':hover');
        if (!hoveredDropdown && !hoveredNav) {
          header.classList.remove('nav-open');
        }
      }, 180);
    };

    navRoot?.addEventListener('mouseenter', openNavState);
    navRoot?.addEventListener('mouseleave', closeNavState);

    dropdownItems.forEach(item => {
      const trigger = item.querySelector(':scope > a');
      const dropdown = item.querySelector(':scope > .dropdown');
      trigger?.addEventListener('mouseenter', openNavState);
      trigger?.addEventListener('focus', openNavState);
      item.addEventListener('mouseenter', openNavState);
      item.addEventListener('mouseleave', closeNavState);
      dropdown?.addEventListener('mouseenter', openNavState);
      dropdown?.addEventListener('mouseleave', closeNavState);
    });
  }

  /* ── Mobile nav toggle ── */
  const nav = document.querySelector('.primary-nav');
  const toggle = document.querySelector('.nav-toggle');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
  }

  /* ── Mobile dropdowns ── */
  document.querySelectorAll('.nav-item.has-dropdown').forEach(item => {
    const a = item.querySelector(':scope > a');
    const dd = item.querySelector(':scope > .dropdown');
    if (!a || !dd) return;
    a.addEventListener('click', e => {
      if (window.matchMedia('(max-width: 1024px)').matches) {
        e.preventDefault();
        item.classList.toggle('is-open');
      }
    });
  });

  /* ── Close mobile nav on outside click ── */
  document.addEventListener('click', e => {
    if (!nav || !toggle) return;
    if (!window.matchMedia('(max-width: 1024px)').matches) return;
    if (!nav.contains(e.target) && !toggle.contains(e.target)) {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  /* ── Tabs ── */
  document.querySelectorAll('[data-tabs]').forEach(root => {
    const buttons = root.querySelectorAll('[data-tab]');
    const panels = root.querySelectorAll('[data-panel]');
    if (!buttons.length || !panels.length) return;
    const activate = id => {
      buttons.forEach(b => b.classList.toggle('is-active', b.dataset.tab === id));
      panels.forEach(p => (p.hidden = p.dataset.panel !== id));
    };
    buttons.forEach(b => b.addEventListener('click', () => activate(b.dataset.tab)));
    activate(buttons[0].dataset.tab);
  });

  /* ── Fade-in on scroll ── */
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    fadeEls.forEach((el, i) => {
      el.style.transitionDelay = (i % 4) * 0.08 + 's';
      io.observe(el);
    });
  }

})();
