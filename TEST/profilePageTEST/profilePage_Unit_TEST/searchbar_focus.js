// Import the function and any other necessary dependencies
const { updateSearchResults } = require('./path/to/updateSearchResults');

// Mock the necessary DOM elements and their properties
const mockNavbarSearchbar = document.createElement('div');
mockNavbarSearchbar.classList.add('navbar_searchbar');

const mockSearchInput = document.createElement('input');
mockSearchInput.setAttribute('id', 'search-input');
mockSearchInput.value = 'test';

// Mock the searching variable
let searching = false;

// Mock the updateSearchResults function
jest.mock('./path/to/updateSearchResults', () => {
    return {
        updateSearchResults: jest.fn()
    };
});

// Simulate the event listener
mockNavbarSearchbar.addEventListener('focus', function () {
    const searchInput = document.getElementById('search-input');
    if (searchInput.value !== '') {
        const query = searchInput.value.trim();
        searching = true;
        updateSearchResults(query);
    }
});

// Trigger the focus event
const focusEvent = new Event('focus');
mockNavbarSearchbar.dispatchEvent(focusEvent);

// Test suite for the event listener
describe('Navbar search bar focus event listener', () => {
    test('should set searching to true and call updateSearchResults with the trimmed input value if input value is not empty', () => {
        // Check if searching is set to true
        expect(searching).toBe(true);

        // Check if updateSearchResults is called with the correct value
        expect(updateSearchResults).toHaveBeenCalledWith('test');
    });
});
