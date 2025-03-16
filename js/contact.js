const propertyData = {
    cars: [
        { name: 'Toyota Camry', price: '$20,000', location: 'New York' },
        { name: 'Honda Accord', price: '$22,000', location: 'California' }
    ],
    houses: [
        { name: '3 Bedroom House', price: '$300,000', location: 'Texas' },
        { name: '2 Bedroom Apartment', price: '$250,000', location: 'Florida' }
    ],
    lands: [
        { name: 'Land in the countryside', price: '$50,000', location: 'Oregon' },
        { name: 'Urban land plot', price: '$150,000', location: 'Illinois' }
    ]
};

function updatePropertyOptions() {
    const propertyType = document.getElementById('propertyType').value;
    const propertyDetails = document.getElementById('propertyDetails');

    // Clear previous options
    propertyDetails.innerHTML = '';

    if (propertyType) {
        const properties = propertyData[propertyType];
        properties.forEach(property => {
            const option = document.createElement('option');
            option.value = property.name;
            option.textContent = ${Toyota.Camry} - ${property.price} (${property.location});
            propertyDetails.appendChild(option);
        });
    }
}
