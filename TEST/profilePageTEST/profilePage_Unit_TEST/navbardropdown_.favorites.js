// Import the showKedvenceim function
const { showKedvenceim } = require('./path/to/showKedvenceim');

// Mock the necessary DOM elements and their properties
document.body.innerHTML = `
    <div id="DataDivButton" style="background-color: white;"></div>
    <div id="RecipesDivButton" style="background-color: white;"></div>
    <div id="FavoritesDivButton" style="background-color: white;"></div>
    <div id="my_data_div" style="display: block;"></div>
    <div id="my_recipes_div" style="display: block;"></div>
    <div id="my_favorites_div" style="display: none;"></div>
`;

// Test suite for the showKedvenceim function
describe('showKedvenceim', () => {
    // Test case for invoking the function
    test('should set styles and display properties correctly', () => {
        showKedvenceim();

        // Check if background colors are set correctly
        expect(document.getElementById("DataDivButton").style.backgroundColor).toBe("#ffd392");
        expect(document.getElementById("RecipesDivButton").style.backgroundColor).toBe("#ffd392");
        expect(document.getElementById("FavoritesDivButton").style.backgroundColor).toBe("#ff9900");

        // Check if display properties are set correctly
        expect(document.getElementById("my_data_div").style.display).toBe("none");
        expect(document.getElementById("my_recipes_div").style.display).toBe("none");
        expect(document.getElementById("my_favorites_div").style.display).toBe("flex");
    });
});
