function uploadIngredient() {
    const ingredient_name = document.getElementById("ingredient_name");
    const ingredient_category = document.getElementById("ingredient_category");

    const data = {
        ingredient_name: ingredient_name.value,
        ingredient_category: ingredient_category.value
    }

    postData("/api/uploadIngredient", data).then((data) => {
        if (data.status === 200) {
            ingredient_name.value = '';
            ingredient_category.value = '';
            ingredientsDiv.innerHTML = "";
            loadIngredients();
        }
        else if (data.status === 409) {
            alert("Ilyen hozzávaló már létezik!");
        }
    }).catch((err) => {
        console.error(err);
    });
}

function cancelUpload() {
    const ingredient_name = document.getElementById("ingredient_name");
    const ingredient_category = document.getElementById("ingredient_category");

    ingredient_name.value = '';
    ingredient_category.value = '';
}

const ingredientsDiv = document.getElementById("ingredients");

function loadIngredients() {
    getData("/api/ingredients").then((data) => {
        for (let i = 1; i <= data[0].length; i++) {
            const ingredientDiv = document.createElement("div");
            ingredientDiv.className = "ingredients-layout__manage-ingredient-data-div";

            ingredientDiv.innerHTML = `
            <div class="ingredients-layout__input-layout">
                <input readonly type="text" class="ingredients-layout__input-layout-id"
                placeholder="ID" value="${data[0][i - 1].Ingredient_ID}">
                <!-- <div class="ingredients-layout__id-input">ID</div> -->
                <input id="ingredient_name_${data[0][i - 1].Ingredient_ID}" readonly type="text" class="ingredients-layout__input-layout-name"
                placeholder="Hozzávaló név" value="${data[0][i - 1].Ingredient_Name}">
                    <!-- <div class="ingredients-layout__name-input2">Hozzávaló név</div> -->
                <input id="ingredient_category_${data[0][i - 1].Ingredient_ID}" readonly type="text" class="ingredients-layout__input-layout-category"
                placeholder="Kategória" value="${data[0][i - 1].Ingredient_Category}">
                    <!-- <div class="ingredients-layout__category-input">Kategória</div> -->
            </div>
            <div class="ingredients-layout__button-layout" id="buttonLayout_${data[0][i - 1].Ingredient_ID}">
                <button id="deleteIngredient_${data[0][i - 1].Ingredient_ID}" onclick="deleteIngredient(this.id)" class="ingredients-layout__delete-button">
                    <div class="ingredients-layout__delete-text">Törlés</div>
                </button>
                <button id="modifyIngredient_${data[0][i - 1].Ingredient_ID}" onclick="modifyIngredient(this.id)" class="ingredients-layout__modify-button">
                    <div class="ingredients-layout__modify-text">Módosítás</div>
                </button>
            </div>
            `;

            ingredientsDiv.appendChild(ingredientDiv);
        }
    }).catch((err) => {
        console.error(err);
    });
}

loadIngredients();

var stored_ingredient_name = "";

function modifyIngredient(buttonId) {
    var ingredient_id = document.getElementById(buttonId).getAttribute('id');
    ingredient_id = ingredient_id.split('_')[1];

    const name_input = document.getElementById(`ingredient_name_${ingredient_id}`);
    name_input.readOnly = false;
    stored_ingredient_name = name_input.value;
    console.log(stored_ingredient_name);

    var buttonLayout = document.getElementById(`buttonLayout_${ingredient_id}`);

    buttonLayout.innerHTML = `
    <div class="ingredients-layout__button-layout" id="buttonLayout_${ingredient_id}">
    <button id="cancelModifyIngredient_${ingredient_id}" onclick="cancelModifyIngredient(this.id)" class="ingredients-layout__delete-button">
        <div class="ingredients-layout__delete-text">Mégse</div>
    </button>
    <button id="saveIngredient_${ingredient_id}" onclick="saveIngredient(this.id)" class="ingredients-layout__modify-button">
        <div class="ingredients-layout__modify-text">Mentés</div>
    </button>
    </div>`;
}

function saveIngredient(buttonId) {
    var ingredient_id = document.getElementById(buttonId).getAttribute('id');
    ingredient_id = ingredient_id.split('_')[1];

    const name_input = document.getElementById(`ingredient_name_${ingredient_id}`);
    
    const data = {
        ingredient_id: ingredient_id,
        ingredientName: name_input.value
    }

    putData("/api/updateIngredient", data).then((response) => {
        console.log(response);
    }).catch((error) => {
        console.error(error);
    });

    var buttonLayout = document.getElementById(`buttonLayout_${ingredient_id}`);
    buttonLayout.innerHTML = `
    <button id="deleteIngredient_${ingredient_id}" onclick="deleteIngredient(this.id)" class="ingredients-layout__delete-button">
        <div class="ingredients-layout__delete-text">Törlés</div>
    </button>
    <button id="modifyIngredient_${ingredient_id}" onclick="modifyIngredient(this.id)" class="ingredients-layout__modify-button">
        <div class="ingredients-layout__modify-text">Módosítás</div>
    </button>`;
}

function cancelModifyIngredient(buttonId) {
    var ingredient_id = document.getElementById(buttonId).getAttribute('id');
    ingredient_id = ingredient_id.split('_')[1];

    const name_input = document.getElementById(`ingredient_name_${ingredient_id}`);
    
    name_input.value = stored_ingredient_name;
    name_input.readOnly = true;
    stored_ingredient_name = "";

    var buttonLayout = document.getElementById(`buttonLayout_${ingredient_id}`);
    buttonLayout.innerHTML = `
    <button id="deleteIngredient_${ingredient_id}" onclick="deleteIngredient(this.id)" class="ingredients-layout__delete-button">
        <div class="ingredients-layout__delete-text">Törlés</div>
    </button>
    <button id="modifyIngredient_${ingredient_id}" onclick="modifyIngredient(this.id)" class="ingredients-layout__modify-button">
        <div class="ingredients-layout__modify-text">Módosítás</div>
    </button>`;
}

function deleteIngredient(buttonId) {
    var ingredient_id = document.getElementById(buttonId).getAttribute('id');
    ingredient_id = ingredient_id.split('_')[1];

    const data = {
        ingredient_id: ingredient_id
    }

    deleteData("/api/removeIngredient", data).then((response) => {
        ingredientsDiv.innerHTML = "";
        loadIngredients();
    }).catch((error) => {
        console.error(error);
    });
}