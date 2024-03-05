function generateNumber() {
    return Math.floor(Math.random() * 3) + 1;
}

function loadRecipes() {
    console.log("function is running");
    for (var i = 1; i < 3; i++) {
        for (var j = 1; j < 5; j++) {
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
        else if (!loggedInUserData.loggedIn) {
            console.log("not logged in");

            const login_or_profil_div = document.getElementById('login_or_profil');

            const addedLogin = document.createElement('div');
            addedLogin.className = "login-div";

            addedLogin.innerHTML = `
                <a href="../html/loginPage.html" class="login-text">Bejelentkezés</a>
            `;

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