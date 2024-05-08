// Get the form element
let form = document.getElementById('register-form');

form.addEventListener('submit', function (e) {
  // Prevent the default form submission behavior
  e.preventDefault();

  // Capture the form data
  let formData = {
    email: form.elements['register-email'].value,
    userName: form.elements['register-username'].value,
    password: form.elements['register-pwd'].value,
    firstName: form.elements['register-first-name'].value,
    lastName: form.elements['register-last-name'].value,
    streetAddress: form.elements['register-address'].value,
    city: form.elements['register-city'].value,
    state: form.elements['register-state'].value,
    zipCode: form.elements['register-zip'].value,
    phoneNumber: form.elements['register-phone'].value,
    birthday: form.elements['register-birthday'].value,
    gender: form.elements['register-gender'].value,
    profileImage: "../assets/images/profilepic.png"
  };

  // Sends a POST request
  fetch('http://18.232.147.203:3300/CreateSeller/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(response => response.json())
    .then(data => {

      console.log(data);
    })
    .finally(() => {
      setTimeout(function () {
        window.location.href = 'profile.html'; // Redirect to 'profile.html' after 5 seconds
      }, 5000);
    });
});