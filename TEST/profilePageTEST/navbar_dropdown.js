function showAdataim() {
    document.getElementById("DataDivButton").style.backgroundColor = "#ff9900";
    document.getElementById("RecipesDivButton").style.backgroundColor = "#ffd392";
    document.getElementById("FavoritesDivButton").style.backgroundColor = "#ffd392";

    document.getElementById("my_data_div").style.display = "flex";
    document.getElementById("my_recipes_div").style.display = "none";
    document.getElementById("my_favorites_div").style.display = "none";
}

function showRecepjeim() {
    document.getElementById("DataDivButton").style.backgroundColor = "#ffd392";
    document.getElementById("RecipesDivButton").style.backgroundColor = "#ff9900";
    document.getElementById("FavoritesDivButton").style.backgroundColor = "#ffd392";

    document.getElementById("my_data_div").style.display = "none";
    document.getElementById("my_recipes_div").style.display = "flex";
    document.getElementById("my_favorites_div").style.display = "none";
}

function showKedvenceim() {
    document.getElementById("DataDivButton").style.backgroundColor = "#ffd392";
    document.getElementById("RecipesDivButton").style.backgroundColor = "#ffd392";
    document.getElementById("FavoritesDivButton").style.backgroundColor = "#ff9900";

    document.getElementById("my_data_div").style.display = "none";
    document.getElementById("my_recipes_div").style.display = "none";
    document.getElementById("my_favorites_div").style.display = "flex";
}

function logout() {
    window.location.href = "./html/loginPage.html";
}

