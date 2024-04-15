const recipesForVerifyDiv = document.getElementById('recipesforverify');

function createRecipeForVerifyDiv() {
    getData('/api/notVerifiedRecipes').then((data) => {
        for (let i = 1; i <= data[0].length; i++) {
            const recipeForVerifyDiv = document.createElement('div');
            recipeForVerifyDiv.className = 'recipe-layout__recipe-data-div';
            
            recipeForVerifyDiv.innerHTML = `
            <div class="recipe-layout__recipe-data-layout">
                <div class="recipe-layout__recipe-id">${data[0][i-1].Recipe_ID}</div>
                <img src="${data[0][i-1].Picture_data}" class="recipe-layout__recipe-image" />
                <div class="recipe-layout__recipe-title">${data[0][i-1].Title}</div>
            </div>
            <div class="recipe-layout__button-layout">
                <button type="button" id="${data[0][i-1].Recipe_ID}" onclick="viewRecipe(this.id)" class="recipe-layout__watch-button">
                    <img class="recipe-layout__icon" src="../images/adminPage_Image/icon3.svg" />
                    <div class="recipe-layout__text">Megtekintés</div>
                </button>
                <button type="button" id="${data[0][i-1].Recipe_ID}" onclick="verifyRecipe(this.id)" class="recipe-layout__ok-button">
                    <img class="recipe-layout__icon" src="../images/adminPage_Image/icon4.svg" />
                    <div class="recipe-layout__text">Jóváhagyás</div>
                </button>
                <button type="button" id="${data[0][i-1].Recipe_ID}" onclick="deleteRecipe(this.id)" class="recipe-layout__delete-button">
                    <img class="recipe-layout__icon" src="../images/adminPage_Image/icon5.svg" />
                    <div class="recipe-layout__text">Törlés</div>
                </button>
            </div>
            `
    
            recipesForVerifyDiv.appendChild(recipeForVerifyDiv);
        }
    }).catch((error) => {
        console.error(error);
    });
}

function viewRecipe(buttondId) {
    var recipe_id = parseInt(document.getElementById(buttondId).getAttribute('id'));
    window.location.href = `../../html/recipePage.html?id=${recipe_id}`;
}

function verifyRecipe(buttondId) {
    var recipe_id = parseInt(document.getElementById(buttondId).getAttribute('id'));
    const data = {
        recipeid: recipe_id
    }
    putData('/api/verifyRecipe', data).then((data) => {
        recipesForVerifyDiv.innerHTML = "";
        createRecipeForVerifyDiv();
    }).catch((error) => {
        console.error(error);
    });
}

function deleteRecipe(buttondId) {
    var recipe_id = parseInt(document.getElementById(buttondId).getAttribute('id'));
    const data = {
        recipeid: recipe_id
    }
    deleteData('/api/deleteRecipe', data).then((data) => {
        recipesForVerifyDiv.innerHTML = "";
        createRecipeForVerifyDiv();
    }).catch((error) => {
        console.error(error);
    });
}

createRecipeForVerifyDiv();