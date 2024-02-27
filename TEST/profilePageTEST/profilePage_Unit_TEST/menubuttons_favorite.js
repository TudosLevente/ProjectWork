// Import the toggFavoritesDiv function
const { toggFavoritesDiv } = require('./path/to/toggFavoritesDiv');

// Mock the necessary DOM elements and their properties
document.body.innerHTML = `
    <div id="my_data_div" style="display: block;"></div>
    <div id="my_recipes_div" style="display: block;"></div>
    <div id="my_favorites_div" style="display: none;"></div>
    <button id="DataDivButton" style="background-color: white;"></button>
    <button id="RecipesDivButton" style="background-color: white;"></button>
    <button id="FavoritesDivButton" style="background-color: white;"></button>
`;

// Test suite for the toggFavoritesDiv function
describe('toggleFavoritesDiv', () => {
    // Test case for invoking the function
    test('should set styles and display properties correctly', () => {
        toggFavoritesDiv();

        // Check if display properties are set correctly
        expect(document.getElementById("my_data_div").style.display).toBe("none");
        expect(document.getElementById("my_recipes_div").style.display).toBe("none");
        expect(document.getElementById("my_favorites_div").style.display).toBe("flex");

        // Check if background colors of the buttons are set correctly
        expect(document.getElementById("DataDivButton").style.backgroundColor).toBe("rgb(255, 211, 146)");
        expect(document.getElementById("RecipesDivButton").style.backgroundColor).toBe("rgb(255, 211, 146)");
        expect(document.getElementById("FavoritesDivButton").style.backgroundColor).toBe("rgba(255, 153, 0, 0.9)");
    });
});
