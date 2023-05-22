/*async function viewAllProduct(){
    fetch('http://localhost:8080/product/getAll')
    .then((response) => response.json())
    .then((data) => displayAll(data));
}

viewAllProduct()

function displayAll(mensData){
    document.querySelector("#parent").innerHTML="";
    mensData.forEach(function(el){

    let div=document.createElement("div")
    div.setAttribute("class","product")

    let image =document.createElement("img")
    image.setAttribute("src",el.imageUrl)
    image.setAttribute("class","image")

    let name=document.createElement("h3")
    name.innerText=el.name;
    name.setAttribute("class","name")

    let desc=document.createElement("p")
    desc.innerText=el.description;
    desc.setAttribute("class","desc")

    let price=document.createElement("p")
    price.innerText="$"+el.price
    price.setAttribute("class","price")

    let btn=document.createElement("button")
    btn.innerText="Add to Cart"
    btn.setAttribute("class","add_to_cart")
    btn.addEventListener("click",function(){
      btn.disabled=true
      btn.innerText="Go to Cart"
          addToCart(el)
        })

    div.append(image,name,desc,price,btn)
    document.querySelector("#parent").append(div)

})
}*/
let currentPage = 1;
const productsPerPage = 4;
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
    div.setAttribute("class","product")

    let image =document.createElement("img")
    image.setAttribute("src",el.imageUrl)
    image.setAttribute("class","image")

    let name=document.createElement("h3")
    name.innerText=el.name;
    name.setAttribute("class","name")

    let desc=document.createElement("p")
    desc.innerText=el.description;
    desc.setAttribute("class","desc")

    let price=document.createElement("p")
    price.innerText="$"+el.price
    price.setAttribute("class","price")

    let btn1=document.createElement("button")
    btn1.innerText="Add to Cart"
    btn1.setAttribute("class","add_to_cart")
    btn1.addEventListener("click",function(){
      btn1.disabled=true
      btn1.innerText="Go to Cart"
          addToCart(el)
        })
    let btn = document.createElement("button");
        btn.innerText = "Details";
        btn.setAttribute("class", "details");
        btn.addEventListener("click", function () {
          viewProductDetails(el);
        });
    div.append(image,name,desc,price,btn1,btn)

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
