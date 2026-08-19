# AgentsReadme — Notas para sesiones con Claude

Este archivo es contexto para futuros agentes de IA trabajando en este proyecto.

---

## Qué es este proyecto

Portafolio personal de Samuel Díaz Reyes desplegado en `aimadak.com` via GitHub Pages. Sitio estático (HTML/CSS/JS puro, sin build step ni frameworks). El usuario edita únicamente `projects/<id>/info.txt` (proyectos) y `data/content.js` (resto del sitio) — nunca debería tocar HTML ni JS core para añadir contenido.

---

## Principio de diseño fundamental

**Cada proyecto vive en su carpeta `projects/<id>/`** con su `info.txt` (todo el texto, formato simple editable a mano) y sus imágenes con nombres fijos. El resto del contenido del sitio (bio, CV, nav, footer) vive en `data/content.js`. Si el usuario quiere un campo o sección nueva, la solución pasa por extender el formato del txt o `content.js` y adaptar el JS que los consume. No crear HTML por proyecto.

---

## Arquitectura

```
projects/<id>/info.txt  → fuente de verdad de cada proyecto (texto plano, ver formato abajo)
projects/<id>/*.jpg     → imágenes del proyecto (nombres fijos)
projects/_plantilla.txt → plantilla comentada para proyectos nuevos
data/projects.js        → SOLO la lista de ids y su orden (window.PROJECT_LIST)
data/content.js         → resto del sitio (window.PORTFOLIO_CONTENT)

assets/js/main.js     → idioma (SITE.lang, t(), toggleLang()), loadData() que hace
                        fetch de cada info.txt (cache: no-store) y parseProjectTxt()
assets/js/projects.js → renderiza todas las páginas leyendo SITE.content y SITE.projects

project.html          → página dinámica: lee ?id=slug de la URL
preview.bat           → doble clic = servidor local (python) + abre el navegador
```

Flujo de arranque:
1. `data/content.js` y `data/projects.js` → setean `window.PORTFOLIO_CONTENT` y `window.PROJECT_LIST`
2. `main.js → loadData()` → fetch de `projects/<id>/info.txt` para cada id, `parseProjectTxt()` los convierte al objeto de proyecto
3. Llama a `renderPage()` (en `projects.js`), que despacha según `data-page` del `<body>`

**Importante — file:// ya no funciona**: los `info.txt` se cargan con `fetch()`, que falla en `file://`. Para previsualizar en local: `preview.bat` (requiere Python) o pedirle a Claude que arranque el server. El grid muestra un aviso si se abre por `file://`.

**Cache busting**: los `<script>` y el CSS llevan `?v=N`; al modificar cualquier `.js` o el CSS, incrementar N en los 4 HTML. Versión actual: `?v=8`. Los `info.txt` NO lo necesitan: se piden con `cache: no-store`, editar y recargar basta.

---

## Sistema de idiomas

- Estado en `SITE.lang` (`'en'` o `'es'`), persistido en `localStorage`
- Función `t(obj)` recibe `{ en: '...', es: '...' }` y devuelve el string del idioma activo
- Cambiar idioma llama a `renderPage()` de nuevo, que re-renderiza todo el DOM
- En los `info.txt` el idioma va por sufijos (`title:` / `title.es:`, bloques `[intro en]` / `[intro es]`); si falta la variante ES se usa la EN

---

## Formato de projects/<id>/info.txt

Ver `projects/_plantilla.txt` (plantilla comentada). Resumen:

```
title: Nombre                    ·  title.es: opcional si difiere
tagline: ... / tagline.es: ...
category: professional | independent
tags: Tag One, Tag Two           ·  lista separada por comas, sin localizar
hero: (opcional) URL YouTube | archivo .mp4 | none · por defecto hero.jpg
thumb: none                      ·  (opcional) sin miniatura
detail-image: hero.jpg           ·  (opcional) imagen del bloque detalle, por defecto detail.jpg
hidden: yes                      ·  (opcional) no se muestra en la web
external: https://...            ·  (opcional) card-enlace sin página propia

data: Label EN / Label ES | valor     (repetible, columna derecha de la página)

[intro en] / [intro es]          ·  texto principal, párrafos = línea en blanco
[detail en] / [detail es]        ·  bloque opcional texto+imagen; sin él no se renderiza
```

