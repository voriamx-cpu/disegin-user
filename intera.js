/* ============================================================
   Wiki Diseño — scripts.js
   Navegación con links reales + funciones internas
   ============================================================ */

document.addEventListener('DOMContentLoaded', function() {

  /* ── LINKS DEL NAV ────────────────────────────────────────── */
  var navLinks = {
    'Experiencia de usuario':         'https://mariavidalsg-hash.github.io/Diseno-de-navegacion/#',
    'Diseño web':                     'https://jaqueline17me-bot.github.io/web-design/',
    'Design thinking':                'https://ximenacs0706.github.io/Wiki-Web-Desing/',
    'Diseño centrado en el usuario':  '',
    'Diseño de interacción':          'https://mcbrandond06.github.io/Navigation-Design/',
    'Arquitectura de la información': '',
    'Diseño de navegación':           '',
    'Diseño visual':                  ''
  };

  /* ── 1. BARRA DE PROGRESO DE LECTURA ─────────────────────── */
  var bar = document.getElementById('reading-bar');
  window.addEventListener('scroll', function() {
    var scrolled = window.scrollY;
    var total    = document.body.scrollHeight - window.innerHeight;
    if (bar) bar.style.width = total > 0 ? (scrolled / total * 100) + '%' : '0%';
  });

  /* ── 2. MODAL DE VIDEO ────────────────────────────────────── */
  var overlay  = document.getElementById('video-modal');
  var btnVideo = document.querySelector('.btn-primary');
  var btnClose = document.getElementById('modal-close');

  if (btnVideo && overlay) {
    btnVideo.addEventListener('click', function(e) {
      e.preventDefault();
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }
  if (btnClose && overlay) {
    btnClose.addEventListener('click', function() { cerrarModal(); });
  }
  if (overlay) {
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) cerrarModal();
    });
  }
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') cerrarModal();
  });
  function cerrarModal() {
    if (overlay) { overlay.classList.remove('open'); document.body.style.overflow = ''; }
  }

  /* ── 3. BOTÓN GALERÍA → scroll a tarjetas ────────────────── */
  var btnGaleria = document.querySelector('.btn-ghost');
  if (btnGaleria) {
    btnGaleria.addEventListener('click', function(e) {
      e.preventDefault();
      var target = document.getElementById('galeria-cards');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  /* ── 4. ANIMACIÓN DE TARJETAS ────────────────────────────── */
  var cards = document.querySelectorAll('.card');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry, i) {
        if (entry.isIntersecting) {
          setTimeout(function() { entry.target.classList.add('visible'); }, i * 120);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    cards.forEach(function(c) { observer.observe(c); });
  } else {
    cards.forEach(function(c) { c.classList.add('visible'); });
  }

  /* ── 5. BÚSQUEDA EN TIEMPO REAL ──────────────────────────── */
  var searchInput = document.querySelector('.search input');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      var q = searchInput.value.toLowerCase().trim();
      cards.forEach(function(card) {
        var texto = card.innerText.toLowerCase();
        card.style.display = (!q || texto.indexOf(q) !== -1) ? '' : 'none';
      });
      if (q) mostrarToast('Buscando: "' + searchInput.value + '"');
    });
  }

  /* ── 6. TARJETAS CLICABLES ───────────────────────────────── */
  var cardLinks = [
    { selector: '.thumb-ux',     url: 'https://mariavidalsg-hash.github.io/Diseno-de-navegacion/#', label: 'Abriendo Principios de UX...'   },
    { selector: '.thumb-mobile', url: 'https://mcbrandond06.github.io/Navigation-Design/',           label: 'Abriendo Interfaces moviles...' },
    { selector: '.thumb-color',  url: 'https://jaqueline17me-bot.github.io/web-design/',             label: 'Abriendo Teoria del color...'   }
  ];

  cardLinks.forEach(function(item) {
    var el   = document.querySelector(item.selector);
    var card = el ? el.closest('.card') : null;
    if (card) {
      card.style.cursor = 'pointer';
      card.addEventListener('click', function() {
        mostrarToast(item.label);
        setTimeout(function() { window.open(item.url, '_blank'); }, 700);
      });
    }
  });

  /* ── 7. NAV ──────────────────────────────────────────────── */
  var navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(function(item) {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      var texto = item.innerText.trim().split('\n')[0].trim();
      var url   = navLinks[texto];

      /* Página actual */
      if (texto === 'Diseño centrado en el usuario') {
        mostrarToast('Ya estas en esta seccion');
        var destino = document.getElementById('seccion-principal');
        if (destino) destino.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }

      /* Link externo disponible */
      if (url && url !== '') {
        mostrarToast('Abriendo: ' + texto);
        setTimeout(function() { window.open(url, '_blank'); }, 500);
        return;
      }

      /* Sin link — scroll interno */
      mostrarToast('Seccion: ' + texto);
      var destino2 = document.getElementById('seccion-principal');
      if (destino2) destino2.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ── 8. TOAST ────────────────────────────────────────────── */
  function mostrarToast(msg) {
    var toast = document.getElementById('toast');
    if (!toast) return;
    var msgEl = toast.querySelector('.toast-msg');
    if (msgEl) msgEl.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(function() { toast.classList.remove('show'); }, 2800);
  }

});