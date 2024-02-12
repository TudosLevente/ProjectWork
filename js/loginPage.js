function LoginButton() {
    var emailInput = document.getElementById("email");
    var passwordInput = document.getElementById("password");
    if (emailInput.value.trim() === "" || passwordInput.value.trim() === "") {
        alert("Kérjük, töltse ki mind az email-, mind a jelszómezőket.");
        return;
    }

    const form = document.getElementById('bejelentkezes');
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        new FormData(form);
    })

    form.addEventListener("formdata", (e) => {
        const formData = e.formData;
        const data = {
            email: emailInput.value,
            password: passwordInput.value
        }

        if (data.email === "admin@gmail.com" && data.password === "admin") {
            postData("http://localhost:8000/api/adminLogin", data)
        }
        else {
            postData("http://localhost:8000/api/login", data)
        }
    })

    var button = document.querySelector('.logButton-frame');
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