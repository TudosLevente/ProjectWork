module.exports = class User {
    user_id = null;
    username = "";
    email = "";
    token = "";

    constructor (user_id = null,username,email,token = "" ) {
        this.user_id = user_id;
        this.username = username;
        this.email = email;
        this.token = token;
    }
}