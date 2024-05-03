// Get the form element
let form = document.getElementById('register-form');

form.addEventListener('submit', function(e) {
  // Prevent the default form submission behavior
  e.preventDefault();

  // Capture the form data
  let formData = {
    email: form.elements['register-email'].value,
    username: form.elements['register-username'].value,
    password: form.elements['register-pwd'].value,
    firstName: form.elements['register-first-name'].value,
    lastName: form.elements['register-last-name'].value,
    address: form.elements['register-address'].value,
    city: form.elements['register-city'].value,
    zip: form.elements['register-zip'].value,
    state: form.elements['register-state'].value,
    phone: form.elements['register-phone'].value,
    birthday: form.elements['register-birthday'].value
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
  .catch((error) => {
    console.error('Error:', error);
  });
});