function checkLength(styleName, inputLength) {
    if (inputLength >= 5) {
        styleName.style.backgroundColor = "green";
        setTimeout(function () {
            styleName.style.display = "none";
            styleName.style.visibility = "hidden";
        }, 500);
        return true;
    }
    else {
        styleName.style.backgroundColor = "red";
        styleName.style.display = "block";
        styleName.style.visibility = "visible";
        return false;
    }
}

function checkUpperCase(styleName, inputText) {
    var containsUppercase = /[A-Z]/.test(inputText);

    if (containsUppercase) {
        styleName.style.backgroundColor = "green";
        setTimeout(function () {
            styleName.style.display = "none";
            styleName.style.visibility = "hidden";
        }, 500);
        return true;
    }
    else {
        styleName.style.backgroundColor = "red";
        styleName.style.display = "block";
        styleName.style.visibility = "visible";
        return false;
    }
}

function checkLowerCase(styleName, inputText) {
    var containsLowercase = /[a-z]/.test(inputText);

    if (containsLowercase) {
        styleName.style.backgroundColor = "green";
        setTimeout(function () {
            styleName.style.display = "none";
            styleName.style.visibility = "hidden";
        }, 500);
        return true;
    }
    else {
        styleName.style.backgroundColor = "red";
        styleName.style.display = "block";
        styleName.style.visibility = "visible";
        return false;
    }
}

function checkForNumber(styleName, inputValue) {
    var containsNumber = /\d/.test(inputValue);

    if (containsNumber) {
        styleName.style.backgroundColor = "green";
        setTimeout(function () {
            numLength.style.display = "none";
            numLength.style.visibility = "hidden";
        }, 500);
        return true;
    }
    else {
        styleName.style.backgroundColor = "red";
        styleName.style.display = "block";
        styleName.style.visibility = "visible";
        return false;
    }
}

function showPasswordRequirement(show_pass_req, checkLength, checkUpperCase, checkLowerCase, checkForNumber) {
    if (checkLength && checkUpperCase && checkLowerCase && checkForNumber) {
        show_pass_req.style.display = 'none';
        return true;
    }
    else {
        show_pass_req.style.display = 'block';
        show_pass_req.style.visibility = 'visible';
        return false;
    }
}