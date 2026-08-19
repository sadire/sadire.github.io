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
      "en": "On Bluey I split my time between production and design. First task was the remaster of the original — a lot of bugfixing, stabilising things, getting the game to where it should have been. After that, three free updates.",
      "es": "En Bluey combiné producción y diseño. Lo primero fue el remaster del original — mucho bugfixing, estabilizar cosas, dejar el juego donde tenía que estar. Después de eso, tres actualizaciones gratuitas."
    },
    "detail": {
      "text": {
        "en": "The updates weren't just polish. New minigames, reworked systems, UX improvements, new content. Each one meant deciding what was actually worth shipping — there's always more on the list than time to do it.",
        "es": "Las updates no eran solo pulido. Minijuegos nuevos, sistemas revisados, mejoras de UX, contenido nuevo. En cada una había que decidir qué valía la pena sacar — siempre hay más en la lista que tiempo para hacerlo."
      },
      "image": "assets/images/projects/bluey-videogame/hero.jpg",
      "imageAlt": "Bluey: The Videogame"
    },
    "gallery": []
  },

  {
    "id": "grinch-2",
    "category": "professional",

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
      "en": "My role was somewhere between design and programming — prototyping mechanics, getting them into actual levels, and telling the team what held up and what didn't.",
      "es": "Mi rol estaba en algún punto entre diseño y programación — prototipar mecánicas, meterlas en niveles reales y contarle al equipo qué aguantaba y qué no."
    },

    "detail": {
      "text": {
        "en": "I was in the level design process too, not just implementing — helping shape things early on alongside the designers.\n\nOn QA I tracked bugs and kept the build stable. On the technical side I wrote feature proposals for programming and pushed early concepts into the pipeline. Getting an idea from a rough description to something the team could actually look at and react to.",
        "es": "También estuve en el proceso de diseño de niveles, no solo implementando — ayudando a darles forma desde el principio junto a los diseñadores.\n\nEn QA rastreé bugs y mantuve el build estable. En la parte técnica escribí propuestas de features para programación y metí conceptos iniciales en el pipeline. Llevar una idea de una descripción vaga a algo que el equipo pudiera ver y evaluar."
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
      "en": "On Fire! is mine. Procedural infinite runner, designed and programmed by me. Started by figuring out what the game actually felt like to play, then built everything around that.",
      "es": "On Fire! es mío. Infinite runner procedural, diseñado y programado por mí. Empecé definiendo cómo se siente jugarlo y fui construyendo todo a partir de ahí."
    },
    "detail": {
      "text": {
        "en": "Once the design was solid I needed tools — level generation that let me test ideas fast without going back into the code every time. The game generates content on the fly but it had to feel like it was put there on purpose.",
        "es": "Con el diseño claro necesitaba herramientas — generación de niveles que me dejara probar ideas rápido sin volver al código cada vez. El juego genera contenido en tiempo real pero tenía que parecer que alguien lo había puesto ahí a propósito."
      },
      "image": "assets/images/projects/on-fire/hero.jpg",
      "imageAlt": "On Fire!"
    },
    "gallery": []
  },

  {
    "id": "itch-gamejams",
    "category": "independent",
    "external": "https://klapa.itch.io/",

    "title":   { "en": "Game Jams & Student Projects", "es": "Game Jams y proyectos académicos" },
    "tagline": { "en": "View on itch.io", "es": "Ver en itch.io" },
    "tags":    [],
    "thumbnail": ""
  }

];
