// Récupération de l'id du canapé sélectionné depuis le fichier JS
const idProduitRaw = new URLSearchParams(window.location.search);
const idProduit = idProduitRaw.get("id");

// Fonction fetch => Obternir les données depuis l'API
fetch("http://localhost:3000/api/products/" + idProduit)
  .then(function (response) {
    if (response.ok) {
      return response.json();
    } else {
      console.log("Mauvaise réponse du réseau");
    }
  })
  // Fonction qui affiche les éléments du DOM
  .then(function (product) {
    const imageElement = document.createElement("img");
    imageElement.src = product.imageUrl;
    imageElement.alt = product.altTxt;
    const sectionItem = document.querySelector(".item__img");
    sectionItem.appendChild(imageElement);

    const nameItem = document.querySelector("#title");
    nameItem.innerText = product.name;

    const priceItem = document.querySelector("#price");
    priceItem.innerText = product.price;

    const descriptionItem = document.querySelector("#description");
    descriptionItem.innerText = product.description;

    // Choix des couleurs
    const color = product.colors;
    const colorSelect = document.querySelector("#colors");
    color.forEach((color) => {
      const option = document.createElement("option");
      option.value = color;
      option.textContent = color;
      colorSelect.appendChild(option);
    });

    // AddEventListener pour "Ajouter au panier"
    function addToCart() {
      const button = document.querySelector("#addToCart");
      button.addEventListener("click", (event) => {
        const color = document.querySelector("#colors").value;
        const quantity = document.querySelector("#quantity").value;

        // boucle pour vérifier la sélection d'une couleur et d'une quantité (sinon, on reste sur la page product)
        if (color === "") {
          alert("SVP, choisissez une couleur !");
          return;
        }
        if (quantity < 1 || quantity > 100) {
          alert("Sélectionnez une quantité comprise entre 1 et 100...");
          return;
        }
        // Lecture du localStorage
        const currentCart = JSON.parse(localStorage.getItem("cart")) || [];

        const cart = {
          idProduit: idProduit,
          color: color,
          quantity: Number(quantity),
        };

        // Vérification du contenu du localstorage
        if (currentCart.length === 0) {
          console.log("Le localstorage est vide");
          currentCart.push(cart);
          localStorage.setItem("cart", JSON.stringify(currentCart));
        } else {
          console.log("Le localstorage n'est pas vide");
          const findProduct = currentCart.find(
            (product) =>
              product.idProduit === idProduit && product.color === color
          );
          if (findProduct) {
            findProduct.quantity += Number(quantity);
            localStorage.setItem("cart", JSON.stringify(currentCart));
            console.log("j'ajoute x canapé à la liste");
          } else {
            currentCart.push(cart);
            localStorage.setItem("cart", JSON.stringify(currentCart));
            console.log("j'ajoute une nouvelle ligne");
          }
        }
        window.location.href = "cart.html";
      });
    }

    // Exécution de la fonction "addToCart"
    addToCart();
  })
  .catch(function (error) {
    console.log(
      "Il y a eu un problème avec l'opération fetch : " + error.message
    );
  });
