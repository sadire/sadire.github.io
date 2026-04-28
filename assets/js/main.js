/* =========================================================
   main.js — language, data loading, nav, footer
   ========================================================= */

const SITE = {
  lang:     localStorage.getItem('portfolio-lang') || 'en',
  content:  null,
  projects: null
};

/* t(obj) — pick the right language string from {en, es} objects */
function t(obj) {
  if (!obj) return '';
  if (typeof obj === 'string') return obj;
  return obj[SITE.lang] || obj['en'] || '';
}

/* Language toggle */
function toggleLang() {
  SITE.lang = SITE.lang === 'en' ? 'es' : 'en';
  localStorage.setItem('portfolio-lang', SITE.lang);
  document.documentElement.lang = SITE.lang;
  _updateLangBtn();
  if (typeof renderPage === 'function') renderPage();
}

function _updateLangBtn() {
  const btn = document.querySelector('.lang-toggle');
  if (btn) btn.textContent = SITE.lang === 'en' ? 'ES' : 'EN';
}

/* Read data from global variables set by data/content.js and data/projects.js */
async function loadData() {
  SITE.content  = window.PORTFOLIO_CONTENT;
  SITE.projects = window.PORTFOLIO_PROJECTS;
}

/* Render nav text + active link */
function renderNav(activePage) {
  const c = SITE.content;
  const logo = document.querySelector('.nav-logo');
  if (logo) logo.textContent = c.site.name;

  const links = document.querySelectorAll('.nav-links a');
  if (links.length >= 3) {
    links[0].textContent = t(c.nav.projects);
    links[1].textContent = t(c.nav.about);
    links[2].textContent = t(c.nav.resume);
    links.forEach(l => l.classList.remove('active'));
    const idx = { projects: 0, about: 1, resume: 2 }[activePage];
    if (idx !== undefined) links[idx].classList.add('active');
  }
}

/* Render footer */
function renderFooter() {
  const el = document.querySelector('footer p');
  if (el) el.textContent = t(SITE.content.footer.text);
}

/* Resolve a path relative to the site root regardless of current page depth */
function rootPath(p) {
  return p; /* all HTML files live at root level, so paths are already relative */
}

/* Bootstrap */
document.addEventListener('DOMContentLoaded', async () => {
  document.documentElement.lang = SITE.lang;
  _updateLangBtn();
  await loadData();
  if (typeof renderPage === 'function') renderPage();
});
