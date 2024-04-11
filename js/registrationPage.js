var passwordIsCorrect = false;

function RegButton() {
    var usernameInput = document.getElementById("username");
    var emailInput = document.getElementById("email");
    var passwordInput = document.getElementById("password");
    var passwordAgainInput = document.getElementById("passwordAgain");

    if (emailInput.value.trim() === "" || passwordInput.value.trim() === "" || usernameInput.value.trim() === "") {
        alert("Kérjük, töltse ki mind az felhasználónév-, email- és a jelszómezőket.");
        return;
    }

    var passNotMatching = document.getElementById("show-pass-not-matching");
    var passwordMatching = false;

    if (passwordInput.value.trim() !== passwordAgainInput.value.trim()) {
        passNotMatching.style.display = 'block';
        passNotMatching.style.visibility = 'visible';
        return false;
    }
    else {
        passNotMatching.style.display = 'none';
        passwordMatching = true;
    }

    if (passwordIsCorrect && passwordMatching) {
        const data = {
            username: usernameInput.value,
            email: emailInput.value,
            password: passwordInput.value
        };
        postData("http://localhost:8000/api/regUser", data).then((response) => {
            if (response.status === 200) {
                var button = document.querySelector('.regButton-frame');
                button.style.fontSize = '20px';
                button.innerText = 'Sikeres regisztráció';
                button.style.borderColor = 'green';
                button.style.backgroundColor = 'green'

                setTimeout(function () {
                    window.location.href = '../html/loginPage.html';
                }, 1500);
            }
            else if (response.status === 400) {
                alert("Kérjük használjon megfelelő formátumú email címet!");
            }
            else if (response.status === 409) {
                alert("Ezzel az email címmel már van regisztrált felhasználó!");
            }
        });
    }
    else {
        alert("A jelszó nem felel meg a követelményeknek!");
    }

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
    var inputEmailValue = document.getElementById("email");

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
            )

            if (showPasswordRequirement(showPassReq, checkLength(chrLength, inputLength), checkUpperCase(prCase, inputValue.value), checkLowerCase(lwrCase, inputValue.value), checkForNumber(numLength, inputValue.value))) {
                passwordIsCorrect = true;
            }

        }

    });
})