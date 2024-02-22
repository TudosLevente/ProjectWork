const mysql = require("mysql2");
const config = require("../App/config");
const Ingredient = require("./ingredient");

function getIngredients(req, res) {
    var con = mysql.createConnection(config.database);
    con.connect(function (err) {
        if (err) throw err;
    })
    con.query('SELECT getIngredients()', (err, result) => {
        if (err) throw err;
        res.send(result);
    })
}

exports.getIngredients = getIngredients