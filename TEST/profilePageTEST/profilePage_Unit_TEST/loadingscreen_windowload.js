// Import the necessary functions and dependencies
const { AnimateLoadingScreen } = require('./path/to/AnimateLoadingScreen');

// Mock the necessary DOM elements and their properties
document.body.innerHTML = `
    <div id="my_data_div" style="display: flex;"></div>
    <div id="my_recipes_div" style="display: none;"></div>
    <div id="my_favorites_div" style="display: none;"></div>
    <button id="DataDivButton"></button>
    <button id="RecipesDivButton"></button>
    <button id="FavoritesDivButton"></button>
`;

// Mock the window.getComputedStyle method
window.getComputedStyle = jest.fn().mockImplementation(element => {
    if (element === document.getElementById('my_data_div')) {
        return { display: 'flex' };
    } else if (element === document.getElementById('my_recipes_div')) {
        return { display: 'none' };
    } else if (element === document.getElementById('my_favorites_div')) {
        return { display: 'none' };
    }
});

// Mock the AnimateLoadingScreen function
jest.mock('./path/to/AnimateLoadingScreen');

// Test suite for the window.onload event
describe('window.onload', () => {
    // Test case for invoking the event
    test('should set background color of buttons based on initial display state', () => {
        // Simulate window.onload event
        window.onload();

        // Check if the background color of the DataDivButton is set correctly
        expect(document.getElementById('DataDivButton').style.backgroundColor).toBe('rgb(255, 153, 0)');

        // Check if AnimateLoadingScreen function is called
        expect(AnimateLoadingScreen).toHaveBeenCalled();
    });
});
