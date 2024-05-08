var buyerId = sessionStorage.getItem('buyerId');
console.log(buyerId);

document.getElementById('likes-btn').style.backgroundColor = '#696969';

// Fetch the seller's email
fetch(`http://18.232.147.203:3300/GetBuyerEmail/${buyerId}`)
    .then(response => response.json())
    .then(data => {
        console.log('Email:', data[0].email);
        email = data[0].email;

        // Fetch the seller's password
        return fetch(`http://18.232.147.203:3300/GetBuyerPass/${buyerId}`);
    })
    .then(response => response.json())
    .then(data => {
        console.log('Password:', data[0].password);
        password = data[0].password;

        // Fetch user data from the server
        return fetch(`http://18.232.147.203:3300/GetBuyer/${email}&${password}`);
    })
    .then(response => response.json())
    .then(data => {
        // Use first item in the data array
        const buyer = Array.isArray(data) ? data[0] : data;

        // Replace Text Elements using values from the given JSON object
        document.getElementById('buyer-username').textContent = buyer.userName;


        document.getElementById('edit-username').textContent = buyer.userName;
        document.getElementById('edit-email').textContent = buyer.email;
        document.getElementById('edit-address').textContent = buyer.streetAddress;
        document.getElementById('edit-city').textContent = buyer.city;
        document.getElementById('edit-zip').textContent = buyer.zipCode;
        document.getElementById('edit-state').textContent = buyer.state;
        document.getElementById('edit-size').textContent = buyer.shoeSize;

        //document.getElementById("nav-edit-container").style.display = "block";
    })
    .catch(error => {
        console.error('Error:', error);
    });

// ================== IF BUYER LOGGED IN ==================

if(buyerId !== null){
    console.log('Buyer Logged In');
    document.getElementById("login-link").style.display = "none";
    
    document.getElementById("buyer-link").style.display = "inline-block";
    document.getElementById("logout-link").style.display = "inline-block";
}

// ================== EVENT LISTENERS ==================

// Refreshes Page using Refresh button
document.getElementById('refresh-btn').addEventListener('click', function () {
    location.reload();
  });
  document.getElementById('logout-link').addEventListener('click', function() {
    sessionStorage.clear(); 
    window.location.href = '../index.html'; 
  });
// Get the containers
var likedContainer = document.getElementById('liked-container');
var orderContainer = document.getElementById('order-container');
var editContainer = document.getElementById('edit-container');

// Add event listeners to the buttons
document.getElementById('likes-btn').addEventListener('click', function () {
    document.getElementById('liked-container').style.display = 'block';
    document.getElementById('order-container').style.display = 'none';
    document.getElementById('edit-container').style.display = 'none';

    document.getElementById('likes-btn').style.backgroundColor = '#696969';
    document.getElementById('order-btn').style.backgroundColor = '#434343';
    document.getElementById('acc-btn').style.backgroundColor = '#434343';
});

document.getElementById('order-btn').addEventListener('click', function () {
    document.getElementById('liked-container').style.display = 'none';
    document.getElementById('order-container').style.display = 'block';
    document.getElementById('edit-container').style.display = 'none';

    document.getElementById('likes-btn').style.backgroundColor = '#434343';
    document.getElementById('order-btn').style.backgroundColor = '#696969';
    document.getElementById('acc-btn').style.backgroundColor = '#434343';
});

document.getElementById('acc-btn').addEventListener('click', function () {
    document.getElementById('liked-container').style.display = 'none';
    document.getElementById('order-container').style.display = 'none';
    document.getElementById('edit-container').style.display = 'block';
    
    document.getElementById('likes-btn').style.backgroundColor = '#434343';
    document.getElementById('order-btn').style.backgroundColor = '#434343';
    document.getElementById('acc-btn').style.backgroundColor = '#696969';
});
document.querySelector("#edit-form").addEventListener("submit", function (e) {
    e.preventDefault();
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
    document.getElementById("email-border").style.border = "2px solid #303030";

});

