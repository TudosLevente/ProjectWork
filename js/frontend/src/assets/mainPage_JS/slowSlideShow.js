function slideRecipes() {
    const container = document.getElementById('ajanlat-container');
    const firstRecipe = container.firstElementChild;
    const recipeWidth = firstRecipe.offsetWidth;
    const marginLeft = parseInt(window.getComputedStyle(container).marginLeft);

    // Calculate the distance to slide
    let distance = -(marginLeft + recipeWidth);

    // Apply transition to the container
    container.style.transition = 'margin-left 1s linear'; // Adjust the duration as needed

    // Slide the container to the left
    container.style.marginLeft = `${distance}px`;

    // After transition, move the first recipe to the end
    setTimeout(() => {
        container.appendChild(firstRecipe); // Move the first recipe to the end
        container.style.transition = ''; // Reset transition
        container.style.marginLeft = '0'; // Reset margin left
    }, 1000); // Wait for transition to finish
}

// Call slideRecipes every 5 seconds
setInterval(slideRecipes, 1000); // Adjust the interval as needed
