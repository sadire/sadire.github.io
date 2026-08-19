# AgentsReadme — Notas para sesiones con Claude

Este archivo es contexto para futuros agentes de IA trabajando en este proyecto.

---

## Qué es este proyecto

Portafolio personal de Samuel Díaz Reyes desplegado en `aimadak.com` via GitHub Pages. Sitio estático (HTML/CSS/JS puro, sin build step ni frameworks). El usuario edita únicamente los archivos en `data/` — nunca debería tocar HTML ni JS core para añadir contenido.

---

## Principio de diseño fundamental

**Todo el contenido se gestiona desde los JS de datos.** Si el usuario quiere añadir un proyecto, campo o sección nueva, la solución pasa por extender `data/projects.js` o `data/content.js` y adaptar el JS que los consume. No crear nuevos HTML por proyecto.

---

## Arquitectura

```
data/projects.js   → fuente de verdad de proyectos (window.PORTFOLIO_PROJECTS)
data/content.js    → fuente de verdad del sitio (window.PORTFOLIO_CONTENT)

assets/js/main.js     → lee los globales, gestiona idioma (SITE.lang), expone t(), toggleLang()
assets/js/projects.js → renderiza todas las páginas leyendo SITE.content y SITE.projects

project.html          → página dinámica: lee ?id=slug de la URL y busca el proyecto en el array
```

Los HTML cargan datos vía `<script src="data/content.js?v=N">` y `<script src="data/projects.js?v=N">` **antes** de `main.js`. Esto permite abrir los HTML directamente en `file://` sin servidor.

Flujo de arranque:
1. `data/content.js` y `data/projects.js` → setan `window.PORTFOLIO_CONTENT` y `window.PORTFOLIO_PROJECTS`
2. `main.js → loadData()` → copia los globales a `SITE.content` y `SITE.projects`
3. Llama a `renderPage()` (en `projects.js`)
4. `renderPage()` detecta `data-page` en `<body>` y despacha al render correspondiente

**Cache busting**: todos los `<script src="...">` llevan `?v=N`. Cuando se modifique un script y el usuario tenga caché stale, hay que incrementar N en todos los HTML. Versión actual: `?v=7` (aplica también a `assets/css/style.css` desde v=7).

---

## Sistema de idiomas

- Estado en `SITE.lang` (`'en'` o `'es'`), persistido en `localStorage`
- Función `t(obj)` recibe `{ en: '...', es: '...' }` y devuelve el string del idioma activo
- Cambiar idioma llama a `renderPage()` de nuevo, que re-renderiza todo el DOM
- Todos los textos del JSON siguen el patrón `{ "en": "...", "es": "..." }`

---

## Estructura de un proyecto en data/projects.js

Campos fijos:

```js
{
  "id": "slug-unico",
  "category": "professional" | "independent",
  "hidden": true,            // opcional — oculta del grid y bloquea URL directa
  "external": "https://...", // opcional — card que abre enlace externo, sin página de detalle

  "title":   { "en": "...", "es": "..." },
  "tagline": { "en": "...", "es": "..." },
  "tags":    ["Tag1", "Tag2"],
  "thumbnail": "assets/images/projects/[id]/thumb.jpg",

  "hero":     "ruta-o-url",
  "heroType": "image" | "video" | "youtube",  // youtube acepta URL completa de YouTube

  "data": [
    { "label": { "en": "...", "es": "..." }, "value": "..." }
  ],

  "intro": { "en": "...", "es": "..." },       // párrafo corto bajo el hero

  "detail": {                                   // texto izquierda + imagen derecha
    "text": { "en": "...", "es": "..." },       // soporta \n\n para párrafos
    "image": "ruta",
    "imageAlt": "..."
  },

  "gallery": ["img1.jpg", "img2.jpg", "img3.jpg"]  // hasta 3 imágenes
}
```

`detail` y `gallery` pueden ser `null` / `[]` — la sección no se renderiza.

---

## Proyectos actuales

| id | Título | Categoría | Estado |
|---|---|---|---|
| `unannounced` | Cancelled Combat Game | professional | texto real, sin imágenes (cancelado, no llevará) |
| `bluey-videogame` | Bluey: The Videogame | professional | texto real, solo thumb |
| `grinch-2` | The Grinch 2: Saving Christmas | professional | texto real, sin imágenes |
| `fall-flat-2` | Human: Fall Flat 2 | professional | texto real, hero=YouTube embed |
| `on-fire` | On Fire! | independent | texto real, sin imágenes |
| `itch-gamejams` | Game Jams & Student Projects | independent | external → klapa.itch.io |

---

## Categorías

Definidas en `data/content.js → categories`. El orden de secciones en el grid sigue el orden de primera aparición en el array de proyectos.

Categorías activas:
- `"professional"` — sección superior
- `"independent"` — sección con divisor "INDEPENDENT PROJECTS"

`"gamejams"` está definida en content.js pero sin uso activo (el card de itch.io usa `"independent"`).

---

## Imágenes

Las imágenes del usuario aún no existen en su mayoría. El código maneja su ausencia con placeholders automáticos (patrón diagonal + icono cámara + nombre proyecto). No hay que hacer nada especial cuando faltan.

Rutas esperadas:
```
assets/images/projects/[id]/thumb.jpg   → miniatura grid (4:3)
assets/images/projects/[id]/hero.jpg    → cabecera página proyecto
assets/images/about/photo.jpg           → foto de perfil
```

---

## Despliegue

- Directorio de trabajo: `/home/samdi/Aimadak/Porfolio/`
- Repo de deploy: `/home/samdi/Git/sadire.github.io/` (CNAME: aimadak.com)
- Sincronizar con rsync y luego commit+push en el repo de deploy

---

## Cosas críticas al modificar

- **No romper `{ "en": ..., "es": ... }`** en los datos — `t()` lo espera en todos los textos
- **El `id` es el slug de la URL** — cambiarlo rompe links existentes
- **Si se modifica un `.js` de assets**, incrementar `?v=N` en todos los HTML para invalidar caché
- **Textos de proyectos**: el usuario quiere estilo orgánico y natural. Nada de frases de IA ("from the ground up", "meaningful experiences", "I leveraged X to achieve Y"). Frases cortas, directas, en primera persona, como hablaría alguien real.
- **`grinch-2` ya es público** (el usuario lo desveló en ago 2026) con texto real
- **Sin em dashes en los textos**: el usuario no quiere rayas (—) en el contenido; reestructurar la frase en su lugar

---

## Pendiente

- Añadir imágenes reales (thumb + hero) a los proyectos que faltan (`unannounced`, `on-fire`, `itch-gamejams`)
- Añadir la foto de perfil en `assets/images/about/photo.jpg` (About muestra placeholder mientras tanto)
- Valorar reemplazar `resume.pdf` (actual: export de LinkedIn) por un PDF con mejor diseño
- Las fechas del CV (`date`) son strings sin localizar — se muestran en inglés también en ES

## Hecho (ago 2026)

- `data/content.js` rellenado con contenido real: bio, skills, contacto (email, LinkedIn, GitHub), `home.intro` y todas las secciones del CV (experiencia, formación, aptitudes, idiomas, voluntariado), migrado del antiguo `js/translations.js`
