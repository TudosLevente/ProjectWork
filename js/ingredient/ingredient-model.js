const mysql = require("mysql2");
const config = require("../App/config");
const Ingredient = require("./ingredient");

function getIngredients(req, res) {
    var con = mysql.createConnection(config.database);

    con.connect(function (err) {
        if (err) throw err;
    });

    con.query('CALL getIngredients()', (err, result) => {
        if (err) throw err;
        res.send(result);
    });

    con.end(function (err) {
        if (err) throw err;
    });
}

exports.getIngredients = getIngredients