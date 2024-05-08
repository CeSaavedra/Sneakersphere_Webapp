// Get the current URL
let url = new URL(window.location.href);
document.getElementById("nav-edit-container").style.display = "none";

var buyerId = sessionStorage.getItem('buyerId');
console.log(buyerId);
var sellerId = sessionStorage.getItem('sellerId');

// Use URLSearchParams interface to work with the query string
let params = new URLSearchParams(url.search);

// Get the sellerid from the query string
let targetSellerId = params.get('sellerid');

console.log("Session ID:" + sellerId);
console.log("Target ID:" + targetSellerId);

if (sellerId !== null) {

  document.getElementById("profilepic-link").style.display = "block";
  document.getElementById("logout-link").style.display = "inline-block";
  document.getElementById("login-link").style.display = "none";

  fetch(`http://18.232.147.203:3300/GetSellerProfileImage/${sellerId}`)
    .then(response => response.json())
    .then(data => {
      // Update the src attribute of the img tag
      document.getElementById('navbar-profilepic').src = data[0].profileImage;
    })
    .catch(error => console.error('Error:', error));
}

if (targetSellerId !== null && targetSellerId !== sellerId) {
  console.log('1');
  // Fetch the seller's data from each endpoint
  Promise.all([
    fetch(`http://18.232.147.203:3300/GetSellerUsername/${targetSellerId}`).then(response => response.json()),
    fetch(`http://18.232.147.203:3300/GetSellerFname/${targetSellerId}`).then(response => response.json()),
    fetch(`http://18.232.147.203:3300/GetSellerLname/${targetSellerId}`).then(response => response.json()),
    fetch(`http://18.232.147.203:3300/GetSellerBio/${targetSellerId}`).then(response => response.json()),
    fetch(`http://18.232.147.203:3300/GetSellerProfileImage/${targetSellerId}`).then(response => response.json())
  ])
    .then(([usernameData, firstNameData, lastNameData, bioData, profileImageData]) => {
      let obj = {
        userName: usernameData[0].userName,
        firstName: firstNameData[0].firstName,
        lastName: lastNameData[0].lastName,
        bio: bioData[0].bio,
        profileImage: profileImageData[0].profileImage
      };
      document.getElementById('username').textContent = obj.userName;
      document.getElementById('first-name').textContent = obj.firstName;
      document.getElementById('last-name').textContent = obj.lastName;
      document.getElementById('bio').textContent = obj.bio;
      document.getElementById('profilepic').src = obj.profileImage;
    });
} else {
  console.log('2');
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

      document.getElementById("nav-edit-container").style.display = "block";

      // Fetch the seller's profile image
      return fetch(`http://18.232.147.203:3300/GetSellerProfileImage/${sellerId}`);
    })
    .then(response => response.json())
    .then(data => {
      document.getElementById('profilepic').src = data[0].profileImage;
      document.getElementById('preview-image').src = data[0].profileImage;
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

document.querySelector("#acc-form").addEventListener("submit", function (e) {
  e.preventDefault();
});
document.querySelector("#info-form").addEventListener("submit", function (e) {
  e.preventDefault();
});

// ================== EVENT LISTENERS ==================


var inputImage = document.getElementById('input-image');
var submitImage = document.getElementById('submit-image');
var previewImage = document.getElementById('preview-image');

// Add an event listener to the submit button
submitImage.addEventListener('click', function () {
  // Get the image URL from the input
  var imageURL = inputImage.value;

  // Update the preview image source
  previewImage.src = imageURL;

  // Fetch the seller's profile image from the server
  fetch(`http://18.232.147.203:3300/SetSellerProfileImage/${sellerId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ profileImage: imageURL }),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Update Successful:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});

if (buyerId !== null) {
  console.log('Buyer Logged In');
  document.getElementById("login-link").style.display = "none";

  document.getElementById("buyer-link").style.display = "inline-block";
  document.getElementById("logout-link").style.display = "inline-block";
}
if (sellerId !== targetSellerId) {
  console.log('Not Guest')
  document.getElementById("profilepic-link").href = "profile.html";
}


document.getElementById('logout-link').addEventListener('click', function () {
  sessionStorage.clear();
  window.location.href = '../index.html';
});

// Navigates to Edit Account UI
document.getElementById('nav-edit-btn').addEventListener('click', function () {
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

// Refreshes Page using Refresh button
document.getElementById('refresh-data-btn').addEventListener('click', function () {
  location.reload();
});

// Navigates to Main Account UI
document.getElementById('back-btn').addEventListener('click', function () {
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

// Navigates to Post Creation Page
document.getElementById('nav-post-btn').addEventListener('click', function () {
  window.location.href = 'create-post.html';
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
  if (n >= x.length) { slideIndex = 0 }
  if (n < 0) { slideIndex = x.length - 1 }
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none"; // Hide all slides
  }
  x[slideIndex].style.display = "block"; // Display current slide
}

// ================== Button Navigation for USERNAME ==================
document.querySelector("#edit-username-btn").addEventListener("click", function () {
  document.getElementById("edit-username").style.display = "none";
  document.getElementById("username-border").style.border = "none";
  document.getElementById("edit-username-btn").style.display = "none";

  document.getElementById("username-input").style.display = "inline-block";
  document.getElementById("confirm-username-btn").style.display = "inline-block";
  document.getElementById("exit-username-btn").style.display = "inline-block";
});
document.querySelector("#exit-username-btn").addEventListener("click", function () {

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
document.querySelector("#edit-first-btn").addEventListener("click", function () {
  document.getElementById("edit-first-btn").style.display = "none";
  document.getElementById("first-border").style.border = "none";
  document.getElementById("edit-first-name").style.display = "none";

  document.getElementById("first-input").style.display = "inline-block";
  document.getElementById("confirm-first-btn").style.display = "inline-block";
  document.getElementById("exit-first-btn").style.display = "inline-block";
});
document.querySelector("#exit-first-btn").addEventListener("click", function () {

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
document.querySelector("#edit-last-btn").addEventListener("click", function () {
  document.getElementById("edit-last-btn").style.display = "none";
  document.getElementById("last-border").style.border = "none";
  document.getElementById("edit-last-name").style.display = "none";

  document.getElementById("last-input").style.display = "inline-block";
  document.getElementById("confirm-last-btn").style.display = "inline-block";
  document.getElementById("exit-last-btn").style.display = "inline-block";
});
document.querySelector("#exit-last-btn").addEventListener("click", function () {

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
document.querySelector("#edit-bio-btn").addEventListener("click", function () {

  document.getElementById("edit-bio").style.display = "none";
  document.getElementById("bio-border").style.border = "none";
  document.getElementById("edit-bio-btn").style.display = "none";

  document.getElementById("bio-input").style.display = "inline-block";
  document.getElementById("confirm-bio-btn").style.display = "inline-block";
  document.getElementById("exit-bio-btn").style.display = "inline-block";
});

document.querySelector("#exit-bio-btn").addEventListener("click", function () {

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
document.querySelector("#edit-email-btn").addEventListener("click", function () {
  document.getElementById("edit-email").style.display = "none";
  document.getElementById("email-border").style.border = "none";
  document.getElementById("edit-email-btn").style.display = "none";

  document.getElementById("email-input").style.display = "inline-block";
  document.getElementById("confirm-email-btn").style.display = "inline-block";
  document.getElementById("exit-email-btn").style.display = "inline-block";
});
document.querySelector("#exit-email-btn").addEventListener("click", function () {

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
document.querySelector("#edit-birthday-btn").addEventListener("click", function () {
  document.getElementById("edit-birthday").style.display = "none";
  document.getElementById("birthday-border").style.border = "none";
  document.getElementById("edit-birthday-btn").style.display = "none";

  document.getElementById("birthday-input").style.display = "inline-block";
  document.getElementById("confirm-birthday-btn").style.display = "inline-block";
  document.getElementById("exit-birthday-btn").style.display = "inline-block";
});
document.querySelector("#exit-birthday-btn").addEventListener("click", function () {

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
document.querySelector("#edit-address-btn").addEventListener("click", function () {
  document.getElementById("edit-address").style.display = "none";
  document.getElementById("address-border").style.border = "none";
  document.getElementById("edit-address-btn").style.display = "none";

  document.getElementById("address-input").style.display = "inline-block";
  document.getElementById("confirm-address-btn").style.display = "inline-block";
  document.getElementById("exit-address-btn").style.display = "inline-block";
});
document.querySelector("#exit-address-btn").addEventListener("click", function () {

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
document.querySelector("#edit-city-btn").addEventListener("click", function () {
  document.getElementById("edit-city").style.display = "none";
  document.getElementById("city-border").style.border = "none";
  document.getElementById("edit-city-btn").style.display = "none";

  document.getElementById("city-input").style.display = "inline-block";
  document.getElementById("confirm-city-btn").style.display = "inline-block";
  document.getElementById("exit-city-btn").style.display = "inline-block";
});
document.querySelector("#exit-city-btn").addEventListener("click", function () {

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
document.querySelector("#edit-gender-btn").addEventListener("click", function () {
  document.getElementById("edit-gender").style.display = "none";
  document.getElementById("gender-border").style.border = "none";
  document.getElementById("edit-gender-btn").style.display = "none";

  document.getElementById("gender-input").style.display = "inline-block";
  document.getElementById("confirm-gender-btn").style.display = "inline-block";
  document.getElementById("exit-gender-btn").style.display = "inline-block";
});
document.querySelector("#exit-gender-btn").addEventListener("click", function () {

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
document.querySelector("#edit-zip-btn").addEventListener("click", function () {
  document.getElementById("edit-zip").style.display = "none";
  document.getElementById("zip-border").style.border = "none";
  document.getElementById("edit-zip-btn").style.display = "none";

  document.getElementById("zip-input").style.display = "inline-block";
  document.getElementById("confirm-zip-btn").style.display = "inline-block";
  document.getElementById("exit-zip-btn").style.display = "inline-block";
});
document.querySelector("#exit-zip-btn").addEventListener("click", function () {

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
document.querySelector("#edit-state-btn").addEventListener("click", function () {
  document.getElementById("edit-state").style.display = "none";
  document.getElementById("state-border").style.border = "none";
  document.getElementById("edit-state-btn").style.display = "none";

  document.getElementById("state-input").style.display = "inline-block";
  document.getElementById("confirm-state-btn").style.display = "inline-block";
  document.getElementById("exit-state-btn").style.display = "inline-block";
});
document.querySelector("#exit-state-btn").addEventListener("click", function () {

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
document.querySelector("#edit-number-btn").addEventListener("click", function () {
  document.getElementById("edit-number").style.display = "none";
  document.getElementById("number-border").style.border = "none";
  document.getElementById("edit-number-btn").style.display = "none";

  document.getElementById("number-input").style.display = "inline-block";
  document.getElementById("confirm-number-btn").style.display = "inline-block";
  document.getElementById("exit-number-btn").style.display = "inline-block";
});
document.querySelector("#exit-number-btn").addEventListener("click", function () {

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


if (targetSellerId == null || targetSellerId == sellerId) {
  // Initialize an array to store the slideIndex for each post
  let slideIndices = [];

  // Increment the slideIndex by n and display the new slide
  function plusDivs(n, postIndex) {
    showDivs(slideIndices[postIndex] += n, postIndex);
  }

  // Display the slide at slideIndex and hide all other slides
  function showDivs(n, postIndex) {
    var i;
    var x = document.getElementsByClassName(`mySlides${postIndex}`); // Get all slides for this post
    if (n >= x.length) { slideIndices[postIndex] = 0 }
    if (n < 0) { slideIndices[postIndex] = x.length - 1 }
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none"; // Hide all slides
    }
    x[slideIndices[postIndex]].style.display = "block"; // Display current slide
  }
  // Fetch the sneaker posts from the server
  fetch(`http://18.232.147.203:3300/sneakerpostsBySeller/${sellerId}`)
    .then(response => response.json())
    .then(posts => {
      // Loop through each post
      posts.forEach((post, postIndex) => {
        let username = '';
        // Fetch the username for the seller ID
        fetch(`http://18.232.147.203:3300/GetSellerUsername/${post.sellerid}`)
          .then(response => response.json())
          .then(seller => {
            username = seller[0].userName;
          })
          .then(() => {
            // Initialize slide index for this post
            slideIndices[postIndex] = 0;

            // Create a new listing container
            const listingContainer = document.createElement('div');
            listingContainer.className = 'row my-3 py-3';

            // Add the HTML for the listing
            listingContainer.innerHTML = `
              <div id="listing-main-container" class="col">
                <div id="listing-title-container">
                  <p id="listing-title">${post.sneakername}</p>
                </div>
                <div id="image-container">
                  <div id="price-container">
                    <p id="price">$<span id="listing-price">${post.price}</span></p>
                  </div>
                  <div id="size-container">
                    <p id="size">Size: <span id="listing-size">${post.size}</span></p>
                  </div>
                  <img class="mySlides${postIndex}" src="${post.image[0]}">
                  ${post.image[1] ? `<img class="mySlides${postIndex}" src="${post.image[1]}">` : ''}
                  ${post.image[2] ? `<img class="mySlides${postIndex}" src="${post.image[2]}">` : ''}
                  <button class="prev" onclick="plusDivs(-1, ${postIndex})"><span
                    class="glyphicon glyphicon-circle-arrow-left"></span></button>
                <button class="next" onclick="plusDivs(1, ${postIndex})"><span
                    class="glyphicon glyphicon-circle-arrow-right"></span></button>
                </div>
                <div id="info-container">
                  <p id="listing-name" class="text-left"><a class="profile-link" href="#">${username}</a></p>
                  <p id="listing-sh-desc" class="text-left">${post.postdescription}</p>
                </div>
                <button class="delete-btns" id="listing-delete-${post.postid}"><span class="glyphicon glyphicon-trash"></span> Delete</button>
                <a id="listing-like" href="#"><span class="glyphicon glyphicon-heart"></span></a>
              </div>`;

            // Add the new listing container to the listings container
            listings.appendChild(listingContainer);

            document.getElementById(`listing-delete-${post.postid}`).addEventListener('click', function () {
              fetch(`http://18.232.147.203:3300/sneakerposts/${post.postid}`, {
                method: 'DELETE'
              })
              .then(response => response.json())
              .then(data => {
                console.log(data);
              })
              .catch(error => console.error('Error:', error))
              .finally(() => {
                setTimeout(function () {
                  location.reload();
                }, 1000);
              });
            });

            // Show the first slide
            showDivs(slideIndices[postIndex], postIndex);
          })
          .catch(error => console.error('Error:', error));
      });
    })
    .catch(error => console.error('Error:', error));
} else {
  // Initialize an array to store the slideIndex for each post
  let slideIndices = [];

  // Increment the slideIndex by n and display the new slide
  function plusDivs(n, postIndex) {
    showDivs(slideIndices[postIndex] += n, postIndex);
  }

  // Display the slide at slideIndex and hide all other slides
  function showDivs(n, postIndex) {
    var i;
    var x = document.getElementsByClassName(`mySlides${postIndex}`); // Get all slides for this post
    if (n >= x.length) { slideIndices[postIndex] = 0 }
    if (n < 0) { slideIndices[postIndex] = x.length - 1 }
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none"; // Hide all slides
    }
    x[slideIndices[postIndex]].style.display = "block"; // Display current slide
  }
  // Fetch the sneaker posts from the server
  fetch(`http://18.232.147.203:3300/sneakerpostsBySeller/${targetSellerId}`)
    .then(response => response.json())
    .then(posts => {
      // Loop through each post
      posts.forEach((post, postIndex) => {
        let username = '';
        // Fetch the username for the seller ID
        fetch(`http://18.232.147.203:3300/GetSellerUsername/${post.sellerid}`)
          .then(response => response.json())
          .then(seller => {
            username = seller[0].userName;
          })
          .then(() => {
            // Initialize slide index for this post
            slideIndices[postIndex] = 0;

            // Create a new listing container
            const listingContainer = document.createElement('div');
            listingContainer.className = 'row my-3 py-3';

            // Add the HTML for the listing
            listingContainer.innerHTML = `
            <div id="listing-main-container" class="col">
              <div id="listing-title-container">
                <p id="listing-title">${post.sneakername}</p>
              </div>
              <div id="image-container">
                <div id="price-container">
                  <p id="price">$<span id="listing-price">${post.price}</span></p>
                </div>
                <div id="size-container">
                  <p id="size">Size: <span id="listing-size">${post.size}</span></p>
                </div>
                <img class="mySlides${postIndex}" src="${post.image[0]}">
                ${post.image[1] ? `<img class="mySlides${postIndex}" src="${post.image[1]}">` : ''}
                ${post.image[2] ? `<img class="mySlides${postIndex}" src="${post.image[2]}">` : ''}
                <button class="prev" onclick="plusDivs(-1, ${postIndex})"><span
									class="glyphicon glyphicon-circle-arrow-left"></span></button>
							<button class="next" onclick="plusDivs(1, ${postIndex})"><span
									class="glyphicon glyphicon-circle-arrow-right"></span></button>
              </div>
              <div id="info-container">
                <p id="listing-name" class="text-left"><a class="profile-link" href="#">${username}</a></p>
                <p id="listing-sh-desc" class="text-left">${post.postdescription}</p>
              </div>
              <button id="listing-checkout"><span class="glyphicon glyphicon-shopping-cart"></span>Add to Cart</button>
              <a id="listing-like" href="#"><span class="glyphicon glyphicon-heart"></span></a>
            </div>`;

            // Add the new listing container to the listings container
            listings.appendChild(listingContainer);

            // Show the first slide
            showDivs(slideIndices[postIndex], postIndex);

          })
          .catch(error => console.error('Error:', error));
      });
    })
    .catch(error => console.error('Error:', error));
}
