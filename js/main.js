document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.primary-nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isExpanded));
      menuToggle.setAttribute('aria-label', isExpanded ? 'Abrir menu' : 'Fechar menu');
      nav.classList.toggle('is-open', !isExpanded);
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Abrir menu');
        nav.classList.remove('is-open');
      });
    });
  }

  document.getElementById('currentYear').textContent = new Date().getFullYear();

  const revealItems = document.querySelectorAll(
    '.hero-copy, .hero-visual, .stat, .section-heading, .method-card, .service-card, .faq-item, .closing-inner'
  );
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const supportsMouseEffects = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -28px 0px' });

    revealItems.forEach((element, index) => {
      element.classList.add('reveal');
      element.style.transitionDelay = `${Math.min(index % 4, 3) * 55}ms`;
      revealObserver.observe(element);
    });
  }

  const hero = document.querySelector('.hero');
  if (hero && supportsMouseEffects && !prefersReducedMotion) {
    hero.addEventListener('pointermove', (event) => {
      const bounds = hero.getBoundingClientRect();
      hero.style.setProperty('--pointer-x', `${((event.clientX - bounds.left) / bounds.width) * 100}%`);
      hero.style.setProperty('--pointer-y', `${((event.clientY - bounds.top) / bounds.height) * 100}%`);
    });
  }

  if (supportsMouseEffects && !prefersReducedMotion) {
    document.querySelectorAll('.button').forEach((button) => {
      button.addEventListener('pointermove', (event) => {
        const bounds = button.getBoundingClientRect();
        const offsetX = (event.clientX - bounds.left - bounds.width / 2) * 0.08;
        const offsetY = (event.clientY - bounds.top - bounds.height / 2) * 0.12;
        button.style.setProperty('--magnet-x', `${offsetX.toFixed(1)}px`);
        button.style.setProperty('--magnet-y', `${offsetY.toFixed(1)}px`);
      });

      button.addEventListener('pointerleave', () => {
        button.style.removeProperty('--magnet-x');
        button.style.removeProperty('--magnet-y');
      });
    });
  }
});
