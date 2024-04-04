var userid;

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

    var username_input = document.getElementById('username_input').value;
    var email_input = document.getElementById('email_input').value;

    var userinfos = {
        user_id: userid,
        new_username: username_input,
        new_email: email_input,
    };
    getData('/getLoggedInUserData').then((response) => {
        console.log(response);
        userinfos.user_id = response.user_id;
        console.log(userinfos.user_id)
    }).then(response => {
        putData("http://localhost:8000/api/updateUser", userinfos)
            .then((res) => {
                console.log(res);
                console.log("Felhasználói adatok mentve!");
            })
            .catch((err) => {
                console.log(err);
            })
    }).catch((error) => {
        console.error('Error:', error);
    });

}