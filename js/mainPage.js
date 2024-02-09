function generateNumber() {
    return Math.floor(Math.random() * 3) + 1;
}

document.addEventListener("DOMContentLoaded", function () {
    loadRecipes();
});

function loadRecipes() {
    console.log("function is running");
    for (var i = 1; i < 5; i++) {
        for (var j = 1; j < 4; j++) {
            (function (i, j) {
                var id = generateNumber();

                getData(`http://localhost:8000/api/recipe/${id}`).then((recipeData) => {

                    if (recipeData) {
                        var element = document.getElementById(`r${i}c${j}`);
                        if (element) {
                            element.src = recipeData[0][0].Picture_data;
                        } else {
                            console.error(`Az következő elemre ezzel az id-val nincs találat: 'r${i}c${j}'!`);
                        }

                        var element_name = document.getElementById(`name_r${i}c${j}`);
                        if (element_name) {
                            element_name.innerHTML = recipeData[0][0].Title;
                        } else {
                            console.error(`Az következő elemre ezzel az id-val nincs találat: 'name_r${i}c${j}'!`);
                        }
                    }
                }).catch((error) => {
                    console.error("Error occurred:", error);
                });
            })(i, j);
        }
    }
}


// function loadRecipes() {
//     console.log("igen lefut");
//     for (var i = 1; i < 5; i++) {
//         for (var j = 1; j < 4; j++) {
//             var id = generateNumber();

//             getData(`http://localhost:8000/api/recipe/${id}`).then((recipeData) => {
//                 console.log(recipeData);

//                 if (recipeData) {
//                     document.getElementById(`r${i}c${j}`).src = recipeData.Picture_data;
//                 }
//             }).catch((error) => {
//                 console.error("Hiba történt:", error);
//             });
//         }
//     }
// }

loadRecipes();

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