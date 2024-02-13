function searchFunction(inputId) {
    var input = document.getElementById(inputId);
    var filter, ul, li, span, txtValue;
    filter = input.value.toUpperCase();
    ul = input.nextElementSibling.querySelector("ul");
    li = ul.getElementsByTagName('li');

    for (var i = 0; i < li.length; i++) {
        span = li[i].getElementsByTagName("span")[0];
        txtValue = span.textContent || span.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }

    if (filter !== "") {
        ul.style.display = "block";
    } else {
        ul.style.display = "none";
    }
}

function handleListItemClick(input, text) {
    input.value = text;
    var ul = input.nextElementSibling.querySelector("ul");
    ul.style.display = "none";
}

function showResults(resultsId) {
    var ul = document.getElementById(resultsId);
    ul.style.display = "block";
}

document.addEventListener('DOMContentLoaded', function () {
    getData('http://localhost:8000/api/ingredients')
        .then(ingredientData => {
            const uls = document.querySelectorAll('.searchResults ul');
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
        })
        .catch(error => {
            console.error("Error occurred:", error);
        });

    const inputs = document.querySelectorAll('.ingredient_inputs input[type="text"]');

    inputs.forEach(function (input) {
        input.addEventListener('keyup', function () {
            var inputId = this.id;
            searchFunction(inputId);
        });

        input.addEventListener('focus', function () {
            var resultsId = this.nextElementSibling.id;
            showResults(resultsId);
        });

        var lis = input.nextElementSibling.querySelectorAll('li');
        lis.forEach(function (li) {
            li.addEventListener('click', function () {
                handleListItemClick(input, this.textContent.trim());
            });
        });
    });
});