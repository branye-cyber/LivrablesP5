// Fonction fetch => Obternir les données depuis l'API
fetch("http://localhost:3000/api/products/")
  .then(function (response) {
    if (response.ok) {
      return response.json();
    } else {
      console.log("Mauvaise réponse du réseau");
    }
  })

  // Fonction qui affiche les éléments du DOM
  .then(function () {
    const idProduitRaw = new URLSearchParams(window.location.search);
    const idProduit = idProduitRaw.get("orderId");

    const orderId = document.querySelector("#orderId");

    orderId.innerText = idProduit;

    // Instruction pour vider le localstorage
    localStorage.clear();
  })
  .catch(function (error) {
    console.log(
      "Il y a eu un problème avec l'opération fetch : " + error.message
    );
  });
