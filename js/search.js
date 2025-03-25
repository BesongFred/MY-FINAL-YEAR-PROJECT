const properties = [
  { id: 1, location: "New York", price: 500000, type: "Apartment" },
  { id: 2, location: "Los Angeles", price: 750000, type: "House" },
  { id: 3, location: "Chicago", price: 300000, type: "Condo" },
  { id: 4, location: "Miami", price: 450000, type: "Apartment" }
];

function displayProperties(list) {
  const propertyList = document.getElementById("propertyList");
  propertyList.innerHTML = "";

  if (list.length === 0) {
      propertyList.innerHTML = "<p>No properties found.</p>";
      return;
  }

  list.forEach(property => {
      propertyList.innerHTML += `
          <div class="property">
              <h3>${property.type} in ${property.location}</h3>
              <p>Price: $${property.price.toLocaleString()}</p>
          </div>
      `;
  });
}

function filterProperties() {
  const location = document.getElementById("location").value.trim().toLowerCase();
  const minPrice = document.getElementById("minPrice").value ? parseInt(document.getElementById("minPrice").value) : 0;
  const maxPrice = document.getElementById("maxPrice").value ? parseInt(document.getElementById("maxPrice").value) : Infinity;
  const propertyType = document.getElementById("propertyType").value;

  const filtered = properties.filter(p => {
      return (
          (!location || p.location.toLowerCase().includes(location)) &&
          (p.price >= minPrice) &&
          (p.price <= maxPrice) &&
          (!propertyType || p.type === propertyType)
      );
  });

  displayProperties(filtered);
}

// Display all properties on load
window.onload = () => displayProperties(properties);
