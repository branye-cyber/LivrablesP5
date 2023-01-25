// Récupération des canapés depuis le fichier JS

fetch("http://localhost:3000/api/products")
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

      const urlElement = document.createElement("a");
      urlElement.href = "./product.html?id=" + products[i]._id;
      sectionItems.appendChild(urlElement);

      // On crée la balise "article".
      const pieceElement = document.createElement("article");
      urlElement.appendChild(pieceElement);

      // On crée l’élément "img".
      const imageElement = document.createElement("img");
      // On accède à l’indice i de la liste pieces pour configurer la source de l’image.
      imageElement.src = products[i].imageUrl;
      pieceElement.appendChild(imageElement);

      // Idem pour le nom, le prix la description et le texte alternatif...
      const nomElement = document.createElement("h3");
      nomElement.innerText = products[i].name;
      pieceElement.appendChild(nomElement);

      const prixElement = document.createElement("price");
      prixElement.innerText = `Prix : ${products[i].price} €`;
      pieceElement.appendChild(prixElement);

      const descriptionElement = document.createElement("p");
      descriptionElement.innerText = products[i].description;
      pieceElement.appendChild(descriptionElement);

      const altTxtElement = document.createElement("p");
      altTxtElement.innerText = products[i].altTxt;

      const idElement = document.createElement("p");
      idElement.innerText = products[i]._id;
    }
  })
  .catch(function (error) {
    console.log(
      "Il y a eu un problème avec l'opération fetch : " + error.message
    );
  });
