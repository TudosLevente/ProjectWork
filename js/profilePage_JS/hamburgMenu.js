function toggleDropdownHamburMenu() {
    var dropdownContent = document.getElementById("dropdownContent");
    var dropdown_content_foetel_hamburgermenu = document.getElementById("dropdown_content_foetel_hamburgermenu");
    var dropdown_content_desszertek_hamburgermenu = document.getElementById("dropdown_content_desszertek_hamburgermenu");
    var dropdown_content_profil_hamburgermenu = document.getElementById("dropdown_content_profil_hamburgermenu");
    var hamburgermenudropdownicon = document.getElementById("hamburgermenudropdownicon");
    dropdownContent.style.display = dropdownContent.style.display === "flex" ? "none" : "flex";
    hamburgermenudropdownicon.classList.toggle("rotate-icon"); dropdown_content_foetel_hamburgermenu.style.display = 'none';
    dropdown_content_desszertek_hamburgermenu.style.display = 'none';
    dropdown_content_profil_hamburgermenu.style.display = 'none';
}

function HideDropdownHamburgerMenu() {
    var dropdownContent = document.getElementById("dropdownContent");
    dropdownContent.style.display = "none";
}

function toggleDropdownProfilHamburgerMenu() {
    var dropdownprofile = document.getElementById("dropdown_content_profil_hamburgermenu");
    var dropdownfoetel = document.getElementById("dropdown_content_foetel_hamburgermenu");
    var dropdowndesszertek = document.getElementById("dropdown_content_desszertek_hamburgermenu");
    if (dropdownprofile.style.display === "none") {
        dropdownprofile.style.display = "flex";

        dropdowndesszertek.style.display = "none";
        dropdownfoetel.style.display = "none";
    } else {
        dropdownprofile.style.display = "none";
    }
}

function toggleDropdownFoetelHamburgerMenu() {
    var dropdownfoetel = document.getElementById("dropdown_content_foetel_hamburgermenu");
    var dropdowndesszertek = document.getElementById("dropdown_content_desszertek_hamburgermenu");
    var dropdownprofile = document.getElementById("dropdown_content_profil_hamburgermenu");
    if (dropdownfoetel.style.display === "none") {
        dropdownfoetel.style.display = "flex";

        dropdowndesszertek.style.display = "none";
        dropdownprofile.style.display = "none";
    } else {
        dropdownfoetel.style.display = "none";
    }
}

function toggleDropdownDesszertekHamburgerMenu() {
    var dropdowndesszertek = document.getElementById("dropdown_content_desszertek_hamburgermenu");
    var dropdownfoetel = document.getElementById("dropdown_content_foetel_hamburgermenu");
    var dropdownprofile = document.getElementById("dropdown_content_profil_hamburgermenu");
    if (dropdowndesszertek.style.display === "none") {
        dropdowndesszertek.style.display = "flex";

        dropdownfoetel.style.display = "none";
        dropdownprofile.style.display = "none";
    } else {
        dropdowndesszertek.style.display = "none";
    }
}

window.addEventListener('DOMContentLoaded', function () {
    var searchInput = document.getElementById('search-input');
    if (window.matchMedia('(min-width: 320px) and (max-width: 375px)').matches) {
        searchInput.placeholder = 'Keressen itt...';
    }
});