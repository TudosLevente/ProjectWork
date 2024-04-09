const mysql = require("mysql2");
const config = require("../App/config");
const jwt = require("jsonwebtoken");
const User = require("./user");

function getAllUserInfos(req, res) {
    var con = mysql.createConnection(config.database);

    con.connect(function (err) {
        if (err) throw err;
    });

    con.query('select * from Users', (err, result) => {
        if (err) throw err;
        res.send(result);
    });

    con.end(function (err) {
        if (err) throw err;
    });
}

function getUserDataFromId(req, res) {
    var con = mysql.createConnection(config.database);

    con.connect(function (err) {
        if (err) throw err;
        console.log('sikeres csatlakozás');
    });

    con.query('CALL getAllUserInfos(?) ', [req.params['id']], (err, result) => {
        if (err) throw err;
        res.send(result);
    });

    con.end(function (err) {
        if (err) throw err;
    });
}

function getUserRecipes(req, res) {
    var con = mysql.createConnection(config.database);

    con.connect(function (err) {
        if (err) throw err;
    });

    con.query('CALL getAllUserRecipes(?) ', [req.params['id']], (err, result) => {
        if (err) throw err;
        res.send(result);
    });

    con.end(function (err) {
        if (err) throw err;
    });
}

function updateUser(req, res) {
    var con = mysql.createConnection(config.database);

    con.connect(function (err) {
        if (err) throw err;
    });

    const sql = 'CALL UpdateUser(?,?,?)';

    con.query(sql, [req.body.user_id, req.body.new_username, req.body.new_email], (err, result) => {
        con.connect(function (err) {
            if (err) throw err;
        })
    });

    con.end(function (err) {
        if (err) throw err;
    });
}

async function regUser(req, res) {

    const user = new User(null, req.body.username, req.body.email, null);

    if (!(user.username && user.email && req.body.password)) {
        res.status(400).send("Töltsd ki az adatatokat rendesen!");
    }

    var con = mysql.createConnection(config.database);

    con.connect(function (err) {
        if (err) throw err;
    });

    const sql = 'INSERT INTO Users (Username,Email,Password) values (?,?,?)';
    con.query(sql, [req.body.username, req.body.email, req.body.password], (err, result) => {
        if (err) throw err;
        const token = jwt.sign(
            {
                user_id: result.insertId,
                email: user.email
            },
            config.TokenKey,
            {
                expiresIn: "2h",
            });
        user.token = "regeltFelh";
        user.user_id = result.insertId;

        con.connect(function (err) {
            if (err) throw err;
        });

        con.query('call felhTokenFrissites(?,?)', [user.user_id, token], (err, result, fields) => {
            if (err) throw err;
            res.send(user);
        });
    });
}

exports.getAllUserInfos = getAllUserInfos
exports.getUserRecipes = getUserRecipes
exports.getUserDataFromId = getUserDataFromId
exports.regUser = regUser
exports.updateUser = updateUser