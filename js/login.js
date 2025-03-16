// login.js
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Here you would typically send the credentials to your server for authentication
    console.log('Email:', email);
    console.log('Password:', password);

    // For demonstration purposes, we'll just alert the user
    alert('Welcome to Robert place');

    // Redirect to the homepage or dashboard after successful login
    window.location.href = 'HomePage.html'; // Change this to your desired redirect page
});
