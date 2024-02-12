document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('searchResults');

    container.addEventListener('click', function (event) {

    });
});

function searchFunction() {
    var input, filter, ul, li, span, i, txtValue;
    input = document.getElementById('searchInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("searchResults");
    li = ul.getElementsByTagName('li');

    for (i = 0; i < li.length; i++) {
        span = li[i].getElementsByTagName("span")[0];
        txtValue = span.textContent || span.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
    // Show results if there is some input
    if (filter !== "") {
        ul.style.display = "block";
    } else {
        ul.style.display = "none";
    }
}

function showResults() {
    var ul = document.getElementById("searchResults");
    ul.style.display = "block";
}

// Function to handle clicking on list items
document.addEventListener('DOMContentLoaded', function () {
    var lis = document.querySelectorAll('#searchResults li');
    for (var i = 0; i < lis.length; i++) {
        lis[i].addEventListener('click', function (e) {
            var text = e.target.textContent;
            document.getElementById('searchInput').value = text;
            var ul = document.getElementById("searchResults");
            ul.style.display = "none";
        });
    }
});