function logout() {
    getData('/logout').then((response) => {
        if (response.loggedIn) {
            window.location.href = '/';
        }
        else if (!response.loggedIn) {
            window.location.href = '/';
        }
    }).catch((error) => {
        console.error('Error:', error);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    getData('/getLoggedInUserData').then((response) => {
        const user = document.getElementById('loggedin_username');
        user.innerHTML = `${response.username}`
    }).catch((error) => {
        console.error('Error:', error);
    });
});