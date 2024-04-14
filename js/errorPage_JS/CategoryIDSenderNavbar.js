// Define a function to populate category links and titles
function populateCategoryLinksAndTitles(categoryType, numberOfNavbarRecipeLinks) {
    const navbarRecipeLinks = document.querySelectorAll(`[id^="navRecipeLink_${categoryType}"]`);
    // const numberOfNavbarRecipeLinks = navbarRecipeLinks.length;
    // console.log(categoryType + ':' + numberOfNavbarRecipeLinks);

    for (let i = 1; i <= numberOfNavbarRecipeLinks; i++) {
        const navbarRecipeLink = document.getElementById(`navRecipeLink_${categoryType}${i}`);
        // console.log("navbarRecipeLink" + ':' + navbarRecipeLink);
        // console.log(navbarRecipeLink);
        const navbarRecipeTitle = document.getElementById(`navRecept_kategoria__div_title_${categoryType}${i}`);
        // console.log("navbarRecipeTitle" + ':' + navbarRecipeTitle);

        if (navbarRecipeLink && navbarRecipeTitle) {
            navbarRecipeLink.href += `?categoryID=${i}`;
        }
    }
}
populateCategoryLinksAndTitles("foetel", 20);
populateCategoryLinksAndTitles("kategoriak", 20);
populateCategoryLinksAndTitles("desszert", 20);
populateCategoryLinksAndTitles("navbar", 20);