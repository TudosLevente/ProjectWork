var kategoriakHovered = false;

function showKategoriakDropdown() {
    kategoriakHovered = true;
    var dropdownContent = document.querySelector('.dropdown_content_kategoriak');
    dropdownContent.style.display = 'flex';
    dropdownContent.style.animationName = 'fadeIn';
    dropdownContent.style.animationDuration = '0.3s';
    dropdownContent.style.animationFillMode = 'forwards';
}

function hideKategoriakDropdown() {
    kategoriakHovered = false;
    if (kategoriakHovered === false) {
        var dropdownContent = document.querySelector('.dropdown_content_kategoriak');
        dropdownContent.style.animationName = 'fadeOut';
        dropdownContent.style.animationDuration = '0.3s';
        dropdownContent.style.animationFillMode = 'forwards';
        dropdownContent.style.display = 'none';
    }
}