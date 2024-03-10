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
}
