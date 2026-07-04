/* =========================================================
   MELCOR INTERNATIONAL GROUP — Interactions
   ========================================================= */
(function () {
  'use strict';

  const header = document.getElementById('header');
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');

  /* ---------- Header shrink on scroll ---------- */
  const onScroll = () => {
    if (window.scrollY > 30) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  const closeMenu = () => {
    nav.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  };
  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in'));
  }

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll('.stat__num');
  const animateCount = (el) => {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const duration = 1600;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      el.textContent = Math.round(eased * target) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ('IntersectionObserver' in window) {
    const co = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          co.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach((el) => co.observe(el));
  } else {
    counters.forEach((el) => { el.textContent = el.dataset.target + (el.dataset.suffix || ''); });
  }

  /* ---------- Active nav link on scroll ---------- */
  const sections = ['hero', 'about', 'services', 'method', 'faq', 'contact']
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  const navLinks = nav.querySelectorAll('.nav__link');
  const setActive = (id) => {
    navLinks.forEach((l) => l.classList.toggle('is-active', l.getAttribute('href') === '#' + id));
  };
  if ('IntersectionObserver' in window) {
    const so = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { threshold: 0.55 });
    sections.forEach((s) => so.observe(s));
  }

  /* ---------- Contact form (demo, no backend) ---------- */
  const form = document.getElementById('contactForm');
  const note = document.getElementById('formNote');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const en = typeof window.melcorLang === 'function' && window.melcorLang() === 'en';
      const name = form.elements.name.value.trim();
      const email = form.elements.email.value.trim();
      const message = form.elements.message.value.trim();
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!name || !emailOk || !message) {
        note.textContent = en
          ? 'Please enter a name, a valid email and a message.'
          : 'Merci de renseigner un nom, un email valide et un message.';
        note.className = 'form__note err';
        return;
      }
      note.textContent = en
        ? 'Thank you ' + name + '! Your message has been received. We will reply within 24 hours.'
        : 'Merci ' + name + ' ! Votre message a bien été pris en compte. Nous vous répondrons sous 24h.';
      note.className = 'form__note ok';
      form.reset();
    });
  }
})();
