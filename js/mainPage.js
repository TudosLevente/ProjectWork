function loadRecipes() {
    document.getElementById("r1c1").src = "path/to/your/image.jpg";
    document.getElementById("r1c2").src = "path/to/your/image.jpg";
    document.getElementById("r1c3").src = "path/to/your/image.jpg";

    document.getElementById("r2c1").src = "path/to/your/image.jpg";
    document.getElementById("r2c2").src = "path/to/your/image.jpg";
    document.getElementById("r2c3").src = "path/to/your/image.jpg";

    document.getElementById("r3c1").src = "path/to/your/image.jpg";
    document.getElementById("r3c2").src = "path/to/your/image.jpg";
    document.getElementById("r3c3").src = "path/to/your/image.jpg";

    document.getElementById("r4c1").src = "path/to/your/image.jpg";
    document.getElementById("r4c2").src = "path/to/your/image.jpg";
    document.getElementById("r4c3").src = "path/to/your/image.jpg";
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