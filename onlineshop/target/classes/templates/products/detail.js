let cartAdd = document.getElementById("cartAdd");
const currentUser = localStorage.getItem('currentUser');
// Function to retrieve and display the selected product details
function getProductDetails() {
  const selectedProduct = sessionStorage.getItem("selectedProduct");

  if (selectedProduct) {
    const product = JSON.parse(selectedProduct);
    document.getElementById("productImage").src = product.imageUrl;
    // Populate the product details in the HTML
    document.getElementById("productTitle").innerText = product.name;
    document.getElementById("productPrice").innerText = "$" + product.price;
    document.getElementById("productDescription").innerText = product.description;
  }
}
const additionalIdentifier = Math.floor(Math.random() * 1000);

cartAdd.onclick = function(){
    const selectedProduct = sessionStorage.getItem("selectedProduct");
    const product = JSON.parse(selectedProduct);
    addToCart(product.name);
}
function addToCart(product) {


  // Fetch request placed inside the callback
  fetch('http://localhost:8080/cart/create', {
    method: "post",
    headers: {
      'Content-Type': 'application/json'
    },

    body: JSON.stringify({ username: currentUser, productIds: product, cartId: additionalIdentifier })
  })
    .then(response => {
      if (response.ok) {
        alert('Item added');
        return response.json();
      } else {
        throw new Error('Server Error');
      }
    })
    .then(json => {
      console.log(json);
      // Additional code for success response if needed
    })
    .catch(error => {
      console.error(error);
      if (error.message === 'Server Error') {
        alert('An error occurred while creating the account. Please try again later.');
      }
    });}


// Get the product details on page load
getProductDetails();

