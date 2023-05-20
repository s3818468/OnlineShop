async function addProduct() {
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
        else{
            displayData1(data)
        }
}