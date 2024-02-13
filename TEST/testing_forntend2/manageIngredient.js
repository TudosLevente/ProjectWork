
const container = document.getElementById('ingredient_inputs');

function createIngredientInput(count) {
    const inputDiv = document.createElement('div');
    inputDiv.className = 'ingredient';
    inputDiv.innerHTML = `
        <div class="ingredient_name">
        <input type="text" name="ingredient[]" id="searchInput${count}" class="cukor"
        onkeyup="searchFunction('searchInput${count}')" onfocus="showResults('searchResults${count}')"
        placeholder="Cukor">
            <div id="searchResults${count}" class="searchResults">
                <ul>
                </ul>
            </div>
        </div>
        <div class="ingredient_amount">
            <input class="_1" name="quantity[]" type="number" value="1" />
        </div>
        <div class="ingredient_measurement">
            <input class="ev-kan-l" name="measurement[]" value="Evőkanál" />
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
            const uls = document.querySelectorAll('.searchResults ul');
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