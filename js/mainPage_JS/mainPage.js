function generateNumber() {
    return Math.floor(Math.random() * 3) + 1;
}

function logout() {
    getData('/logout').then((response) => {
        if (response.loggedIn) {
            window.location.href = '/';
        }
        else if (!response.loggedIn) {
            window.location.href = '/';
        }
    }).catch((error) => {
        console.error('Error:', error);
    });
}

function loadRecipes() {
    getData('http://localhost:8000/api/allrecipe').then((response) => {
        let recipes_length = response[0].length;
        let counter = 0;
        for (var i = 1; i < 3; i++) {
            for (var j = 1; j < 5; j++) {
                (function (i, j) {
                    if (counter < recipes_length) {
                        let id = response[0][counter].Recipe_ID;

                        getData(`http://localhost:8000/api/loadrecipe/${id}`).then((recipeData) => {
                            // console.log(recipeData);
                            if (recipeData) {
                                var uj_element = document.getElementById(`r${i}c${j}`);
                                if (uj_element) {
                                    uj_element.src = recipeData[0][0].Picture_data;
                                } else {
                                    console.error(`Az következő elemre ezzel az id-val nincs találat: 'r${i}c${j}'!`);
                                }

                                var uj_element_name = document.getElementById(`name_r${i}c${j}`);
                                if (uj_element_name) {
                                    uj_element_name.innerHTML = recipeData[0][0].Title;
                                    var uj_set_id = uj_element_name.nextElementSibling;
                                    uj_set_id.setAttribute('id', recipeData[0][0].Recipe_ID);
                                } else {
                                    console.error(`Az következő elemre ezzel az id-val nincs találat: 'name_r${i}c${j}'!`);
                                }

                                var kedveltek_element = document.getElementById(`kedveltek_r${i}c${j}`);
                                if (kedveltek_element) {
                                    kedveltek_element.src = recipeData[0][0].Picture_data;
                                } else {
                                    console.error(`Az következő elemre ezzel az id-val nincs találat: 'r${i}c${j}'!`);
                                }

                                var kedveltek_element_name = document.getElementById(`kedveltek_name_r${i}c${j}`);
                                if (kedveltek_element_name) {
                                    kedveltek_element_name.innerHTML = recipeData[0][0].Title;
                                    var kedveltek_set_id = kedveltek_element_name.nextElementSibling;
                                    kedveltek_set_id.setAttribute('id', recipeData[0][0].Recipe_ID);
                                } else {
                                    console.error(`Az következő elemre ezzel az id-val nincs találat: 'name_r${i}c${j}'!`);
                                }
                            }
                        }).catch((error) => {
                            console.error("Error occurred:", error);
                        });

                        counter++;
                    }
                    else {
                        counter = 0;
                    }
                })(i, j);
            }
        }
    }).catch((error) => {
        console.error('Error:', error);
    });
}

