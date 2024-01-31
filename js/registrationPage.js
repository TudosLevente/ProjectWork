function RegButton() {
    var usernameInput = document.getElementById("username");
    var emailInput = document.getElementById("email");
    var passwordInput = document.getElementById("password");

    if (emailInput.value.trim() === "" || passwordInput.value.trim() === "" || usernameInput.value.trim() === "") {
        alert("Kérjük, töltse ki mind az felhasználónév-, email- és a jelszómezőket.");
        return;
    }

    const form = document.getElementById('regisztracio');
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            new FormData(form);
        }) 

        form.addEventListener("formdata",(e) => {
            const formData = e.formData;
            const data = {
                nev: formData.get('username'),
                email: formData.get('email'),
                jelszo: formData.get('password')
            }    
            postData("http://localhost:8000/api/regFelh", data);
        })

    var button = document.querySelector('.text-wrapper-7');
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