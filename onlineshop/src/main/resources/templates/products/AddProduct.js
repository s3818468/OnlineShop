/*let user= localStorage.getItem("currentUser")
    if(user==null){
        alert("please login")
    window.location.href="SignUp.html"
    }*/
const owner = localStorage.getItem('currentUser');
let btnAddProduct = document.getElementById("btnAddProduct");
let name = document.getElementById("name");
let description= document.getElementById("desc");
let imageUrl= document.getElementById("url");
let price= document.getElementById("price");
let disc= document.getElementById("disc");
btnAddProduct.onclick = function() {
    let api_link='http://localhost:8080/product/create'
    let product_data={
        "name": document.getElementById("name").value,
        "description": document.getElementById("desc").value,
        "imageUrl": document.getElementById("url").value,
        "price": document.getElementById("price").value,
        "owner": owner,
        "discount": document.getElementById("disc").value
    }
    product_data = JSON.stringify(product_data)
    if (name.value === '' || description.value === '' || imageUrl.value === '' || price.value === '' || disc === '') {
        alert("Fill in everything, please.");}

    else{
     fetch('http://localhost:8080/product/get?productId=' + name.value)
                 .then(response => {
                     if (!response.ok) {
                         throw new Error('Network response was not ok');
                     }
                     return response.json();
                 })
                 .then(json => {
                     alert('productId already taken')
                 })
                 .catch(error => {
    fetch(api_link,{
        method:"post",
        headers: {
            'Content-Type': 'application/json'
        },
        body: product_data
    }
    )
    .then(response => {
         if (response.ok) {
             alert('Product created successfully!');
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
             alert('An error occurred while creating the product. Please try again later.');
         }
    })
    })
}
}