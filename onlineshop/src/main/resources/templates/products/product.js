async function viewAllProduct(){
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
}