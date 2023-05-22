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

// Get the product details on page load
getProductDetails();


