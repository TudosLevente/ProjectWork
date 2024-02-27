// Import the function and any other necessary dependencies
const { updateSearchResults } = require('./path/to/updateSearchResults');

// Mock the necessary DOM elements and their properties
const mockSearchInput = document.createElement('input');
mockSearchInput.setAttribute('id', 'search-input');
mockSearchInput.value = 'test';

// Mock the updateSearchResults function
jest.mock('./path/to/updateSearchResults', () => {
    return {
        updateSearchResults: jest.fn()
    };
});

// Simulate the event listener
mockSearchInput.addEventListener('input', function () {
    const query = this.value;
    updateSearchResults(query);
});

// Trigger the input event
const inputEvent = new Event('input');
mockSearchInput.dispatchEvent(inputEvent);

// Test suite for the event listener
describe('Search input event listener', () => {
    test('should call updateSearchResults with the input value', () => {
        // Check if updateSearchResults is called with the correct value
        expect(updateSearchResults).toHaveBeenCalledWith('test');
    });
});
