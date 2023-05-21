/*async function addProduct() {
    let product_data = {
    name: document.getElementByID("name").value,
    description: document.getElementByID("desc").value,
    imageUrl: document.getElementByID("url").value,
    price: document.getElementByID("price").value,
    discount: document.getElementByID("disc").value,
    owner: "frontend"
    }

    product_data = JSON.stringify(product_data)
    let api_link = 'http://localhost:8080/product/create'

    let response=await fetch(api_link,{
            method:"POST",
            body:product_data,
            headers:{
                'Content-Type':'application/json'
            }
        })
        let data=await response.json()

        if(data.message!=null){
            alert(data.message);
        }

}*/
let btnAddProduct = document.getElementById("btnAddProduct");

btnAddProduct.onclick = function() {
    let api_link='http://localhost:8080/product/create'
    let product_data={
        "name": document.getElementById("name").value,
        "description": document.getElementById("desc").value,
        "imageUrl": document.getElementById("url").value,
        "price": document.getElementById("price").value,
        "discount": document.getElementById("disc").value,
        "owner": "frontend1"
    }
    product_data = JSON.stringify(product_data)
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
             alert('An error occurred while creating the account. Please try again later.');
         }
    })
}
