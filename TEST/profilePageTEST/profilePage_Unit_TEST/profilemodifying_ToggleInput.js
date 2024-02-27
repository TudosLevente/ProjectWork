// Import the toggleInputs function
const toggleInputs = require('./path/to/toggleInputs');

// Mock the document object
const mockDocument = {
    querySelectorAll: jest.fn(() => [
        { style: { backgroundColor: '', display: '' } },
        { style: { backgroundColor: '', display: '' } },
        { style: { backgroundColor: '', display: '' } },
        { style: { backgroundColor: '', display: '' } }
    ]),
    getElementById: jest.fn(() => ({ style: { display: '' } }))
};

// Mock the modify_button and button_layout
const mockModifyButton = { style: { display: '' } };
const mockButtonLayout = { style: { display: '' } };

// Replace the global document object with the mock
global.document = mockDocument;

// Test suite for toggleInputs function
describe('toggleInputs', () => {
    beforeEach(() => {
        // Reset mocks
        mockDocument.querySelectorAll.mockClear();
        mockDocument.getElementById.mockClear();
        mockModifyButton.style.display = '';
        mockButtonLayout.style.display = '';
    });

    test('should toggle inputs and buttons correctly', () => {
        // Call the toggleInputs function
        toggleInputs();

        // Check if querySelectorAll is called with the correct parameters
        expect(mockDocument.querySelectorAll).toHaveBeenCalledWith("#username_input, #password_input, #email_input, #input_edit_icon");

        // Check if style properties are set correctly for each container
        mockDocument.querySelectorAll().forEach(container => {
            expect(container.style.backgroundColor).toBe('transparent');
            expect(container.style.display).toBe('block');
        });

        // Check if modify_button display is set to 'none'
        expect(mockModifyButton.style.display).toBe('none');

        // Check if button_layout display is set to 'flex'
        expect(mockButtonLayout.style.display).toBe('flex');
    });
});
