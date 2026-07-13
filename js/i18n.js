/* =========================================================
   MELCOR - Trilingue FR / EN / AR (client-side)
   Le texte français est la valeur par défaut du HTML ;
   les traductions sont dans data-en et data-ar.
   L'arabe passe automatiquement en RTL (dir="rtl").
   ========================================================= */
(function () {
  'use strict';
  var KEY = 'melcor_lang';
  var LANGS = ['fr', 'en', 'ar'];
  var nodes = document.querySelectorAll('[data-en]'); // mêmes nœuds portent data-ar
  var btns = document.querySelectorAll('.lang__btn');

  // Mémorise le texte FR d'origine (innerHTML pour garder les entités)
  nodes.forEach(function (n) { n.setAttribute('data-fr', n.innerHTML); });

  function apply(lang) {
    if (LANGS.indexOf(lang) === -1) lang = 'fr';
    nodes.forEach(function (n) {
      var val = n.getAttribute('data-' + lang);
      if (val === null) val = n.getAttribute('data-fr');
      n.innerHTML = val;
    });
    var html = document.documentElement;
    html.lang = lang;
    html.dir = (lang === 'ar') ? 'rtl' : 'ltr';
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
  window.melcorLang = function () {
    var l = document.documentElement.lang;
    return (LANGS.indexOf(l) !== -1) ? l : 'fr';
  };
})();
