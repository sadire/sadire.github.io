const translations = {
  en: {
        awards: "Awards",
        skills: "Skills",
        summary: "Professional Summary",
        current_state: "Current State",
        unannounced_title: "Unannounced Project",
        education: "Education",
        work_exp: "Work Experience",
        download_pdf: "Download PDF",
        resume: "Resume",
    about: "About",
    projects: "Projects",
    unannounced: "Unannounced",
    about_title: "About Me",
    about_body: "I am a level and game designer, artist, and creative collaborator with 16 years of experience crafting worlds and gameplay that spark the joy of imagination.",
    projects_title: "Projects",
    card1_body: "A joyful space shooter where creativity meets chaos.",
    card2_body: "A deep‑sea dystopian adventure revered worldwide.",
    what_i_did: "What I Did",
    challenges: "Challenges & Solutions",
    trivia: "Trivia",
    current_state: "Current State",
    vision: "Vision"
  },
  es: {
        awards: "Premios y reconocimientos",
        skills: "Competencias",
        summary: "Resumen profesional",
        current_state: "Estado actual",
        unannounced_title: "Proyecto sin anunciar",
        education: "Formación académica",
        work_exp: "Experiencia laboral",
        download_pdf: "Descargar PDF",
        resume: "Currículum",
    about: "Sobre mí",
    projects: "Proyectos",
    unannounced: "Sin anunciar",
    about_title: "Sobre mí",
    about_body: "Soy diseñador de niveles y videojuegos con 16 años de experiencia creando mundos y mecánicas que despiertan la imaginación.",
    projects_title: "Proyectos",
    card1_body: "Un shooter espacial colorido donde la creatividad se encuentra con el caos.",
    card2_body: "Una aventura distópica submarina aclamada mundialmente.",
    what_i_did: "Qué hice",
    challenges: "Desafíos y soluciones",
    trivia: "Trivia",
    current_state: "Estado actual",
    vision: "Visión"
  }
};

const langSelect = document.getElementById('lang-select');

// Persist language choice
const storedLang = localStorage.getItem('lang') || (langSelect ? langSelect.value : 'es');
if(langSelect) langSelect.value = storedLang;

function updateLang(lang){
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.dataset.i18n;
    if(translations[lang] && translations[lang][key]) el.textContent = translations[lang][key];
  });
}

updateLang(storedLang);

if(langSelect){
  langSelect.addEventListener('change',e=>{
    const newLang = e.target.value;
    localStorage.setItem('lang', newLang);
    updateLang(newLang);
  });
}

// Burger menu toggle (kept)
const burgerBtn = document.getElementById('burger');
if(burgerBtn){
  burgerBtn.addEventListener('click', ()=>{
    document.querySelector('.nav-links').classList.toggle('open');
  });
}


// Set active nav link based on current path
document.querySelectorAll('.nav-links a').forEach(link=>{
  const linkPath = link.getAttribute('href').replace(/\.\./g,'').replace(/index\.html/,'');
  if(window.location.pathname.endsWith(linkPath) || (window.location.pathname.endsWith('/') && linkPath==='')){
    link.classList.add('active');
  }
});

// Highlight active page link
(function(){
  const currentPath = window.location.pathname.replace(/\/index\.html$/, '').replace(/\/$/, '');
  document.querySelectorAll('.nav-links a').forEach(link=>{
    const url = new URL(link.href, window.location.origin);
    let linkPath = url.pathname.replace(/\/index\.html$/, '').replace(/\/$/, '');
    // For root index sections (#about etc.) treat as same page
    if(currentPath === '' && (link.hash === '#about' || link.hash === '#projects')){
      if(link.hash === window.location.hash || (window.location.hash==='' && link.hash==='#about')){
        link.classList.add('active');
      }
    }else if(linkPath === currentPath){
      link.classList.add('active');
    }
  });
})();
// Active nav underline
function setActiveLink(){
  const links = document.querySelectorAll('.nav-links a');
  links.forEach(l=>l.classList.remove('active'));
  const path = window.location.pathname.replace(/\/index\.html$/, '').replace(/\/$/, '');
  const hash = window.location.hash;

  let key = '';
  if(path === '' || path === '/'){
     key = (hash === '#projects') ? '#projects' : '#about';
  }else if(path.endsWith('/unannounced.html')){
     key = 'unannounced.html';
  }else if(path.endsWith('/resume.html')){
     key = 'resume.html';
  }else if(path.includes('/projects/')){
     key = 'projects';
  }

  links.forEach(link=>{
    const href = link.getAttribute('href');
    if((hash && href.endsWith(hash) && key.startsWith('#')) ||
       (!hash && key.startsWith('#') && href.endsWith('#about')) ||
       (href.endsWith(key))){
       link.classList.add('active');
    }
  });
}

setActiveLink();
window.addEventListener('hashchange', setActiveLink);

// Smooth scroll nav
document.querySelectorAll('.nav-links a[href^="#"]').forEach(link=>{
  link.addEventListener('click', e=>{
    e.preventDefault();
    const id = link.getAttribute('href');
    const target = document.querySelector(id);
    if(target){
      target.scrollIntoView({behavior:'smooth', block:'center'});
      history.pushState(null,'',id);
      setActiveLink();
    }
  });
});

window.addEventListener('load', ()=>{
  if(location.hash && document.querySelector(location.hash)){
    document.querySelector(location.hash).scrollIntoView({behavior:'instant', block:'center'});
  }
});
// End smooth scroll


// Toggle visibility of blocks with data-lang attribute
function toggleLangBlocks(lang){
  document.querySelectorAll('[data-lang]').forEach(el=>{
    el.style.display = (el.dataset.lang === lang) ? '' : 'none';
  });
}
toggleLangBlocks(storedLang);
if(langSelect){
  langSelect.addEventListener('change', e=>{
    toggleLangBlocks(e.target.value);
  }, {once:false});
}
