var sellerId = sessionStorage.getItem('sellerId');
console.log(sellerId);

// Get the form element
let form = document.getElementById('post-form');

form.addEventListener('submit', function (e) {
  // Prevent the default form submission behavior
  e.preventDefault();

  // Capture the form data
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

  // Make the API request
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
        window.location.href = 'profile.html';
      }, 1000);
    });
});

if(sellerId !== null){

  document.getElementById("profilepic-link").style.display = "block";
  document.getElementById("logout-link").style.display = "inline-block";

  fetch(`http://18.232.147.203:3300/GetSellerProfileImage/${sellerId}`)
  .then(response => response.json())
  .then(data => {
    // Update the src attribute of the img tag
    document.getElementById('navbar-profilepic').src = data[0].profileImage;
  })
  .catch(error => console.error('Error:', error));
}

// Navigates to back to Main Account UI
document.getElementById('profile-btn').addEventListener('click', function () {
  window.location.href = 'profile.html';
});




let clickCount = 0;

document.getElementById('add-image').addEventListener('click', function() {
  clickCount++;

  if (clickCount <= 2) {
    // Create a new container
    const newContainer = document.createElement('div');
    newContainer.id = `image-input-container-${clickCount}`;
    newContainer.className = 'input-line-container';
    newContainer.innerHTML = `
      <label for="create-brand">Upload Image</label>
      <input id="input-image-${clickCount}" type="text">
      <button style="display:none;" class="cancel-image" id="cancel-image-${clickCount}"><span class="glyphicon glyphicon-remove-sign"></span></button>
    `;

    // Append the new container to the parent container
    document.getElementById('input-container').appendChild(newContainer);

    // Hide the buttons of the previous container
    if (clickCount > 1) {
      document.getElementById(`cancel-image-${clickCount - 1}`).style.display = 'none';
    }

    // Show the cancel-image button of the new container
    document.getElementById(`cancel-image-${clickCount}`).style.display = 'block';

    // Add event listener to the cancel-image button
    document.getElementById(`cancel-image-${clickCount}`).addEventListener('click', function() {
      // Remove the current container
      newContainer.remove();

      // Decrement the click count
      clickCount--;

      // Redisplay the cancel-image button of the last container
      if (clickCount > 0) {
        document.getElementById(`cancel-image-${clickCount}`).style.display = 'block';
      }

      // Check if image-input-container-2 is being removed
      if (newContainer.id === 'image-input-container-2') {
        // Show the add-image button
        document.getElementById('add-image').style.display = 'block';
      }
    });

    // Check if image-input-container-1 exists
    if (document.getElementById('image-input-container-2')) {
      // Hide the add-image button
      document.getElementById('add-image').style.display = 'none';
    }
  }
});

document.getElementById('logout-link').addEventListener('click', function() {
  sessionStorage.clear(); 
  window.location.href = '../index.html'; 
});
