const instructionContainer = document.getElementById('instruction_inputs');

function createInstructionInput(count) {
    const inputDiv = document.createElement('div');
    inputDiv.className = 'steps';
    inputDiv.innerHTML = `
        <div class="instruction">
            <div id="instruction_title${count}" class="instruction_title"></div>
            <div class="instruction_container">
                <img src="../images/recipeUpload_Images/leirasboximage.svg" class="instruction_design_icon">
                <input class="instruction_input"  id="instructionInput${count}" placeholder="Írja le mi a következő lépés receptjének elkészítésében." />
            </div>
        </div>
        <button class="torles_gomb">
            <img src="../images/recipeUpload_Images/kukaimage.svg" class="kuka">
        </button>
        `;
    instructionContainer.appendChild(inputDiv);
}

function deleteInstructionInput(deleteButton) {
    deleteButton.closest('.steps').remove();
}

instructionContainer.addEventListener('click', function (event) {
    const button = event.target.closest('.torles_gomb');
    if (button) {
        deleteInstructionInput(button);
        changeInstructionName();
    }
});

document.getElementById('add_instruction').addEventListener('click', function () {
    const numberOfElemets = document.querySelectorAll('div [class="steps"]').length + 1;

    createInstructionInput(numberOfElemets);

    changeInstructionName();
});