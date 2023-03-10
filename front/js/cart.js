// Récupération des données du localstorage
let currentCart = JSON.parse(localStorage.getItem("cart")) || [];
let nouvelleQuantitéDansLocalStorage = JSON.parse(localStorage.getItem("cart"));

// Création de la fonction de calcul Nbe Articles / Prix
function calculTotal() {
  let quantityOrdered = 0;
  let priceOrdered = 0;
  for (let b = 0; b < currentCart.length; b++) {
    console.log(currentCart[b].price);
    console.log(currentCart[b].quantity);
    quantityOrdered = quantityOrdered + parseInt(currentCart[b].quantity);
    priceOrdered =
      priceOrdered +
      parseInt(currentCart[b].price) * parseInt(currentCart[b].quantity);
  }

  const totalQuantity = document.querySelector("#totalQuantity");
  totalQuantity.innerText = quantityOrdered;

  const totalPrice = document.querySelector("#totalPrice");
  totalPrice.innerText = priceOrdered;
  console.log(priceOrdered);
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
        currentCart[c].price = product.price;
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
  prixElement.innerText = `${product.price} €`;
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

    // Lecture du localStorage
    const quantityCart = JSON.parse(localStorage.getItem("cart")) || [];
    console.log(quantity.value);
    console.log(quantityCart);
    quantityCart.quantity = quantity.value;
    quantityCart.idProduit = quantity.idProduit;
    quantityCart.color = quantity.color;
    console.log(quantityCart.idProduit);
    console.log(quantityCart.color);
    console.log(quantityCart.quantity);

    localStorage.setItem("cart", JSON.stringify(quantityCart));
    const currentCart = JSON.parse(localStorage.getItem("cart"));
    console.log(currentCart);
    calculTotal();
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
    articleElement.remove();

    // Supprimer un produit du localStorage
    let filteredArray = [];
    filteredArray = nouvelleQuantitéDansLocalStorage.filter(
      (val) =>
        !(
          val.idProduit == product._id && val.color == productLocalstorage.color
        )
    );

    localStorage.setItem("cart", JSON.stringify(filteredArray));

    // Supprimer le produit du currentcart
    currentCart = JSON.parse(localStorage.getItem("cart"));
    console.log(currentCart);
    calculTotal();
  });

  cart__item__content__settings__delete.appendChild(deleteItem);
}
main();

// Coordonnées du Client
// Création des RegExp pour chaque champ du formulaire et test si les caractères entrés sont valides
const RegExp = /^[a-zA-ZéèêëàâäôöîïùûüçÉÈÊËÀÂÄÔÖÎÏÙÛÜÇ\s-]+$/;
const addRegExp = /^[a-zA-Z0-9éèêëàâäôöîïùûüçÉÈÊËÀÂÄÔÖÎÏÙÛÜÇ,\s-]+$/;
const emailRegExp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// Prénom
let prenom = document.getElementById("firstName");
prenom.addEventListener("blur", function (e) {
  prenom = e.target.value;
  prenomErreur = document.getElementById("firstNameErrorMsg");
  if (prenom.length == 0) {
    prenomErreur.innerText = "Entrez votre prénom...";
  } else {
    if (RegExp.test(prenom) === true) {
      prenomErreur.innerHTML = "";
    } else {
      prenomErreur.innerText = "N'utilisez que des lettres !";
    }
  }
});

// Nom
let nom = document.getElementById("lastName");
nom.addEventListener("blur", function (e) {
  nom = e.target.value;
  nomErreur = document.getElementById("lastNameErrorMsg");
  if (nom.length == 0) {
    nomErreur.innerText = "Entrez votre nom...";
  } else {
    if (RegExp.test(nom) === true) {
      nomErreur.innerHTML = "";
    } else {
      nomErreur.innerText = "N'utilisez que des lettres !";
    }
  }
});

// Adresse
let adresse = document.getElementById("address");
adresse.addEventListener("blur", function (e) {
  adresse = e.target.value;
  adresseErreur = document.getElementById("addressErrorMsg");
  if (adresse.length == 0) {
    adresseErreur.innerText = "Entrez votre adresse...";
  } else {
    if (addRegExp.test(adresse) === true) {
      adresseErreur.innerHTML = "";
    } else {
      adresseErreur.innerHTML = "N'utilisez que des chiffres et des lettres !";
    }
  }
});

// Ville
let ville = document.getElementById("city");
ville.addEventListener("blur", function (e) {
  ville = e.target.value;
  villeErreur = document.getElementById("cityErrorMsg");
  if (ville.length == 0) {
    villeErreur.innerText = "Entrez votre ville...";
  } else {
    if (RegExp.test(ville) === true) {
      villeErreur.innerHTML = "";
    } else {
      villeErreur.innerHTML = "N'utilisez que des lettres !";
    }
  }
});

// Email
let email = document.getElementById("email");
email.addEventListener("blur", function (e) {
  email = e.target.value;
  emailErreur = document.getElementById("emailErrorMsg");
  if (email.length == 0) {
    emailErreur.innerText = "Entrez votre adresse mail...";
  } else {
    if (emailRegExp.test(email) === true) {
      emailErreur.innerHTML = "";
    } else {
      emailErreur.innerHTML = "Adresse mail non valide !";
    }
  }
});

// Crée un objet contact avec les éléments entrés dans le formulaire + Bouton "Commander !"
let commande = document.getElementById("order");
commande.addEventListener("click", (e) => {
  e.preventDefault();
  let contact = new Object();
  contact.firstName = prenom;
  contact.lastName = nom;
  contact.address = adresse;
  contact.city = ville;
  contact.email = email;

  // Récupére et stocke l'id des produits présents dans le panier
  let products = [];
  for (let f = 0; f < currentCart.length; f++) {
    const idProduitDansPanier = currentCart[f].idProduit;

    products.push(idProduitDansPanier);
  }

  const aEnvoyer = {
    products,
    contact,
  };

  // Post dans l'api le formulaire et l'id des produits
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

      // Instruction pour vider le localstorage
      localStorage.clear();

      // Retour de la commande avec son numéro
      window.location.href = "./confirmation.html?orderId=" + contenu.orderId;
    } catch (e) {
      console.log(e);
    }
  });
});
