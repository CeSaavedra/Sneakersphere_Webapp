// ===== Gets Seller ID from Session Storage =====
var sellerId = sessionStorage.getItem('sellerId');

// Defines form
let form = document.getElementById('post-form');

// If Submit button is clicked, Submit form
form.addEventListener('submit', function (e) {

  e.preventDefault();

  // Captures form data
  let formData = {
    image1: form.elements['input-image'].value,
    image2: form.elements['input-image-1'] ? form.elements['input-image-1'].value : null,
    image3: form.elements['input-image-2'] ? form.elements['input-image-2'].value : null,
    postdescription: form.elements['input-description'].value,
    price: form.elements['input-price'].value,
    sneakerName: form.elements['input-sneaker-name'].value,
    brand: form.elements['input-brand'].value,
    size: form.elements['input-size'].value,
    sellerID: sellerId
  };

  // Createsneakerposts - Creates new post object
  fetch('http://18.232.147.203:3300/Createsneakerposts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    })
    .finally(() => {
      setTimeout(function () { 
        // Sends user to profile page after 1 second
        window.location.href = 'profile.html';
      }, 1000);
    });
});

// If Seller is logged in, Display necessary NavBar elements
if(sellerId !== null){

  document.getElementById("profilepic-link").style.display = "block";
  document.getElementById("logout-link").style.display = "inline-block";

  fetch(`http://18.232.147.203:3300/GetSellerProfileImage/${sellerId}`)
  .then(response => response.json())
  .then(data => {
    document.getElementById('navbar-profilepic').src = data[0].profileImage;
  })
  .catch(error => console.error('Error:', error));
}

// Navigates back to profile page
document.getElementById('profile-btn').addEventListener('click', function () {
  window.location.href = 'profile.html';
});

let clickCount = 0;

// Button navigation that allows 1-3 images to be included in the post
document.getElementById('add-image').addEventListener('click', function() {
  clickCount++;

  if (clickCount <= 2) {
    const newContainer = document.createElement('div');
    newContainer.id = `image-input-container-${clickCount}`;
    newContainer.className = 'input-line-container';
    newContainer.innerHTML = `
      <label for="create-brand">Upload Image</label>
      <input id="input-image-${clickCount}" type="text">
      <button style="display:none;" class="cancel-image" id="cancel-image-${clickCount}"><span class="glyphicon glyphicon-remove-sign"></span></button>
    `;

    // Inserts new input container
    document.getElementById('input-container').appendChild(newContainer);

    // If clickcount is greater than 1, undisplay cancel-image button of last container
    if (clickCount > 1) {
      document.getElementById(`cancel-image-${clickCount - 1}`).style.display = 'none';
    }

    document.getElementById(`cancel-image-${clickCount}`).style.display = 'block';

    // If cancel-image button has been clicked
    document.getElementById(`cancel-image-${clickCount}`).addEventListener('click', function() {
      
      // Remove current container
      newContainer.remove();
      clickCount--;

      if (clickCount > 0) {
        document.getElementById(`cancel-image-${clickCount}`).style.display = 'block';
      }

      if (newContainer.id === 'image-input-container-2') {
        document.getElementById('add-image').style.display = 'block';
      }
    });

    if (document.getElementById('image-input-container-2')) {
      document.getElementById('add-image').style.display = 'none';
    }
  }
});

// If logout button has been clicked, logs out
document.getElementById('logout-link').addEventListener('click', function() {
  sessionStorage.clear(); 
  window.location.href = '../index.html'; 
});
