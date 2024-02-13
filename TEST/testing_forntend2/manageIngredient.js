document.addEventListener('DOMContentLoaded', function () {
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
                    <li><span>Apple</span></li>
                    <li><span>Banana</span></li>
                    <li><span>Orange</span></li>
                    <li><span>Grapes</span></li>
                    <li><span>Pineapple</span></li>
                    <li><span>Watermelon</span></li>
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

        const inputs = document.querySelectorAll('.ingredient_inputs input[type="text"]');

        inputs.forEach(function (input) {
            input.addEventListener('keyup', function () {
                var inputId = this.id;
                searchFunction(inputId);
            });

            input.addEventListener('focus', function () {
                var resultsId = this.nextElementSibling.id;
                showResults(resultsId);
            });

            var lis = input.nextElementSibling.querySelectorAll('li');
            lis.forEach(function (li) {
                li.addEventListener('click', function () {
                    handleListItemClick(input, this.textContent.trim());
                });
            });
        });
    });
});
