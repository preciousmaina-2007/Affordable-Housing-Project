// ===============================
// 📦 DATA (mock database)
// ===============================
let listings = [
    { address: "Kasarani", rent: 8000, bedrooms: 1, updatedAt: "2026-04-20" },
    { address: "Umoja", rent: 5000, bedrooms: 1, updatedAt: "2026-04-18" },
    { address: "Westlands", rent: 15000, bedrooms: 2, updatedAt: "2026-04-15" }
];


// ===============================
// 🎯 FILTER LOGIC (TESTABLE)
// ===============================
function filterListings(maxPrice, location, bedrooms, data = listings) {
    return data.filter(l =>
        l.rent <= maxPrice &&
        (location === "" || l.address.toLowerCase().includes(location.toLowerCase())) &&
        (bedrooms === "" || l.bedrooms == bedrooms)
    );
}


// ===============================
// 🏠 ADD LISTING LOGIC (TESTABLE)
// ===============================
function addListing(data, newListing) {
    const listing = {
        address: newListing.address,
        rent: Number(newListing.rent),
        bedrooms: Number(newListing.bedrooms),
        updatedAt: new Date().toISOString().split("T")[0]
    };

    data.push(listing);
    return listing;
}


// ===============================
// 🖥 DISPLAY LISTINGS (UI ONLY)
// ===============================
function displayListings(data) {
    const container = document.getElementById("results");
    if (!container) return;

    container.innerHTML = "";

    if (data.length === 0) {
        container.innerHTML = "<p>No houses found</p>";
        return;
    }

    data.forEach(l => {
        const div = document.createElement("div");

        div.innerHTML = `
            <h3>${l.address}</h3>
            <p>Rent: KES ${l.rent}</p>
            <p>Bedrooms: ${l.bedrooms}</p>
            <p>Last updated: ${l.updatedAt}</p>
        `;

        container.appendChild(div);
    });
}


// ===============================
// 🎛 FILTER FORM EVENT
// ===============================
const filterForm = document.getElementById("filterForm");

if (filterForm) {
    filterForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const price = Number(document.getElementById("price").value);
        const location = document.getElementById("location").value;
        const bedrooms = document.getElementById("bedrooms").value;

        const result = filterListings(price, location, bedrooms);
        displayListings(result);
    });
}


// ===============================
// 🏠 ADD LISTING FORM EVENT
// ===============================
const listingForm = document.getElementById("listingForm");

if (listingForm) {
    listingForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const newListing = {
            address: document.getElementById("address").value,
            rent: document.getElementById("rent").value,
            bedrooms: document.getElementById("bedrooms").value
        };

        addListing(listings, newListing);

        alert("Listing added successfully!");
        listingForm.reset();
    });
}


// ===============================
// 📞 CONTACT FORM EVENT
// ===============================
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value;

        document.getElementById("contactResponse").innerHTML =
            `✅ Thank you ${name}, your message has been received.`;

        contactForm.reset();
    });
}


// ===============================
// 🚀 INITIAL LOAD
// ===============================
document.addEventListener("DOMContentLoaded", function () {
    displayListings(listings);
});


// ===============================
// 🧪 EXPORTS FOR TESTING (JEST)
// ===============================
if (typeof module !== "undefined") {
    module.exports = {
        filterListings,
        addListing
    };
}
