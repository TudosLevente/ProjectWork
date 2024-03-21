const recipeLinks = document.querySelectorAll('[id^="recipeLink"]');

const numberOfRecipeLinks = recipeLinks.length;

for (let i = 1; i <= numberOfRecipeLinks; i++) {
    const recipeLink = document.getElementById('recipeLink' + i);
    const recipeTitle = document.getElementById('recept_kategoria__div_title' + i);

    if (recipeLink && recipeTitle) {
        //const sanitizedTitle = recipeTitle.innerHTML.replace(/<br>/g, '');
        // console.log(sanitizedTitle);
        recipeLink.href += `?categoryID=${i}`; //categoryName=${encodeURIComponent(sanitizedTitle)}&
    }
}