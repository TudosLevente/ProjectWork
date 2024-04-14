function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

//const categoryName = getQueryParam('categoryName');
const categoryID = getQueryParam('categoryID');
const categoryMap = {
    "1": "Burgerek",
    "2": "Szendvicsek és Wrappok",
    "3": "Pizzák",
    "4": "Saláták",
    "5": "Levesek",
    "6": "Tészták",
    "7": "Tenger gyümölcsei",
    "8": "Köretek",
    "9": "Szószok",
    "10": "Torták",
    "11": "Italok és Koktélok",
    "12": "Jégkrémek és Fagylaltok",
    "13": "Snackek",
    "14": "Muffinok és Pogácsák",
    "15": "Kenyerek",
    "16": "Palacsinták",
    "17": "Piték",
    "18": "Kekszek és Sütemények",
    "19": "Turmixok és Shakek",
    "20": "Vegetárianus"
};

function getCategoryName(categoryID) {
    return categoryMap[categoryID] || "Unknown";
}

const categoryName = getCategoryName(categoryID);

const categoryNameElement = document.getElementById('recipesearchCategoryName');
const recipesearchCategoryNameTitle = document.getElementById('recipesearchCategoryNameTitle');

if (categoryName && categoryNameElement) {
    categoryNameElement.innerHTML = categoryName;
}



document.addEventListener("DOMContentLoaded", function () {
    console.log(categoryName);
    getData(`/api/getRecipesByCategory/${categoryName}`).then((data) => {
        const mainRecipesDiv = document.getElementById('recipesByCategory');

        console.log(data);
        for (let i = 1; i <= data[0].length; i++) {
            const createRecipeA = document.createElement('a');
            createRecipeA.setAttribute('id', data[0][i - 1].Recipe_ID);
            createRecipeA.setAttribute('onclick', `goToRecipe(${data[0][i - 1].Recipe_ID})`);
            createRecipeA.innerHTML = `
                <div class="recept_kategoria__div">
                <img class="recept_kategoria__div_image" src="${data[0][i - 1].Picture_data}" />
                <div class="recept_kategoria__div_title">${data[0][i - 1].Title}</div>
                </div>
            `;

            mainRecipesDiv.appendChild(createRecipeA);
        }
    }).catch((error) => {
        console.error(error);
    });
});

function goToRecipe(buttondId) {
    var recipe_id = parseInt(document.getElementById(buttondId).getAttribute('id'));
    console.log(recipe_id);
    window.location.href = `../../html/recipePage.html?id=${recipe_id}`;
}