/* =========================================================
   MELCOR — Bilingue FR / EN (client-side)
   Le texte français est la valeur par défaut du HTML ;
   la traduction anglaise est dans l'attribut data-en.
   ========================================================= */
(function () {
  'use strict';
  var KEY = 'melcor_lang';
  var nodes = document.querySelectorAll('[data-en]');
  var btns = document.querySelectorAll('.lang__btn');

  // Mémorise le texte FR d'origine (innerHTML pour garder les entités)
  nodes.forEach(function (n) { n.setAttribute('data-fr', n.innerHTML); });

  function apply(lang) {
    if (lang !== 'en') lang = 'fr';
    nodes.forEach(function (n) {
      n.innerHTML = lang === 'en' ? n.getAttribute('data-en') : n.getAttribute('data-fr');
    });
    document.documentElement.lang = lang;
    document.documentElement.setAttribute('data-lang', lang);
    btns.forEach(function (b) {
      b.classList.toggle('is-active', b.getAttribute('data-lang') === lang);
    });
    try { localStorage.setItem(KEY, lang); } catch (e) {}
  }

  btns.forEach(function (b) {
    b.addEventListener('click', function () { apply(b.getAttribute('data-lang')); });
  });

  var saved = 'fr';
  try { saved = localStorage.getItem(KEY) || 'fr'; } catch (e) {}
  apply(saved);

  // Expose pour les autres scripts (ex. messages du formulaire)
  window.melcorLang = function () { return document.documentElement.lang === 'en' ? 'en' : 'fr'; };
})();
