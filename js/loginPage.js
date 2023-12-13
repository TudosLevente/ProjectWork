function LoginButton() {
    var emailInput = document.getElementById("email");
    var passwordInput = document.getElementById("password");
    if (emailInput.value.trim() === "" || passwordInput.value.trim() === "") {
        alert("Kérjük, töltse ki mind az email-, mind a jelszómezőket.");
        return;
    }

    var button = document.querySelector('.text-wrapper-7');
    button.style.fontSize = '31px';
    button.innerText = 'Sikeres bejelentkezés';
    button.style.borderColor = 'green';
    button.style.backgroundColor = 'green';

    setTimeout(function () {
        window.location.href = '../html/mainPage.html';
    }, 1000);
}
function togglePassword() {
    var password = document.getElementById("password");
    if (password.type === "password") {
        password.type = "text";
    } else {
        password.type = "password";
    }
}