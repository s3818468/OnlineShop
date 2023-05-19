
let signupBtn = document.getElementById("signupBtn");
let signinBtn = document.getElementById("signinBtn");
let nameField = document.getElementById("nameField");
let btnSignup = document.getElementById("btnSignup")
let btnLogin = document.getElementById("btnLogin");
let title = document.getElementById("title")


signinBtn.onclick = function(){
    nameField.style.maxHeight = "0";
    title.innerText = "Sign In";
    signupBtn.classList.add("disable");
    signinBtn.classList.remove("disable");
    btnLogin.style.visibility = "visible";
    btnSignup.style.visibility = "hidden";

}


signupBtn.onclick = function(){
    nameField.style.maxHeight = "60px";
    title.innerText = "Sign Up";
    signupBtn.classList.remove("disable");
    signinBtn.classList.add("disable");
     btnSignup.style.visibility = "visible";
     btnLogin.style.visibility = "hidden";

}
 document.querySelector("#btnSignup").onclick = function () {


       let name = document.querySelector('#name').value
       let email = document.querySelector('#email').value
       let password = document.querySelector('#password').value

       fetch('http://localhost:8080/create', {
           method: "post",
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify({name: name, email: email,password: password})
       })
       .then(response => response.json())
              .then(json => {
                 console.log(json);

              })

   }
 document.querySelector("#btnLogin").onclick = function () {
     let name = document.querySelector('#name').value
     let password = document.querySelector('#password').value
     fetch('http://localhost:8080/get?documentId=${name}', {
         method: "GET",
         headers: {
             'Content-Type': 'application/json'
         }
     })
     .then(response => response.json())
     .then(data => {
         // Assuming the response data is an array of objects representing user records

         // Iterate over each user in the data array
         data.forEach(user => {
             // Extract the username and password properties
             const username = user.username;
             const password = user.password;

             // Perform actions with the username and password
             console.log("Username:", username);
             console.log("Password:", password);
         });
     })
     .catch(error => {
         console.error(error);

     });
 };

