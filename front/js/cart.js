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
      currentCart[j].price = currentCart[j].quantity * product.price;

      // Récupération de l'élément du DOM qui accueillera les fiches
      const sectionItems = document.querySelector("#cart__items");

      const articleElement = document.createElement("article");
      articleElement.classList.add("cart__item");
      sectionItems.appendChild(articleElement);

      const cart__item__img = document.createElement("div");
      cart__item__img.classList.add("cart__item__img");
      articleElement.appendChild(cart__item__img);

      // On crée l’élément "img".
      const imageElement = document.createElement("img");
      // imageElement.classList.add(".cart__item__img");
      imageElement.src = product.imageUrl;
      imageElement.alt = product.altTxt;
      cart__item__img.appendChild(imageElement);

      const cart__item__content = document.createElement("div");
      cart__item__content.classList.add("cart__item__content");
      articleElement.appendChild(cart__item__content);

      const cart__item__content__description = document.createElement("div");
      cart__item__content__description.classList.add(
        "cart__item__content__description"
      );
      cart__item__content.appendChild(cart__item__content__description);

      const nomElement = document.createElement("h2");
      nomElement.innerText = product.name;
      cart__item__content__description.appendChild(nomElement);

      const colorElement = document.createElement("p");
      colorElement.innerText = currentCart[j].color;
      cart__item__content__description.appendChild(colorElement);

      const prixElement = document.createElement("p");
      prixElement.innerText = `${currentCart[j].quantity * product.price} €`;
      cart__item__content__description.appendChild(prixElement);

      const cart__item__content__settings = document.createElement("div");
      cart__item__content__settings.classList.add(
        "cart__item__content__settings"
      );
      cart__item__content.appendChild(cart__item__content__settings);

      const cart__item__content__settings__quantity =
        document.createElement("div");
      cart__item__content__settings__quantity.classList.add(
        "cart__item__content__settings__quantity"
      );
      cart__item__content__settings.appendChild(
        cart__item__content__settings__quantity
      );

      const qtyLabel = document.createElement("p");
      qtyLabel.innerText = "Qté : ";
      cart__item__content__settings__quantity.appendChild(qtyLabel);

      const qtyOrdered = document.createElement("input");
      qtyOrdered.type = "number";
      qtyOrdered.classList.add("itemQuantity");
      qtyOrdered.name = "itemQuantity";
      qtyOrdered.min = 1;
      qtyOrdered.max = 100;
      qtyOrdered.value = currentCart[j].quantity;
      cart__item__content__settings__quantity.appendChild(qtyOrdered);

      const cart__item__content__settings__delete =
        document.createElement("div");
      cart__item__content__settings__delete.classList.add(
        "cart__item__content__settings__delete"
      );
      cart__item__content__settings.appendChild(
        cart__item__content__settings__delete
      );

      const deleteItem = document.createElement("p");
      deleteItem.classList.add("deleteItem");
      deleteItem.innerText = "Supprimer";
      cart__item__content__settings__delete.appendChild(deleteItem);

      // Récapitulatif du Panier (Nbe articles et Prix total)
      let quantityOrdered = 0;
      let priceOrdered = 0;
      for (let j = 0; j < currentCart.length; j++) {
        quantityOrdered = quantityOrdered + currentCart[j].quantity;
        priceOrdered = priceOrdered + parseInt(currentCart[j].price);
      }
      // Enregistrement "Nombre d'articles et Prix"
      localStorage.setItem("quantity", quantityOrdered);
      localStorage.setItem("price", priceOrdered);
    });
}
// Récupération de l'élément du DOM qui accueillera les informations
const quantityOrdered = JSON.parse(localStorage.getItem("quantity"));
const priceOrdered = JSON.parse(localStorage.getItem("price"));

const totalQuantity = document.querySelector("#totalQuantity");
const quantityPanier = document.createElement("span");
quantityPanier.innerText = quantityOrdered;
totalQuantity.appendChild(quantityPanier);

const totalPrice = document.querySelector("#totalPrice");
const pricePanier = document.createElement("span");
pricePanier.innerText = priceOrdered;
totalPrice.appendChild(pricePanier);

// Entrée des coordonnées du Client
// Prénom
// Nom
// Adresse
// Ville
// Email
// Bouton "Commander !"
const button = document.querySelector("#order");
button.addEventListener("click", (event) => {
  window.location.href = "confirmation.html";
});
