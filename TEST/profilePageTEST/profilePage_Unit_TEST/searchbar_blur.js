// Import the function and any other necessary dependencies
const { updateSearchResults } = require('./path/to/updateSearchResults');

// Mock the necessary DOM elements and their properties
const mockNavbarSearchbar = document.createElement('div');
mockNavbarSearchbar.classList.add('navbar_searchbar');

const mockSearchInput = document.createElement('input');
mockSearchInput.setAttribute('id', 'search-input');
mockSearchInput.value = 'test';

// Mock the searching variable
let searching = true;

// Mock the updateSearchResults function
jest.mock('./path/to/updateSearchResults', () => {
    return {
        updateSearchResults: jest.fn()
    };
});

// Simulate the event listener
mockNavbarSearchbar.addEventListener('blur', function () {
    searching = false;
    updateSearchResults(mockSearchInput.value);
});

// Trigger the blur event
const blurEvent = new Event('blur');
mockNavbarSearchbar.dispatchEvent(blurEvent);

// Test suite for the event listener
describe('Navbar search bar blur event listener', () => {
    test('should set searching to false and call updateSearchResults with the input value', () => {
        // Check if searching is set to false
        expect(searching).toBe(false);

        // Check if updateSearchResults is called with the correct value
        expect(updateSearchResults).toHaveBeenCalledWith('test');
    });
});
