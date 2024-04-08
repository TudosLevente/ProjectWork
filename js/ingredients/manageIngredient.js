const ingredientContainer = document.getElementById('ingredient_inputs');

function createIngredientInput(count) {
    const inputDiv = document.createElement('div');
    inputDiv.className = 'ingredient';
    inputDiv.innerHTML = `
            <div class="ingredient_name">
            <input type="text" name="ingredient[]" id="ingredientInput${count}" class="ingredient_input_style_name"
            onkeyup="searchFunction('ingredientInput${count}')" onfocus="showResults('ingredientsResults${count}')"
            onblur="hideResults('ingredientsResults${count}')" placeholder="Cukor">
            <div id="ingredientsResults${count}" class="ingredientsResults">
            <ul>
            </ul>
            </div>
        </div>
        <div class="ingredient_amount">
            <input class="ingredient_input_style_quantity" name="quantity[]" type="number" value="1" />
        </div>
        <div class="ingredient_measurement">
            <input type="text" class="ingredient_input_style_measurement" name="measurement[]"
            id="measurementInput${count}" onkeyup="searchFunction('measurementInput${count}')"
            onfocus="showResults('measurementResults${count}')" onblur="hideResults('measurementResults${count}')"
            placeholder="Evőkanál" />
            <div id="measurementResults${count}" class="measurementsResults">
            <ul>
                <li class="nonclickable">Tömegmértékegységek:</li>
                <li>Milligramm (mg)</li>
                <li>Gramm (g)</li>
                <li>Dekagramm (dkg)</li>
                <li>Kilogramm (kg)</li>
                <li class="nonclickable">Térfogatmértékegységek:</li>
                <li>Teáskanál (tk)</li>
                <li>Evőkanál (ek)</li>
                <li>Csésze (cup)</li>
                <li>Pint (pt)</li>
                <li>Kvart (qt)</li>
                <li>Gallon (gal)</li>
                <li class="nonclickable">Űrmértékegységek:</li>
                <li>Milliliter (ml)</li>
                <li>Centiliter (cl)</li>
                <li>Deciliter (dl)</li>
                <li>Liter (l)</li>
                <li class="nonclickable">További</li>
                <li>Darab (db)</li>
                <li>Csomag (cs)</li>
            </ul>
            </div>
        </div>
        <button class="torles_gomb">
            <img src="../images/recipeUpload_Images/kukaimage.svg" class="kuka">
        </button>
        `;
    ingredientContainer.appendChild(inputDiv);
}

function deleteIngredientInput(deleteButton) {
    deleteButton.closest('.ingredient').remove();
}

ingredientContainer.addEventListener('click', function (event) {
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