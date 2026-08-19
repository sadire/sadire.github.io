# Portfolio — GitHub Pages

Sitio web de portafolio estático. Sin frameworks, sin build step. Se despliega directamente en GitHub Pages en `aimadak.com`.

---

## Estructura de archivos

```
sadire.github.io/
│
├── index.html          → Página principal (grid de proyectos)
├── about.html          → Página About
├── resume.html         → Página CV con descarga PDF
├── project.html        → Plantilla dinámica de proyecto (?id=slug)
├── resume.pdf          → PDF del CV (reemplazar el archivo = actualizado)
├── preview.bat         → Doble clic para ver la web en local
│
├── projects/           → ✏ UNA CARPETA POR PROYECTO
│   ├── _plantilla.txt  →   plantilla para proyectos nuevos
│   └── [id]/
│       ├── info.txt    →   ✏ TODO el texto del proyecto (EN y ES)
│       ├── thumb.jpg   →   miniatura del grid (4:3, ~800x600)
│       ├── hero.jpg    →   cabecera de la página (16:9, ~1920x1080)
│       ├── detail.jpg  →   imagen del bloque de detalle (opcional)
│       └── gallery-1.jpg → galería, hasta gallery-3.jpg (opcional)
│
├── data/
│   ├── projects.js     → ✏ lista de proyectos y su ORDEN en el grid
│   └── content.js      → ✏ nombre, bio, skills, CV, navegación, footer
│
└── assets/
    ├── css/style.css   → Todos los estilos
    ├── js/             → Código (no hace falta tocarlo)
    └── images/about/photo.jpg → Tu foto de perfil
```

---

## Cómo editar un proyecto

Abre `projects/<id>/info.txt`, edita, guarda. Al recargar la web se ve el cambio (no hay caché en los txt). El formato:

```
title: Nombre del proyecto
title.es: Nombre en español (solo si es distinto)
tagline: Short role description
tagline.es: Descripción corta
category: professional        (o independent)
tags: Tag One, Tag Two

data: Role / Rol | My Role
data: Year / Año | 2025

[intro en]
Texto principal en inglés. Cada párrafo separado por una línea en blanco.

[intro es]
Lo mismo en español.

[detail en]
Bloque opcional de texto con imagen al lado.

[detail es]
Lo mismo en español.
```

Opciones extra (líneas sueltas antes de los bloques):

| Línea | Efecto |
|---|---|
| `hero: https://youtube.com/...` | La cabecera es un vídeo de YouTube |
| `hero: video.mp4` | La cabecera es un vídeo local de la carpeta |
| `hero: none` | Sin cabecera |
| `thumb: none` | Sin miniatura (sale placeholder) |
| `detail-image: hero.jpg` | Usa otra imagen en el bloque detalle (por defecto `detail.jpg`) |
| `hidden: yes` | El proyecto existe pero no se muestra |
| `external: https://...` | El card abre ese enlace, sin página propia |

Las líneas que empiezan por `#` son comentarios.

## Cómo añadir un proyecto

1. Crea la carpeta `projects/mi-proyecto/`
2. Copia `projects/_plantilla.txt` dentro como `info.txt` y rellénalo
3. Añade `"mi-proyecto"` a la lista de `data/projects.js` (el orden de la lista es el orden del grid)
4. Ve soltando las imágenes en la carpeta cuando las tengas (si faltan salen placeholders)

---

## Cómo editar el contenido general

Edita `data/content.js`:

| Campo | Qué cambia |
|---|---|
| `site.name` / `site.tagline` | Nombre y subtítulo de la barra de navegación |
| `home.intro` | Texto bajo el título "Work" |
| `about.bio` | Párrafos de la página About |
| `about.skills` | Lista de skills |
| `about.contact` | Email, LinkedIn, GitHub |
| `resume.sections` | Secciones del CV (experiencia, formación, etc.) |
| `footer.text` | Pie de página |

Los textos ahí siguen el patrón `{ "en": "...", "es": "..." }`.

---

## Idiomas

El botón **ES / EN** de la nav cambia el idioma de toda la web y se recuerda en el navegador. En los `info.txt`, el español va en `title.es:`, `tagline.es:` y los bloques `[... es]`; si falta, se usa el inglés.

---

## Previsualizar en local

Doble clic en **`preview.bat`** (necesita Python instalado): arranca un servidor y abre la web en el navegador. Cierra su ventana para pararlo.

> ⚠ Abrir los HTML directamente con doble clic (`file://`) ya NO funciona: los proyectos se cargan por red y el navegador lo bloquea. Usa siempre `preview.bat` o la web publicada.

---

## Publicar

```bash
git add -A
git commit -m "Update content"
git push
```

GitHub Pages actualiza `aimadak.com` en un par de minutos.
