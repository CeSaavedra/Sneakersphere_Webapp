document.getElementById('buyer-btn').addEventListener('click', function() {
    document.getElementById('prompt-container').style.display = 'none';
    document.getElementById('buyer-container').style.display = 'block';
});

document.getElementById('seller-btn').addEventListener('click', function() {
    document.getElementById('prompt-container').style.display = 'none';
    document.getElementById('seller-container').style.display = 'block';
});

document.getElementById('seller-login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    console.log('1');
    var email = document.getElementById('seller-email').value;
    var password = document.getElementById('seller-pwd').value;
  
    // Send a GET request to the GetSellerID API
    fetch(`http://18.232.147.203:3300/GetSellerID/${email}&${password}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
  
        // Here you can handle the login. For example, you can save the seller ID in the session storage
        if (data.length > 0) {
          sessionStorage.setItem('sellerId', data[0].sellerID);
          alert('Login successful');
          window.location.href = 'profile.html';
        } else {
          alert('Invalid email or password');
        }
      })
      .catch((error) => console.error('Error:', error));
});

document.getElementById('buyer-login-form').addEventListener('submit', function(e) {
  e.preventDefault();
  console.log('2');

  var email = document.getElementById('buyer-email').value;
  var password = document.getElementById('buyer-pwd').value;

  // Send a GET request to the GetBuyerID API
  fetch(`http://18.232.147.203:3300/GetBuyerID/${email}&${password}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);

      // Here you can handle the login. For example, you can save the seller ID in the session storage
      if (data.length > 0) {
        sessionStorage.setItem('buyerId', data[0].buyerID);
        alert('Login successful');
        window.location.href = 's-to-b-profile.html';
      } else {
        alert('Invalid email or password');
      }
    })
    .catch((error) => console.error('Error:', error));
});


