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

        postData("http://localhost:8000/api/login", data).then((response) => {
            if (response.status === 409) {
                alert("Ez a felhasználó nem létezik, vagy rossz jelszót adtál meg!");
            }
            else {
                response.json().then((data) => {
                    postData('/getLoginInfo', {
                        loggedIn: data.loggedIn,
                        user_id: data.user_id,
                        username: data.username,
                        email: data.email,
                        isVerified: data.isAdmin
                    }).then((response) => {
                    }).catch(error => {
                        console.error('Error:', error);
                    });

                    if (data.isAdmin) {
                        var button = document.querySelector('.logButton-frame');
                        button.style.fontSize = '20px';
                        button.innerText = 'Sikeres bejelentkezés';
                        button.style.borderColor = 'green';
                        button.style.backgroundColor = 'green';

                        setTimeout(function () {
                            window.location.href = '/adminPage';
                        }, 1000);
                    }
                    else {
                        var button = document.querySelector('.logButton-frame');
                        button.style.fontSize = '20px';
                        button.innerText = 'Sikeres bejelentkezés';
                        button.style.borderColor = 'green';
                        button.style.backgroundColor = 'green';

                        setTimeout(function () {
                            window.location.href = '/';
                        }, 1000);
                    }
                });
            }
        }).catch((error) => {
            console.error("Error:", error);
        });
    })
}
function togglePassword() {
    var password = document.getElementById("password");
    if (password.type === "password") {
        password.type = "text";
    } else {
        password.type = "password";
    }
}
function TESTGreenButton() {
    var button = document.querySelector('.logButton-frame');
    button.style.fontSize = '20px';
    button.innerText = 'Sikeres bejelentkezés';
    button.style.borderColor = 'green';
    button.style.backgroundColor = 'green';
}