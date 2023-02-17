// Récupération des données du localstorage
const currentCart = JSON.parse(localStorage.getItem("cart")) || [];

// Création de la fonction de calcul Nbe Articles / Prix
function calculTotal() {
  let quantityOrdered = 0;
  let priceOrdered = 0;
  for (let b = 0; b < currentCart.length; b++) {
    quantityOrdered = quantityOrdered + parseInt(currentCart[b].quantity);
    priceOrdered = priceOrdered + parseInt(currentCart[b].price);
  }

  const totalQuantity = document.querySelector("#totalQuantity");
  totalQuantity.innerText = quantityOrdered;

  const totalPrice = document.querySelector("#totalPrice");
  totalPrice.innerText = priceOrdered;
}

// Fonction principale
async function main() {
  // Boucle pour vérifier le local storage
  for (let c = 0; c < currentCart.length; c++) {
    await fetch(
      "http://localhost:3000/api/products/" + currentCart[c].idProduit
    )
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          console.log("Mauvaise réponse du réseau");
        }
      })
      .then(function (product) {
        currentCart[c].price = currentCart[c].quantity * product.price;
        affichage(product, currentCart[c]);
      });
  }
  calculTotal();
}

// Création de la fonction d'affichage des données
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
  let quantity = document.createElement("input");
  quantity.type = "number";
  quantity.classList.add("itemQuantity");
  quantity.name = "itemQuantity";
  quantity.min = 1;
  quantity.max = 100;
  quantity.value = productLocalstorage.quantity;
  quantity.addEventListener("change", function (event) {
    // On crée la possibilité de modifier la quantité commandée
    if (event.target.value > 100) {
      alert(
        "La quantité maximale que vous pouvez commander de chaque produit est 100 unités"
      );
      event.target.value = 1;
    }
    let nouvelleQuantitéDansLocalStorage = JSON.parse(
      localStorage.getItem("cart")
    );

    for (let d = 0; d < nouvelleQuantitéDansLocalStorage.length; d++) {
      if (
        nouvelleQuantitéDansLocalStorage[d].idProduit ===
          productLocalstorage.idProduit &&
        nouvelleQuantitéDansLocalStorage[d].color === productLocalstorage.color
      ) {
        nouvelleQuantitéDansLocalStorage[d].quantity = event.target.value;
        localStorage.setItem(
          "cart",
          JSON.stringify(nouvelleQuantitéDansLocalStorage)
        );
        break;
      }
    }
    quantity = event.target.value;

    const currentCart = JSON.parse(localStorage.getItem("cart"));
    let quantityOrdered = 0;
    let priceOrdered = 0;
    for (let e = 0; e < currentCart.length; e++) {
      quantityOrdered = quantityOrdered + parseInt(currentCart[e].quantity);
      priceOrdered = priceOrdered + currentCart[e].quantity * product.price;
    }

    const totalQuantity = document.querySelector("#totalQuantity");
    totalQuantity.innerText = quantityOrdered;

    const totalPrice = document.querySelector("#totalPrice");
    totalPrice.innerText = priceOrdered;
  });

  cart__item__content__settings__quantity.appendChild(quantity);

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

  deleteItem.addEventListener("click", function (e) {
    console.log("Je veux supprimer cet article... mais comment faire ?");
  });
  cart__item__content__settings__delete.appendChild(deleteItem);
}
main();

// Coordonnées du Client
// Création des RegExp pour chaque champ du formulaire et test si les caractères entrés sont valides
const RegExp = /^[a-zA-ZéèêëàâäôöîïùûüçÉÈÊËÀÂÄÔÖÎÏÙÛÜÇ\s-]+$/;
const addRegExp = /^[a-zA-Z0-9éèêëàâäôöîïùûüçÉÈÊËÀÂÄÔÖÎÏÙÛÜÇ\s-]+$/;
const emailRegExp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// Prénom
let prenom = document.getElementById("firstName");
prenom.addEventListener("change", function (e) {
  prenom = e.target.value;
  prenomErreur = document.getElementById("firstNameErrorMsg");
  if (RegExp.test(prenom) === true) {
    prenomErreur.innerHTML = "";
  } else {
    prenomErreur.innerText = "N'utilisez que des lettres !";
  }
});

// Nom
let nom = document.getElementById("lastName");
nom.addEventListener("change", function (e) {
  nom = e.target.value;
  nomErreur = document.getElementById("lastNameErrorMsg");
  if (RegExp.test(nom) === true) {
    nomErreur.innerHTML = "";
  } else {
    nomErreur.innerText = "N'utilisez que des lettres !";
  }
});

// Adresse
let adresse = document.getElementById("address");
adresse.addEventListener("change", function (e) {
  adresse = e.target.value;
  adresseErreur = document.getElementById("addressErrorMsg");
  if (addRegExp.test(adresse) === true) {
    adresseErreur.innerHTML = "";
  } else {
    adresseErreur.innerHTML = "N'utilisez que des chiffres et des lettres !";
  }
});

// Ville
let ville = document.getElementById("city");
ville.addEventListener("change", function (e) {
  ville = e.target.value;
  villeErreur = document.getElementById("cityErrorMsg");
  if (RegExp.test(ville) === true) {
    villeErreur.innerHTML = "";
  } else {
    villeErreur.innerHTML = "N'utilisez que des lettres !";
  }
});

// Email
let email = document.getElementById("email");
email.addEventListener("change", function (e) {
  email = e.target.value;
  emailErreur = document.getElementById("emailErrorMsg");
  if (emailRegExp.test(email) === true) {
    emailErreur.innerHTML = "";
  } else {
    emailErreur.innerHTML = "Adresse mail non valide !";
  }
});

// Crée un objet contact avec les éléments entrés dans le formulaire + Bouton "Commander !"
let commande = document.getElementById("order");
commande.addEventListener("click", (e) => {
  e.preventDefault();
  let contact = new Object();
  contact.firstName = prenom;
  contact.lastName = nom;
  contact.adress = adresse;
  contact.city = ville;
  contact.email = email;
  console.log(contact);

  const articleDansPanier = document.querySelectorAll(".cart__item");
  console.log(articleDansPanier);

  // Récupére et stocke l'id des produits présents dans le panier

  let products = [];

  for (let f = 0; f < articleDansPanier.length; f++) {
    const idProduitDansPanier = articleDansPanier[f]; //.getAttribute("data-id");

    products.push(idProduitDansPanier);
    console.log(products);
  }

  const aEnvoyer = {
    products,
    contact,
  };

  // Post dans l'api le formulaire et l'id des produits

  console.log(aEnvoyer);
  let envoyerCommande = fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    body: JSON.stringify(aEnvoyer),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  // Redirige vers la page confirmation avec l'order Id retourné par l'api

  envoyerCommande.then(async (response) => {
    try {
      const contenu = await response.json();
      console.log(contenu);
      console.log(contenu.orderId);
      // window.location.href = "./confirmation.html?orderId=" + contenu.orderId;
    } catch (e) {
      console.log(e);
    }
  });
});
