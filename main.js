/* ============================================
   UTA IEEE: A New Arc — Animations
   - Staggered page-load entrance
   - Scroll-triggered reveals
   - Electric spark effect on "Arc"
   ============================================ */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    triggerLoadAnimations();
    observeScrollElements();
    initElectricSparks();
  }

  /* --- Page load stagger --- */
  function triggerLoadAnimations() {
    requestAnimationFrame(function () {
      var hero = document.querySelector('.hero');
      var page = document.querySelector('.page-content');

      if (hero) setTimeout(function () { hero.classList.add('loaded'); }, 120);
      if (page) setTimeout(function () { page.classList.add('loaded'); }, 120);
    });
  }

  /* --- Scroll-triggered reveals --- */
  function observeScrollElements() {
    var targets = document.querySelectorAll('[data-animate], [data-animate-stagger]');
    if (!targets.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
    );

    targets.forEach(function (el) { observer.observe(el); });
  }

  /* --- Electric spark effect on "Arc" --- */
  function initElectricSparks() {
    var el = document.querySelector('.electric-text');
    if (!el) return;

    function spawnBurst() {
      // Spawn 2-4 sparks per burst
      var count = 2 + Math.floor(Math.random() * 3);
      for (var i = 0; i < count; i++) {
        spawnSpark(i * 30); // slight stagger within burst
      }

      // Schedule next burst — fast, erratic rhythm
      var delay = 120 + Math.random() * 500;
      setTimeout(spawnBurst, delay);
    }

    function spawnSpark(stagger) {
      setTimeout(function () {
        var spark = document.createElement('span');
        spark.className = 'spark';

        // Random position within the text bounding box
        var pctX = Math.random() * 130 - 15; // overflow edges more
        var pctY = Math.random() * 120 - 10;
        var angle = Math.random() * 360;
        var len = 4 + Math.random() * 18;

        // Random blue-white color for each spark
        var brightness = 160 + Math.floor(Math.random() * 95);
        var alpha = 0.5 + Math.random() * 0.5;

        spark.style.left = pctX + '%';
        spark.style.top = pctY + '%';
        spark.style.width = len + 'px';
        spark.style.transform = 'rotate(' + angle + 'deg)';
        spark.style.background =
          'linear-gradient(90deg, transparent, rgba(' +
          Math.min(brightness - 100, 80) + ',' +
          Math.min(brightness - 40, 150) + ',' +
          brightness + ',' + alpha +
          '), transparent)';

        el.appendChild(spark);

        // Self-remove after animation
        spark.addEventListener('animationend', function () {
          if (spark.parentNode) spark.parentNode.removeChild(spark);
        });
      }, stagger);
    }

    // Start sparks after the hero title has faded in
    setTimeout(spawnBurst, 1800);
  }

})();
