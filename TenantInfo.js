document.getElementById('tenant-form').addEventListener('submit'), function(event){}
    event.preventDefault();

    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var leaseStart = document.getElementById('lease-start').value;
    var leaseEnd = document.getElementById('lease-end').value;
    var rent = document.getElementById('rent').value;

    // Validate form data
    if (name === '' || email === '' || phone === '' || leaseStart === '' || leaseEnd === '' || rent === '') {
        alert('Please fill in all fields');
        return;
    }

    // Submit form data
    var formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('leaseStart', leaseStart);
    formData.append('leaseEnd', leaseEnd);
    formData.append('rent', rent);

    fetch('submit_tenant_info.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('success-message').style.display = 'block';
    })
    .catch(error);
