getData('http://localhost:8000/api/ingredients')
    .then(ingredientData => {
        const uls = document.querySelectorAll('.ingredientsResults ul');
        uls.forEach(function (ul) {
            ingredientData.forEach(function (ingredient) {
                for (var i = 0; i < ingredient.length; i++) {
                    const li = document.createElement('li');
                    const span = document.createElement('span');
                    span.textContent = ingredient[i].Ingredient_Name;
                    li.appendChild(span);
                    ul.appendChild(li);
                }
            });
        });
        pickIngredient();
    })
    .catch(error => {
        console.error("Error occurred:", error);
    });