document.getElementById('agentForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Collect form data
    const formData = new FormData(this);
    
    // Convert form data to an object
    const agentData = {};
    formData.forEach((value, key) => {
        agentData[key] = value;
    });

    // Here you can send the data to your server or process it further
    console.log(agentData); // For demonstration purposes

    // Show an alert
    alert('Agent information submitted successfully!');
    
    // Optionally reset the form
    this.reset();
});
