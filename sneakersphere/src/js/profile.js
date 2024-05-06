var sellerId = sessionStorage.getItem('sellerId');
var email;
var password;

// Fetch the seller's email
fetch(`http://18.232.147.203:3300/GetSellerEmail/${sellerId}`)
  .then(response => response.json())
  .then(data => {
    console.log('Email:', data[0].email);
    email = data[0].email;

    // Fetch the seller's password
    return fetch(`http://18.232.147.203:3300/GetSellerPass/${sellerId}`);
  })
  .then(response => response.json())
  .then(data => {
    console.log('Password:', data[0].password);
    password = data[0].password;

    // Fetch user data from the server
    return fetch(`http://18.232.147.203:3300/GetSeller/${email}&${password}`);
  })
  .then(response => response.json())
  .then(data => {
    // Use first item in the data array
    const seller = Array.isArray(data) ? data[0] : data;

    // Replace Text Elements using values from the given JSON object
    document.getElementById('username').textContent = seller.userName;
    document.getElementById('first-name').textContent = seller.firstName;
    document.getElementById('last-name').textContent = seller.lastName;
    document.getElementById('bio').textContent = seller.bio;

    document.getElementById('edit-username').textContent = seller.userName;
    document.getElementById('edit-first-name').textContent = seller.firstName;
    document.getElementById('edit-last-name').textContent = seller.lastName;
    document.getElementById('edit-bio').textContent = seller.bio;
    document.getElementById('edit-email').textContent = seller.email;
    document.getElementById('edit-birthday').textContent = seller.birthday;
    document.getElementById('edit-address').textContent = seller.streetAddress;
    document.getElementById('edit-city').textContent = seller.city;
    document.getElementById('edit-number').textContent = seller.phoneNumber;
    document.getElementById('edit-gender').textContent = seller.gender;
    document.getElementById('edit-zip').textContent = seller.zipCode;
    document.getElementById('edit-state').textContent = seller.state;
  })
  .catch(error => {
    console.error('Error:', error);
  });


  document.querySelector("#acc-form").addEventListener("submit", function(e) {
    e.preventDefault();
  });
  document.querySelector("#info-form").addEventListener("submit", function(e) {
    e.preventDefault();
  });

  document.getElementById('refresh-data-btn').addEventListener('click', function() {
    location.reload();
});
// ================== EVENT LISTENERS ==================

// Navigates to Edit Account UI
document.querySelector('.profile-nav-btn').addEventListener('click', function() {
  var profileContainer = document.getElementById('profile-container');
  var editContainer = document.getElementById('edit-container');

  if (profileContainer.style.display === 'none') {
      profileContainer.style.display = 'block';
      editContainer.style.display = 'none';
  } else {
      profileContainer.style.display = 'none';
      editContainer.style.display = 'block';
  }
});

// Navigates to Main Account UI
document.getElementById('back-btn').addEventListener('click', function() {
  var profileContainer = document.getElementById('profile-container');
  var editContainer = document.getElementById('edit-container');

  if (editContainer.style.display === 'none') {
      editContainer.style.display = 'block';
      profileContainer.style.display = 'none';
  } else {
      editContainer.style.display = 'none';
      profileContainer.style.display = 'block';
  }
});

// ================== Image Navigation for Listings ==================

var slideIndex = 0; // Start at first slide
showDivs(slideIndex); // Display first slide

// Increment the slideIndex by n and display the new slide
function plusDivs(n) {
    showDivs(slideIndex += n);
}

// Display the slide at slideIndex and hide all other slides
function showDivs(n) {
    var i;
    var x = document.getElementsByClassName("mySlides"); // Get all slides
    if (n >= x.length) {slideIndex = 0} 
    if (n < 0) {slideIndex = x.length-1} 
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none"; // Hide all slides
    }
    x[slideIndex].style.display = "block"; // Display current slide
}

