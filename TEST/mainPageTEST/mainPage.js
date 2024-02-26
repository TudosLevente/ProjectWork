function generateNumber() {
    return Math.floor(Math.random() * 3) + 1;
}

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

var loggedInUserData = {
    loggedIn: false,
    user_id: null,
    username: "",
    email: "",
};




document.addEventListener("DOMContentLoaded", function () {
    getData('/getLoggedInUserData').then((response) => {
        if (response.loggedIn) {
            loggedInUserData.loggedIn = response.loggedIn;
        }
        else if (!response.loggedIn) {
            loggedInUserData.loggedIn = false;
        }

        if (loggedInUserData.loggedIn) {
            console.log("logged in");

            const login_or_profil_div = document.getElementById('login_or_profil');

            const addedUpload = document.createElement('div');
            addedUpload.className = "login-div";

            addedUpload.innerHTML = `
                <a href="../html/recipeUpload.html" class="login-text">Recept feltöltés</a>
            `;

            login_or_profil_div.appendChild(addedUpload);
        }
        else if (!loggedInUserData.loggedIn) {
            console.log("not logged in");
            const login_or_profil_div = document.getElementById('login_or_profil');
            const addedImg = document.createElement('img');
            addedImg.src = "../images/mainPage/user.svg";
            addedImg.alt = "";
            addedImg.style = "width: 7%; margin-right: 5px;";

            const addedLogin = document.createElement('div');
            addedLogin.className = "login-div";



            addedLogin.innerHTML = `
                <a href="../html/loginPage.html" class="login-text">Bejelentkezés</a>
            `;

            login_or_profil_div.appendChild(addedImg);
            login_or_profil_div.appendChild(addedLogin);
        }
    }).catch((error) => {
        console.error('Error:', error);
    });
    loadRecipes();
});

function goToRecipe() {

}

var navbar = document.getElementById('navbar');
var navbar_menu = document.getElementById('navbar_menu');
var isRowDisabled = false;

window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 1 || document.documentElement.scrollTop > 1) {
        if (!isRowDisabled) {
            isRowDisabled = true;
            navbar_menu.style.opacity = 0;
            navbar_menu.style.transform = 'translateY(-100%)';
            navbar_menu.style.pointerEvents = 'none';
            navbar_menu.style.backgroundColor = 'transparent';
            navbar.style.borderRadius = '10px';
            setTimeout(function () {

            }, 500);
        }
    } else {
        if (isRowDisabled) {
            isRowDisabled = false;
            navbar_menu.style.opacity = 0.97;
            navbar_menu.style.transform = 'none';
            navbar_menu.style.pointerEvents = 'none';
            navbar_menu.style.background = '#B02000';
            navbar_menu.style.display = 'flex';
            navbar_menu.style.padding = '9px 0px 9px 0px';
            navbar_menu.style.gap = '10px';
            navbar_menu.style.flexDirection = 'column';
            navbar_menu.style.alignItems = 'center';
            navbar_menu.style.justifyContent = 'flex-start';
            navbar_menu.style.position = 'sticky';
            navbar_menu.style.overflow = 'hidden';
            navbar_menu.style.width = '100%';
            navbar_menu.style.top = '108px';
            navbar_menu.classList.add('navbar_menu');

            navbar.style.background = '#B02000';
            navbar.style.opacity = 0.97;
            navbar.style.padding = '9px 0px 9px 0px';
            navbar.style.display = 'flex';
            navbar.style.gap = '10px';
            navbar.style.flexDirection = 'column';
            navbar.style.alignItems = 'center';
            navbar.style.justifyContent = 'flex-start';
            navbar.style.position = 'sticky';
            navbar.style.overflow = 'hidden';
            navbar.style.width = '100%';
            navbar.style.borderRadius = '0px';
            navbar_menu.classList.add('navbar');


        }
    }
}