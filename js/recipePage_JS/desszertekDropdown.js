var desszertekHovered = false;

function showDesszertekDropdown() {
    desszertekHovered = true;
    var dropdownContent = document.querySelector('.dropdown_content_desszert');
    dropdownContent.style.display = 'flex';
    dropdownContent.style.animationName = 'fadeIn';
    dropdownContent.style.animationDuration = '0.3s';
    dropdownContent.style.animationFillMode = 'forwards';
}

function hideDesszertekDropdown() {
    desszertekHovered = false;
    if (desszertekHovered === false) {
        var dropdownContent = document.querySelector('.dropdown_content_desszert');
        dropdownContent.style.animationName = 'fadeOut';
        dropdownContent.style.animationDuration = '0.3s';
        dropdownContent.style.animationFillMode = 'forwards';
        dropdownContent.style.display = 'none';
    }
}