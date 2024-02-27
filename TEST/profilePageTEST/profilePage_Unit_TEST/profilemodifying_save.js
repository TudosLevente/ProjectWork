// Import the SaveButton function
const { SaveButton } = require('./path/to/SaveButton');

// Mock the document object
const mockDocument = {
    querySelectorAll: jest.fn(() => [
        { style: { display: '' } },
        { style: { display: '' } },
        { style: { display: '' } },
        { style: { display: '' } }
    ]),
    getElementById: jest.fn(() => ({ style: { display: '' } }))
};

// Mock the modify_button and button_layout
const mockModifyButton = { style: { display: '' } };
const mockButtonLayout = { style: { display: '' } };

// Replace the global document object with the mock
global.document = mockDocument;

// Test suite for SaveButton function
describe('SaveButton', () => {
    beforeEach(() => {
        // Reset mocks
        mockDocument.querySelectorAll.mockClear();
        mockDocument.getElementById.mockClear();
        mockModifyButton.style.display = '';
        mockButtonLayout.style.display = '';
    });

    test('should hide containers and show modify button', () => {
        // Call the SaveButton function
        SaveButton();

        // Check if querySelectorAll is called with the correct parameters
        expect(mockDocument.querySelectorAll).toHaveBeenCalledWith("#username_input, #password_input, #email_input, #input_edit_icon");

        // Check if style.display property is set to 'none' for each container
        mockDocument.querySelectorAll().forEach(container => {
            expect(container.style.display).toBe('none');
        });

        // Check if modify_button display is set to 'flex'
        expect(mockModifyButton.style.display).toBe('flex');

        // Check if button_layout display is set to 'none'
        expect(mockButtonLayout.style.display).toBe('none');
    });
});
