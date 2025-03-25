function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const toggleButton = document.getElementById('togglePassword');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleButton.textContent = 'Hide Password';
        toggleButton.style.color = 'white'; // Change button color when visible
        toggleButton.style.fontWeight = 'bold';
    } else {
        passwordInput.type = 'password';
        toggleButton.textContent = 'Show Password';
        toggleButton.style.color = 'white'; // Reset button color
        toggleButton.style.fontWeight = 'bold';
    }
}