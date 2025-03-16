// Sample data for the lease agreement
const tenantName = "John Doe";
const propertyAddress = "123 Main St, Springfield, USA";
const leaseTerm = "12 months";
const monthlyRent = "$1,200";

// Function to generate lease summary
function generateLeaseSummary() {
    const summary = 
        <h2>Lease Agreement Summary</h2>
        <p><strong>Tenant Name:</strong> ${tenantName}</p>
        <p><strong>Property Address:</strong> ${propertyAddress}</p>
        <p><strong>Lease Term:</strong> ${leaseTerm}</p>
        <p><strong>Monthly Rent:</strong> ${monthlyRent}</p>
    ;
    
    // Display the summary in the resulDiv
    const resulDiv = document.getElementById('resulDiv');
    resulDiv.innerHTML = summary;
}

// Call the function to generate and display the summary
generateLeaseSummary();
