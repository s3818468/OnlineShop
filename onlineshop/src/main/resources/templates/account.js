const currentUser = localStorage.getItem('currentUser');
const addressInput = document.querySelector('#address');
const passwordInput = document.querySelector('#password');
const phoneInput = document.querySelector('#phone');
const updateButton = document.querySelector('commitChanges');
let userName = document.getElementById("Username")
userName.innerText = "Username: " + currentUser;
fetch('http://localhost:8080/get?documentId=' + currentUser)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(json => {
        const { name, password, address, phoneid } = json;
        addressInput.value = address;
        passwordInput.value = password;
        phoneInput.value = phoneid;
    })
    .catch(error => {
        // Handle the error here
        console.error('Error:', error);
        alert('Could not find anything. Please try again.');
    });
document.querySelector("#commitChanges").onclick = function () {
         let address = addressInput.value;
         let phone = phoneInput.value;
         let password = passwordInput.value;
         fetch('http://localhost:8080/create', {
                                  method: "post",
                                  headers: {
                                      'Content-Type': 'application/json'
                                  },
                                  body: JSON.stringify({name: currentUser, phoneid: phone, password: password, address:address})
                              })
                              .then(response => {
                                  if (response.ok) {
                                      alert('Account updated successfully!');
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
                                      alert('An error occurred while updating the account. Please try again later.');
                                  }
                              });}
document.querySelector("#goHome").onclick = function () {
    window.location.href = "index.html";

}
document.querySelector("#logOut").onclick = function () {
    window.location.href = "signUp.html";

}
