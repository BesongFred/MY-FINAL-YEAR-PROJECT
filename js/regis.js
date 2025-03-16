// registration.js
document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Basic validation
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // Here you would typically send the data to your server for registration
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password); // In a real app, do not log passwords

    // For demonstration purposes, we'll just alert the user
    alert('Registration successful!');

    // Redirect to the login page or homepage after successful registration
    window.location.href = 'login.html'; // Change this to your desired redirect page
});
