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

/* Load site content (data/content.js) and every projects/<id>/info.txt */
async function loadData() {
  SITE.content = window.PORTFOLIO_CONTENT;

  /* fetch() no funciona con file:// — la web necesita un servidor (o GitHub Pages) */
  if (window.location.protocol === 'file:') {
    SITE.fileProtocol = true;
    SITE.projects = [];
    return;
  }

  const ids = window.PROJECT_LIST || [];
  const loaded = await Promise.all(ids.map(id =>
    fetch('projects/' + id + '/info.txt', { cache: 'no-store' })
      .then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.text(); })
      .then(txt => parseProjectTxt(id, txt))
      .catch(err => { console.error('No se pudo cargar projects/' + id + '/info.txt:', err); return null; })
  ));
  SITE.projects = loaded.filter(Boolean);
}

/* Parse projects/<id>/info.txt into the project object the renderers use.
   Format: "key: value" lines, repeatable "data: Label EN / Label ES | value",
   and [intro en] / [intro es] / [detail en] / [detail es] text blocks.
   Lines starting with # are comments. See projects/_plantilla.txt. */
function parseProjectTxt(id, raw) {
  const dir = 'projects/' + id + '/';
  const meta = {};
  const data = [];
  const blocks = {};
  let block = null;

  raw.split(/\r?\n/).forEach(line => {
    const bm = line.match(/^\[([a-z-]+)[ .]+(en|es)\]\s*$/i);
    if (bm) { block = bm[1].toLowerCase() + '.' + bm[2].toLowerCase(); blocks[block] = []; return; }
    if (block) { blocks[block].push(line); return; }
    if (!line.trim() || /^\s*#/.test(line)) return;
    const km = line.match(/^([\w.-]+)\s*:\s*(.*)$/);
    if (!km) return;
    const key = km[1].toLowerCase();
    const val = km[2].trim();
    if (key === 'data') {
      const parts = val.split('|');
      if (parts.length < 2) return;
      const labels = parts[0].split('/');
      const en = labels[0].trim();
      const es = (labels[1] || en).trim();
      data.push({ label: { en: en, es: es }, value: parts.slice(1).join('|').trim() });
    } else {
      meta[key] = val;
    }
  });

  /* Join a block's lines into paragraphs separated by \n\n */
  const cleanBlock = k => (blocks[k] || []).join('\n').trim().split(/\n\s*\n/).map(p => p.trim()).filter(Boolean).join('\n\n');
  const text = k => {
    if (!blocks[k + '.en'] && !blocks[k + '.es']) return null;
    const en = cleanBlock(k + '.en');
    const es = cleanBlock(k + '.es');
    return { en: en || es, es: es || en };
  };

  /* Resolve hero: default hero.jpg, YouTube URL, .mp4/.webm file, or "none" */
  let hero = meta['hero'] || 'hero.jpg';
  let heroType = 'image';
  if (hero === 'none') {
    hero = '';
  } else if (/youtu/i.test(hero)) {
    heroType = 'youtube';
  } else {
    if (/\.(mp4|webm)$/i.test(hero)) heroType = 'video';
    if (!/^https?:/i.test(hero)) hero = dir + hero;
  }

  const title = { en: meta['title'] || id, es: meta['title.es'] || meta['title'] || id };
  const detailText = text('detail');

  return {
    id: id,
    category: meta['category'] || 'professional',
    hidden: /^(yes|true|si|sí)$/i.test(meta['hidden'] || ''),
    external: meta['external'] || undefined,

    title: title,
    tagline: { en: meta['tagline'] || '', es: meta['tagline.es'] || meta['tagline'] || '' },
    tags: meta['tags'] ? meta['tags'].split(',').map(s => s.trim()).filter(Boolean) : [],
    thumbnail: meta['thumb'] === 'none' ? '' : dir + (meta['thumb'] || 'thumb.jpg'),

    hero: hero,
    heroType: heroType,

    data: data,
    intro: text('intro'),
    detail: detailText ? {
      text: detailText,
      image: dir + (meta['detail-image'] || 'detail.jpg'),
      imageAlt: title.en
    } : null,
    gallery: [1, 2, 3].map(i => dir + 'gallery-' + i + '.jpg')
  };
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
