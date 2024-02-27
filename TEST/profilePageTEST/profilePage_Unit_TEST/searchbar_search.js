// Import the function and any other necessary dependencies
const { updateSearchResults } = require('./path/to/updateSearchResults');

// Mock the necessary DOM elements and their properties
document.body.innerHTML = `
    <div id="search-results-container"></div>
    <input id="search-input" class="navbar_searchbar" value="" />
`;

// Mock the items
const items = [
    { title: "Apple", link: "#", image: "apple.jpg" },
    { title: "Banana", link: "#", image: "banana.jpg" },
    { title: "Orange", link: "#", image: "orange.jpg" }
];

// Test suite for the updateSearchResults function
describe('updateSearchResults', () => {
    // Test case for empty query
    test('should clear results container and set searching to false for empty query', () => {
        updateSearchResults('');

        const resultsContainer = document.getElementById('search-results-container');
        expect(resultsContainer.innerHTML).toBe('');
        expect(searching).toBe(false);
    });

    // Test case for non-empty query with matching items
    test('should display matched items and set searching to true for non-empty query', () => {
        updateSearchResults('apple');

        const resultsContainer = document.getElementById('search-results-container');
        expect(resultsContainer.innerHTML).toContain('Apple');
        expect(searching).toBe(true);
    });

    // Test case for non-empty query with no matching items
    test('should clear results container and set searching to false for non-matching query', () => {
        updateSearchResults('grape');

        const resultsContainer = document.getElementById('search-results-container');
        expect(resultsContainer.innerHTML).toBe('');
        expect(searching).toBe(false);
    });
});
