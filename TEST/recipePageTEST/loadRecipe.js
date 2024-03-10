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

        document.getElementById('serving').innerHTML = response[0][0].Recipes_Serving;

        recipe_user = response[0][0].Recipes_User_ID;

        document.getElementById('date').innerHTML = `
        Feltöltve:
        <br />
        ${response[0][0].Recipes_Date_Created}
        `;

        insertStepsIntoHTML(response[0][0].Recipes_Instructions);
        //prep_time --> id


    }).then(
        // getData(`/api/user/${recipe_user}`).then((response) => {
        //     console.log(response);

        //     document.getElementById('username').innerHTML = `Feltöltötte:<br/>${response.username}`;
        // })
    ).catch((error) => {
        console.error('Error:', error);
    });
});

function insertStepsIntoHTML(text) {
    let steps = text.split(";");
    let cookingStepsContainer = document.querySelector(".recipe-details-cooking-steps-layout");

    steps.forEach(function (step) {
        let stepParts = step.split("(");
        let stepNumber = stepParts[0].trim();
        let stepText = stepParts[1].split(")")[0].trim();
        let instruction = stepParts[1].split(")")[1].trim();

        let titleDiv = document.createElement("div");
        titleDiv.className = "recipe-details-cooking-steps-1-title";

        let titleNumberDiv = document.createElement("div");
        titleNumberDiv.className = "recipe-details-cooking-steps-1-title-number";
        titleNumberDiv.textContent = stepNumber + ":";

        let stepContentDiv = document.createElement("div");
        stepContentDiv.className = "recipe-details-cooking-steps-1-content";

        let titleTextDiv = document.createElement("div");
        titleTextDiv.className = "recipe-details-cooking-steps-1-title-text";
        titleTextDiv.textContent = stepText;

        let instructionDiv = document.createElement("div");
        instructionDiv.className = "recipe-details-cooking-steps-1-instruction";
        instructionDiv.textContent = instruction;

        titleDiv.appendChild(titleNumberDiv);
        stepContentDiv.appendChild(titleTextDiv);
        stepContentDiv.appendChild(instructionDiv);

        titleDiv.appendChild(stepContentDiv);

        cookingStepsContainer.appendChild(titleDiv);
    });
}
