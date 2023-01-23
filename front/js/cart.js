// fonction pour récupérer les données de l'APi
async function getProductById(product) {
  const response = await fetch("http://localhost:3000/api/products/" + id);
  return await response.json();
}
console.log(product);

// Récupération des données du localstorage
const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
console.log(currentCart);
function browseLocalStorage() {
  currentCart.forEach(async (item) => {
    const product = await getProductById(item.idProduit);
    basketProduct(product, item.color, item.quantity, product.price);
    priceTotal(product);
  });
}
console.log(idProduit);

// Instruction pour vider le localstorage
// localStorage.clear();
console.log("Je suis tout en bas de la page 'Panier'");
