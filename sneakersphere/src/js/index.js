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