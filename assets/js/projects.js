/* =========================================================
   projects.js — renders project grid (index) and project page
   ========================================================= */

/* ── Shared helpers ──────────────────────────────────── */

const _camIcon = `<svg class="placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>`;

/* Called from onerror on any <img> — replaces the broken image with a styled placeholder */
window._imgErr = function(el, label, cls) {
  const ph = document.createElement('div');
  ph.className = cls || 'thumb-placeholder';
  ph.innerHTML = _camIcon + (label ? `<span>${label}</span>` : '');
  el.parentNode.replaceChild(ph, el);
};

function _placeholderHtml(label, className) {
  const cls = className || 'thumb-placeholder';
  return `<div class="${cls}">${_camIcon}${label ? `<span>${label}</span>` : ''}</div>`;
}

function imgOrPlaceholder(src, alt, className) {
  const cls = className || 'thumb-placeholder';
  const safeAlt = (alt || '').replace(/'/g, '&#39;');
  if (!src) return _placeholderHtml(alt, cls);
  return `<img src="${src}" alt="${safeAlt}" loading="lazy"
               onerror="_imgErr(this,'${safeAlt}','${cls}')">`;
}

/* ── Index page — projects grid ──────────────────────── */

function renderCard(p) {
  const href   = p.external ? p.external : `project.html?id=${p.id}`;
  const target = p.external ? ' target="_blank" rel="noopener"' : '';
  return `
    <a class="project-card" href="${href}"${target}>
      ${imgOrPlaceholder(p.thumbnail, t(p.title), 'thumb-placeholder')}
      <div class="overlay">
        <h3>${t(p.title)}</h3>
        <p>${t(p.tagline)}</p>
        <div class="overlay-tags">
          ${(p.tags || []).map(tag => `<span class="overlay-tag">${tag}</span>`).join('')}
        </div>
      </div>
    </a>`;
}

function renderProjectsGrid() {
  renderNav('projects');
  renderFooter();

  const titleEl = document.querySelector('.page-header h1');
  if (titleEl) titleEl.textContent = t(SITE.content.home.title);

  const introEl = document.querySelector('.page-header .home-intro');
  if (introEl) {
    const text = t(SITE.content.home.intro);
    introEl.textContent = text || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
  }

  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  if (SITE.fileProtocol) {
    grid.innerHTML = `<p class="file-protocol-note">${SITE.lang === 'es'
      ? 'Los proyectos no pueden cargarse abriendo el HTML directamente. Arranca preview.bat (o cualquier servidor local) o mira la web publicada.'
      : 'Projects cannot load when opening the HTML file directly. Run preview.bat (or any local server) or check the published site.'}</p>`;
    return;
  }

  const cats   = SITE.content.categories || {};
  const groups = {};
  const order  = [];

  SITE.projects.filter(p => !p.hidden).forEach(p => {
    const cat = p.category || 'professional';
    if (!groups[cat]) { groups[cat] = []; order.push(cat); }
    groups[cat].push(p);
  });

  let html = '';
  order.forEach((cat, i) => {
    const label = t(cats[cat]) || cat;
    // Professional first: no header if it's the only section
    const showHeader = cat !== 'professional' || order.length > 1;
    if (showHeader) {
      html += `<div class="category-header${cat === 'professional' ? '' : ' category-header--alt'}">`
            + `<span>${label}</span></div>`;
    }
    html += groups[cat].map(renderCard).join('');
  });

  grid.innerHTML = html;
}

/* ── Project page ────────────────────────────────────── */

function getProjectId() {
  return new URLSearchParams(window.location.search).get('id');
}

function renderProjectPage() {
  const id      = getProjectId();
  const project = SITE.projects.find(p => p.id === id);

  if (!project || project.hidden || project.external) {
    if (project && project.external) { window.location.replace(project.external); return; }
    window.location.replace('index.html');
    return;
  }

  renderNav('projects');
  renderFooter();
  document.title = `${t(project.title)} — ${SITE.content.site.name}`;

  /* Hero */
  document.getElementById('project-title').textContent = t(project.title);

  /* Media.
     Si el proyecto tiene vídeo Y bloque detail, se intercambian:
     la imagen del detail sube a la cabecera y el vídeo baja al detail. */
  const swapVideo = !!(project.detail && project.hero &&
    (project.heroType === 'youtube' || project.heroType === 'video'));

  const mediaEl = document.getElementById('project-media');
  mediaEl.innerHTML = swapVideo
    ? _mediaHtml(project.detail.image, 'image', t(project.title))
    : _mediaHtml(project.hero, project.heroType, t(project.title));

  /* Data (year, role, etc.) */
  const dataEl = document.getElementById('project-data');
  dataEl.innerHTML = `<dl>${
    (project.data || []).map(item => `
      <div>
        <dt>${t(item.label)}</dt>
        <dd>${item.value}</dd>
      </div>
    `).join('')
  }</dl>`;

  /* 2. Intro paragraph */
  const introEl = document.getElementById('project-intro');
  if (introEl && project.intro) {
    introEl.innerHTML = t(project.intro)
      .split('\n\n')
      .map(p => `<p>${p.trim()}</p>`)
      .join('');
  }

  /* 3. Text left + image right (o el vídeo, si hubo intercambio) */
  const detailEl = document.getElementById('project-detail');
  if (detailEl && project.detail) {
    let imgHtml;
    if (swapVideo) {
      imgHtml = _mediaHtml(project.hero, project.heroType, t(project.title));
    } else if (project.detail.image) {
      imgHtml = `<img src="${project.detail.image}" alt="${project.detail.imageAlt || ''}"
             onerror="_imgErr(this,'','detail-placeholder')">`;
    } else {
      imgHtml = `<div class="media-placeholder">${_camIcon}</div>`;
    }
    detailEl.innerHTML = `
      <div class="detail-text">
        ${t(project.detail.text).split('\n\n').map(p => `<p>${p.trim()}</p>`).join('')}
      </div>
      <div class="detail-image">${imgHtml}</div>`;
  }

  /* 4. Gallery (up to 3 images) */
  const galleryEl = document.getElementById('project-gallery');
  if (galleryEl && project.gallery && project.gallery.length) {
    /* Missing gallery files just disappear (folders rarely have all 3) */
    galleryEl.innerHTML = project.gallery.slice(0, 3).map((src, i) =>
      `<img src="${src}" alt="Gallery image ${i + 1}" onerror="this.remove()">`
    ).join('');
  }

  /* More projects */
  const others = SITE.projects.filter(p => p.id !== id && !p.hidden).slice(0, 3);
  const moreLabel = document.getElementById('more-label');
  if (moreLabel) {
    moreLabel.textContent = SITE.lang === 'es' ? 'Más proyectos' : 'More projects';
  }
  const moreGrid = document.getElementById('more-grid');
  if (moreGrid) {
    moreGrid.innerHTML = others.map(p => `
      <a class="project-card" href="project.html?id=${p.id}">
        ${imgOrPlaceholder(p.thumbnail, t(p.title), 'thumb-placeholder')}
        <div class="overlay">
          <h3>${t(p.title)}</h3>
        </div>
      </a>
    `).join('');
  }
}

/* ── renderPage() — called by main.js after data loads ── */

function renderPage() {
  const body = document.body.dataset.page;
  if      (body === 'index')   renderProjectsGrid();
  else if (body === 'project') renderProjectPage();
  else if (body === 'about')   renderAboutPage();
  else if (body === 'resume')  renderResumePage();
}

/* ── About page ──────────────────────────────────────── */

function renderAboutPage() {
  renderNav('about');
  renderFooter();

  const a = SITE.content.about;

  const titleEl = document.getElementById('about-title');
  if (titleEl) titleEl.textContent = t(a.title);

  const photoEl = document.getElementById('about-photo');
  if (photoEl) {
    photoEl.innerHTML = a.photo
      ? `<img src="${a.photo}" alt="${SITE.content.site.name}"
           onerror="this.outerHTML='<div class=\\'photo-placeholder\\'>Photo</div>'">`
      : `<div class="photo-placeholder">Photo</div>`;
  }

  const bioEl = document.getElementById('about-bio');
  if (bioEl) {
    bioEl.innerHTML = (Array.isArray(a.bio) ? a.bio : [a.bio])
      .map(para => `<p>${t(para)}</p>`)
      .join('');
  }

  const skillsEl = document.getElementById('about-skills');
  if (skillsEl) {
    skillsEl.innerHTML = (a.skills || [])
      .map(s => `<span class="skill-tag">${s}</span>`)
      .join('');
  }

  const contactEl = document.getElementById('about-contact');
  if (contactEl && a.contact) {
    const links = [];
    if (a.contact.email)    links.push(`<a class="contact-link" href="mailto:${a.contact.email}">${emailIcon()}${a.contact.email}</a>`);
    if (a.contact.linkedin) links.push(`<a class="contact-link" href="${a.contact.linkedin}" target="_blank" rel="noopener">${linkedinIcon()}LinkedIn</a>`);
    if (a.contact.github)   links.push(`<a class="contact-link" href="${a.contact.github}"   target="_blank" rel="noopener">${githubIcon()}GitHub</a>`);
    contactEl.innerHTML = links.join('');
  }
}

/* ── Resume page ─────────────────────────────────────── */

function renderResumePage() {
  renderNav('resume');
  renderFooter();

  const r = SITE.content.resume;

  const titleEl = document.getElementById('resume-title');
  if (titleEl) titleEl.textContent = t(r.title);

  const dlBtn = document.getElementById('download-btn');
  if (dlBtn) {
    dlBtn.textContent = '';
    dlBtn.appendChild(downloadIcon());
    dlBtn.append(' ' + t(r.download));
    dlBtn.href = r.pdf;
  }

  const sectionsEl = document.getElementById('resume-sections');
  if (!sectionsEl) return;

  sectionsEl.innerHTML = (r.sections || []).map(sec => `
    <section class="resume-section">
      <h2 class="resume-section-title">${t(sec.title)}</h2>
      ${(sec.items || []).map(item => `
        <div class="resume-item">
          <div class="resume-item-header">
            <span class="resume-item-title">${item.title}</span>
            <span class="resume-item-date">${item.date || ''}</span>
          </div>
          <div class="resume-item-subtitle">${item.subtitle || ''}</div>
          ${item.description ? `<p>${t(item.description)}</p>` : ''}
        </div>
      `).join('')}
    </section>
  `).join('');
}

/* ── Helpers ─────────────────────────────────────────── */

/* HTML para un slot de media: youtube embed, <video>, <img> o placeholder */
function _mediaHtml(src, type, alt) {
  if (type === 'youtube') {
    const ytId = _youtubeId(src);
    return ytId
      ? `<div class="video-wrap">
           <iframe src="https://www.youtube.com/embed/${ytId}"
             frameborder="0" allowfullscreen
             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">
           </iframe>
         </div>`
      : `<div class="media-placeholder">Invalid YouTube URL</div>`;
  }
  if (type === 'video') {
    return `<video src="${src}" controls playsinline>
        Your browser does not support video.
      </video>`;
  }
  if (src) {
    return `<img src="${src}" alt="${(alt || '').replace(/"/g, '&quot;')}"
      onerror="this.outerHTML='<div class=\\'media-placeholder\\'>No image</div>'">`;
  }
  return `<div class="media-placeholder">No media</div>`;
}

function _youtubeId(url) {
  if (!url) return null;
  const m = url.match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : null;
}

/* ── SVG icons ───────────────────────────────────────── */
function emailIcon() {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/></svg>`;
}
function linkedinIcon() {
  return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`;
}
function githubIcon() {
  return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`;
}
function downloadIcon() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.style.width = '15px';
  svg.style.height = '15px';
  svg.innerHTML = '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>';
  return svg;
}
