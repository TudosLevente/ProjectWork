document.addEventListener('DOMContentLoaded', function () {
    getData('/getLoggedInUserData').then((response) => {
        console.log(response);
        if (response.loggedIn === false) {
            window.location.href = '/';
        }

        var username_inInput = document.getElementById('username_input');
        var username_shown = document.getElementById('username_input_shown');
        username_inInput.value = response.username;
        username_shown.innerHTML = response.username;

        var email_inInput = document.getElementById('email_input');
        var email_shown = document.getElementById('email_input_shown');
        email_inInput.value = response.email;
        email_shown.innerHTML = response.email;

    }).catch((error) => {
        console.error('Error:', error);
    });
});