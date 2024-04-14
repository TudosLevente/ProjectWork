function handleAcceptCookies() {
    var accepted = document.querySelector('.websidecookies');
    accepted.style.display = 'none';

    postData('/accept-cookies')
        .then(response => {
            console.log(response);
            if (response.ok) {
                accepted.style.display = 'none';
            }
        })
        .catch(error => {
            console.error('Error accepting cookies:', error);
        });
}