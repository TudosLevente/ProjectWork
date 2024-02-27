// Import the toggleRecipesDiv function
const { toggleRecipesDiv } = require('./path/to/toggleRecipesDiv');

// Mock the necessary DOM elements and their properties
document.body.innerHTML = `
    <div id="my_data_div" style="display: none;"></div>
    <div id="my_recipes_div" style="display: none;"></div>
    <div id="my_favorites_div" style="display: none;"></div>
    <div id="DataDivButton" style="background-color: white;"></div>
    <div id="RecipesDivButton" style="background-color: white;"></div>
    <div id="FavoritesDivButton" style="background-color: white;"></div>
`;

// Test suite for the toggleRecipesDiv function
describe('toggleRecipesDiv', () => {
    // Test case for invoking the function
    test('should set styles and display properties correctly', () => {
        toggleRecipesDiv();

        // Check if display properties are set correctly
        expect(document.getElementById("my_data_div").style.display).toBe("none");
        expect(document.getElementById("my_recipes_div").style.display).toBe("flex");
        expect(document.getElementById("my_favorites_div").style.display).toBe("none");

        // Check if background colors are set correctly
        expect(document.getElementById("DataDivButton").style.backgroundColor).toBe("#ffd392");
        expect(document.getElementById("RecipesDivButton").style.backgroundColor).toBe("rgba(255, 153, 0, 0.90)");
        expect(document.getElementById("FavoritesDivButton").style.backgroundColor).toBe("#ffd392");
    });
});
