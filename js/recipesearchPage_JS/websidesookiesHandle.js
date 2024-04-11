function handleAcceptCookies() {
    var button = document.querySelector('.websidecookies-agreebutton');
    var accepted = document.querySelector('.websidecookies');
    accepted.style.display = 'none';
    fetch('/accept-cookies', {
        method: 'POST'
    })
        .then(response => {
            if (response.ok) {
                console.log('Cookies accepted');
                accepted.style.display = 'none';
            } else {
                console.error('Failed to accept cookies');
            }
        })
        .catch(error => {
            console.error('Error accepting cookies:', error);
        });
}