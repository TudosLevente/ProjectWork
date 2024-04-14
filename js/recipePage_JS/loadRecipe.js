var recipe_user;
var recipeId;
var loggedInUserId;
var loggedInUserBool;

document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    recipeId = urlParams.get('id');

    console.log(recipeId);

    if (recipeId === "NaN") {
        window.location.href = "../../html/errorPage.html";
    }

    getData('/getLoggedInUserData').then((response) => {
        console.log(response);
        loggedInUserId = response.user_id;
        loggedInUserBool = response.loggedIn;

        if (response.loggedIn) {
            console.log("logged in");

            const login_or_profil_div = document.getElementById('login_or_profil');

            const addedProfil = document.createElement('div');
            addedProfil.className = "dropdown_profil dropdown";

            const profilText = document.createElement('a');
            profilText.href = "../../html/profilePage.html";
            profilText.className = "navbar_profil_text";
            profilText.onclick = "showDropdown();";
            profilText.innerHTML = "Profil";

            addedProfil.appendChild(profilText);

            const dropdownDiv = document.createElement('div');
            dropdownDiv.className = "dropdown_content_profil dropdown-content";
            dropdownDiv.id = "myDropdown";

            const profilGearIcon = document.createElement('img');
            profilGearIcon.src = "../images/profilePage_Images/gear.svg";
            profilGearIcon.className = "gear_icon";

            const adataimLink = document.createElement('a');
            adataimLink.href = "../../html/profilePage.html";
            adataimLink.onclick = "showAdataim();";
            adataimLink.innerHTML = "Adataim";

            adataimLink.appendChild(profilGearIcon);

            const recipeGearIcon = document.createElement('img');
            recipeGearIcon.src = "../images/profilePage_Images/recipebook.svg";
            recipeGearIcon.className = "gear_icon";

            const receptFeltoltes = document.createElement('a');
            receptFeltoltes.href = "../../html/recipeUpload.html";
            receptFeltoltes.onclick = "showRecepjeim();";
            receptFeltoltes.innerHTML = "Recept feltöltése";

            receptFeltoltes.appendChild(recipeGearIcon);

            const logoutGearIcon = document.createElement('img');
            logoutGearIcon.src = "../images/profilePage_Images/logout.svg";
            logoutGearIcon.className = "logout_icon";

            const logout = document.createElement('a');
            logout.href = "#";
            logout.onclick = "logout();";
            logout.innerHTML = "Kijelentkezés";

            logout.appendChild(logoutGearIcon);

            dropdownDiv.appendChild(adataimLink);
            dropdownDiv.appendChild(receptFeltoltes);
            dropdownDiv.appendChild(logout);

            addedProfil.appendChild(dropdownDiv);

            login_or_profil_div.appendChild(addedProfil);
        }
        else if (!response.loggedIn) {
            console.log("not logged in");

            const login_or_profil_div = document.getElementById('login_or_profil');

            const addedLogin = document.createElement('div');
            addedLogin.className = "login-div";

            const bejelentkezes = document.createElement('a');
            bejelentkezes.href = "../html/loginPage.html";
            bejelentkezes.className = "login-text";
            bejelentkezes.innerHTML = "Bejelentkezés";

            addedLogin.appendChild(bejelentkezes);

            login_or_profil_div.appendChild(addedLogin);
        }
    }).then((response) => {
        if (loggedInUserBool) {
            getData(`http://localhost:8000/api/getFavorites/${loggedInUserId}`).then((response) => {
                if (response[0].length != 0) {
                    if (response[0][0].Recipe_ID == recipeId) {
                        var heartIcon = document.getElementById("heartIcon");
                        heartIcon.src = "../../images/recipePage_Image/red_heart_icon.png";
                    }
                }
            }).catch((error) => {
                console.error('Error:', error);
            })
        }
    }
    ).catch((error) => {
        console.error('Error:', error);
    });

    getData('/api/recipe/' + recipeId).then((response) => {
        document.getElementById('title').innerHTML = response[0][0].Recipes_Title;
        document.getElementById('description').innerHTML = response[0][0].Recipes_Description;

        var picture = document.getElementById('picture_data');
        picture.src = response[0][0].Recipes_Picture_data;
        if (response[0][0].Recipes_Difficulty_Level === 'Könnyű elkészíteni') {
            document.getElementById('difficulty').innerHTML = `
            <div class="recipe-details-difficulty-title">Nehézség:</div>
            <img class="star-1" src="../../images/recipePage_Image/star-filled.svg" />
            <img class="star-2" src="../../images/recipePage_Image/star-empty.svg" />
            <img class="star-2" src="../../images/recipePage_Image/star-empty.svg" />

            `;
        }
        else if (response[0][0].Recipes_Difficulty_Level === 'Közepesen nehéz elkészíteni') {
            document.getElementById('difficulty').innerHTML = `
            <div class="recipe-details-difficulty-title">Nehézség:</div>
            <img class="star-1" src="../../images/recipePage_Image/star-filled.svg" />
            <img class="star-2" src="../../images/recipePage_Image/star-filled.svg" />
            <img class="star-3" src="../../images/recipePage_Image/star-empty.svg" />
            `;
        }
        else if (response[0][0].Recipes_Difficulty_Level === 'Nehéz elkészíteni') {
            document.getElementById('difficulty').innerHTML = `
            <div class="recipe-details-difficulty-title">Nehézség:</div>
            <img class="star-1" src="../../images/recipePage_Image/star-filled.svg" />
            <img class="star-2" src="../../images/recipePage_Image/star-filled.svg" />
            <img class="star-3" src="../../images/recipePage_Image/star-filled.svg" />
            `;
        }

        document.getElementById('serving').innerHTML = response[0][0].Recipes_Serving;

        recipe_user = response[0][0].Recipes_User_ID;

        const isoDate = response[0][0].Recipes_Date_Created;
        const date = new Date(isoDate);

        const options = { timeZone: 'Europe/Budapest', year: 'numeric', month: '2-digit', day: '2-digit' };
        const formattedDate = date.toLocaleString('hu-HU', options);

        document.getElementById('date').innerHTML = `
            Feltöltve:
            <br />
            ${formattedDate}
        `;

        insertStepsIntoHTML(response[0][0].Recipes_Instructions);

        insertCookingTimeIntoHTML(response[0][0].Recipe_Time);

        insertIngredientsIntoHTML(response[0][0].Recipe_Ingredients);

    }).then(
        getData(`/api/getComment/${recipeId}`).then((response) => {
            for (let i = 0; i < response[0].length; i++) {
                insertCommentsIntoHTML(response[0][i].Comment_Text, response[0][i].Date_Posted, response[0][i].Username, response[0][i].Comment_ID);
            }
        })
    ).then((response) => {
        getData(`/api/user/${recipe_user}`).then((response) => {
            document.getElementById('username').innerHTML = `Feltöltötte:<br/>${response[0][0].Username}`;
        })
    }
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

function insertCookingTimeIntoHTML(text) {
    let steps = text.split(";");
    let cookingTimeContainer = document.querySelector(".recipe-details-cooking-time-layout");

    steps.forEach(function (step) {
        let stepParts = step.split(" ");
        let stepQuantity = stepParts[0].trim();
        let stepTimeType = stepParts[1].trim();
        let stepPrepType = stepParts[2].trim();

        let mainDiv = document.createElement("div");
        mainDiv.className = "recipe-details-cooking-time-1";

        let stepPrepTypeDiv = document.createElement("div");
        stepPrepTypeDiv.className = "recipe-details-cooking-time-1-type";
        stepPrepTypeDiv.textContent = stepPrepType + ":";

        let stepNumberDiv = document.createElement("div");
        stepNumberDiv.className = "recipe-details-cooking-time-1-number";
        stepNumberDiv.textContent = stepQuantity;

        let stepTimeTypeDiv = document.createElement("div");
        stepTimeTypeDiv.className = "recipe-details-cooking-time-1-timetype";
        stepTimeTypeDiv.textContent = stepTimeType;


        mainDiv.appendChild(stepPrepTypeDiv);
        mainDiv.appendChild(stepNumberDiv);
        mainDiv.appendChild(stepTimeTypeDiv);

        cookingTimeContainer.appendChild(mainDiv);
    });
}

function insertCommentsIntoHTML(Comment_Text, Date_Posted, username, Comment_ID) {
    if (document.getElementById("comment_" + Comment_ID)) {
        return;
    }

    let commentContainer = document.querySelector(".recipe-comments-commentcontainer");

    let mainDiv = document.createElement("div");
    mainDiv.className = "recipe-comments-commentcontainer-1";
    mainDiv.id = "comment_" + Comment_ID;

    let titleDiv = document.createElement("div");
    titleDiv.className = "recipe-comments-commentcontainer-1-title";

    let usernameDiv = document.createElement("div");
    usernameDiv.className = "recipe-comments-commentcontainer-1-title-username";
    usernameDiv.innerHTML = username;

    let dateDiv = document.createElement("div");
    dateDiv.className = "recipe-comments-commentcontainer-1-title-date";
    date_parts = Date_Posted.split("T");
    shortDate = date_parts[0].trim();
    dateDiv.innerHTML = shortDate;

    titleDiv.appendChild(usernameDiv);
    titleDiv.appendChild(dateDiv);

    let commentDiv = document.createElement("div");
    commentDiv.className = "recipe-comments-commentcontainer-1-comment";
    commentDiv.innerHTML = Comment_Text;

    let lineDiv = document.createElement("div");
    lineDiv.className = "recipe-comments-commentcontainer-1-line";

    mainDiv.appendChild(titleDiv);
    mainDiv.appendChild(commentDiv);
    mainDiv.appendChild(lineDiv);

    commentContainer.appendChild(mainDiv);
}

function insertIngredientsIntoHTML(text) {
    let steps = text.split(";");
    let ingredientsContainer = document.querySelector(".recipe-details-cooking-ingredients-layout");

    steps.forEach(function (step) {
        let stepParts = step.split(" ");
        let stepIngredientQuantity = stepParts[0].trim();
        let stepMeasurement = stepParts[1].trim();
        let stepMeasurementShort = stepParts[2].trim();
        let stepIngredient = stepParts[3].trim();

        let mainDiv = document.createElement("div");
        mainDiv.className = "recipe-details-cooking-ingredients-1";

        let stepIngredientDiv = document.createElement("div");
        stepIngredientDiv.className = "recipe-details-cooking-ingredients-1-quantity";
        stepIngredientDiv.innerHTML = stepIngredientQuantity + " " + stepMeasurement + " " + stepIngredient;


        mainDiv.appendChild(stepIngredientDiv);

        ingredientsContainer.appendChild(mainDiv);
    });
}

function addToFavorites() {
    var heartIcon = document.getElementById("heartIcon");
    var currentSrc = heartIcon.src;

    if (loggedInUserBool) {
        var favoriteData = {
            recipe_id: recipeId,
            user_id: loggedInUserId
        };

        if (currentSrc.includes("uncolored")) {
            postData('http://localhost:8000/api/addFavorite', favoriteData)
                .then((res) => {
                    heartIcon.src = "../../images/recipePage_Image/red_heart_icon.png";
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            deleteData('http://localhost:8000/api/removeFavorite', favoriteData)
                .then((res) => {
                    heartIcon.src = "../../images/recipePage_Image/uncolored_heart_icon.png";
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
    else {
        alert("Ahhoz, hogy a recepetet fel tudja venni a kedvencei közé, be kell jelentkeznie!");
    }
}