// Import the logout function
const { logout } = require('./path/to/logout');

// Mock the window.location.href property
delete window.location;
window.location = { href: '' };

// Test suite for the logout function
describe('logout', () => {
    // Test case for invoking the function
    test('should set window.location.href correctly', () => {
        logout();

        // Check if window.location.href is set to the correct value
        expect(window.location.href).toBe("./html/loginPage.html");
    });
});
