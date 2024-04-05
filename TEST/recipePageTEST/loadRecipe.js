var recipe_user;
var recipeId;
var loggedInUserId;
var loggedInUserBool;

document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    recipeId = urlParams.get('id');

    console.log(recipeId);

    getData('/getLoggedInUserData').then((response) => {
        console.log(response);
        loggedInUserId = response.user_id;
        loggedInUserBool = response.loggedIn;

        if (response.loggedIn) {
            console.log("logged in");

            const login_or_profil_div = document.getElementById('login_or_profil');

            const addedProfil = document.createElement('div');
            addedProfil.className = "dropdown_profil dropdown";

            addedProfil.innerHTML = `
                <a href="#" class="navbar_profil_text" onclick="showDropdown()">Profil</a>
                <div class="dropdown_content_profil dropdown-content" id="myDropdown">
                    <a href="../../html/profilePage.html" onclick="showAdataim()">Adataim<img
                            src="../images/profilePage_Images/gear.svg" class="gear_icon"></a>
                    <a href="../../html/recipeUpload.html" onclick="showRecepjeim()">Recept feltöltése<img
                            src="../images/profilePage_Images/recipebook.svg" class="gear_icon"></a>
                    <a href="#" onclick="logout()">Kijelentkezés<img
                            src="../images/profilePage_Images/logout.svg" class="logout_icon"></a>
                </div>
            `;

            login_or_profil_div.appendChild(addedProfil);
        }
        else if (!response.loggedIn) {
            console.log("not logged in");

            const login_or_profil_div = document.getElementById('login_or_profil');

            const addedLogin = document.createElement('div');
            addedLogin.className = "login-div";

            addedLogin.innerHTML = `
                <a href="../html/loginPage.html" class="login-text">Bejelentkezés</a>
            `;

            login_or_profil_div.appendChild(addedLogin);
        }
    }).then((response) => {
        if (loggedInUserBool) {
            getData(`http://localhost:8000/api/getFavorites/${loggedInUserId}`).then((response) => {
                if (response[0].length != 0) {
                    if (response[0][0].Recipe_ID == recipeId) {
                        console.log("ez a recept kedvenc");
                        var heartIcon = document.getElementById("heartIcon");
                        heartIcon.src = "./red_heart_icon.png";
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
            <img class="star-2" src="star-empty.svg" />

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

        insertCookingTimeIntoHTML(response[0][0].Recipe_Time);

        insertIngredientsIntoHTML(response[0][0].Recipe_Ingredients);

    }).then(
        getData(`/api/getComment/${recipeId}`).then((response) => {
            for (let i = 0; i < response[0].length; i++) {
                insertCommentsIntoHTML(response[0][i].Comment_Text, response[0][i].Date_Posted, response[0][i].Username);
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

function insertCommentsIntoHTML(Comment_Text, Date_Posted, username) {
    let commentContainer = document.querySelector(".recipe-comments-commentcontainer");

    let mainDiv = document.createElement("div");
    mainDiv.className = "recipe-comments-commentcontainer-1";

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
        let stepIngredient = stepParts[2].trim();

        let mainDiv = document.createElement("div");
        mainDiv.className = "recipe-details-cooking-ingredients-1";

        let stepIngredientDiv = document.createElement("div");
        stepIngredientDiv.className = "recipe-details-cooking-ingredients-1-quantity";
        stepIngredientDiv.innerHTML = stepIngredientQuantity + " " + stepMeasurement + " " + stepIngredient;


        mainDiv.appendChild(stepIngredientDiv);

        ingredientsContainer.appendChild(mainDiv);
    });
}

function handleTextarea(event) {
    var textarea = event.target;
    var sendButtonHeight = document.querySelector('.send-button').offsetHeight;
    textarea.style.height = 'auto';
    textarea.style.height = ((textarea.scrollHeight) + sendButtonHeight) + 'px';
}

function sendMessage() {
    var textarea = document.querySelector('.recipe-comments-input');
    var message = textarea.value.trim();
    if (message !== "") {
        console.log("Sending message:", message);

        textarea.value = "";
        textarea.style.height = 'auto';
    }

    var commentData = {
        comment_text: message,
        recipe_id: recipeId,
        user_id: loggedInUserId
    };


    if (loggedInUserBool) {
        postData('http://localhost:8000/api/uploadComment', commentData)
            .then((res) => {
                console.log(res);
                console.log("Recept komment elküldve!")
            })
            .catch((err) => {
                console.log(err);
            });
    }
    else {
        //ide kéne hogy legyen egy felugró ablak ami közli, hogy a kommenteléshez be kell jelentkezni vagy regisztrálni.
    }
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
                    console.log(res);
                    console.log("Recept sikeresen felvéve a kedvencekhez!")
                    heartIcon.src = "./red_heart_icon.png";
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            deleteData('http://localhost:8000/api/removeFavorite', favoriteData)
                .then((res) => {
                    console.log(res);
                    console.log("Recept sikeresen törölve a kedvencekből!")
                    heartIcon.src = "./uncolored_heart_icon.png";
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
    else {
        //ide kéne hogy legyen egy felugró ablak ami közli, hogy a kommenteléshez be kell jelentkezni vagy regisztrálni.
    }
}