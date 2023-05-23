const owner = localStorage.getItem('currentUser');
const checkout = document.getElementById("checkout");
let totalPrice = 0;

checkout.onclick = function() {
  alert('Thank you for your purchase, we will contact you soon');
  window.location.href = "index.html";
};

fetch('http://localhost:8080/cart/get?username=' + owner)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return response.json();
    } else {
      throw new Error('Invalid response format');
    }
  })
  .then(json => {
      const cartItems = json; // Assuming the JSON response is an array of cart items
      const container = document.createElement("div");

      const fetchPromises = cartItems.map(cartItem => {
        const productId = cartItem.productIds;
        const cartId = cartItem.cartId; // Retrieve the cartId for each cart item

        return fetch('http://localhost:8080/product/get?productId=' + productId)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
              return response.json();
            } else {
              throw new Error('Invalid response format');
            }
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
          products.forEach((product, index) => {
            const cartItem = cartItems[index]; // Get the corresponding cartItem object

            const productIdElement = document.createElement("p");
            const productPriceElement = document.createElement("p");
            const deleteButton = document.createElement("button");
            let image = document.createElement("img");
            image.setAttribute("src", product.imageUrl);
            image.setAttribute("width", "200px");

            productIdElement.innerText = product.productId;
            productPriceElement.innerText = product.price + "$";
            totalPrice += parseFloat(product.price);
            let total = document.getElementById('total');
            total.innerHTML = totalPrice.toFixed(2) + "$";
            deleteButton.innerText = "Delete";
            deleteButton.addEventListener("click", () => {
              var url = "http://localhost:8080/cart/delete?documentId=" + cartItem.cartId;
              fetch(url, {
                  method: "delete"
                })
                .then(response => {
                  if (!response.ok) {
                    throw new Error('Network response was not ok');
                  }
                  const contentType = response.headers.get('content-type');
                  if (contentType && contentType.includes('application/json')) {
                    return response.json();
                  } else {
                    window.location.href = "cart.html";
                  }
                })
                .then(json => {
                window.location.href = "index.html";
                  console.log(json);
                })
                .catch(error => {
                  console.error(error);

                });
            });

            console.log("Delete button clicked for product: " + product.productId);

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

