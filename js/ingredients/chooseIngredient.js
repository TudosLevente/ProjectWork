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
}

function handleListItemClick(input, text) {
    input.value = text;
}

function showResults(resultsId) {
    var div = document.getElementById(resultsId);
    div.style.display = "block";
}

function hideResults(resultsId) {
    setTimeout(function () {
        var ul = document.getElementById(resultsId);
        ul.style.display = "none";
    }, 1000);
}

async function pickIngredient() {
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
}