const adminsDiv = document.getElementById('admins');

function loadAdmins() {
    getData("/api/getAdmins").then((data) => {
        for (let i = 1; i <= data[0].length; i++) {
            const adminDiv = document.createElement("div");
            adminDiv.className = "admin-layout__manage-admins-data-div";

            adminDiv.innerHTML = `
            <div class="admin-layout__input-layout">
                <input readonly class="admin-layout__id" placeholder="ID" value="${data[0][i - 1].User_ID}">
                    <!-- <div class="admin-layout__input4">ID</div> -->
                <input readonly class="admin-layout__name2" placeholder="Admin név" value="${data[0][i - 1].Username}">
                    <!-- <div class="admin-layout__input2">Admin név</div> -->
                <input id="adminId_${data[0][i - 1].User_ID}" readonly class="admin-layout__email" placeholder="Email cím" value="${data[0][i - 1].Email}">
                    <!-- <div class="admin-layout__input2">Email cím</div> -->
            </div>
            <div class="admin-layout__button-layout">
                <button type="button" id="adminDelete_${data[0][i - 1].User_ID}" onclick="deleteAdmin(this.id)" class="admin-layout__delete-button">
                    <div class="admin-layout__text">Törlés</div>
                </button>
            </div>
            `;

            adminsDiv.appendChild(adminDiv);
        }
    }).catch((err) => {
        console.error(err);
    });
}

function cancelAdminUpload() {
    const admin_email = document.getElementById("admin_email");

    admin_email.value = '';
}

function uploadAdmin() {
    const admin_email = document.getElementById("admin_email");

    const data = {
        user_email: admin_email.value
    }

    putData("/api/giveAdminRole", data).then((reponse) => {
        admin_email.value = '';
        adminsDiv.innerHTML = "";
        loadAdmins();
    }).catch((err) => {
        console.error(err);
    });
}

function deleteAdmin(buttonId) {
    var id = document.getElementById(buttonId).getAttribute('id');
    id = id.split('_')[1];

    var admin_email = document.getElementById(`adminId_${id}`);

    const data = {
        user_email: admin_email.value
    }

    deleteData("/api/deleteAdminRole", data).then((response) => {
        adminsDiv.innerHTML = "";
        loadAdmins();
    }).catch((error) => {
        console.error(error);
    });
}

loadAdmins();