document.querySelector("#confirm-email-btn").addEventListener("click", function (e) {


    document.getElementById("confirm-email-btn").style.display = "none";
    document.getElementById("exit-email-btn").style.display = "none";
    document.getElementById("email-input").style.display = "none";

    document.getElementById("edit-email-btn").style.display = "inline-block";
    document.getElementById("edit-email").style.display = "inline-block";
    document.getElementById("email-border").style.border = "2px solid #303030";

    // Get the first name from the input field
    var email = document.getElementById("email-input").value;

    // Send a PUT request to the SetSellerFname API
    fetch(`http://18.232.147.203:3300/SetBuyerEmail/${buyerId}`, {
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
    document.getElementById("username-border").style.border = "2px solid #303030";

});

document.querySelector("#confirm-username-btn").addEventListener("click", function (e) {


    document.getElementById("confirm-username-btn").style.display = "none";
    document.getElementById("exit-username-btn").style.display = "none";
    document.getElementById("username-input").style.display = "none";

    document.getElementById("edit-username-btn").style.display = "inline-block";
    document.getElementById("edit-username").style.display = "inline-block";
    document.getElementById("username-border").style.border = "2px solid #303030";

    // Get the first name from the input field
    var userName = document.getElementById("username-input").value;

    // Send a PUT request to the SetSellerFname API
    fetch(`http://18.232.147.203:3300/SetBuyerUsername/${buyerId}`, {
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
    document.getElementById("username-border").style.border = "2px solid #303030";

});

document.querySelector("#confirm-username-btn").addEventListener("click", function (e) {


    document.getElementById("confirm-username-btn").style.display = "none";
    document.getElementById("exit-username-btn").style.display = "none";
    document.getElementById("username-input").style.display = "none";

    document.getElementById("edit-username-btn").style.display = "inline-block";
    document.getElementById("edit-username").style.display = "inline-block";
    document.getElementById("username-border").style.border = "2px solid #303030";

    // Get the first name from the input field
    var userName = document.getElementById("username-input").value;

    // Send a PUT request to the SetSellerFname API
    fetch(`http://18.232.147.203:3300/SetBuyerUsername/${buyerId}`, {
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

// ================== Button Navigation for SHOE SIZE ==================
document.querySelector("#edit-size-btn").addEventListener("click", function () {
    document.getElementById("edit-size").style.display = "none";
    document.getElementById("size-border").style.border = "none";
    document.getElementById("edit-size-btn").style.display = "none";

    document.getElementById("size-input").style.display = "inline-block";
    document.getElementById("confirm-size-btn").style.display = "inline-block";
    document.getElementById("exit-size-btn").style.display = "inline-block";
});
document.querySelector("#exit-size-btn").addEventListener("click", function () {

    document.getElementById("confirm-size-btn").style.display = "none";
    document.getElementById("exit-size-btn").style.display = "none";
    document.getElementById("size-input").style.display = "none";

    document.getElementById("edit-size-btn").style.display = "inline-block";
    document.getElementById("edit-size").style.display = "inline-block";
    document.getElementById("size-border").style.border = "2px solid #303030";

});

document.querySelector("#confirm-size-btn").addEventListener("click", function (e) {


    document.getElementById("confirm-size-btn").style.display = "none";
    document.getElementById("exit-size-btn").style.display = "none";
    document.getElementById("size-input").style.display = "none";

    document.getElementById("edit-size-btn").style.display = "inline-block";
    document.getElementById("edit-size").style.display = "inline-block";
    document.getElementById("size-border").style.border = "2px solid #303030";

    // Get the first name from the input field
    var shoeSize = document.getElementById("size-input").value;

    // Send a PUT request to the SetSellerFname API
    fetch(`http://18.232.147.203:3300/SetBuyerShoeSize/${buyerId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ shoeSize: shoeSize }),
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
    document.getElementById("address-border").style.border = "2px solid #303030";

});

document.querySelector("#confirm-address-btn").addEventListener("click", function (e) {


    document.getElementById("confirm-address-btn").style.display = "none";
    document.getElementById("exit-address-btn").style.display = "none";
    document.getElementById("address-input").style.display = "none";

    document.getElementById("edit-address-btn").style.display = "inline-block";
    document.getElementById("edit-address").style.display = "inline-block";
    document.getElementById("address-border").style.border = "2px solid #303030";

    // Get the first name from the input field
    var streetAddress = document.getElementById("address-input").value;

    // Send a PUT request to the SetSellerFname API
    fetch(`http://18.232.147.203:3300/SetBuyerAddress/${buyerId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ streetAddress: streetAddress }),
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
    document.getElementById("state-border").style.border = "2px solid #303030";

});

document.querySelector("#confirm-state-btn").addEventListener("click", function (e) {


    document.getElementById("confirm-state-btn").style.display = "none";
    document.getElementById("exit-state-btn").style.display = "none";
    document.getElementById("state-input").style.display = "none";

    document.getElementById("edit-state-btn").style.display = "inline-block";
    document.getElementById("edit-state").style.display = "inline-block";
    document.getElementById("state-border").style.border = "2px solid #303030";

    // Get the first name from the input field
    var state = document.getElementById("state-input").value;

    // Send a PUT request to the SetSellerFname API
    fetch(`http://18.232.147.203:3300/SetBuyerState/${buyerId}`, {
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
    document.getElementById("city-border").style.border = "2px solid #303030";

});

document.querySelector("#confirm-city-btn").addEventListener("click", function (e) {


    document.getElementById("confirm-city-btn").style.display = "none";
    document.getElementById("exit-city-btn").style.display = "none";
    document.getElementById("city-input").style.display = "none";

    document.getElementById("edit-city-btn").style.display = "inline-block";
    document.getElementById("edit-city").style.display = "inline-block";
    document.getElementById("city-border").style.border = "2px solid #303030";

    // Get the first name from the input field
    var city = document.getElementById("city-input").value;

    // Send a PUT request to the SetSellerFname API
    fetch(`http://18.232.147.203:3300/SetBuyerCity/${buyerId}`, {
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
// ================== Button Navigation for ZIP CODE  ==================
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
    document.getElementById("zip-border").style.border = "2px solid #303030";

});

document.querySelector("#confirm-zip-btn").addEventListener("click", function (e) {


    document.getElementById("confirm-zip-btn").style.display = "none";
    document.getElementById("exit-zip-btn").style.display = "none";
    document.getElementById("zip-input").style.display = "none";

    document.getElementById("edit-zip-btn").style.display = "inline-block";
    document.getElementById("edit-zip").style.display = "inline-block";
    document.getElementById("zip-border").style.border = "2px solid #303030";

    // Get the first name from the input field
    var zipCode = document.getElementById("zip-input").value;

    // Send a PUT request to the SetSellerFname API
    fetch(`http://18.232.147.203:3300/SetBuyerZip/${buyerId}`, {
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