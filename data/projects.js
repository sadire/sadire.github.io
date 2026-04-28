// =============================================================
//  projects.js — Lista de proyectos del portfolio
//  Edita este archivo para añadir, modificar o eliminar proyectos.
//
//  CATEGORÍAS:  "professional"  →  sección Professional
//               "independent"   →  sección Independent Projects
//
//  ESTRUCTURA DE CADA PROYECTO:
//    "intro"   → párrafo corto bajo el vídeo/imagen principal
//    "detail"  → { text, image, imageAlt }  texto izquierda + imagen derecha
//    "gallery" → array de hasta 3 rutas de imagen  [ "img1.jpg", "img2.jpg", ... ]
// =============================================================

window.PORTFOLIO_PROJECTS = [

  {
    "id": "unannounced",
    "category": "professional",

    "title":   { "en": "Unannounced Project", "es": "Proyecto sin anunciar" },
    "tagline": { "en": "coming soon!.", "es": "Detalles próximamente." },
    "tags":    [],
    "thumbnail": "assets/images/projects/unannounced/thumb.jpg",

    "hero":     "assets/images/projects/unannounced/hero.jpg",
    "heroType": "image",

    "data": [
      { "label": { "en": "Status", "es": "Estado" }, "value": "In development" }
    ],

    "intro": {
      "en": "Details about this project are not yet public.",
      "es": "Los detalles de este proyecto aún no son públicos."
    },
    "detail": null,
    "gallery": []
  },

  {
    "id": "bluey-videogame",
    "category": "professional",

    "title":   { "en": "Bluey: The Videogame", "es": "Bluey: The Videogame" },
    "tagline": { "en": "Production and Design", "es": "Producción y diseño" },
    "tags":    ["Production", "Game Design"],
    "thumbnail": "assets/images/projects/bluey-videogame/thumb.jpg",

    "hero":     "assets/images/projects/bluey-videogame/hero.jpg",
    "heroType": "image",

    "data": [
      { "label": { "en": "Role",     "es": "Rol"        }, "value": "Production/ Design" },
      { "label": { "en": "Studio",   "es": "Estudio"    }, "value": "Casual Brothers LTD" },
      { "label": { "en": "Year",     "es": "Año"        }, "value": "2024-2025" },
      { "label": { "en": "Platform", "es": "Plataforma" }, "value": "Multiplatform" }
    ],

    "intro": {
      "en": "Your description here.",
      "es": "Tu descripción aquí."
    },
    "detail": null,
    "gallery": []
  },

  {
    "id": "grinch-2",
    "category": "professional",
    "hidden": true,

    "title":   { "en": "Grinch 2", "es": "Grinch 2" },
    "tagline": { "en": "Level Design", "es": "Diseño de niveles" },
    "tags":    ["Level Design"],
    "thumbnail": "assets/images/projects/grinch-2/thumb.jpg",

    "hero":     "assets/images/projects/grinch-2/hero.jpg",
    "heroType": "image",

    "data": [
      { "label": { "en": "Role",   "es": "Rol"     }, "value": "Level Designer" },
      { "label": { "en": "Studio", "es": "Estudio" }, "value": "Your Studio" },
      { "label": { "en": "Year",   "es": "Año"     }, "value": "2024" }
    ],

    "intro": {
      "en": "Your description here.",
      "es": "Tu descripción aquí."
    },
    "detail": null,
    "gallery": []
  },

  {
    "id": "fall-flat-2",
    "category": "professional",

    "title":   { "en": "Human: Fall Flat 2", "es": "Human: Fall Flat 2" },
    "tagline": { "en": "Technical Designer & QA", "es": "Diseñador técnico y QA" },
    "tags":    ["Technical Design", "QA", "Physics"],
    "thumbnail": "assets/images/projects/fall-flat-2/thumb.jpg",

    "hero":     "https://www.youtube.com/watch?v=Iw118oOrKzQ",
    "heroType": "youtube",

    "data": [
      { "label": { "en": "Role",      "es": "Rol"         }, "value": "Technical Designer & QA" },
      { "label": { "en": "Developer", "es": "Desarrollador" }, "value": "No Brakes Games" },
      { "label": { "en": "Publisher", "es": "Editor"       }, "value": "Devolver Digital" },
      { "label": { "en": "Platform",  "es": "Plataforma"   }, "value": "PC, PS5, Xbox, Switch 2" },
      { "label": { "en": "Year",      "es": "Año"          }, "value": "2025" }
    ],

    "intro": {
      "en": "My role on Human: Fall Flat 2 sat right at the crossroads between design and programming. Day to day that meant prototyping mechanics, getting them working inside actual levels, and bringing back to the team what was and wasn't feasible.",
      "es": "Mi rol en Human: Fall Flat 2 estuvo justo en el cruce entre diseño y programación. En el día a día eso significaba prototipar mecánicas, integrarlas en niveles reales y trasladar al equipo qué era viable y qué no."
    },

    "detail": {
      "text": {
        "en": "I was part of the level design process too — not just implementing other people's ideas but shaping them from early on alongside the designers.\n\nOn the QA side I was responsible for tracking bugs and making sure the product held together across builds. On the technical side I wrote feature proposals to hand off to programming and fed initial concepts into the design pipeline — helping ideas go from a rough sketch to something the team could actually evaluate.",
        "es": "También participé en el proceso de diseño de niveles — no solo implementando ideas ajenas, sino dándoles forma desde las primeras etapas junto a los diseñadores.\n\nComo QA me encargué de rastrear bugs y asegurar que el producto se mantuviera estable entre builds. En la parte técnica redacté propuestas de features para enviar a programación e introduje conceptos iniciales en el pipeline de diseño — ayudando a que las ideas pasaran de boceto a algo que el equipo pudiera evaluar de verdad."
      },
      "image": "assets/images/projects/fall-flat-2/hero.jpg",
      "imageAlt": "Human: Fall Flat 2"
    },

    "gallery": []
  },

  {
    "id": "on-fire",
    "category": "independent",

    "title":   { "en": "On Fire!", "es": "On Fire!" },
    "tagline": { "en": "Design & Programming", "es": "Diseño y programación" },
    "tags":    ["Game Design", "Programming"],
    "thumbnail": "assets/images/projects/on-fire/thumb.jpg",

    "hero":     "assets/images/projects/on-fire/hero.jpg",
    "heroType": "image",

    "data": [
      { "label": { "en": "Role", "es": "Rol" }, "value": "Designer & Programmer" },
      { "label": { "en": "Year", "es": "Año" }, "value": "2024" }
    ],

    "intro": {
      "en": "Your description here.",
      "es": "Tu descripción aquí."
    },
    "detail": null,
    "gallery": []
  }

];
