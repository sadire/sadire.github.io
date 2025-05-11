
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = form.querySelector("button");
      btn.textContent = "¡Enviado! ✉️";
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = "Enviar";
        btn.disabled = false;
        form.reset();
      }, 3000);
    });
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const detailsSection = document.getElementById("project-details");
  const cards = document.querySelectorAll(".project-card");

  const projects = {
    clasified: {
      title: "Clasified",
      desc: "Un juego de exploración narrativa con estética retro-futurista. En un mundo donde los recuerdos se imprimen en vinilo, deberás descubrir qué es real.",
      img: "assets/proyecto1.png"
    },
    botanico: {
      title: "Simulador Botánico",
      desc: "Simulación interactiva de cultivos con IA emocional. ¿Las plantas sienten? Esta responde con colores, crecimiento y patrones únicos.",
      img: "assets/proyecto2.png"
    },
    vr: {
      title: "Juego VR Experimental",
      desc: "Control total sin mandos: usa tus manos para explorar mundos extraños donde la gravedad es un rumor y los gatos dominan la física cuántica.",
      img: "assets/proyecto3.png"
    }
  };

  cards.forEach((card, index) => {
    card.addEventListener("click", () => {
      const key = Object.keys(projects)[index];
      const project = projects[key];
      detailsSection.innerHTML = `
        <div class="details-content">
          <div class="media">
            <img src="${project.img}" alt="${project.title}" />
          </div>
          <div class="text">
            <h3>${project.title}</h3>
            <p>${project.desc}</p>
          </div>
        </div>
      `;
      detailsSection.style.display = "block";
      detailsSection.scrollIntoView({ behavior: "smooth" });
    });
  });
});