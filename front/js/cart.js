// Récupération des données du localstorage
const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
function affichage(product, productLocalstorage) {
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

  // On crée l'élément "Nom du Produit"
  const nomElement = document.createElement("h2");
  nomElement.innerText = product.name;
  cart__item__content__description.appendChild(nomElement);

  // On crée l'élément "Couleur du Produit"
  const colorElement = document.createElement("p");
  colorElement.innerText = productLocalstorage.color;
  cart__item__content__description.appendChild(colorElement);

  // On crée l'élément "Prix du Produit"
  const prixElement = document.createElement("p");
  prixElement.innerText = `${productLocalstorage.quantity * product.price} €`;
  cart__item__content__description.appendChild(prixElement);

  const cart__item__content__settings = document.createElement("div");
  cart__item__content__settings.classList.add("cart__item__content__settings");
  cart__item__content.appendChild(cart__item__content__settings);

  const cart__item__content__settings__quantity = document.createElement("div");
  cart__item__content__settings__quantity.classList.add(
    "cart__item__content__settings__quantity"
  );
  cart__item__content__settings.appendChild(
    cart__item__content__settings__quantity
  );

  // On crée l'élément "Quantité commandée"
  const qtyLabel = document.createElement("p");
  qtyLabel.innerText = "Qté : ";
  cart__item__content__settings__quantity.appendChild(qtyLabel);

  const qtyOrdered = document.createElement("input");
  qtyOrdered.type = "number";
  qtyOrdered.classList.add("itemQuantity");
  qtyOrdered.name = "itemQuantity";
  qtyOrdered.min = 1;
  qtyOrdered.max = 100;
  qtyOrdered.value = productLocalstorage.quantity;
  cart__item__content__settings__quantity.appendChild(qtyOrdered);

  const cart__item__content__settings__delete = document.createElement("div");
  cart__item__content__settings__delete.classList.add(
    "cart__item__content__settings__delete"
  );
  cart__item__content__settings.appendChild(
    cart__item__content__settings__delete
  );

  // On crée l'élément "Bouton 'Supprimer'"
  const deleteItem = document.createElement("p");
  deleteItem.classList.add("deleteItem");
  deleteItem.innerText = "Supprimer";
  cart__item__content__settings__delete.appendChild(deleteItem);
}
async function main() {
  // Boucle pour vérifier le local storage
  for (let j = 0; j < currentCart.length; j++) {
    await fetch(
      "http://localhost:3000/api/products/" + currentCart[j].idProduit
    )
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          console.log("Mauvaise réponse du réseau");
        }
      })
      .then(function (product) {
        currentCart[j].price = currentCart[j].quantity * product.price;
        affichage(product, currentCart[j]);
        // Fonction de Récupération de l'élément du DOM qui accueillera les fiches

        // Modifier la valeur des input dans le localstorage

        let inputQuantite = document.querySelectorAll(".itemQuantity");

        for (let i = 0; i < inputQuantite.length; i++) {
          console.log(inputQuantite[i]);
          if (inputQuantite[i].value > 100) {
            alert(
              "La quantité maximale d'un produit que vous pouvez commander est 100 unités"
            );
            inputQuantite[i].value = 100;
          }

          inputQuantite[i].addEventListener("change", function () {
            let nouvelleQuantite = parseInt(this.value);
            let closest = this.closest("[data-id][data-color]");
            const id = closest.getAttribute("data-id");
            const color = closest.getAttribute("data-color");
            if (inputQuantite[i].value > 100) {
              alert(
                "La quantité maximale d'un produit que vous pouvez commander est 100 unités"
              );
              inputQuantite[i].value = 100;
            }
            let produitDansLocalStorage = JSON.parse(
              localStorage.getItem("produit")
            );

            for (let i = 0; i < produitDansLocalStorage.length; i++) {
              if (
                produitDansLocalStorage[i].idProduit === id &&
                produitDansLocalStorage[i].couleurProduit === color
              ) {
                produitDansLocalStorage[i].quantiteProduit = nouvelleQuantite;
                localStorage.setItem(
                  "produit",
                  JSON.stringify(produitDansLocalStorage)
                );
                break;
              }
            }
            // calculTotal();
          });
        }

        // Fonction "Supprimer l'article commandé"
        // deleteItem.addEventListener("click", function () {
        //   // handle change
        // });

        // Récapitulatif du Panier (Nbe articles et Prix total)
      });
    // // .then(function () {
    //   calculTotal();
    // });
  }
  calculTotal();
}
function calculTotal() {
  let quantityOrdered = 0;
  console.log("calculTotal");
  let priceOrdered = 0;
  for (let j = 0; j < currentCart.length; j++) {
    quantityOrdered = quantityOrdered + currentCart[j].quantity;
    priceOrdered = priceOrdered + parseInt(currentCart[j].price);
  }

  const totalPrice = document.querySelector("#totalPrice");
  // const pricePanier = document.createElement("span");
  totalPrice.innerText = priceOrdered;
  // totalPrice.appendChild(pricePanier);

  const totalQuantity = document.querySelector("#totalQuantity");
  // const quantityPanier = document.createElement("span");
  totalQuantity.innerText = quantityOrdered;
  // totalQuantity.appendChild(quantityPanier);
}
// Coordonnées du Client

// Bouton "Commander !"
const button = document.querySelector("#order");
button.addEventListener("click", (event) => {
  window.location.href = "confirmation.html";
});
main();
