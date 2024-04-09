function signUpnewspaper() {
    var newspapersignup_form = document.getElementById('newspapersignup_form');
    var thanksmessage_div = document.querySelector('.thanksmessage_div');
    var newspapersignup_form_email_input = document.querySelector('#newspapersignup_form_email_input');

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (newspapersignup_form_email_input.value.trim().length > 0 && emailRegex.test(newspapersignup_form_email_input.value.trim())) {
        newspapersignup_form.style.display = 'none';
        thanksmessage_div.style.display = 'flex';

        setInterval(function () {
            newspapersignup_form.style.display = 'block';
            newspapersignup_form_email_input.innerHTML = '';
            thanksmessage_div.style.display = 'none';
        }, 3000);
    } else {
        if (newspapersignup_form_email_input.value.trim().length === 0) {
            newspapersignup_form_email_input.setCustomValidity("Kérjük, adjon meg egy e-mail címet.");
        } else {
            newspapersignup_form_email_input.setCustomValidity("");
        }
        newspapersignup_form_email_input.reportValidity();
    }
}
