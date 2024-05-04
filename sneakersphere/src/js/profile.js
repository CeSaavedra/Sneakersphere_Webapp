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