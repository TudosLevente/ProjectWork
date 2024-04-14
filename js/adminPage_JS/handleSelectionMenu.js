var recipesMenu = document.getElementById("recipe-layout");
var ingredientsMenu = document.getElementById("ingedients-layout");
var usersMenu = document.getElementById("users-layout");
var adminsMenu = document.getElementById("admins-layout");

var recipesButtonText = document.getElementById("recipe-button-text");
var ingredientsButtonText = document.getElementById("ingredients-button-text");
var usersButtonText = document.getElementById("users-button-text");
var adminsButtonText = document.getElementById("admins-button-text");

window.onload = function () {
    recipesMenu.style.display = "none";
    ingredientsMenu.style.display = "none";
    usersMenu.style.display = "none";
    adminsMenu.style.display = "none";
}

function handleRecipesMenu() {

    if (ingredientsButtonText.classList.contains("orangeColoredText")) {
        ingredientsButtonText.classList.remove("orangeColoredText");
    }

    if (usersButtonText.classList.contains("orangeColoredText")) {
        usersButtonText.classList.remove("orangeColoredText");
    }

    if (adminsButtonText.classList.contains("orangeColoredText")) {
        adminsButtonText.classList.remove("orangeColoredText");
    }
    try {
        if (recipesMenu.style.display === "none") {
            recipesMenu.style.display = "flex";
            recipesButtonText.classList.add("orangeColoredText");

            ingredientsMenu.style.display = "none";
            usersMenu.style.display = "none";
            adminsMenu.style.display = "none";
        } else {
            recipesMenu.style.display = "none";
            recipesButtonText.classList.remove("orangeColoredText");

            ingredientsMenu.style.display = "none";
            usersMenu.style.display = "none";
            adminsMenu.style.display = "none";
        }
    }
    catch (error) {
        console.log(error);
    }
}

function handleIngredientsMenu() {

    if (recipesButtonText.classList.contains("orangeColoredText")) {
        recipesButtonText.classList.remove("orangeColoredText");
    }

    if (usersButtonText.classList.contains("orangeColoredText")) {
        usersButtonText.classList.remove("orangeColoredText");
    }

    if (adminsButtonText.classList.contains("orangeColoredText")) {
        adminsButtonText.classList.remove("orangeColoredText");
    }
    try {
        if (ingredientsMenu.style.display === "none") {
            ingredientsMenu.style.display = "flex";
            ingredientsButtonText.classList.add("orangeColoredText");

            recipesMenu.style.display = "none";
            usersMenu.style.display = "none";
            adminsMenu.style.display = "none";
        } else {
            ingredientsMenu.style.display = "none";
            ingredientsButtonText.classList.remove("orangeColoredText");

            recipesMenu.style.display = "none";
            usersMenu.style.display = "none";
            adminsMenu.style.display = "none";

        }
    }
    catch (error) {
        console.log(error);
    }
}

function handleUsersMenu() {

    if (recipesButtonText.classList.contains("orangeColoredText")) {
        recipesButtonText.classList.remove("orangeColoredText");
    }
    
    if (ingredientsButtonText.classList.contains("orangeColoredText")) {
        ingredientsButtonText.classList.remove("orangeColoredText");
    }

    if (adminsButtonText.classList.contains("orangeColoredText")) {
        adminsButtonText.classList.remove("orangeColoredText");
    }
    try {
        if (usersMenu.style.display === "none") {
            usersMenu.style.display = "flex";
            usersButtonText.classList.add("orangeColoredText");

            recipesMenu.style.display = "none";
            ingredientsMenu.style.display = "none";
            adminsMenu.style.display = "none";
        } else {
            usersMenu.style.display = "none";
            usersButtonText.classList.remove("orangeColoredText");

            recipesMenu.style.display = "none";
            ingredientsMenu.style.display = "none";
            adminsMenu.style.display = "none";
        }
    }
    catch (error) {
        console.log(error);
    }
}

function handleAdminsMenu() {

    if (recipesButtonText.classList.contains("orangeColoredText")) {
        recipesButtonText.classList.remove("orangeColoredText");
    }

    if (ingredientsButtonText.classList.contains("orangeColoredText")) {
        ingredientsButtonText.classList.remove("orangeColoredText");
    }

    if (usersButtonText.classList.contains("orangeColoredText")) {
        usersButtonText.classList.remove("orangeColoredText");
    }
    try {
        if (adminsMenu.style.display === "none") {
            adminsMenu.style.display = "flex";
            adminsButtonText.classList.add("orangeColoredText");

            recipesMenu.style.display = "none";
            ingredientsMenu.style.display = "none";
            usersMenu.style.display = "none";
        } else {
            adminsMenu.style.display = "none";
            adminsButtonText.classList.remove("orangeColoredText");

            recipesMenu.style.display = "none";
            ingredientsMenu.style.display = "none";
            usersMenu.style.display = "none";
        }
    }
    catch (error) {
        console.log(error);
    }
} 