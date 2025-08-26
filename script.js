// repo de GitHub
const username = "Sebstn7"; 
const repoContainer = document.getElementById("repo-container");

fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`)
  .then(response => response.json())
  .then(data => {
    data.forEach(repo => {
      let col = document.createElement("div");
      col.className = "col-md-4";

      col.innerHTML = `
        <div class="card h-100 shadow-sm border-0">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">
              <a href="${repo.html_url}" target="_blank" class="text-decoration-none text-primary fw-bold">
                ${repo.name}
              </a>
            </h5>
            <p class="card-text flex-grow-1 text-muted">
              ${repo.description ? repo.description : "📂 Proyecto sin descripción"}
            </p>
            <a href="${repo.html_url}" target="_blank" class="btn btn-outline-primary btn-sm mt-auto align-self-start">
              Ver en GitHub
            </a>
          </div>
        </div>
      `;
      repoContainer.appendChild(col);
    });
  })
  .catch(error => console.error("Error cargando repos:", error));


//   Formspree
document.getElementById("contact-form").addEventListener("submit", async function(event) {
  event.preventDefault(); 

  const form = event.target;
  const data = new FormData(form);
  const msg = document.getElementById("form-message");

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: data,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      msg.style.display = "block";
      msg.style.color = "green";
      msg.innerText = " Tu mensaje fue enviado.";
      form.reset();
    } else {
      msg.style.display = "block";
      msg.style.color = "red";
      msg.innerText = "❌ Hubo un error.";
    }
  } catch (error) {
    msg.style.display = "block";
    msg.style.color = "red";
    msg.innerText = "⚠️ Error de conexión.";
  }
});
