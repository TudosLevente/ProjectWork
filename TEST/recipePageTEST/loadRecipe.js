var recipe_user;

document.addEventListener('DOMContentLoaded', function () {
    getData('/getLoggedInUserData').then((response) => {
        console.log(response);
    }).catch((error) => {
        console.error('Error:', error);
    });

    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get('id');

    console.log(recipeId);

    getData('/api/recipe/' + recipeId).then((response) => {
        console.log(response);

        document.getElementById('title').innerHTML = response[0][0].Recipes_Title;
        document.getElementById('description').innerHTML = response[0][0].Recipes_Description;

        var picture = document.getElementById('picture_data');
        picture.src = response[0][0].Picture_data;
        if (response[0][0].Recipes_Difficulty_Level === 'Könnyű elkészíteni') {
            document.getElementById('difficulty').innerHTML = `
            <div class="recipe-details-difficulty-title">Nehézség:</div>
            <img class="star-1" src="star-filled.svg" />
            <img class="star-2" src="star-empty.svg" />
            <img class="star-3" src="star-emtpy.svg" />
            `;
        }
        else if (response[0][0].Recipes_Difficulty_Level === 'Közepesen nehéz elkészíteni') {
            document.getElementById('difficulty').innerHTML = `
            <div class="recipe-details-difficulty-title">Nehézség:</div>
            <img class="star-1" src="star-filled.svg" />
            <img class="star-2" src="star-filled.svg" />
            <img class="star-3" src="star-empty.svg" />
            `;
        }
        else if (response[0][0].Recipes_Difficulty_Level === 'Nehéz elkészíteni') {
            document.getElementById('difficulty').innerHTML = `
            <div class="recipe-details-difficulty-title">Nehézség:</div>
            <img class="star-1" src="star-filled.svg" />
            <img class="star-2" src="star-filled.svg" />
            <img class="star-3" src="star-filled.svg" />
            `;
        }

        recipe_user = response[0][0].Recipes_User_ID;

        // document.getElementById('date').innerHTML = `
        // Feltöltve:
        // <br />
        // ${Recipes_Date_Created}
        // `;

        //prep_time --> id

        //can you help me insert this 
        //"I. Lépés (asdef);II. Lépés (rgewdg);III. Lépés (wefds);IV. Lépés (asds)"
        //into this
        // <div class="recipe-details-cooking-time-1">
        //     <div class="recipe-details-cooking-time-1-type">
        //     Előkészület:
        //     </div>
        //     <div class="recipe-details-cooking-time-1-number">15</div>
        //     <div class="recipe-details-cooking-time-1-timetype">
        //     perc
        //     </div>
        // </div>

    }).then(
        // getData(`/api/user/${recipe_user}`).then((response) => {
        //     console.log(response);

        //     document.getElementById('username').innerHTML = `Feltöltötte:<br/>${response.username}`;
        // })
    ).catch((error) => {
        console.error('Error:', error);
    });
});
