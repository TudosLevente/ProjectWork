function toggleInputs() {
    var containers = document.querySelectorAll("#username_input, #password_input, #email_input, #input_edit_icon");
    containers.forEach(function (container) {
        container.style.backgroundColor = 'transparent';
        container.style.display = 'block';
    });

    var modifybutton = document.getElementById('modify_button');
    var buttonlayout = document.getElementById('button_layout');

    modifybutton.style.display = 'none';

    if (modifybutton.style.display === 'none') {
        buttonlayout.style.display = 'flex';
    }
}

function CancelButton() {
    var username_inInput = document.getElementById('username_input');
    username_inInput.value = response.username;

    var email_inInput = document.getElementById('email_input');
    email_inInput.value = response.email;

    var containers = document.querySelectorAll("#username_input, #password_input, #email_input, #input_edit_icon");
    containers.forEach(function (container) {
        container.style.display = 'none';
    });

    var modifybutton = document.getElementById('modify_button');
    var buttonlayout = document.getElementById('button_layout');

    modifybutton.style.display = 'flex';

    if (modifybutton.style.display === 'flex') {
        buttonlayout.style.display = 'none';
    }
}

function SaveButton() {
    var containers = document.querySelectorAll("#username_input, #password_input, #email_input, #input_edit_icon");
    containers.forEach(function (container) {
        container.style.display = 'none';
    });

    var modifybutton = document.getElementById('modify_button');
    var buttonlayout = document.getElementById('button_layout');

    modifybutton.style.display = 'flex';

    if (modifybutton.style.display === 'flex') {
        buttonlayout.style.display = 'none';
    }
}