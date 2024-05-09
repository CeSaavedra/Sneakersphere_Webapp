// If user chooses the buyer-btn in the prompt-container
document.getElementById('buyer-btn').addEventListener('click', function() {
    document.getElementById('prompt-container').style.display = 'none';
    document.getElementById('buyer-container').style.display = 'block';
});
// If user chooses the seller-btn in the prompt-container
document.getElementById('seller-btn').addEventListener('click', function() {
    document.getElementById('prompt-container').style.display = 'none';
    document.getElementById('seller-container').style.display = 'block';
});

// If submit button has been clicked in the seller-login-form
document.getElementById('seller-login-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Defines the email and password into variables
    // Retrieves values from the input tags within form
    var email = document.getElementById('seller-email').value;
    var password = document.getElementById('seller-pwd').value;
  
    // GetSellerID API - Gets Seller ID given the email and pasword
    fetch(`http://18.232.147.203:3300/GetSellerID/${email}&${password}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
  
        // Valid login - Sets session storage to the SellerID
        if (data.length > 0) {
          sessionStorage.setItem('sellerId', data[0].sellerID);
          alert('Login successful');
          window.location.href = 'profile.html';
        } else {
          // Valid login - Returns Error
          alert('Invalid email or password');
        }
      })
      .catch((error) => console.error('Error:', error));
});

// If submit button has been clicked in the buyer-login-form
document.getElementById('buyer-login-form').addEventListener('submit', function(e) {
  
  e.preventDefault();

  // Defines the email and password into variables
  // Retrieves values from the input tags within form
  var email = document.getElementById('buyer-email').value;
  var password = document.getElementById('buyer-pwd').value;

  // GetBuyerID API - Gets Buyer ID given the email and pasword
  fetch(`http://18.232.147.203:3300/GetBuyerID/${email}&${password}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);

      // Valid login - Sets session storage to the SellerID
      if (data.length > 0) {
        sessionStorage.setItem('buyerId', data[0].buyerID);
        alert('Login successful');
        window.location.href = 's-to-b-profile.html';
      } else {
        // Valid login - Returns Error
        alert('Invalid email or password');
      }
    })
    .catch((error) => console.error('Error:', error));
});


