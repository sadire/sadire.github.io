const translations = {
  en: {
    about: "About",
    projects: "Projects",
    unannounced: "Unannounced",
    about_title: "About Me",
    about_body: "I am a level and game designer, artist, and creative collaborator with 16 years of experience crafting worlds and gameplay that spark the joy of imagination.",
    projects_title: "Projects",
    card1_body: "A joyful space shooter where creativity meets chaos.",
    card2_body: "A deep-sea dystopian adventure revered worldwide.",
    what_i_did: "What I Did"
  },
  es: {
    about: "Sobre mí",
    projects: "Proyectos",
    unannounced: "Sin anunciar",
    about_title: "Sobre mí",
    about_body: "Soy diseñador de niveles y videojuegos con 16 años de experiencia creando mundos y mecánicas que despiertan la imaginación.",
    projects_title: "Proyectos",
    card1_body: "Un shooter espacial colorido donde la creatividad se encuentra con el caos.",
    card2_body: "Una aventura distópica submarina aclamada mundialmente.",
    what_i_did: "Qué hice"
  }
};
const langSelect = document.getElementById('lang-select');
const elements = document.querySelectorAll('[data-i18n]');
function updateLang(lang){
  elements.forEach(el=>{
    const key = el.dataset.i18n;
    if(translations[lang] && translations[lang][key]) el.textContent = translations[lang][key];
  });
  document.documentElement.lang = lang;
}
langSelect.addEventListener('change',e=>{
  updateLang(e.target.value);
});
// Initialize
updateLang(langSelect.value);
