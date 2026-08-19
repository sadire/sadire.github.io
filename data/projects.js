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

    "title":   { "en": "Cancelled Combat Game", "es": "Juego de combate cancelado" },
    "tagline": { "en": "Design & Combat Design", "es": "Diseño y combat design" },
    "tags":    ["Game Design", "Combat Design"],
    "thumbnail": "",

    "hero":     "",
    "heroType": "image",

    "data": [
      { "label": { "en": "Role",   "es": "Rol"    }, "value": "Game & Combat Designer" },
      { "label": { "en": "Status", "es": "Estado" }, "value": "Cancelled" }
    ],

    "intro": {
      "en": "A combat game that never made it to release. I developed the project's systems and design, and built the first implementations of the combat loop.\n\nA lot of the work happened between departments, keeping everyone moving in the same direction. I also worked with the production company to align the creative vision.",
      "es": "Un juego de combate que no llegó a salir. Desarrollé los sistemas y el diseño del proyecto, y las primeras implementaciones del loop de combate.\n\nBuena parte del trabajo fue entre departamentos, manteniendo a todos en la misma dirección. También trabajé con la productora alineando la visión creativa."
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
      "en": "On Bluey my role involved design and production tasks. I took the lead on the remaster of the original game, where we focused on fixing bugs, stabilising the builds and making the game feel right.",
      "es": "En Bluey mi rol implicaba diseño y tareas de producción. Tomé la dirección del remaster del original, en el que nos centramos en arreglar bugs, estabilizar las builds y hacer que el juego se sintiera bien."
    },
    "detail": {
      "text": {
        "en": "In parallel I directed and designed a series of three free updates. Beyond improving the game feel, they added new content: new costumes, characters, explorable areas and a quest system to extend the play experience.\n\nFor each update I worked with the client on deciding what content it should include and how to prioritise it.",
        "es": "En paralelo dirigí y diseñé una serie de tres actualizaciones gratuitas. Más allá de mejorar el feel del juego, añadieron contenido nuevo: nuevos costumes, personajes, áreas explorables y un sistema de quests para alargar la experiencia de juego.\n\nPara cada actualización trabajé con el cliente decidiendo qué contenido debía incluir y cómo priorizarlo."
      },
      "image": "assets/images/projects/bluey-videogame/hero.jpg",
      "imageAlt": "Bluey: The Videogame"
    },
    "gallery": []
  },

  {
    "id": "grinch-2",
    "category": "professional",

    "title":   { "en": "The Grinch 2: Saving Christmas", "es": "The Grinch 2: Saving Christmas" },
    "tagline": { "en": "Level & Technical Design", "es": "Diseño de niveles y técnico" },
    "tags":    ["Level Design", "Technical Design"],
    "thumbnail": "assets/images/projects/grinch-2/thumb.jpg",

    "hero":     "assets/images/projects/grinch-2/hero.jpg",
    "heroType": "image",

    "data": [
      { "label": { "en": "Role",   "es": "Rol"     }, "value": "Level & Technical Designer" },
      { "label": { "en": "Studio", "es": "Estudio" }, "value": "Casual Brothers LTD" },
      { "label": { "en": "Year",   "es": "Año"     }, "value": "2024" }
    ],

    "intro": {
      "en": "I joined the project as a technical and level designer. My main job was iterating and polishing the levels, redesigning a big part of them. Alongside that, I applied different measures to improve level performance and make them playable on Switch.\n\nThe most important part for me was improving the pathing and making each area of the first levels feel unique, built around a goal instead of being a pile of loose assets.",
      "es": "Entré en el proyecto como technical y level designer. Mi trabajo principal fue iterar y pulir los niveles, rediseñando gran parte de ellos. En paralelo, apliqué distintas medidas para mejorar el rendimiento de los niveles y hacerlos jugables en Switch.\n\nLo más importante para mí fue mejorar el pathing y conseguir que las distintas áreas de los primeros niveles se sintieran únicas, persiguiendo un objetivo, no un montón de assets sueltos."
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
      "en": "My role was somewhere between design and programming. As a technical designer I created mechanics and gameplay moments, prototyping them, implementing them and testing what worked and what didn't.",
      "es": "Mi rol estaba en un punto intermedio entre diseño y programación. Como technical designer creaba mecánicas y gameplay moments: los prototipaba, los implementaba y probaba qué funcionaba y qué no."
    },

    "detail": {
      "text": {
        "en": "I wrote feature requests for the code team and built sample zones for the different tools, exploring their limits and how they could fit into the game.\n\nI was also part of the level design process, helping shape the levels early on alongside the designers.\n\nThe role also included QA responsibilities. In that department I took care of manual testing, finding and tracking bugs and keeping the builds stable.",
        "es": "Escribía feature requests para el equipo de código y montaba zonas de muestra de las distintas herramientas, explorando sus límites y cómo encajarlas en el juego.\n\nTambién participé en el proceso de diseño de niveles, ayudando a dar forma a los niveles desde el principio junto a los diseñadores.\n\nEl rol incluía además responsabilidades de QA. En ese departamento me encargaba del testeo manual, encontrando y registrando bugs y manteniendo las builds estables."
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
      "en": "On Fire! is mine: a procedural infinite runner I designed and programmed. I started by figuring out what the game should feel like to play, then built everything around that.",
      "es": "On Fire! es mío: un infinite runner procedural que diseñé y programé. Empecé definiendo cómo se debía sentir al jugarlo y construí todo a partir de ahí."
    },
    "detail": {
      "text": {
        "en": "Once the design was solid I needed tools, starting with level generation that let me test ideas fast without going back into the code every time. The game generates content on the fly, but it had to feel like it was put there on purpose.",
        "es": "Con el diseño claro necesitaba herramientas, empezando por una generación de niveles que me dejara probar ideas rápido sin volver al código cada vez. El juego genera contenido en tiempo real, pero tenía que parecer que alguien lo había puesto ahí a propósito."
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
