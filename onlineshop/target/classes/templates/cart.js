const owner = localStorage.getItem('currentUser');
const checkout = document.getElementById("checkout");
checkout.onclick = function(){
    alert('Thank you for your purchase, we will contact you soon');
    window.location.href = "index.html";
}
fetch('http://localhost:8080/cart/get?username=' + owner)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(json => {
    const productIds = json.map(cart => cart.productIds);
    const container = document.createElement("div");

    const fetchPromises = productIds.map(productId => {
      return fetch('http://localhost:8080/product/get?productId=' + productId)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(json => {
          return {
            productId: productId,
            price: json.price,
            imageUrl: json.imageUrl
          };
        });
    });

    Promise.all(fetchPromises)
      .then(products => {
        products.forEach(product => {
          const productIdElement = document.createElement("p");
          const productPriceElement = document.createElement("p");
          const deleteButton = document.createElement("button");
          let image = document.createElement("img");
          image.setAttribute("src", product.imageUrl);
          image.setAttribute("width", "200px");

          productIdElement.innerText = product.productId;
          productPriceElement.innerText = product.price;
          deleteButton.innerText = "Delete";
          deleteButton.addEventListener("click", () => {
            // Handle delete action here
            // You can make a delete request to the server or perform any other desired action
            console.log("Delete button clicked for product: " + product.productId);
          });

          container.appendChild(productIdElement);
          container.appendChild(productPriceElement);
          container.appendChild(image);
          container.appendChild(deleteButton);
        });
        document.body.appendChild(container);
      })
      .catch(error => {
        console.error(error);
        alert('An error occurred while retrieving the cart items. Please try again later.');
      });
  })
  .catch(error => {
    console.error(error);
    alert('An error occurred while retrieving the cart items. Please try again later.');
  });
