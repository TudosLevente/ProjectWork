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
});