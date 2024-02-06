function generateNumber() {
    return Math.floor(Math.random() * 3) + 1;
}

function loadRecipes() {
    for (var i = 1; i < 5; i++) {
        for (var j = 1; j < 4; i++) {
            var id = generateNumber();

            getData(`http://localhost:8000/api/recipe/${id}`).then((recipeData) => {
                console.log(recipeData);

                if (recipeData) {
                    document.getElementById(`r${i}c${j}`).src = recipeData.Picture_data;
                }
            }).catch((error) => {
                console.error("Hiba történt:", error);
            });
        }
    }
}

function goToRecipe() {

}

var navbar = document.querySelector('.navbar');
var navbar_menu = document.querySelector('.navbar_menu');
var isRowDisabled = false;

window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 1 || document.documentElement.scrollTop > 1) {
        if (!isRowDisabled) {
            isRowDisabled = true;
            navbar_menu.classList.add('hidden');
            navbar.classList.add('ifHidden');
            setTimeout(function () {

            }, 500);
        }
    } else {
        if (isRowDisabled) {
            isRowDisabled = false;
            navbar_menu.classList.remove('hidden');
            navbar.classList.remove('ifHidden');
        }
    }
}