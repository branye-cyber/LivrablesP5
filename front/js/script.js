// Récupération des canapés depuis le fichier JS

fetch(`http://localhost:3000/api/products`)
  .then(function (response) {
    if (response.ok) {
      return response.json();
    } else {
      console.log("Mauvaise réponse du réseau");
    }
  })
  .then(function (products) {
    for (let i = 0; i < products.length; i++) {
      // Récupération de l'élément du DOM qui accueillera les fiches
      const sectionItems = document.querySelector(".items");
      // Création d’une balise dédiée à un canapé
      const urlElement = document.createElement("a");
      urlElement.href = "./product.html?id=" + products[i]._id;
      // Création d’une balise dédiée à un canapé
      const pieceElement = document.createElement("article");
      // On crée l’élément img.
      const imageElement = document.createElement("img");
      // On accède à l’indice i de la liste pieces pour configurer la source de l’image.
      imageElement.src = products[i].imageUrl;
      // Idem pour le nom, le prix la description et le texte alternatif...
      const nomElement = document.createElement("h3");
      nomElement.innerText = products[i].name;
      const prixElement = document.createElement("price");
      prixElement.innerText = `Prix : ${products[i].price} €`;
      const descriptionElement = document.createElement("p");
      descriptionElement.innerText = products[i].description;
      const altTxtElement = document.createElement("p");
      altTxtElement.innerText = products[i].altTxt;
      const idElement = document.createElement("p");
      idElement.innerText = products[i]._id;

      // On rattache la balise article à la section Items
      sectionItems.appendChild(urlElement);

      // On rattache l'url à pieceElement (la balise article)
      urlElement.appendChild(pieceElement);
      //a href="./product.html?id=42"

      // On rattache l’image à pieceElement (la balise article)
      pieceElement.appendChild(imageElement);
      // Idem pour le nom, le prix la description et le texte alternatif...
      pieceElement.appendChild(nomElement);
      pieceElement.appendChild(prixElement);
      pieceElement.appendChild(descriptionElement);
    }
  })
  .catch(function (error) {
    console.log(
      "Il y a eu un problème avec l'opération fetch : " + error.message
    );
  });
