module.exports = class User {
    felhasznalo_id = null;
    username = "";
    email = "";
    token = "";

    constructor (felhasznalo_id = null,nev,email,token = "" ) {
        this.felhasznalo_id = felhasznalo_id;
        this.username = username;
        this.email = email;
        this.token = token;
    }
}