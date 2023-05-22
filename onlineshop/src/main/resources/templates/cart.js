const owner = localStorage.getItem('currentUser');

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

    productIds.forEach(productId => {
      const productIdElement = document.createElement("p");
      productIdElement.innerText = productId;
      container.appendChild(productIdElement);
    });

    document.body.appendChild(container); // Append the container to the body or another desired location in the DOM
  })
  .catch(error => {
    console.error(error);
    if (error.message === 'Server Error') {
      alert('An error occurred while retrieving the cart items. Please try again later.');
    }
  });
