function handleTextarea(event) {
    var textarea = event.target;
    var sendButtonHeight = document.querySelector('.send-button').offsetHeight;
    textarea.style.height = 'auto';
    textarea.style.height = ((textarea.scrollHeight) + sendButtonHeight) + 'px';
}

async function uploadComment() {
    try {
        await sendMessage();
        getData(`/api/getComment/${recipeId}`).then((response) => {
            for (let i = 0; i < response[0].length; i++) {

                insertCommentsIntoHTML(response[0][i].Comment_Text, response[0][i].Date_Posted, response[0][i].Username, response[0][i].Comment_ID);
            }
        })
    }
    catch (error) {
        console.error("Error uploading comment:", error);
    }
}

async function sendMessage() {
    var textarea = document.querySelector('.recipe-comments-input');
    var message = textarea.value.trim();
    if (message !== "") {
        textarea.value = "";
        textarea.style.height = 'auto';
    }

    if (loggedInUserId !== null) {
        var commentData = {
            comment_text: message,
            recipe_id: recipeId,
            user_id: loggedInUserId
        };

        return new Promise((resolve, reject) => {
            postData('http://localhost:8000/api/uploadComment', commentData)
                .then((res) => {
                    resolve();
                })
                .catch((err) => {
                    console.log(err);
                });
        });
    }
    else {
        alert("Ahhoz, hogy kommentelni tudjon egy recept alá, be kell jelentkeznie!");
    }
}
