# Portfolio — GitHub Pages

Sitio web de portafolio estático. Sin frameworks, sin build step. Se despliega directamente en GitHub Pages en `aimadak.com`.

---

## Estructura de archivos

```
Porfolio/
│
├── index.html          → Página principal (grid de proyectos)
├── about.html          → Página About
├── resume.html         → Página CV con descarga PDF
├── project.html        → Plantilla dinámica de proyecto (?id=slug)
├── resume.pdf          → ⚠ Reemplazar con tu PDF real
│
├── data/
│   ├── projects.js     → ✏ EDITAR AQUÍ para añadir/modificar proyectos
│   └── content.js      → ✏ EDITAR AQUÍ para nombre, bio, CV, navegación
│
└── assets/
    ├── css/style.css   → Todos los estilos
    ├── js/
    │   ├── main.js     → Idioma, carga de datos, nav, footer
    │   └── projects.js → Renderizado de todas las páginas
    └── images/
        ├── about/
        │   └── photo.jpg           → Tu foto de perfil
        └── projects/
            └── [id-del-proyecto]/
                ├── thumb.jpg       → Miniatura del grid (ratio 4:3)
                ├── hero.jpg        → Imagen grande en la página del proyecto
                └── ...             → Imágenes adicionales de galería/detalle
```

---

## Cómo añadir un proyecto

Edita `data/projects.js`. Copia este bloque y rellénalo:

```js
{
  "id": "nombre-del-proyecto",
  "category": "professional",       // "professional" o "independent"

  "title":   { "en": "Project Name", "es": "Nombre del Proyecto" },
  "tagline": { "en": "Short tagline.", "es": "Tagline corto." },
  "tags":    ["Tag 1", "Tag 2"],
  "thumbnail": "assets/images/projects/nombre-del-proyecto/thumb.jpg",

  "hero":     "assets/images/projects/nombre-del-proyecto/hero.jpg",
  "heroType": "image",              // "image", "video" o "youtube"

  "data": [
    { "label": { "en": "Year",   "es": "Año"     }, "value": "2024" },
    { "label": { "en": "Role",   "es": "Rol"     }, "value": "Tu rol" },
    { "label": { "en": "Studio", "es": "Estudio" }, "value": "Nombre estudio" }
  ],

  "intro": {
    "en": "Short paragraph below the hero. Keep it to 2-3 sentences.",
    "es": "Párrafo corto bajo el hero."
  },
  "detail": {
    "text": {
      "en": "Longer text on the left. Use \\n\\n for paragraph breaks.",
      "es": "Texto más largo a la izquierda."
    },
    "image": "assets/images/projects/nombre-del-proyecto/hero.jpg",
    "imageAlt": "Description"
  },
  "gallery": [
    "assets/images/projects/nombre-del-proyecto/img1.jpg",
    "assets/images/projects/nombre-del-proyecto/img2.jpg"
  ]
}
```

### heroType
| Valor | Comportamiento |
|---|---|
| `"image"` | Imagen estándar |
| `"video"` | Archivo de vídeo (`<video>`) |
| `"youtube"` | URL de YouTube → embed automático 16:9 |

### Ocultar un proyecto
Añade `"hidden": true` al objeto. El proyecto desaparece del grid y bloquea el acceso directo por URL.

### Card de enlace externo (ej. itch.io)
Añade `"external": "https://..."` en lugar de contenido de proyecto. Al hacer clic abre el enlace en nueva pestaña y no genera página de detalle.

### Categorías disponibles
| `"category"` | Sección |
|---|---|
| `"professional"` | Professional |
| `"independent"` | Independent Projects |

---

## Cómo editar el contenido general

Edita `data/content.js`:

| Campo | Qué cambia |
|---|---|
| `site.name` | Nombre en la barra de navegación |
| `home.intro` | Texto pequeño bajo el título "Work" (vacío = lorem ipsum) |
| `about.bio` | Párrafos de texto en la página About |
| `about.photo` | Ruta a tu foto |
| `about.skills` | Lista de skills (array de strings) |
| `about.contact` | Email, LinkedIn, GitHub |
| `resume.sections` | Secciones del CV (Experience, Education, etc.) |
| `resume.pdf` | Ruta al archivo PDF del CV |
| `footer.text` | Texto del pie de página |

Todos los campos de texto admiten versión en inglés y español:
```js
{ "en": "English text", "es": "Texto en español" }
```

---

## Idiomas

El botón **ES / EN** en la nav cambia el idioma de toda la web. La preferencia se guarda automáticamente en el navegador.

---

## Imágenes

Si una imagen no existe, el código muestra un placeholder automático — no hay que hacer nada especial.

- **Miniatura (`thumb.jpg`)**: ratio **4:3** recomendado. Aparece en el grid principal.
- **Hero (`hero.jpg`)**: ratio libre. Cabecera de la página del proyecto.
- **Galería**: hasta 3 imágenes en el array `"gallery"`.

Formatos admitidos: JPG, PNG, WebP, GIF, MP4 (para vídeo).

---

## Despliegue

El sitio está desplegado en `aimadak.com` via GitHub Pages. El repositorio de deploy es `/home/samdi/Git/sadire.github.io`.

Para sincronizar cambios del directorio de trabajo al repo de deploy:
```bash
rsync -av --delete \
  --exclude='.git' --exclude='node_modules' \
  /home/samdi/Aimadak/Porfolio/ \
  /home/samdi/Git/sadire.github.io/
```
Luego hacer commit y push en `/home/samdi/Git/sadire.github.io`.

---

## Previsualizar en local

El servidor de preview está configurado en `.claude/launch.json` (puerto 3000).

También puedes lanzarlo manualmente:
```bash
python3 -m http.server 3000
```
Luego abre `http://localhost:3000`.

> Los HTML también funcionan abriéndolos directamente (`file://`) — no necesitan servidor.
