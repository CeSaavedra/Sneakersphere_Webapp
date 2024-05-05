// Fetch user data from the server
fetch('http://18.232.147.203:3300/GetSeller/frontTest@gmail.com&Shoes123')
  .then(response => response.json())
  .then(data => {

    // Use first item in the data array
    const seller = Array.isArray(data) ? data[0] : data;

    // Replace Text Elements using values from the given JSON object
    document.getElementById('username').textContent = seller.userName;
    document.getElementById('first-name').textContent = seller.firstName;
    document.getElementById('last-name').textContent = seller.lastName;
  })
  // Catch Error
  .catch(error => {
    console.error('Error:', error);
  });
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