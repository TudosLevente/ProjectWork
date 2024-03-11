function decreaseServing() {
    var servingSize = document.getElementById("serving_size");
    var currentSize = parseInt(servingSize.innerHTML);
    if (currentSize > 1) {
        servingSize.innerHTML = currentSize - 1;
    }
}

function increaseServing() {
    var servingSize = document.getElementById("serving_size");
    var currentSize = parseInt(servingSize.innerHTML);
    servingSize.innerHTML = currentSize + 1;
}