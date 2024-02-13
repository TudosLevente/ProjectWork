const container = document.getElementById('ingredient_inputs');

function createIngredientInput(count) {
    const inputDiv = document.createElement('div');
    inputDiv.className = 'ingredient';
    inputDiv.innerHTML = `
        <div class="ingredient_name">
        <input type="text" name="ingredient[]" id="ingredientInput${count}" class="cukor"
        onkeyup="searchFunction('ingredientInput${count}')" onfocus="showResults('ingredientsResults${count}')"
        placeholder="Cukor">
            <div id="ingredientsResults${count}" class="ingredientsResults">
                <ul>
                </ul>
            </div>
        </div>
        <div class="ingredient_amount">
            <input class="_1" name="quantity[]" type="number" value="1" />
        </div>
        <div class="ingredient_measurement">
            <input type="text" class="ev-kan-l" name="measurement[]" id="measurementInput${count}"
            onkeyup="searchFunction('measurementInput${count}')" onfocus="showResults('measurementResults${count}')"
            placeholder="Evőkanál" />
            <div id="measurementResults${count}" class="measurementsResults">
                <ul>
                    <li>Tömegmértékegységek:</li>
                    <li>Milligramm (mg)</li>
                    <li>Gramm (g)</li>
                    <li>Dekagramm (dkg)</li>
                    <li>Kilogramm (kg)</li>
                </ul>
            </div>
        </div>
        <button class="torles_gomb">
            <img src="./recipiesuploadPage/kukaimage.svg" class="kuka">
        </button>
        `;
    container.appendChild(inputDiv);
}

function deleteIngredientInput(deleteButton) {
    deleteButton.closest('.ingredient').remove();
}

container.addEventListener('click', function (event) {
    const button = event.target.closest('.torles_gomb');
    if (button) {
        deleteIngredientInput(button);
    }
});

document.getElementById('add_ingredient').addEventListener('click', function () {
    const numberOfElemets = document.querySelectorAll('div [class="ingredient"]').length + 1;

    createIngredientInput(numberOfElemets);

    getData('http://localhost:8000/api/ingredients')
        .then(ingredientData => {
            const uls = document.querySelectorAll('.ingredientsResults ul');
            uls.forEach(function (ul) {
                ingredientData.forEach(function (ingredient) {
                    for (var i = 0; i < ingredient.length; i++) {
                        const li = document.createElement('li');
                        const span = document.createElement('span');
                        span.textContent = ingredient[i].Ingredient_Name;
                        li.appendChild(span);
                        ul.appendChild(li);
                    }
                });
            });
            pickIngredient();
        })
        .catch(error => {
            console.error("Error occurred:", error);
        });


});