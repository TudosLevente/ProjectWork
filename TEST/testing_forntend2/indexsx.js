function displayImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const imageSrc = e.target.result;
            document.getElementById('imageContainer').style.backgroundImage = `url('${imageSrc}')`;
            document.getElementsById('imageContainer').style.backgroundRepeat = 'no-repeat';
            document.getElementById('picture_data').style.display = 'block';
            document.getElementById('picture_data').style.visibility = 'hidden';
        };
        reader.readAsDataURL(file);
    }
}

function uploadRecipe() {
    var picture_data_input = document.getElementById('picture_data');
    var title_input = document.getElementById('title');
    var description_input = document.getElementById('description');
    var instructions_input = "";
    var serving_input = "";
    var difficulty_level_input = "";
    var food_category_input = "";
}

document.addEventListener('DOMContentLoaded', function () {
    function createIngredientInput() {
        const container = document.getElementById('ingredient_inputs');
        const inputDiv = document.createElement('div');
        inputDiv.className = 'ingredient';
        inputDiv.innerHTML = `
            <div class="ingredient_name">
                <input class="cukor" name="ingredient[]" placeholder="Cukor" />
            </div>
            <div class="ingredient_amount">
                <input class="_1" name="quantity[]" type="number" placeholder="1" />
            </div>
            <div class="ingredient_measurement">
                <input class="ev-kan-l" name="measurement[]" placeholder="Evőkanál" />
            </div>
            <button class="torles_gomb">
                <svg class="kuka" width="60" height="61" viewBox="0 0 60 61" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 15.5H12.5H52.5" stroke="#CE0000" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
                <path
                    d="M47.5 15.5V50.5C47.5 51.8261 46.9732 53.0979 46.0355 54.0355C45.0979 54.9732 43.8261 55.5 42.5 55.5H17.5C16.1739 55.5 14.9021 54.9732 13.9645 54.0355C13.0268 53.0979 12.5 51.8261 12.5 50.5V15.5M20 15.5V10.5C20 9.17392 20.5268 7.90215 21.4645 6.96447C22.4021 6.02678 23.6739 5.5 25 5.5H35C36.3261 5.5 37.5979 6.02678 38.5355 6.96447C39.4732 7.90215 40 9.17392 40 10.5V15.5"
                    stroke="#CE0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M25 28V43" stroke="#CE0000" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
                <path d="M35 28V43" stroke="#CE0000" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
            </button>
        `;
        container.appendChild(inputDiv);
    }

    document.getElementById('add-ingredient').addEventListener('click', function () {
        createIngredientInput();
    });
});
