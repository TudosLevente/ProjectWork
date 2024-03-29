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
    var ul = input.nextElementSibling.querySelector("ul");
    ul.style.display = "none";
}

function showResults(resultsId) {
    var ul = document.getElementById(resultsId);
    ul.style.display = "block";
}

function hideResults(resultsId) {
    var ul = document.getElementById(resultsId);
    ul.style.display = "none";
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

async function pickMeasurement() {
    const inputs = document.querySelectorAll('.measurement_inputs input[type="text"]');

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


/*
    switch (text.toLowerCase()) {
        case "milligramm":
            input.value = "mg";
            break;
        case "gramm":
            input.value = "g";
            break;
        case "dekagramm":
            input.value = "dkg";
            break;
        case "kilogramm":
            input.value = "kg";
            break;
        case "teáskanál":
            input.value = "tk";
            break;
        case "evőkanál":
            input.value = "ek";
            break;
        case "csésze":
            input.value = "cup";
            break;
        case "pint":
            input.value = "pt";
            break;
        case "kvart":
            input.value = "qt";
            break;
        case "gallon":
            input.value = "gal";
            break;
        case "milliliter":
            input.value = "ml";
            break;
        case "centiliter":
            input.value = "cl";
            break;
        case "deciliter":
            input.value = "dl";
            break;
        case "liter":
            input.value = "l";
            break;
        default:
            input.value = text;
    }
*/