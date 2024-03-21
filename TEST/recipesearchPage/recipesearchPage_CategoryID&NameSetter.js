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
    recipesearchCategoryNameTitle.innerHTML = categoryName;
}