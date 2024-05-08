var sellerId = sessionStorage.getItem('sellerId');
console.log(sellerId);
var buyerId = sessionStorage.getItem('buyerId');
console.log(buyerId);

// Get the listings container
const listings = document.getElementById('content-col');
// Get the link element
const link = document.getElementById('profile-link');

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
fetch('http://18.232.147.203:3300/sneakerposts')
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
                <p id="listing-name" class="text-left"><a class="profile-link" href="pages/profile.html?sellerid=${post.sellerid}">${username}</a></p>
                <p id="listing-sh-desc" class="text-left">${post.postdescription}</p>
              </div>
              ${post.sellerid !== sellerId ? '<button id="listing-checkout"><span class="glyphicon glyphicon-shopping-cart"></span>Add to Cart</button>' : `<button class="delete-btns" id="listing-delete-${post.postid}"><span class="glyphicon glyphicon-trash"></span> Delete</button>`}
              <a id="listing-like" href="#"><span class="glyphicon glyphicon-heart"></span></a>
            </div>`;

          // Add the new listing container to the listings container
          listings.appendChild(listingContainer);

          // Add event listener to the delete button
          if (post.sellerid === sellerId) {
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
          }

          // Show the first slide
          showDivs(slideIndices[postIndex], postIndex);
        })
        .catch(error => console.error('Error:', error));
    });
  })
  .catch(error => console.error('Error:', error));

// ================== EVENT LISTENERS ==================
document.getElementById('logout-link').addEventListener('click', function () {
  sessionStorage.clear();
  location.reload();
});


if (buyerId !== null) {
  console.log('Buyer Logged In');
  document.getElementById("login-link").style.display = "none";

  document.getElementById("buyer-link").style.display = "inline-block";
  document.getElementById("logout-link").style.display = "inline-block";
}


if (sellerId !== null) {

  document.getElementById("login-link").style.display = "none";

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