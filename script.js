
fetch("proyectos.json")
  .then(res => res.json())
  .then(data => {
    allProjects = data;
    filtered = [...allProjects];
    renderProjects(filtered);
  });

function renderProjects(projects) {
  carousel.innerHTML = "";
  projects.forEach((p, i) => {
    const div = document.createElement("div");
    div.className = "project-slide";
    div.dataset.tags = p.tag;

    // Ruta simulada (solo para primeros 2 proyectos)
    let linkStart = "";
    let linkEnd = "";
    if (i === 0) {
      linkStart = '<a href="clasified.html">';
      linkEnd = '</a>';
    } else if (i === 1) {
      linkStart = '<a href="proyecto_base.html">';
      linkEnd = '</a>';
    }

    div.innerHTML = \`
      \${linkStart}
      <img src="\${p.image}" alt="\${p.title}">
      <h3>\${p.title}</h3>
      <p>\${p.description}</p>
      <div class="tags">#\${p.tag}</div>
      \${linkEnd}
    \`;
    carousel.appendChild(div);
  });
  updateCarousel();
}
