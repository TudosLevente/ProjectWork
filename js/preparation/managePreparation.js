const preparationContainer = document.getElementById('preparation_inputs');

function createPreparationInput(count) {
    const inputDiv = document.createElement('div');
    inputDiv.className = 'preparation_div_row';
    inputDiv.innerHTML = `
        <select id="prep_input${count}" class="preparation_div_row_type">
            <option>Előkészület</option>
            <option>Főzés</option>
            <option selected>Sütés</option>
            <option>Lehűtés</option>
            <option>Fagyasztás</option>
            <option>Marinálás</option>
            <option>Pihentetés</option>
            <option>Keltés</option>
            <option>Áztatás</option>
            <option>Pirítás</option>
            <option>Párolás</option>
        </select>
        <img src="../images/recipeUpload_Images/kicsilefelenyil.svg" class="chevrondown_">
        <div class="preparation_div_row_type_small">
            <input id="prepTimeInput${count}" class="preparation_div_row_type_small_input" type="number" min="0" value="0" />
        </div>
        <select id="selected_time${count}" class="preparation_div_row_type">
            <option selected>perc</option>
            <option>óra</option>
            <option>nap</option>
        </select>
        <img src="../images/recipeUpload_Images/kicsilefelenyil.svg" class="chevrondown">
        <button class="torles_gomb">
            <img src="../images/recipeUpload_Images/kukaimage.svg" class="kuka">
        </button>
        `;
    preparationContainer.appendChild(inputDiv);
}

function deletePreparationInput(deleteButton) {
    deleteButton.closest('.preparation_div_row').remove();
}

preparationContainer.addEventListener('click', function (event) {
    const button = event.target.closest('.torles_gomb');
    if (button) {
        deletePreparationInput(button);
    }
    addTime();
});

document.getElementById('add_prep_time').addEventListener('click', function () {
    const numberOfElements = document.querySelectorAll('div [class="preparation_div_row"]').length + 1;

    createPreparationInput(numberOfElements);

    refreshTime();
});