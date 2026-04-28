# AgentsReadme — Notas para sesiones con Claude

Este archivo es contexto para futuros agentes de IA trabajando en este proyecto.

---

## Qué es este proyecto

Portafolio personal desplegado en GitHub Pages. Sitio estático (HTML/CSS/JS puro, sin build step ni frameworks). El usuario edita únicamente los archivos JSON en `data/` — nunca debería tocar HTML ni JS para añadir contenido.

---

## Principio de diseño fundamental

**Todo el contenido se gestiona desde los JSON.** Si el usuario quiere añadir un proyecto, una sección, un campo nuevo de datos, la solución siempre pasa por extender el JSON y adaptar el JS que lo consume. No crear nuevos HTML por proyecto.

---

## Arquitectura

```
data/projects.js   → fuente de verdad de todos los proyectos (window.PORTFOLIO_PROJECTS)
data/content.js    → fuente de verdad del contenido del sitio (window.PORTFOLIO_CONTENT)

assets/js/main.js    → lee los globales, gestiona idioma (SITE.lang), expone t(), toggleLang()
assets/js/projects.js → renderiza todas las páginas leyendo SITE.content y SITE.projects

project.html         → página dinámica: lee ?id=slug de la URL y busca el proyecto en el JSON
```

Los HTML cargan los datos vía `<script src="data/content.js">` y `<script src="data/projects.js">` antes de `main.js`, lo que permite abrir los HTML directamente sin servidor (`file://`).

El flujo de arranque es:
1. `data/content.js` y `data/projects.js` se ejecutan → setan `window.PORTFOLIO_CONTENT` y `window.PORTFOLIO_PROJECTS`
2. `main.js` → `loadData()` → copia los globales a `SITE.content` y `SITE.projects`
2. Llama a `renderPage()` (definida en `projects.js`)
3. `renderPage()` detecta el `data-page` del `<body>` y despacha al render correspondiente

---

## Sistema de idiomas

- Estado en `SITE.lang` (`'en'` o `'es'`), persistido en `localStorage`
- Función `t(obj)` recibe `{ en: '...', es: '...' }` y devuelve el string del idioma activo
- Cambiar de idioma llama a `renderPage()` de nuevo, que re-renderiza todo el DOM
- Todos los textos del JSON siguen el patrón `{ "en": "...", "es": "..." }`

---

## Categorías de proyectos

Actualmente hay dos:
- `"professional"` → sección superior, label "PROFESSIONAL"
- `"independent"` → sección inferior, separada por un divisor centrado con líneas a ambos lados, label "INDEPENDENT PROJECTS"

El orden de las secciones sigue el orden de aparición en el JSON. Para añadir una categoría nueva basta con añadirla en `data/content.json → categories` y usarla en un proyecto.

---

## Proyectos actuales

| id | Título | Categoría | Rol |
|---|---|---|---|
| `unannounced` | Unannounced Project | professional | — |
| `bluey-videogame` | Bluey: The Videogame | professional | Production Design |
| `grinch-2` | Grinch 2 | professional | Level Design |
| `fall-flat-2` | Fall Flat 2 | independent | Technical Designer & QA |
| `on-fire` | On Fire! | independent | Design & Programming |

Todos los proyectos tienen contenido placeholder. El usuario los rellenará con texto e imágenes reales.

---

## Imágenes

Las imágenes aún no existen — el usuario las añadirá. El código maneja gracefully la ausencia de imagen con un placeholder "No image". No hay que hacer nada especial cuando faltan.

Rutas esperadas por convención:
```
assets/images/projects/[id]/thumb.jpg   → miniatura grid (4:3)
assets/images/projects/[id]/hero.jpg    → cabecera página proyecto
assets/images/projects/[id]/detail*.jpg → secciones text-image
assets/images/about/photo.jpg           → foto de perfil
```

---

## Cosas a tener en cuenta al modificar

- **No romper el patrón `{ "en": ..., "es": ... }`** en el JSON — `t()` lo espera en todos los campos de texto
- **El `id` del proyecto es el slug de la URL** — si se cambia, los links existentes se rompen
- **`heroType`** puede ser `"image"` o `"video"`. Para vídeo, el campo `"hero"` apunta al archivo de vídeo
- **`"reverse": true`** en una sección `text-image` pone la imagen a la izquierda (usa `direction: rtl` en CSS)
- El servidor de preview es `python3 -m http.server 3000` — configurado en `.claude/launch.json`

---

## Pendiente / posibles mejoras futuras

- Añadir imágenes reales a todos los proyectos
- Rellenar el contenido de los proyectos (texto, datos, secciones)
- Rellenar `data/content.json` con bio, skills, contacto y CV reales
- Reemplazar `resume.pdf` con el PDF real del CV
- Despliegue en GitHub Pages (el usuario decide el nombre del repo)
- Posibles mejoras: transiciones de página, modo oscuro, página 404 personalizada, lightbox para imágenes
