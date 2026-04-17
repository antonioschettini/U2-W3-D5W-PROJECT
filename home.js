const footerYear = function () {
  const span = document.getElementById("year");
  span.innerText = new Date().getFullYear();
};
footerYear();
const spinner = document.getElementById("loading-spinner");
const urlApi = "https://striveschool-api.herokuapp.com/api/product/"; //Assegno ad una variabile l'url della APi
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWUxZGZmZjczOWY4NzAwMTU3YWIwODciLCJpYXQiOjE3NzY0MTA2MjMsImV4cCI6MTc3NzYyMDIyM30.Vo9Mz-PV19wLvbeFt_pGIYMDWL39VWBUCAirYbeJDEM";

//Aggiungo il messaggio di errore da inserire successivamente nei catch
const mostraErrore = (messaggio) => {
  const container = document.getElementById("error-message");
  container.innerHTML = `
      <div class="alert alert-danger alert-dismissible fade show" role="alert">
      <strong>Attenzione!</strong> ${messaggio}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      </div>
  `;
};
const caricaProdotti = function () {
  // uso la fetch per recuperare e creare le card dall' Api
  fetch(urlApi, {
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      if (response.ok) {
        console.log("il server ha risposto correttamente", response.status);
        return response.json();
      } else {
        throw new Error("il server non ha trovato quello che cerchi");
      }
    })
    .then((listaProdotti) => {
      spinner.classList.add("d-none");
      console.log("Ho ricevuto i prodotti", listaProdotti);
      disegnaCard(listaProdotti); // funzione che andrò ad assegnare successivamente
    })
    .catch((error) => {
      mostraErrore(error);
      console.log("errore nel caricamento", error);
    });
};

const disegnaCard = (arrayProdotti) => {
  const rigaContenitore = document.getElementById("products-row");

  //inizio un ciclo forEach per appendere le card disponibili nell'Api
  arrayProdotti.forEach((prodotto, index) => {
    console.log(
      "Sto creando la card numero:",
      index + 1,
      "Nome:",
      prodotto.name,
    );
    // Creo la col
    const colonna = document.createElement("div");
    colonna.classList.add("col-12", "col-md-4", "col-lg-3");
    // modifico l'innerhtml per disegnarmi la card
    colonna.innerHTML = `
            <div class="card h-100 shadow-sm text-center">
                <a href="./details.html?id=${prodotto._id}">
                    <img src="${prodotto.imageUrl}" class="card-img-top" alt="${prodotto.name}" style="height: 200px; object-fit: cover;">
                </a>
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${prodotto.name}</h5>
                    <p class="card-text text-secondary small">${prodotto.description}</p>
                    <p class="fw-bold mt-auto">${prodotto.price}€</p>
                    <a href="./details.html?id=${prodotto._id}" class="btn btn-primary btn-sm mb-1">Vedi Prodotto</a>
                  <a href="./backoffice.html?id=${prodotto._id}" class="btn btn-warning btn-sm">Modifica</a>
                </div>
            </div>
        `;

    // Attacchiamo la colonna alla riga principale
    rigaContenitore.appendChild(colonna);
  });
  console.log("Tutte le card sono state appese alla pagina");
};

//Avvio la funzione per avviare la fetch all'avvio della pagina
window.onload = () => {
  caricaProdotti();
};
