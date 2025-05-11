# Aimadack Web

Sitio web personal estático para el portafolio de Samuel Díaz ("Aimadack").

## ✨ Características

- Carrusel de proyectos con flechas de navegación
- Filtros por tipo de proyecto: Personal / Profesional
- Diseño minimalista inspirado en [hugo.fyi](https://hugo.fyi)
- Animaciones suaves y responsive
- Edición sencilla desde archivo JSON

---

## 📁 Estructura del Proyecto

```
miweb_estatica/
├── index.html              # Página principal "Sobre mí"
├── proyectos.html          # Carrusel de proyectos
├── clasified.html          # Página del proyecto clasified
├── contacto.html           # Formulario de contacto
├── 404.html                # Página 404 retro NES
├── proyectos.json          # 📌 Aquí editas tus proyectos
├── style.css               # Estilos globales
├── script.js               # JS para formularios y lógica
└── assets/
    ├── proyecto1.png ...   # Imágenes de los proyectos
    └── sword.png           # Espada de la 404
```

---

## 🛠️ Cómo Editar Proyectos

Edita el archivo `proyectos.json` con tu contenido. Ejemplo de entrada:

```json
{
  "title": "Clasified",
  "description": "Juego de exploración retro-futurista.",
  "image": "assets/proyecto1.png",
  "tag": "Personal"
}
```

- `"title"` → Nombre del proyecto
- `"description"` → Texto descriptivo corto
- `"image"` → Ruta a la imagen (dentro de `assets/`)
- `"tag"` → `"Personal"` o `"Profesional"` (usado por los filtros)

Guarda los cambios y súbelos a GitHub/Netlify/etc. ¡No necesitas tocar el HTML!

---

## 🚀 Deploy sugerido

Puedes subir este sitio a:

- [GitHub Pages](https://pages.github.com/)
- [Netlify](https://netlify.com/)
- [Vercel](https://vercel.com/)

---

## 📌 Recomendaciones

- Usa [Visual Studio Code](https://code.visualstudio.com/) con la extensión **Live Server** para ver cambios al instante.
- Asegúrate de subir también tus imágenes a la carpeta `assets/`.

---

## © 2025 Aimadack
Creado con cariño y neones digitales.
