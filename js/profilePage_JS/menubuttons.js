function toggleDataDiv() {
    try {
        try {
            var datadiv = document.getElementById('my_data_div');
            var recipesdiv = document.getElementById('my_recipes_div');
            var favoritesdiv = document.getElementById('my_favorites_div');

            var datadivbutton = document.getElementById('DataDivButton');
            var recipesdivbutton = document.getElementById('RecipesDivButton');
            var favoritesdivbutton = document.getElementById('FavoritesDivButton');

            var loadingscreen = document.getElementById('loading_screen');
        }
        catch (e) {
            console.error;
            console.log(e);
        }

        datadiv.style.display = 'flex';

        if (datadiv.style.display == 'flex') {
            recipesdiv.style.display = 'none';
            datadivbutton.style.backgroundColor = 'rgba(255, 153, 0, 0.90)';
            favoritesdiv.style.display = 'none';
        }
        // datadivbutton.style.backgroundColor = '#B02000';
        datadivbutton.style.backgroundColor = 'rgba(255, 153, 0, 0.90)';
        recipesdivbutton.style.backgroundColor = '#ffd392';
        favoritesdivbutton.style.backgroundColor = '#ffd392';


    } catch (error) {
        console.error("Error:", error);
    }
}

function toggleRecipesDiv() {
    try {
        try {
            var datadiv = document.getElementById('my_data_div');
            var recipesdiv = document.getElementById('my_recipes_div');
            var favoritesdiv = document.getElementById('my_favorites_div');

            var datadivbutton = document.getElementById('DataDivButton');
            var recipesdivbutton = document.getElementById('RecipesDivButton');
            var favoritesdivbutton = document.getElementById('FavoritesDivButton');

            var loadingscreen = document.getElementById('loading_screen');
        }
        catch (e) {
            console.error;
            console.log(e);
        }

        recipesdiv.style.display = 'flex';

        if (recipesdiv.style.display = 'flex') {
            datadiv.style.display = 'none';
            favoritesdiv.style.display = 'none';
        }
        datadivbutton.style.backgroundColor = '#ffd392';
        recipesdivbutton.style.backgroundColor = 'rgba(255, 153, 0, 0.90)';
        // recipesdivbutton.style.backgroundColor = '#B02000';
        favoritesdivbutton.style.backgroundColor = '#ffd392';


    } catch (error) {
        console.error("Error:", error);
    }
}

function toggFavoritesDiv() {
    try {
        try {
            var datadiv = document.getElementById('my_data_div');
            var recipesdiv = document.getElementById('my_recipes_div');
            var favoritesdiv = document.getElementById('my_favorites_div');

            var datadivbutton = document.getElementById('DataDivButton');
            var recipesdivbutton = document.getElementById('RecipesDivButton');
            var favoritesdivbutton = document.getElementById('FavoritesDivButton');

            var loadingscreen = document.getElementById('loading_screen');
        }
        catch (e) {
            console.error;
            console.log(e);
        }

        favoritesdiv.style.display = 'flex';

        if (favoritesdiv.style.display = 'flex') {
            datadiv.style.display = 'none';
            recipesdiv.style.display = 'none';
        }
        datadivbutton.style.backgroundColor = '#ffd392';
        recipesdivbutton.style.backgroundColor = '#ffd392';
        favoritesdivbutton.style.backgroundColor = 'rgba(255, 153, 0, 0.90)';
        // favoritesdivbutton.style.backgroundColor = '#B02000';


    } catch (error) {
        console.error("Error:", error);
    }
}
