function RegButton() {
    var usernameInput = document.getElementById("username");
    var emailInput = document.getElementById("email");
    var passwordInput = document.getElementById("password");
    var passwordAgainInput = document.getElementById("passwordAgain");

    if (emailInput.value.trim() === "" || passwordInput.value.trim() === "" || usernameInput.value.trim() === "") {
        alert("Kérjük, töltse ki mind az felhasználónév-, email- és a jelszómezőket.");
        return;
    }

    // var passNotMatching = document.getElementById("show-pass-not-matching");

    // if (passwordInput.value.trim() !== passwordAgainInput.value.trim()) {
    //     passNotMatching.style.display = 'block';
    //     passNotMatching.style.visibility = 'visible';
    //     return;
    // }
    // else {
    //     passNotMatching.style.display = 'none';
    // }

    const form = document.getElementById('regisztracio');
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        new FormData(form);
    })

    form.addEventListener("formdata", () => {
        const data = {
            username: usernameInput.value,
            email: emailInput.value,
            password: passwordInput.value
        };
        postData("http://localhost:8000/api/regUser", data);

    })

    var button = document.querySelector('.regisztralas');
    button.style.fontSize = '31px';
    button.innerText = 'Sikeres regisztráció';
    button.style.borderColor = 'green';
    button.style.backgroundColor = 'green';

    setTimeout(function () {
        window.location.href = '../html/loginPage.html';
    }, 1500);
}

function togglePassword() {
    var password = document.getElementById("password");
    if (password.type === "password") {
        password.type = "text";
    } else {
        password.type = "password";
    }
}

function togglePasswordAgain() {
    var password = document.getElementById("passwordAgain");
    if (password.type === "password") {
        password.type = "text";
    } else {
        password.type = "password";
    }
}

document.addEventListener('DOMContentLoaded', function (event) {
    var inputValue = document.getElementById("password");

    inputValue.addEventListener("input", function () {
        var showPassReq = document.getElementById("show-pass-req");

        var inputLength = inputValue.value.length;

        if (inputLength == 0) {
            showPassReq.style.display = 'none';
        }
        else {
            showPassReq.style.display = 'block';
            showPassReq.style.visibility = 'visible';

            var chrLength = document.getElementById("chrLength");
            var numLength = document.getElementById("numLength");
            var prCase = document.getElementById("prCase");
            var lwrCase = document.getElementById("lwrCase");

            showPasswordRequirement(
                showPassReq,
                checkLength(chrLength, inputLength),
                checkUpperCase(prCase, inputValue.value),
                checkLowerCase(lwrCase, inputValue.value),
                checkForNumber(numLength, inputValue.value)
            );

        }

    });
})