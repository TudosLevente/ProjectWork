var foetelekHovered = false;

function showFoetelekDropdown() {
    foetelekHovered = true;
    var dropdownContent = document.querySelector('.dropdown_content_foetel');
    dropdownContent.style.display = 'flex';
    dropdownContent.style.animationName = 'fadeIn';
    dropdownContent.style.animationDuration = '0.3s';
    dropdownContent.style.animationFillMode = 'forwards';
}

function hideFoetelekDropdown() {
    foetelekHovered = false;
    if (foetelekHovered === false) {
        var dropdownContent = document.querySelector('.dropdown_content_foetel');
        dropdownContent.style.animationName = 'fadeOut';
        dropdownContent.style.animationDuration = '0.3s';
        dropdownContent.style.animationFillMode = 'forwards';
        dropdownContent.style.display = 'none';
    }
}

