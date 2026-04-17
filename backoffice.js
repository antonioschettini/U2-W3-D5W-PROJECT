const footerYear = function () {
  const span = document.getElementById("year");
  span.innerText = new Date().getFullYear();
};
footerYear();

const urlApi = "https://striveschool-api.herokuapp.com/api/product/"; //Assegno ad una variabile l'url della APi
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWUxZGZmZjczOWY4NzAwMTU3YWIwODciLCJpYXQiOjE3NzY0MTA2MjMsImV4cCI6MTc3NzYyMDIyM30.Vo9Mz-PV19wLvbeFt_pGIYMDWL39VWBUCAirYbeJDEM";
const productForm = document.getElementById("product-form"); // recupero il form
//Aggiungo il messaggio di errore da inserire successivamente nei catch
const mostraErrore = (messaggio) => {
  const container = document.getElementById("error-message");
  container.innerHTML = `
      <div class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>Attenzione!</strong> ${messaggio}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      </div>`;
};
// Parte per il modifica put api
// Azione del modifica in backoffice
const params = new URLSearchParams(window.location.search); // assegno ad una variabile l'id dell'url
const productId = params.get("id"); // recupero l'id
const btnCrea = document.getElementById("btn-crea");
const btnModifica = document.getElementById("btn-modifica");
const btnElimina = document.getElementById("btn-elimina");
// se c'è un id, carico i dati per modificarli
if (productId) {
  btnCrea.classList.add("d-none");
  btnModifica.classList.remove("d-none");
  btnElimina.classList.remove("d-none");
  console.log("modifica", productId);
  fetch(urlApi + productId, {
    headers: { Authorization: token },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((prodotto) => {
      // inserisco i dati per ricompilare il form
      document.getElementById("name").value = prodotto.name;
      document.getElementById("description").value = prodotto.description;
      document.getElementById("brand").value = prodotto.brand;
      document.getElementById("imageUrl").value = prodotto.imageUrl;
      document.getElementById("price").value = prodotto.price;
    })
    .catch((error) => {
      mostraErrore(error);
      console.log("Errore nel caricamento dati", error);
    });
}

// resetto l'event per l'invio del form
productForm.addEventListener("submit", function (event) {
  event.preventDefault();
  console.log("Form correttamente inviato");

  // Assegno ai campi input le variabili corrispondenti
  const nameValue = document.getElementById("name").value;
  const descriptionValue = document.getElementById("description").value;
  const brandValue = document.getElementById("brand").value;
  const imageUrlValue = document.getElementById("imageUrl").value;
  const priceValue = document.getElementById("price").value;
  console.log("Dati recuperati: ", {
    nameValue,
    descriptionValue,
    brandValue,
    imageUrlValue,
    priceValue,
  });

  // Creo l'oggetto con i valori da inviare all APi
  const newProduct = {
    name: nameValue,
    description: descriptionValue,
    brand: brandValue,
    imageUrl: imageUrlValue,
    price: priceValue,
  };
  productForm.reset();
  console.log("Pacchetto prodotto pronto", JSON.stringify(newProduct));

  // inserisco delle nuove variabili
  // Decidiamo il metodo: se productId esiste è "PUT", altrimenti "POST"
  const metodoScelto = productId ? "PUT" : "POST";
  // Decidiamo l'URL: se productId esiste aggiungiamolo alla fine dell'URL base
  const urlFinale = productId ? urlApi + productId : urlApi;

  // Inizio la fetch per inviare i dati all' APi
  fetch(urlFinale, {
    // Aggiorno con il ternario
    method: metodoScelto, // inserisco UN NUOVO l'oggetto nell'API // inserisco il metodoscelto
    body: JSON.stringify(newProduct), // invio il prodotto
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  })
    .then((response) => {
      console.log("risposta dal server ricevuta!", response.status);
      if (response.ok) {
        alert("Prodotto salvato!");
        productForm.reset();
        window.location.href = "home.html";
      }
    })
    .catch((error) => {
      mostraErrore(error);
      console.log("Errore durante la fetch", error);
    });
});

// // Form reset ---
// productForm.addEventListener("reset", function(event){
//   const conferma= confirm("Sei si curo di voler cancellare tutti i campi?")
//   if (!conferma){
//     event.preventDefault()
//   }

// })

// Parte elima dall APi
// recupero il bottone elimina

//Aggiungo l'evento
btnElimina.addEventListener("click", function () {
  // ora mi accerto se sono in modalità modifica
  if (productId) {
    const conferma = confirm("Sei sicuro di eliminare questo prodotto?"); // appare pop-up per confermare l'eliminazione
    if (conferma) {
      fetch(urlApi + productId, {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      })
        .then((response) => {
          if (response.ok) {
            alert("Prodotto eliminato con successo");
            window.location.href = "home.html"; // dopo l'eliminazione torno in home
          } else {
            alert("errore durante l'eliminazione");
          }
        })
        .catch((error) => {
          mostraErrore(error);
          console.log("Errore nella fetch di eliminazione", error);
        });
    }
  } else {
    alert("Il prodotto non è ancora stato creato, non è possibile eliminarlo");
  }
});
