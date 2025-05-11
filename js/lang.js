const langSelect = document.getElementById('lang-select');
const burgerBtn = document.getElementById('burger');
const overlay = document.getElementById('overlay');

// Obtener idioma persistido o por defecto
const storedLang = localStorage.getItem('lang') || (langSelect ? langSelect.value : 'es');
if (langSelect) langSelect.value = storedLang;

// Aplicar traducciones dinámicas
function updateLang(lang) {
  if (typeof translations === 'undefined' || !translations[lang]) return;
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (translations[lang][key]) el.textContent = translations[lang][key];
  });
}

updateLang(storedLang);

// Cambio manual de idioma
if (langSelect) {
  langSelect.addEventListener('change', e => {
    const newLang = e.target.value;
    localStorage.setItem('lang', newLang);
    updateLang(newLang);
    toggleLangBlocks(newLang);
  });
}

// Menú hamburguesa
if (burgerBtn) {
  burgerBtn.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('open');
    if (overlay) overlay.classList.toggle('show');
  });
}
if (overlay) overlay.addEventListener('click', () => {
  document.querySelector('.nav-links').classList.remove('open');
  overlay.classList.remove('show');
});

// Enlaces activos en el menú
function setActiveLink() {
  const links = document.querySelectorAll('.nav-links a');
  links.forEach(l => l.classList.remove('active'));
  const path = window.location.pathname.replace(/\/index\.html$/, '').replace(/\/$/, '');
  const hash = window.location.hash;

  let key = '';
  if (path === '' || path === '/') {
    key = (hash === '#projects') ? '#projects' : '#about';
  } else if (path.endsWith('/unannounced.html')) {
    key = 'unannounced.html';
  } else if (path.endsWith('/resume.html')) {
    key = 'resume.html';
  } else if (path.includes('/projects/')) {
    key = 'projects';
  }

  links.forEach(link => {
    const href = link.getAttribute('href');
    if (
      (hash && href.endsWith(hash) && key.startsWith('#')) ||
      (!hash && key.startsWith('#') && href.endsWith('#about')) ||
      href.endsWith(key)
    ) {
      link.classList.add('active');
    }
  });
}

setActiveLink();
window.addEventListener('hashchange', setActiveLink);

// Scroll suave para navegación interna
document.querySelectorAll('.nav-links a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const id = link.getAttribute('href');
    const target = document.querySelector(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      history.pushState(null, '', id);
      setActiveLink();
    }
  });
});

window.addEventListener('load', () => {
  if (location.hash && document.querySelector(location.hash)) {
    document.querySelector(location.hash).scrollIntoView({ behavior: 'instant', block: 'center' });
  }
});

// Mostrar/ocultar bloques por idioma
function toggleLangBlocks(lang) {
  document.querySelectorAll('[data-lang]').forEach(el => {
    el.style.display = (el.dataset.lang === lang) ? '' : 'none';
  });
}
toggleLangBlocks(storedLang);

document.body.classList.add('lang-ready');
