// Stores the form by ID into form
let form = document.getElementById('register-form');

// If submit button has been clicked (Within Form)
form.addEventListener('submit', function(e) {
  
  e.preventDefault();

  // Capture form data
  let formData = {
    email: form.elements['register-email'].value,
    userName: form.elements['register-username'].value,
    password: form.elements['register-pwd'].value,
    streetAddress: form.elements['register-address'].value,
    city: form.elements['register-city'].value,
    state: form.elements['register-state'].value,
    zipCode: form.elements['register-zip'].value,
    shoeSize: form.elements['register-shoe-size'].value
  };

  // CreateBuyer API Endpoint used - Creates new buyer object
  fetch('http://18.232.147.203:3300/CreateBuyer/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Hello');
    console.log(data);
    
  })
  .catch((error) => {
    console.error('Error:', error);
  })
  .finally(() => {
    setTimeout(function () {
      // After 1 second - Goes to login page
      window.location.href = 'login.html'; 
    }, 1000);
  });
});