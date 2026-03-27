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

    // White band appears when hovering nav items (Ralph Lauren style)
    const navItems = header.querySelectorAll('.primary-nav > a, .nav-item');
    let navTimeout;
    navItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        clearTimeout(navTimeout);
        header.classList.add('nav-open');
      });
      item.addEventListener('mouseleave', () => {
        navTimeout = setTimeout(() => {
          if (!header.matches(':hover') || !header.querySelector('.primary-nav:hover')) {
            header.classList.remove('nav-open');
          }
        }, 120);
      });
    });
    header.querySelector('.primary-nav')?.addEventListener('mouseleave', () => {
      navTimeout = setTimeout(() => header.classList.remove('nav-open'), 120);
    });
    header.querySelector('.primary-nav')?.addEventListener('mouseenter', () => {
      clearTimeout(navTimeout);
      header.classList.add('nav-open');
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
