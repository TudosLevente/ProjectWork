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