function loadAjanlat() {
    getData('http://localhost:8000/api/allrecipe').then((response) => {
        let recipes_length = response[0].length;
        let counter = 0;

        for (var k = 1; k < 19; k++) {
            (function (k) {
                if (counter < recipes_length) {
                    let id = response[0][counter].Recipe_ID;

                    getData(`http://localhost:8000/api/loadrecipe/${id}`).then((recipeData) => {
                        if (recipeData) {
                            var ajanlat = document.getElementById(`ajanlat_id_${k}`);
                            if (ajanlat) {
                                ajanlat.src = recipeData[0][0].Picture_data;;
                                var uj_set_id = ajanlat.parentElement;
                                uj_set_id.setAttribute('id', recipeData[0][0].Recipe_ID);
                            } else {
                                console.error("Error");
                            }
                        }
                    }).catch((error) => {
                        console.error("Error occurred:", error);
                    });

                    counter++;
                }
                else {
                    counter = 0;
                }
            })(k);
        }
    }).catch((error) => {
        console.error('Error:', error);
    });
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

            var loginhamburger = document.getElementById("loginhamburger");
            loginhamburger.style.display = 'none';

            var profilhamburger = document.getElementById("dropdownprofilhamburgermenu");
            profilhamburger.style.display = 'flex';

            const login_or_profil_div = document.getElementById('login_or_profil');

            const addedProfil = document.createElement('div');
            addedProfil.className = "dropdown_profil dropdown";

            const profilText = document.createElement('a');
            profilText.href = "../../html/profilePage.html";
            profilText.className = "navbar_profil_text";
            profilText.onclick = "showDropdown();";
            profilText.innerHTML = "Profil";

            addedProfil.appendChild(profilText);

            const dropdownDiv = document.createElement('div');
            dropdownDiv.className = "dropdown_content_profil dropdown-content";
            dropdownDiv.id = "myDropdown";

            const profilGearIcon = document.createElement('img');
            profilGearIcon.src = "../images/profilePage_Images/gear.svg";
            profilGearIcon.className = "gear_icon";

            const adataimLink = document.createElement('a');
            adataimLink.href = "../../html/profilePage.html";
            adataimLink.onclick = "showAdataim();";
            adataimLink.innerHTML = "Adataim";

            adataimLink.appendChild(profilGearIcon);

            const recipeGearIcon = document.createElement('img');
            recipeGearIcon.src = "../images/profilePage_Images/recipebook.svg";
            recipeGearIcon.className = "gear_icon";

            const receptFeltoltes = document.createElement('a');
            receptFeltoltes.href = "../../html/recipeUpload.html";
            receptFeltoltes.onclick = "showRecepjeim();";
            receptFeltoltes.innerHTML = "Recept feltöltése";

            receptFeltoltes.appendChild(recipeGearIcon);

            const logoutGearIcon = document.createElement('img');
            logoutGearIcon.src = "../images/profilePage_Images/logout.svg";
            logoutGearIcon.className = "logout_icon";

            const logoutText = document.createElement('a');
            logoutText.href = "#";
            logoutText.addEventListener('click', logout);
            logoutText.innerHTML = "Kijelentkezés";

            logoutText.appendChild(logoutGearIcon);

            dropdownDiv.appendChild(adataimLink);
            dropdownDiv.appendChild(receptFeltoltes);
            dropdownDiv.appendChild(logoutText);

            addedProfil.appendChild(dropdownDiv);

            login_or_profil_div.appendChild(addedProfil);
        }
        else if (!loggedInUserData.loggedIn) {

            var loginhamburger = document.getElementById("loginhamburger");
            loginhamburger.style.display = 'block';

            var profilhamburger = document.getElementById("dropdownprofilhamburgermenu");
            profilhamburger.style.display = 'none';

            const login_or_profil_div = document.getElementById('login_or_profil');

            const addedLogin = document.createElement('div');
            addedLogin.className = "login-div";

            const bejelentkezes = document.createElement('a');
            bejelentkezes.href = "../html/loginPage.html";
            bejelentkezes.className = "login-text";
            bejelentkezes.innerHTML = "Bejelentkezés";

            addedLogin.appendChild(bejelentkezes);

            login_or_profil_div.appendChild(addedLogin);
        }
    }).catch((error) => {
        console.error('Error:', error);
    });
    loadRecipes();
    loadAjanlat();

    getData('/check-cookies')
        .then((data) => {
            if (data.message === "Cookies accepted") {
                var cookies = document.querySelector('.websidecookies');
                cookies.style.display = 'none';
            }
            else {
                var cookies = document.querySelector('.websidecookies');
                cookies.style.display = 'flex';
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


document.addEventListener('DOMContentLoaded', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

function adjustMouseScroll(event) {
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
        });

    document.getElementById('sender_name').value = '';
    document.getElementById('sender_email').value = '';
    document.getElementById('sender_text').value = '';
}

function signupForNL() {
    document.getElementById('newsletter_email').value = '';
}