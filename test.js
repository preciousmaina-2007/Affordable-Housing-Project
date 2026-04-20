const { filterListings, addListing } = require('../script');

const sampleData = [
    { address: "Kasarani", rent: 8000, bedrooms: 1 },
    { address: "Umoja", rent: 5000, bedrooms: 1 },
    { address: "Westlands", rent: 15000, bedrooms: 2 }
];


// ===============================
// 🎯 FILTER TESTS
// ===============================
test("filters by price", () => {
    const result = filterListings(6000, "", "", sampleData);
    expect(result.length).toBe(1);
});

test("filters by location", () => {
    const result = filterListings(20000, "Kasarani", "", sampleData);
    expect(result[0].address).toBe("Kasarani");
});

test("filters by bedrooms", () => {
    const result = filterListings(20000, "", 2, sampleData);
    expect(result[0].bedrooms).toBe(2);
});

test("returns empty if no match", () => {
    const result = filterListings(2000, "", "", sampleData);
    expect(result.length).toBe(0);
});


// ===============================
// 🏠 ADD LISTING TESTS
// ===============================
test("adds a new listing", () => {
    const data = [];

    const newListing = {
        address: "Roysambu",
        rent: 7000,
        bedrooms: 1
    };

    const result = addListing(data, newListing);

    expect(data.length).toBe(1);
    expect(result.address).toBe("Roysambu");
    expect(result).toHaveProperty("updatedAt");
});