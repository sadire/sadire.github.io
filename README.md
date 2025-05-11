# Samuel Díaz - Game Developer Portfolio

Este es el código fuente para mi portafolio de videojuegos. 
- `index.html` es la página principal con información de perfil y tarjetas de proyectos.
- Los estilos se encuentran en `css/style.css` y el script de internacionalización en `js/lang.js`.
- Las páginas de cada proyecto viven en la carpeta `projects`. Usa `projects/project-template.html` como punto de partida para nuevas entradas.
- Todas las imágenes actuales son placeholders planos en `images/`. Sustitúyelas por capturas reales.
- La web está optimizada para móviles y preparada para varios idiomas (ES/EN) mediante `data-i18n`.

## Cómo añadir un nuevo proyecto
1. Duplica un archivo dentro de `projects/` y nómbralo adecuadamente.
2. Añade tu imagen de tarjeta en `images/` y actualiza la ruta en la tarjeta correspondiente de `index.html`.
3. Completa las secciones de descripción, galería e información.

## Construcción
Solo necesitas un servidor estático (por ejemplo `live-server` o GitHub Pages) para publicar.
