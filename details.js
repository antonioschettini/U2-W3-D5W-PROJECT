const footerYear = function () {
  const span = document.getElementById("year");
  span.innerText = new Date().getFullYear();
};
footerYear();

const urlApi = "https://striveschool-api.herokuapp.com/api/product/"; //Assegno ad una variabile l'url della APi
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWUxZGZmZjczOWY4NzAwMTU3YWIwODciLCJpYXQiOjE3NzY0MTA2MjMsImV4cCI6MTc3NzYyMDIyM30.Vo9Mz-PV19wLvbeFt_pGIYMDWL39VWBUCAirYbeJDEM";
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

const container = document.getElementById("details-container");
if (productId) {
  fetch(urlApi + productId, {
    headers: { Authorization: token },
  })
    .then((response) => response.json())
    .then((prodotto) => {
      // Creiamo la scheda singola
      container.innerHTML = `
        <div class="col">
          <div class="card shadow glass-card">
            <img src="${prodotto.imageUrl}" class="card-img-top" alt="${prodotto.name}">
              <div class="card-body text-center">
              <h1>${prodotto.name}</h1>
              <p class="lead">${prodotto.description}</p>
              <h3 class="text-primary">${prodotto.price}€</h3>
              <p>Marca: <strong>${prodotto.brand}</strong></p>
              <a href="home.html" class="btn btn-outline-secondary">Torna indietro</a>
            </div>
          </div>
        </div>`;
    })
    .catch((err) => console.log("Errore caricamento dettagli", err));
}
