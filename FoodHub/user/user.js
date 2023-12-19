module.exports = class User {
    user_id = null;
    name = "";
    email = "";
    token = "";

    constructor (user_id = null,name,email,token = "" ) {
        this.user_id = user_id;
        this.name = name;
        this.email = email;
        this.token = token;
    }
}