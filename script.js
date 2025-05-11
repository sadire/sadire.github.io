
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

    let content = `
      <img src="${p.image}" alt="${p.title}">
      <h3>${p.title}</h3>
      <p>${p.description}</p>
      <div class="tags">#${p.tag}</div>
    `;

    if (p.link) {
      div.innerHTML = `<a href="${p.link}">${content}</a>`;
    } else {
      div.innerHTML = content;
    }

    carousel.appendChild(div);
  });
  updateCarousel();
}
