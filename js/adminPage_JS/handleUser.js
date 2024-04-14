const usersDiv = document.getElementById('users');

function loadUsers() {
    getData("/api/users").then((data) => {
        for (let i = 1; i <= data.length; i++) {
            const userDiv = document.createElement("div");
            userDiv.className = "users-layout__manage-users-data-div";
            userDiv.innerHTML = `
              <div class="users-layout__input-layout">
                <input readonly class="users-layout__id" placeholder="ID" value="${data[i - 1].User_ID}">
                <!-- <div class="users-layout__input4">ID</div> -->
                <input id="userName_${data[i - 1].User_ID}" readonly class="users-layout__name2" placeholder="Felhasználó név" value="${data[i - 1].Username}">
                <!-- <div class="users-layout__input2">Felhasználó név</div> -->
                <input id="userEmail_${data[i - 1].User_ID}" readonly class="users-layout__email" placeholder="Email cím" value="${data[i - 1].Email}">
                <!-- <div class="users-layout__input2">Email cím</div> -->
              </div>
              <div class="users-layout__button-layout" id="buttonLayout_${data[i - 1].User_ID}">
                <button type="button" id="deleteBtn_${data[i - 1].User_ID}" onclick="deleteUser(this.id)" class="users-layout__delete-button">
                  <div class="users-layout__text">Törlés</div>
                </button>
                <button type="button" id="modifyBtn_${data[i - 1].User_ID}" onclick="modifyUser(this.id)" class="users-layout__modify-button">
                  <div class="users-layout__text">Módosítás</div>
                </button>
              </div>
            `

            usersDiv.appendChild(userDiv);
        }
    }).catch((err) => {
        console.error(err);
    });
}

function addUser() {
    var usernameInput = document.getElementById("username");
    var emailInput = document.getElementById("email");
    var passwordInput = document.getElementById("password");

    const data = {
        username: usernameInput.value,
        email: emailInput.value,
        password: passwordInput.value
    };

    postData("http://localhost:8000/api/regUser", data).then((response) => {
        if (response.status === 200) {
            usernameInput.value = '';
            emailInput.value = '';
            passwordInput.value = '';
            usersDiv.innerHTML = "";
            loadUsers();
        }
        else if (response.status === 409) {
            alert("Ezzel az email címmel már van regisztrált felhasználó!");
        }
    });
}

function cancelAddUser() {
    var usernameInput = document.getElementById("username");
    var emailInput = document.getElementById("email");
    var passwordInput = document.getElementById("password");

    usernameInput.value = '';
    emailInput.value = '';
    passwordInput.value = '';
}

function deleteUser(buttonId) {
    var id = document.getElementById(buttonId).getAttribute('id');
    id = id.split('_')[1];

    var user_input = document.getElementById(`userEmail_${id}`);

    data = {
        email: user_input.value
    }

    deleteData("/api/deleteUser", data).then((response) => {
        usersDiv.innerHTML = "";
        loadUsers();
    }).catch((err) => {
        console.error(err);
    });
}

var stored_username = "";
var stored_email = "";

function modifyUser(buttonId) {
    var id = document.getElementById(buttonId).getAttribute('id');
    id = id.split('_')[1];

    const name_input = document.getElementById(`userName_${id}`);
    const email_input = document.getElementById(`userEmail_${id}`);

    name_input.readOnly = false;
    email_input.readOnly = false;

    stored_username = name_input.value;
    stored_email = email_input.value;

    var buttonLayout = document.getElementById(`buttonLayout_${id}`);
    buttonLayout.innerHTML = `
    <button type="button" id="cancelModifyUser_${id}" onclick="cancelModifyUser(this.id)" class="users-layout__delete-button">
        <div class="users-layout__text">Mégse</div>
    </button>
    <button type="button" id="saveUser_${id}" onclick="saveUser(this.id)" class="users-layout__modify-button">
        <div class="users-layout__text">Mentés</div>
    </button>`;
}

function cancelModifyUser(buttonId) {
    var id = document.getElementById(buttonId).getAttribute('id');
    id = id.split('_')[1];

    const name_input = document.getElementById(`userName_${id}`);
    const email_input = document.getElementById(`userEmail_${id}`);

    name_input.value = stored_username;
    name_input.readOnly = true;
    email_input.value = stored_email;
    email_input.readOnly = true;
    stored_username = "";
    stored_email = "";

    var buttonLayout = document.getElementById(`buttonLayout_${id}`);
    buttonLayout.innerHTML = `
    <button type="button" id="deleteBtn_${id}" onclick="deleteUser(this.id)" class="users-layout__delete-button">
        <div class="users-layout__text">Törlés</div>
    </button>
    <button type="button" id="modifyBtn_${id}" onclick="modifyUser(this.id)" class="users-layout__modify-button">
        <div class="users-layout__text">Módosítás</div>
    </button>`;
}

function saveUser(buttonId) {
    var id = document.getElementById(buttonId).getAttribute('id');
    id = id.split('_')[1];

    const name_input = document.getElementById(`userName_${id}`);
    const email_input = document.getElementById(`userEmail_${id}`);

    const data = {
        user_id: id,
        new_username: name_input.value,
        new_email: email_input.value
    };

    putData("/api/updateUser", data).then((response) => {
    }).catch((error) => {
        console.error(error);
    });

    var buttonLayout = document.getElementById(`buttonLayout_${id}`);
    buttonLayout.innerHTML = `
    <button type="button" id="deleteBtn_${id}" onclick="deleteUser(this.id)" class="users-layout__delete-button">
        <div class="users-layout__text">Törlés</div>
    </button>
    <button type="button" id="modifyBtn_${id}" onclick="modifyUser(this.id)" class="users-layout__modify-button">
        <div class="users-layout__text">Módosítás</div>
    </button>`;
}

loadUsers();