// function slideRecipes() {
//     const container = document.querySelector('.ajanlat_container_track');
//     const firstRecipe = container.firstElementChild;
//     container.style.transition = 'margin-left 5s linear';
//     setTimeout(() => {
//         firstRecipe.style.transition = '';
//         container.appendChild(firstRecipe);
//     }, 0);
// }

// setInterval(slideRecipes, 1500);

function slideDivs(containerSelector, duration = 5) {
    const container = document.querySelector(containerSelector);
    const divs = Array.from(container.children);
    const divWidth = divs[0].offsetWidth;

    let currentIndex = 0;

    function slide() {
        currentIndex = (currentIndex + 1) % divs.length;
        container.appendChild(divs[currentIndex]);
    }

    slide();
    setInterval(slide, duration * 1000);
}

slideDivs('.ajanlat_container_track', 5);

