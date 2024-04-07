function generateNumber() {
    return Math.floor(Math.random() * 3) + 1;
}

function loadRecipes() {
    console.log("function is running");
    for (var i = 1; i < 3; i++) {
        for (var j = 1; j < 5; j++) {
            (function (i, j) {
                var id = 33;

                getData(`http://localhost:8000/api/loadrecipe/${id}`).then((recipeData) => {
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
                            var set_id = element_name.nextElementSibling;
                            set_id.setAttribute('id', recipeData[0][0].Recipe_ID);
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

function goToRecipe(buttondId) {
    var recipe_id = parseInt(document.getElementById(buttondId).getAttribute('id'));
    console.log(recipe_id);
    window.location.href = `../TEST/recipePageTEST/index.html?id=${recipe_id}`;
}


document.addEventListener('DOMContentLoaded', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

function adjustMouseScroll(event) {
    // console.log('user scrolling')
    event.deltaY *= 0.1;
}

window.addEventListener('wheel', adjustMouseScroll);

function sendEmail() {
    var name = document.getElementById('sender_name').value;
    var email = document.getElementById('sender_email').value;
    var text = document.getElementById('sender_text').value;

    var emailData = {
        to: "foodhub.noreply.hu@gmail.com",
        subject: "Visszajelzés " + name + "-tól/től. Email-cím: " + email,
        body: text
    };

    postData('/sendEmail', emailData)
        .then((response) => {
            console.log(response);
        });

    document.getElementById('sender_name').value = '';
    document.getElementById('sender_email').value = '';
    document.getElementById('sender_text').value = '';
}