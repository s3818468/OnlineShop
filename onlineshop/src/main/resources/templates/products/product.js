let cartAdd = document.getElementById("cartAdd");
let currentPage = 1;
const productsPerPage = 8;
const products = []; // Array to store all the products

async function viewAllProduct() {
  fetch("http://localhost:8080/product/getAll")
    .then((response) => response.json())
    .then((data) => {
      products.push(...data); // Add fetched products to the array
      displayAll();
      displayPagination();
    });
}

viewAllProduct();

function displayAll() {
  const parentElement = document.querySelector("#parent");
  parentElement.innerHTML = "";

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  let row;
  currentProducts.forEach(function (el, index) {
    if (index % 4 === 0) {
      row = document.createElement("div");
      row.classList.add("row");
      parentElement.append(row);
    }

    // create product elements for each product in currentProducts
    // ...
    let div = document.createElement("div");
    div.setAttribute("class", "col-3");
    div.addEventListener("click", function () {
      viewProductDetails(el);
    });

    let image = document.createElement("img");
    image.setAttribute("src", el.imageUrl);
    image.setAttribute("width", "200px");

    let name = document.createElement("h3");
    name.innerText = el.name;
    name.setAttribute("class", "name");

    let price = document.createElement("p");
    price.innerText = "$" + el.price;
    price.setAttribute("class", "price");

    let btn = document.createElement("button");
    btn.innerText = "Add to Cart";
    btn.setAttribute("class", "add_to_cart");
    btn.addEventListener("click", function () {
      btn.disabled = true;
      btn.innerText = "Go to Cart";
      addToCart(el);
    });

    div.append(image, name, price, btn);

    row.append(div);
  });
}

function displayPagination() {
  const totalPages = Math.ceil(products.length / productsPerPage);
  const paginationElement = document.querySelector("#pagination");
  paginationElement.innerHTML = "";

  const paginationWrapper = document.createElement("div");
  paginationWrapper.classList.add("pagination-wrapper");

  for (let i = 1; i <= totalPages; i++) {
    const pageLink = document.createElement("a");
    pageLink.href = "#";
    pageLink.innerText = i;

    if (i === currentPage) {
      pageLink.classList.add("active");
    }

    pageLink.addEventListener("click", function () {
      currentPage = i;
      displayAll();
      updatePaginationDisplay();
    });
    paginationWrapper.append(pageLink);
  }
  paginationElement.append(paginationWrapper);
}

function updatePaginationDisplay() {
  const paginationLinks = document.querySelectorAll("#pagination a");
  paginationLinks.forEach((link) => {
    if (parseInt(link.innerText) === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

function viewProductDetails(product) {
  // Store the product details in session storage
  sessionStorage.setItem("selectedProduct", JSON.stringify(product));

  // Redirect to the product detail page
  window.location.href = "detail.html";
}
cartAdd.onclick = function () {
  const selectedProduct = sessionStorage.getItem("selectedProduct");
  const product = JSON.parse(selectedProduct);
  addToCart(product.name);
};
function addToCart(product) {
  // Fetch request placed inside the callback
  fetch("http://localhost:8080/cart/create", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      username: currentUser,
      productIds: product,
      cartId: additionalIdentifier,
    }),
  })
    .then((response) => {
      if (response.ok) {
        alert("Item added");
        return response.json();
      } else {
        throw new Error("Server Error");
      }
    })
    .then((json) => {
      console.log(json);
      // Additional code for success response if needed
    })
    .catch((error) => {
      console.error(error);
      if (error.message === "Server Error") {
        alert(
          "An error occurred while creating the account. Please try again later."
        );
      }
    });
}
