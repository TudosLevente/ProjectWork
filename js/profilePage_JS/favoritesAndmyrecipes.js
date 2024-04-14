var user_id

document.addEventListener("DOMContentLoaded", function () {
    getData('/getLoggedInUserData').then((response) => {
        console.log(response);
        user_id = response.user_id;
    }).then(response => {
        getData(`http://localhost:8000/api/getFavorites/${user_id}`).then((response) => {
            const main_container = document.getElementById('main_favorite_div');
            for (var i = 0; i < response[0].length; i++) {
                var recipe_id = response[0][i].Recipe_ID;
                const favorite_container = document.createElement('div');
                favorite_container.className = 'my_favorites_div_row_container';

                var recipe_name = "";
                var recipe_picture_src = "";

                getData(`http://localhost:8000/api/recipe/${response[0][i].Recipe_ID}`).then((response) => {
                    recipe_name = response[0][0].Recipes_Title;
                    recipe_picture_src = response[0][0].Recipes_Picture_data;

                    favorite_container.innerHTML = `
                    <div class="my_favorites_div_row_container">
                    <div class="my_favorites_div_row_container_img_div">
                        <img class="my_favorites_div_row_container_img"
                            src="${recipe_picture_src}" />
                    </div>
                    <div class="my_favorites_div_row_container_title">${recipe_name}</div>
                    <button class="my_favorites_div_row_container_button_div" onclick="goToRecipe(${recipe_id})">
                        <div class="my_favorites_div_row_container_button_text">Megtekintés</div>
                    </button>
                    </div>
                `;

                    main_container.appendChild(favorite_container);
                }).catch((err) => {
                    console.log(err);
                })
            }
        }).catch((error) => {
            console.error('Error:', error);
        })

        getData(`http://localhost:8000/api/userRecipes/${user_id}`).then((response) => {
            console.log(response);
            const main_container = document.getElementById('user_recipes_div');
            for (var i = 0; i < response[0].length; i++) {

                var recipe_id = response[0][i].Recipe_ID;
                var my_recipe_name = response[0][i].Title;
                var my_recipe_picture_src = response[0][i].Picture_data;

                const recipes_container = document.createElement('div');
                recipes_container.className = 'my_recipes_div_row_container';

                recipes_container.innerHTML = `
                            <div class="my_recipes_div_row_container_img_div">
                                <img class="my_recipes_div_row_container_img"
                                    src="${my_recipe_picture_src}" />
                            </div>
                            <div class="my_recipes_div_row_container_title">${my_recipe_name}</div>
                            <button class="my_recipes_div_row_container_button_div" onclick="goToRecipe(${recipe_id})">
                                <div class="my_recipes_div_row_container_button_text">Megtekintés</div>
                            </button>
                `;
                main_container.appendChild(recipes_container);
            }
        }).catch((error) => {
            console.error('Error:', error);
        })
    }).catch((error) => {
        console.error('Error:', error);
    });
});

function goToRecipe(buttondId) {
    var recipe_id = parseInt(buttondId);
    console.log(recipe_id);
    window.location.href = `../../html/recipePage.html?id=${recipe_id}`;
}

