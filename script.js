
/* ===============================
   📦 STATE
================================ */
let listings = [];

/* ===============================
   🌍 FETCH NAIROBI HOUSING DATA
   (Simulated API)
================================ */
async function fetchListings() {
    try {
        const data = [
            { address: "Kasarani, Nairobi", rent: 8000, bedrooms: 1 },
            { address: "Umoja, Nairobi", rent: 5000, bedrooms: 1 },
            { address: "Westlands, Nairobi", rent: 15000, bedrooms: 2 },
            { address: "Kileleshwa, Nairobi", rent: 25000, bedrooms: 2 },
            { address: "Ngong Road, Nairobi", rent: 12000, bedrooms: 1 },
            { address: "Ruaka, Nairobi", rent: 9000, bedrooms: 1 },
            { address: "Embakasi, Nairobi", rent: 7000, bedrooms: 1 }
        ];

        listings = data.map(item => ({
            ...item,
            updatedAt: new Date().toISOString().split("T")[0]
        }));

        displayListings(listings);

    } catch (error) {
        console.error("Failed to load Nairobi listings:", error);
    }
}

/* ===============================
   🏠 DISPLAY LISTINGS
================================ */
function displayListings(data) {
    const container = document.getElementById("results");
    if (!container) return;

    container.innerHTML = "";

    if (!data.length) {
        container.innerHTML = "<p>No houses found</p>";
        return;
    }

    data.forEach(l => {
        const div = document.createElement("div");

        div.innerHTML = `
            <h3>${l.address}</h3>
            <p>Rent: KES ${l.rent}</p>
            <p>Bedrooms: ${l.bedrooms}</p>
            <p>Updated: ${l.updatedAt}</p>
        `;

        container.appendChild(div);
    });
}

/* ===============================
   🎯 FILTER LISTINGS
================================ */
function filterListings(maxPrice, location, bedrooms, data = listings) {
    return data.filter(l =>
        l.rent <= maxPrice &&
        (location === "" || l.address.toLowerCase().includes(location.toLowerCase())) &&
        (bedrooms === "" || l.bedrooms === Number(bedrooms))
    );
}

/* ===============================
   ➕ ADD LISTING
================================ */
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

/* ===============================
   🎛 FILTER FORM
================================ */
document.getElementById("filterForm")?.addEventListener("submit", (e) => {
    e.preventDefault();

    const price = document.getElementById("price").value;
    const location = document.getElementById("location").value;
    const bedrooms = document.getElementById("bedrooms").value;

    const result = filterListings(
        price ? Number(price) : Infinity,
        location,
        bedrooms
    );

    displayListings(result);
});

/* ===============================
   🏠 ADD LISTING FORM
================================ */
document.getElementById("listingForm")?.addEventListener("submit", (e) => {
    e.preventDefault();

    const newListing = {
        address: document.getElementById("address").value,
        rent: document.getElementById("rent").value,
        bedrooms: document.getElementById("bedrooms").value
    };

    addListing(listings, newListing);

    displayListings(listings);

    document.getElementById("successMessage").innerText =
        "✅ Listing added successfully!";

    e.target.reset();
});

/* ===============================
   🔐 LOGIN FORM
================================ */
document.getElementById("loginForm")?.addEventListener("submit", (e) => {
    e.preventDefault();

    alert("Login successful (demo)");
    window.location.href = "index.html";
});

/* ===============================
   📞 CONTACT FORM
================================ */
document.getElementById("contactForm")?.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;

    document.getElementById("contactResponse").innerText =
        `✅ Thank you ${name}, we received your message.`;

    e.target.reset();
});

/* ===============================
   🚀 INIT APP
================================ */
document.addEventListener("DOMContentLoaded", () => {
    fetchListings();
});

/* ===============================
   🧪 EXPORTS FOR JEST TESTING
================================ */
if (typeof module !== "undefined") {
    module.exports = {
        filterListings,
        addListing
    };
}