
let signupBtn = document.getElementById("signupBtn");
let signinBtn = document.getElementById("signinBtn");
let phoneField = document.getElementById("phoneField");
let btnSignup = document.getElementById("btnSignup")
let btnLogin = document.getElementById("btnLogin");
let title = document.getElementById("title")


signinBtn.onclick = function(){
    phoneField.style.maxHeight = "0";
    title.innerText = "Sign In";
    signupBtn.classList.add("disable");
    signinBtn.classList.remove("disable");
    btnLogin.style.visibility = "visible";
    btnSignup.style.visibility = "hidden";

}


signupBtn.onclick = function(){
    phoneField.style.maxHeight = "60px";
    title.innerText = "Sign Up";
    signupBtn.classList.remove("disable");
    signinBtn.classList.add("disable");
     btnSignup.style.visibility = "visible";
     btnLogin.style.visibility = "hidden";

}
document.querySelector("#btnSignup").onclick = function () {
    let name = document.querySelector('#name').value;
    let phone = document.querySelector('#phone').value;
    let password = document.querySelector('#password').value;
     fetch('http://localhost:8080/get?documentId=' + name)
             .then(response => {
                 if (!response.ok) {
                     throw new Error('Network response was not ok');
                 }
                 return response.json();
             })
             .then(json => {
                 alert('username already taken')
             })
             .catch(error => {
                 fetch('http://localhost:8080/create', {
                         method: "post",
                         headers: {
                             'Content-Type': 'application/json'
                         },
                         body: JSON.stringify({name: name, phoneid: phone, password: password})
                     })
                     .then(response => {
                         if (response.ok) {
                             alert('Account created successfully!');
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
                     });

             });

};
document.querySelector("#btnLogin").onclick = function () {
    let name = document.querySelector('#name').value;
    let passwordd = document.querySelector('#password').value;

    fetch('http://localhost:8080/get?documentId=' + name)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(json => {
             const { name, password } = json;

                        if (password === passwordd) {
                            // Password matches

                            localStorage.setItem('login-state', 1);
                            localStorage.setItem('currentUser', name);
                            window.location.href = "index.html";
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





