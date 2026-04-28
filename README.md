# Portfolio — GitHub Pages

Sitio web de portafolio estático. Sin frameworks, sin build step. Se despliega directamente en GitHub Pages.

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
                ├── detail1.jpg     → Imágenes de secciones (opcionales)
                └── ...
```

---

## Cómo añadir un proyecto

Solo tienes que editar `data/projects.json`. Copia este bloque y rellénalo:

```json
{
  "id": "nombre-del-proyecto",
  "category": "professional",

  "title":   { "en": "Project Name", "es": "Nombre del Proyecto" },
  "tagline": { "en": "Short hover description.", "es": "Descripción breve al hover." },
  "tags":    ["Tag 1", "Tag 2"],
  "thumbnail": "assets/images/projects/nombre-del-proyecto/thumb.jpg",

  "hero":     "assets/images/projects/nombre-del-proyecto/hero.jpg",
  "heroType": "image",

  "data": [
    { "label": { "en": "Year",   "es": "Año"   }, "value": "2024" },
    { "label": { "en": "Role",   "es": "Rol"   }, "value": "Tu rol" },
    { "label": { "en": "Studio", "es": "Estudio" }, "value": "Nombre estudio" }
  ],

  "sections": [
    {
      "type": "text",
      "content": {
        "en": "Main description. Use \\n\\n to separate paragraphs.",
        "es": "Descripción principal. Usa \\n\\n para separar párrafos."
      }
    },
    {
      "type": "text-image",
      "reverse": false,
      "content": { "en": "Text on left, image on right.", "es": "Texto a la izquierda, imagen a la derecha." },
      "image": "assets/images/projects/nombre-del-proyecto/detail1.jpg",
      "imageAlt": "Descripción de la imagen"
    }
  ]
}
```

### Categorías disponibles
| `"category"` | Aparece en sección |
|---|---|
| `"professional"` | Professional |
| `"independent"` | Independent Projects |

### Tipos de sección (`"type"`)
| Tipo | Descripción |
|---|---|
| `"text"` | Bloque de texto (soporta párrafos con `\n\n`) |
| `"text-image"` | Texto + imagen. `"reverse": true` pone la imagen a la izquierda |

### `heroType`
- `"image"` → imagen normal
- `"video"` → usa `"hero"` como ruta al archivo de vídeo

---

## Cómo editar el contenido general

Edita `data/content.json`:

| Campo | Qué cambia |
|---|---|
| `site.name` | Nombre en la barra de navegación |
| `about.bio` | Párrafos de texto en la página About |
| `about.photo` | Ruta a tu foto |
| `about.skills` | Lista de skills (array de strings) |
| `about.contact` | Email, LinkedIn, GitHub |
| `resume.sections` | Secciones del CV (Experience, Education, etc.) |
| `resume.pdf` | Ruta al archivo PDF del CV |
| `footer.text` | Texto del pie de página |

Todos los campos de texto admiten versión en inglés y español:
```json
{ "en": "English text", "es": "Texto en español" }
```

---

## Idiomas

El botón **ES / EN** en la nav cambia el idioma de toda la web. La preferencia se guarda automáticamente en el navegador.

---

## Imágenes

- **Miniatura (`thumb.jpg`)**: ratio **4:3** recomendado. Aparece en el grid principal.
- **Hero (`hero.jpg`)**: ratio libre. Ocupa ~2/3 del ancho en la página del proyecto.
- **Detalle**: cualquier ratio. Se usa en secciones `text-image`.

Formatos admitidos: JPG, PNG, WebP, GIF, MP4 (para vídeo).

---

## Despliegue en GitHub Pages

1. Sube el proyecto a un repositorio de GitHub.
2. Ve a **Settings → Pages**.
3. En *Source*, selecciona la rama `main` y la carpeta `/` (root).
4. GitHub generará una URL tipo `https://usuario.github.io/nombre-repo`.

> Si el repositorio se llama `usuario.github.io`, el sitio estará en la raíz (`https://usuario.github.io`).

---

## Previsualizar en local

Puedes abrir los HTML directamente haciendo doble clic — no necesitas servidor.

Si prefieres usar un servidor local:
```bash
python3 -m http.server 3000
```
Luego abre `http://localhost:3000`.