Las líneas que empiezan por `#` son comentarios. El parser está en `assets/js/main.js → parseProjectTxt()`.

**Añadir un proyecto** = crear `projects/<nuevo-id>/` con `info.txt` + añadir el id a `window.PROJECT_LIST` en `data/projects.js` (el orden de esa lista es el orden del grid).

---

## Imágenes

Nombres fijos dentro de `projects/<id>/`. Si faltan, hay placeholders automáticos (y las de galería simplemente no aparecen); no hay que hacer nada especial.

```
projects/<id>/thumb.jpg       → miniatura grid (4:3, ~800x600)
projects/<id>/hero.jpg        → cabecera página proyecto (16:9, ~1920x1080)
projects/<id>/detail.jpg      → imagen del bloque detalle (override con detail-image:)
projects/<id>/gallery-1.jpg   → galería, hasta gallery-3.jpg (4:3)
assets/images/about/photo.jpg → foto de perfil (3:4)
```

---

## Proyectos actuales

| id | Título | Categoría | Estado |
|---|---|---|---|
| `unannounced` | Cancelled Combat Game | professional | texto real, sin imágenes (cancelado, no llevará) |
| `bluey-videogame` | Bluey: The Videogame | professional | texto real, hero=YouTube, thumb + galería |
| `grinch-2` | The Grinch 2: Saving Christmas | professional | texto real, hero=YouTube, galería (falta thumb) |
| `fall-flat-2` | Human: Fall Flat 2 | professional | texto real, hero=YouTube, thumb + galería |
| `on-fire` | On Fire! | independent | texto real, sin imágenes |
| `itch-gamejams` | Game Jams & Student Projects | independent | external → klapa.itch.io |

---

## Categorías

Definidas en `data/content.js → categories`. El orden de secciones en el grid sigue el orden de primera aparición en `PROJECT_LIST`.

Categorías activas:
- `"professional"` — sección superior
- `"independent"` — sección con divisor "INDEPENDENT PROJECTS"

`"gamejams"` está definida en content.js pero sin uso activo (el card de itch.io usa `"independent"`).

---

## Despliegue

- Repo: `C:\Users\samdi\sadire.github.io` (CNAME: aimadak.com), GitHub Pages sobre `main`
- **Claude commitea en local pero NUNCA hace push** — el push lo hace siempre el usuario

---

## Cosas críticas al modificar

- **No romper el patrón en/es** — `t()` lo espera en todos los textos; en los txt, sufijo `.es` y bloques `[... es]`
- **El `id` es el slug de la URL y el nombre de la carpeta** — cambiarlo rompe links existentes
- **Si se modifica un `.js` o el CSS**, incrementar `?v=N` en los 4 HTML (los txt no lo necesitan)
- **Textos**: estilo orgánico y natural, primera persona, frases cortas. Nada de frases de IA ("from the ground up", "meaningful experiences", "I leveraged X"). **Sin em dashes (—)**: reestructurar la frase en su lugar
- **`grinch-2` ya es público** (el usuario lo desveló en ago 2026) con texto real

---

## Pendiente

- Añadir thumb a `grinch-2` e imágenes a `on-fire` e `itch-gamejams`
- Añadir la foto de perfil en `assets/images/about/photo.jpg` (About muestra placeholder mientras tanto)
- Valorar reemplazar `resume.pdf` (actual: export de LinkedIn) por un PDF con mejor diseño
- Las fechas del CV (`date` en content.js) son strings sin localizar — se muestran en inglés también en ES

## Hecho (ago 2026)

- `data/content.js` rellenado con contenido real (bio, skills, contacto, CV completo), migrado del antiguo `js/translations.js`
- Textos de los 5 proyectos reescritos en tono natural EN/ES; Grinch 2 desvelado con título y datos reales; `unannounced` pasó a Cancelled Combat Game
- Reestructura: cada proyecto en `projects/<id>/` con `info.txt` editable + imágenes; `data/projects.js` reducido a la lista de ids
