
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
           body: JSON.stringify({name: name, address: email,password: password})
       })
       .then(response => response.json())
              .then(json => {
                 console.log(json);

              })

   }
document.querySelector("#btnLogin").onclick = function () {
    let name = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;

    fetch('http://localhost:8080/get?documentId=' + name)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(json => {
             const { username, password } = json;

                        if (password == password) {
                            // Password matches
                            title.innerText = username;
                        } else {
                            // Password doesn't match
                            alert('Invalid credentials. Please try again.');
                        }
        })
        .catch(error => {
            // Handle the error here
            console.error('Error:', error);
            alert('Could not find anything. Please try again.');
        });
};