// ================== Button Navigation for USERNAME ==================
document.querySelector("#edit-username-btn").addEventListener("click", function() {
  document.getElementById("edit-username").style.display = "none";
  document.getElementById("username-border").style.border = "none";
  document.getElementById("edit-username-btn").style.display = "none";

  document.getElementById("username-input").style.display = "inline-block";
  document.getElementById("confirm-username-btn").style.display = "inline-block";
  document.getElementById("exit-username-btn").style.display = "inline-block";
});
document.querySelector("#exit-username-btn").addEventListener("click", function() {
  
  document.getElementById("confirm-username-btn").style.display = "none";
  document.getElementById("exit-username-btn").style.display = "none";
  document.getElementById("username-input").style.display = "none";

  document.getElementById("edit-username-btn").style.display = "inline-block";
  document.getElementById("edit-username").style.display = "inline-block";
  document.getElementById("username-border").style.border = "1.5px solid #3b3b3b";
  
});

document.querySelector("#confirm-username-btn").addEventListener("click", function (e) {
  

  document.getElementById("confirm-username-btn").style.display = "none";
  document.getElementById("exit-username-btn").style.display = "none";
  document.getElementById("username-input").style.display = "none";

  document.getElementById("edit-username-btn").style.display = "inline-block";
  document.getElementById("edit-username").style.display = "inline-block";
  document.getElementById("username-border").style.border = "1.5px solid #3b3b3b";

  // Get the first name from the input field
  var userName = document.getElementById("username-input").value;

  // Send a PUT request to the SetSellerFname API
  fetch(`http://18.232.147.203:3300/SetSellerUsername/${sellerId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userName: userName }),
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch((error) => console.error('Error:', error));
});

// ================== Button Navigation for FIRST NAME ==================
document.querySelector("#edit-first-btn").addEventListener("click", function() {
  document.getElementById("edit-first-btn").style.display = "none";
  document.getElementById("first-border").style.border = "none";
  document.getElementById("edit-first-name").style.display = "none";

  document.getElementById("first-input").style.display = "inline-block";
  document.getElementById("confirm-first-btn").style.display = "inline-block";
  document.getElementById("exit-first-btn").style.display = "inline-block";
});
document.querySelector("#exit-first-btn").addEventListener("click", function() {
  
  document.getElementById("confirm-first-btn").style.display = "none";
  document.getElementById("exit-first-btn").style.display = "none";
  document.getElementById("first-input").style.display = "none";

  document.getElementById("edit-first-btn").style.display = "inline-block";
  document.getElementById("edit-first-name").style.display = "inline-block";
  document.getElementById("first-border").style.border = "1.5px solid #3b3b3b";
});

document.querySelector("#confirm-first-btn").addEventListener("click", function (e) {

  document.getElementById("confirm-first-btn").style.display = "none";
  document.getElementById("exit-first-btn").style.display = "none";
  document.getElementById("first-input").style.display = "none";

  document.getElementById("edit-first-btn").style.display = "inline-block";
  document.getElementById("edit-first-name").style.display = "inline-block";
  document.getElementById("first-border").style.border = "1.5px solid #3b3b3b";

  // Get the first name from the input field
  var firstName = document.getElementById("first-input").value;

  // Send a PUT request to the SetSellerFname API
  fetch(`http://18.232.147.203:3300/SetSellerFname/${sellerId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ firstName: firstName }),
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch((error) => console.error('Error:', error));
});

// ================== Button Navigation for LAST NAME ==================
document.querySelector("#edit-last-btn").addEventListener("click", function() {
  document.getElementById("edit-last-btn").style.display = "none";
  document.getElementById("last-border").style.border = "none";
  document.getElementById("edit-last-name").style.display = "none";

  document.getElementById("last-input").style.display = "inline-block";
  document.getElementById("confirm-last-btn").style.display = "inline-block";
  document.getElementById("exit-last-btn").style.display = "inline-block";
});
document.querySelector("#exit-last-btn").addEventListener("click", function() {
  
  document.getElementById("confirm-last-btn").style.display = "none";
  document.getElementById("exit-last-btn").style.display = "none";
  document.getElementById("last-input").style.display = "none";

  document.getElementById("edit-last-btn").style.display = "inline-block";
  document.getElementById("edit-last-name").style.display = "inline-block";
  document.getElementById("last-border").style.border = "1.5px solid #3b3b3b";
});
document.querySelector("#confirm-last-btn").addEventListener("click", function (e) {
  

  document.getElementById("confirm-last-btn").style.display = "none";
  document.getElementById("exit-last-btn").style.display = "none";
  document.getElementById("last-input").style.display = "none";

  document.getElementById("edit-last-btn").style.display = "inline-block";
  document.getElementById("edit-last-name").style.display = "inline-block";
  document.getElementById("last-border").style.border = "1.5px solid #3b3b3b";

  // Get the first name from the input field
  var lastName = document.getElementById("last-input").value;

  // Send a PUT request to the SetSellerFname API
  fetch(`http://18.232.147.203:3300/SetSellerLname/${sellerId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ lastName: lastName }),
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch((error) => console.error('Error:', error));
});


// ================== Button Navigation for BIO ==================
document.querySelector("#edit-bio-btn").addEventListener("click", function() {
  
  document.getElementById("edit-bio").style.display = "none";
  document.getElementById("bio-border").style.border = "none";
  document.getElementById("edit-bio-btn").style.display = "none";

  document.getElementById("bio-input").style.display = "inline-block";
  document.getElementById("confirm-bio-btn").style.display = "inline-block";
  document.getElementById("exit-bio-btn").style.display = "inline-block";
});

document.querySelector("#exit-bio-btn").addEventListener("click", function() {
  
  document.getElementById("confirm-bio-btn").style.display = "none";
  document.getElementById("exit-bio-btn").style.display = "none";
  document.getElementById("bio-input").style.display = "none";

  document.getElementById("edit-bio-btn").style.display = "inline-block";
  document.getElementById("edit-bio").style.display = "inline-block";
  document.getElementById("bio-border").style.border = "1.5px solid #3b3b3b";
});
document.querySelector("#confirm-bio-btn").addEventListener("click", function (e) {
  

  document.getElementById("confirm-bio-btn").style.display = "none";
  document.getElementById("exit-bio-btn").style.display = "none";
  document.getElementById("bio-input").style.display = "none";

  document.getElementById("edit-bio-btn").style.display = "inline-block";
  document.getElementById("edit-bio").style.display = "inline-block";
  document.getElementById("bio-border").style.border = "1.5px solid #3b3b3b";

  // Get the first name from the input field
  var bio = document.getElementById("bio-input").value;

  // Send a PUT request to the SetSellerFname API
  fetch(`http://18.232.147.203:3300/SetSellerBio/${sellerId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ bio: bio }),
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch((error) => console.error('Error:', error));
});
// ================== Button Navigation for EMAIL ==================
document.querySelector("#edit-email-btn").addEventListener("click", function() {
  document.getElementById("edit-email").style.display = "none";
  document.getElementById("email-border").style.border = "none";
  document.getElementById("edit-email-btn").style.display = "none";

  document.getElementById("email-input").style.display = "inline-block";
  document.getElementById("confirm-email-btn").style.display = "inline-block";
  document.getElementById("exit-email-btn").style.display = "inline-block";
});
document.querySelector("#exit-email-btn").addEventListener("click", function() {
  
  document.getElementById("confirm-email-btn").style.display = "none";
  document.getElementById("exit-email-btn").style.display = "none";
  document.getElementById("email-input").style.display = "none";

  document.getElementById("edit-email-btn").style.display = "inline-block";
  document.getElementById("edit-email").style.display = "inline-block";
  document.getElementById("email-border").style.border = "1.5px solid #3b3b3b";
  
});

document.querySelector("#confirm-email-btn").addEventListener("click", function (e) {
  

  document.getElementById("confirm-email-btn").style.display = "none";
  document.getElementById("exit-email-btn").style.display = "none";
  document.getElementById("email-input").style.display = "none";

  document.getElementById("edit-email-btn").style.display = "inline-block";
  document.getElementById("edit-email").style.display = "inline-block";
  document.getElementById("email-border").style.border = "1.5px solid #3b3b3b";

  // Get the first name from the input field
  var email = document.getElementById("email-input").value;

  // Send a PUT request to the SetSellerFname API
  fetch(`http://18.232.147.203:3300/SetSellerEmail/${sellerId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: email }),
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch((error) => console.error('Error:', error));
});

// ================== Button Navigation for BIRTHDAY ==================
document.querySelector("#edit-birthday-btn").addEventListener("click", function() {
  document.getElementById("edit-birthday").style.display = "none";
  document.getElementById("birthday-border").style.border = "none";
  document.getElementById("edit-birthday-btn").style.display = "none";

  document.getElementById("birthday-input").style.display = "inline-block";
  document.getElementById("confirm-birthday-btn").style.display = "inline-block";
  document.getElementById("exit-birthday-btn").style.display = "inline-block";
});
document.querySelector("#exit-birthday-btn").addEventListener("click", function() {
  
  document.getElementById("confirm-birthday-btn").style.display = "none";
  document.getElementById("exit-birthday-btn").style.display = "none";
  document.getElementById("birthday-input").style.display = "none";

  document.getElementById("edit-birthday-btn").style.display = "inline-block";
  document.getElementById("edit-birthday").style.display = "inline-block";
  document.getElementById("birthday-border").style.border = "1.5px solid #3b3b3b";
  
});

document.querySelector("#confirm-birthday-btn").addEventListener("click", function (e) {
  

  document.getElementById("confirm-birthday-btn").style.display = "none";
  document.getElementById("exit-birthday-btn").style.display = "none";
  document.getElementById("birthday-input").style.display = "none";

  document.getElementById("edit-birthday-btn").style.display = "inline-block";
  document.getElementById("edit-birthday").style.display = "inline-block";
  document.getElementById("birthday-border").style.border = "1.5px solid #3b3b3b";

  // Get the first name from the input field
  var birthday = document.getElementById("birthday-input").value;

  // Send a PUT request to the SetSellerFname API
  fetch(`http://18.232.147.203:3300/SetSellerBDay/${sellerId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ birthday: birthday }),
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch((error) => console.error('Error:', error));
});

// ================== Button Navigation for ADDRESS ==================
document.querySelector("#edit-address-btn").addEventListener("click", function() {
  document.getElementById("edit-address").style.display = "none";
  document.getElementById("address-border").style.border = "none";
  document.getElementById("edit-address-btn").style.display = "none";

  document.getElementById("address-input").style.display = "inline-block";
  document.getElementById("confirm-address-btn").style.display = "inline-block";
  document.getElementById("exit-address-btn").style.display = "inline-block";
});
document.querySelector("#exit-address-btn").addEventListener("click", function() {
  
  document.getElementById("confirm-address-btn").style.display = "none";
  document.getElementById("exit-address-btn").style.display = "none";
  document.getElementById("address-input").style.display = "none";

  document.getElementById("edit-address-btn").style.display = "inline-block";
  document.getElementById("edit-address").style.display = "inline-block";
  document.getElementById("address-border").style.border = "1.5px solid #3b3b3b";
  
});

document.querySelector("#confirm-address-btn").addEventListener("click", function (e) {
  

  document.getElementById("confirm-address-btn").style.display = "none";
  document.getElementById("exit-address-btn").style.display = "none";
  document.getElementById("address-input").style.display = "none";

  document.getElementById("edit-address-btn").style.display = "inline-block";
  document.getElementById("edit-address").style.display = "inline-block";
  document.getElementById("address-border").style.border = "1.5px solid #3b3b3b";

  // Get the first name from the input field
  var address = document.getElementById("address-input").value;

  // Send a PUT request to the SetSellerFname API
  fetch(`http://18.232.147.203:3300/SetSellerAddress/${sellerId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ streetAddress: address }),
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch((error) => console.error('Error:', error));
});

// ================== Button Navigation for CITY ==================
document.querySelector("#edit-city-btn").addEventListener("click", function() {
  document.getElementById("edit-city").style.display = "none";
  document.getElementById("city-border").style.border = "none";
  document.getElementById("edit-city-btn").style.display = "none";

  document.getElementById("city-input").style.display = "inline-block";
  document.getElementById("confirm-city-btn").style.display = "inline-block";
  document.getElementById("exit-city-btn").style.display = "inline-block";
});
document.querySelector("#exit-city-btn").addEventListener("click", function() {
  
  document.getElementById("confirm-city-btn").style.display = "none";
  document.getElementById("exit-city-btn").style.display = "none";
  document.getElementById("city-input").style.display = "none";

  document.getElementById("edit-city-btn").style.display = "inline-block";
  document.getElementById("edit-city").style.display = "inline-block";
  document.getElementById("city-border").style.border = "1.5px solid #3b3b3b";
  
});

document.querySelector("#confirm-city-btn").addEventListener("click", function (e) {
  

  document.getElementById("confirm-city-btn").style.display = "none";
  document.getElementById("exit-city-btn").style.display = "none";
  document.getElementById("city-input").style.display = "none";

  document.getElementById("edit-city-btn").style.display = "inline-block";
  document.getElementById("edit-city").style.display = "inline-block";
  document.getElementById("city-border").style.border = "1.5px solid #3b3b3b";

  // Get the first name from the input field
  var city = document.getElementById("city-input").value;

  // Send a PUT request to the SetSellerFname API
  fetch(`http://18.232.147.203:3300/SetSellerCity/${sellerId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ city: city }),
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch((error) => console.error('Error:', error));
});

// ================== Button Navigation for GENDER ==================
document.querySelector("#edit-gender-btn").addEventListener("click", function() {
  document.getElementById("edit-gender").style.display = "none";
  document.getElementById("gender-border").style.border = "none";
  document.getElementById("edit-gender-btn").style.display = "none";

  document.getElementById("gender-input").style.display = "inline-block";
  document.getElementById("confirm-gender-btn").style.display = "inline-block";
  document.getElementById("exit-gender-btn").style.display = "inline-block";
});
document.querySelector("#exit-gender-btn").addEventListener("click", function() {
  
  document.getElementById("confirm-gender-btn").style.display = "none";
  document.getElementById("exit-gender-btn").style.display = "none";
  document.getElementById("gender-input").style.display = "none";

  document.getElementById("edit-gender-btn").style.display = "inline-block";
  document.getElementById("edit-gender").style.display = "inline-block";
  document.getElementById("gender-border").style.border = "1.5px solid #3b3b3b";
  
});

document.querySelector("#confirm-gender-btn").addEventListener("click", function (e) {
  

  document.getElementById("confirm-gender-btn").style.display = "none";
  document.getElementById("exit-gender-btn").style.display = "none";
  document.getElementById("gender-input").style.display = "none";

  document.getElementById("edit-gender-btn").style.display = "inline-block";
  document.getElementById("edit-gender").style.display = "inline-block";
  document.getElementById("gender-border").style.border = "1.5px solid #3b3b3b";

  // Get the first name from the input field
  var gender = document.getElementById("gender-input").value;

  // Send a PUT request to the SetSellerFname API
  fetch(`http://18.232.147.203:3300/SetSellerGender/${sellerId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ gender: gender }),
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch((error) => console.error('Error:', error));
});
// ================== Button Navigation for ZIP CODE ==================
document.querySelector("#edit-zip-btn").addEventListener("click", function() {
  document.getElementById("edit-zip").style.display = "none";
  document.getElementById("zip-border").style.border = "none";
  document.getElementById("edit-zip-btn").style.display = "none";

  document.getElementById("zip-input").style.display = "inline-block";
  document.getElementById("confirm-zip-btn").style.display = "inline-block";
  document.getElementById("exit-zip-btn").style.display = "inline-block";
});
document.querySelector("#exit-zip-btn").addEventListener("click", function() {
  
  document.getElementById("confirm-zip-btn").style.display = "none";
  document.getElementById("exit-zip-btn").style.display = "none";
  document.getElementById("zip-input").style.display = "none";

  document.getElementById("edit-zip-btn").style.display = "inline-block";
  document.getElementById("edit-zip").style.display = "inline-block";
  document.getElementById("zip-border").style.border = "1.5px solid #3b3b3b";
  
});

document.querySelector("#confirm-zip-btn").addEventListener("click", function (e) {
  

  document.getElementById("confirm-zip-btn").style.display = "none";
  document.getElementById("exit-zip-btn").style.display = "none";
  document.getElementById("zip-input").style.display = "none";

  document.getElementById("edit-zip-btn").style.display = "inline-block";
  document.getElementById("edit-zip").style.display = "inline-block";
  document.getElementById("zip-border").style.border = "1.5px solid #3b3b3b";

  // Get the first name from the input field
  var zipCode = document.getElementById("zip-input").value;

  // Send a PUT request to the SetSellerFname API
  fetch(`http://18.232.147.203:3300/SetSellerZip/${sellerId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ zipCode: zipCode }),
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch((error) => console.error('Error:', error));
});
// ================== Button Navigation for STATE ==================
document.querySelector("#edit-state-btn").addEventListener("click", function() {
  document.getElementById("edit-state").style.display = "none";
  document.getElementById("state-border").style.border = "none";
  document.getElementById("edit-state-btn").style.display = "none";

  document.getElementById("state-input").style.display = "inline-block";
  document.getElementById("confirm-state-btn").style.display = "inline-block";
  document.getElementById("exit-state-btn").style.display = "inline-block";
});
document.querySelector("#exit-state-btn").addEventListener("click", function() {
  
  document.getElementById("confirm-state-btn").style.display = "none";
  document.getElementById("exit-state-btn").style.display = "none";
  document.getElementById("state-input").style.display = "none";

  document.getElementById("edit-state-btn").style.display = "inline-block";
  document.getElementById("edit-state").style.display = "inline-block";
  document.getElementById("state-border").style.border = "1.5px solid #3b3b3b";
  
});

document.querySelector("#confirm-state-btn").addEventListener("click", function (e) {
  

  document.getElementById("confirm-state-btn").style.display = "none";
  document.getElementById("exit-state-btn").style.display = "none";
  document.getElementById("state-input").style.display = "none";

  document.getElementById("edit-state-btn").style.display = "inline-block";
  document.getElementById("edit-state").style.display = "inline-block";
  document.getElementById("state-border").style.border = "1.5px solid #3b3b3b";

  // Get the first name from the input field
  var state = document.getElementById("state-input").value;

  // Send a PUT request to the SetSellerFname API
  fetch(`http://18.232.147.203:3300/SetSellerState/${sellerId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ state: state }),
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch((error) => console.error('Error:', error));
});
// ================== Button Navigation for PHONE NUMBER ==================
document.querySelector("#edit-number-btn").addEventListener("click", function() {
  document.getElementById("edit-number").style.display = "none";
  document.getElementById("number-border").style.border = "none";
  document.getElementById("edit-number-btn").style.display = "none";

  document.getElementById("number-input").style.display = "inline-block";
  document.getElementById("confirm-number-btn").style.display = "inline-block";
  document.getElementById("exit-number-btn").style.display = "inline-block";
});
document.querySelector("#exit-number-btn").addEventListener("click", function() {
  
  document.getElementById("confirm-number-btn").style.display = "none";
  document.getElementById("exit-number-btn").style.display = "none";
  document.getElementById("number-input").style.display = "none";

  document.getElementById("edit-number-btn").style.display = "inline-block";
  document.getElementById("edit-number").style.display = "inline-block";
  document.getElementById("number-border").style.border = "1.5px solid #3b3b3b";
  
});

document.querySelector("#confirm-number-btn").addEventListener("click", function (e) {
  

  document.getElementById("confirm-number-btn").style.display = "none";
  document.getElementById("exit-number-btn").style.display = "none";
  document.getElementById("number-input").style.display = "none";

  document.getElementById("edit-number-btn").style.display = "inline-block";
  document.getElementById("edit-number").style.display = "inline-block";
  document.getElementById("number-border").style.border = "1.5px solid #3b3b3b";

  // Get the first name from the input field
  var phoneNumber = document.getElementById("number-input").value;

  // Send a PUT request to the SetSellerFname API
  fetch(`http://18.232.147.203:3300/SetSellerPhone/${sellerId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ phoneNumber: phoneNumber }),
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch((error) => console.error('Error:', error));
});