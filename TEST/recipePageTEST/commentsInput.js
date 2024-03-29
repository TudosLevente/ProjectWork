function handleTextarea(event) {
    var textarea = event.target;
    var sendButtonHeight = document.querySelector('.send-button').offsetHeight;
    textarea.style.height = 'auto';
    textarea.style.height = ((textarea.scrollHeight) + sendButtonHeight) + 'px';
}

function sendMessage() {
    var textarea = document.querySelector('.recipe-comments-input');
    var message = textarea.value.trim();
    if (message !== "") {
        console.log("Sending message:", message);

        textarea.value = "";
        textarea.style.height = 'auto';
    }

    console.log(message);

    var commentData = {
        comment_text: message,
        recipe_id: recipeId,
        user_id: loggedInUserId
    };

    postData('http://localhost:8000/api/uploadComment', commentData)
        .then((res) => {
            console.log(res);
            console.log("Recept feltölve!")
        })
        .catch((err) => {
            console.log(err);
        });
}
