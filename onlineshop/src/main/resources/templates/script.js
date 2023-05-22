
const MenuItems = document.getElementById("MenuItems");
MenuItems.style.maxHeight = "0px";
function menutoggle(){
    console.log("pressed");
    if(MenuItems.style.maxHeight == "0px"){
        MenuItems.style.maxHeight = "200px";
    }
    else{
        MenuItems.style.maxHeight = "0px";
    }
}

let currentPage = 1;
const productsPerPage = 12;
const products = []; // Array to store all the products

async function viewAllProduct() {
  fetch('http://localhost:8080/product/getAll')
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
    let div=document.createElement("div")
    div.setAttribute("class","col-3")
    div.addEventListener("click", function () {
      viewProductDetails(el);
    });

    let image =document.createElement("img")
    image.setAttribute("src",el.imageUrl)
    image.setAttribute("width", "200px")


    let name=document.createElement("h3")
    name.innerText=el.name;
    name.setAttribute("class","name")

    let price=document.createElement("p")
    price.innerText="$"+el.price
    price.setAttribute("class","price")

    div.append(image,name,price)

    row.append(div);
  });
}


function viewProductDetails(product) {
  // Store the product details in session storage
  sessionStorage.setItem("selectedProduct", JSON.stringify(product));

  // Redirect to the product detail page
  window.location.href = "./products/detail.html";
}
