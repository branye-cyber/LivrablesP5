// Récupération des données du localstorage
const currentCart = JSON.parse(localStorage.getItem("cart")) || [];

// Boucle pour vérifier le local storage
for (let j = 0; j < currentCart.length; j++) {
  fetch("http://localhost:3000/api/products/" + currentCart[j].idProduit)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        console.log("Mauvaise réponse du réseau");
      }
    })
    .then(function (product) {
      console.log(currentCart[j].idProduit);
      console.log(currentCart[j].color);
      console.log(currentCart[j].quantity);
      console.log(product.name);
      console.log(product.altTxt);
      console.log(product.price);

      // Récupération de l'élément du DOM qui accueillera les fiches
      const sectionItems = document.querySelector("#cart__items");

      const articleElement = document.createElement("article");
      sectionItems.appendChild(articleElement);

      // const cart__itemElement = document.querySelector(".cart__item");
      // articleElement.appendChild(cart__itemElement);

      // On crée l’élément "img".
      const imageElement = document.createElement("img");
      imageElement.src = product.imageUrl;
      imageElement.alt = product.altTxt;
      const sectionItem = document.querySelector(".cart__item__img");
      // sectionItem.appendChild(imageElement);

      const nomElement = document.createElement("h2");
      nomElement.innerText = product.name;
      articleElement.appendChild(nomElement);

      const colorElement = document.createElement("p");
      colorElement.innerText = currentCart[j].color;
      articleElement.appendChild(colorElement);

      const prixElement = document.createElement("p");
      prixElement.innerText = `${currentCart[j].quantity * product.price} €`;
      articleElement.appendChild(prixElement);
    });
}
// Instruction pour vider le localstorage
// localStorage.clear();
