const mysql = require("mysql2");
const config = require("../App/config");
const Favorite = require("./favorite");

function getFavorites(req, res) {
    var con = mysql.createConnection(config.database);
    con.connect(function (err) {
        if (err) throw err;
    });

    con.query('CALL getFavorites(?)', [req.params['id']], (err, result) => {
        if (err) throw err;
        res.send(result);
    });

    con.end(function (err) {
        if (err) throw err;
    });
}

async function addFavorite(req, res) {
    const favorite = new Favorite(
        null,
        req.body.user_id,
        req.body.recipe_id
    );

    var con = mysql.createConnection(config.database);

    const sql = 'INSERT INTO Favorites (User_ID,Recipe_ID) Values (?,?)';

    con.query(sql, [favorite.user_id, favorite.recipe_id], (err, result) => {
        con.connect(function (err) {
            if (err) throw err;
            res.send(favorite);
        })

        con.end(function (err) {
            if (err) throw err;
        });
    });
}

async function removeFavorite(req, res) {
    const favorite = new Favorite(
        null,
        req.body.user_id,
        req.body.recipe_id
    );

    var con = mysql.createConnection(config.database);

    const sql = 'DELETE FROM Favorites WHERE User_ID = ? AND Recipe_ID = ?';

    con.query(sql, [favorite.user_id, favorite.recipe_id], (err, result) => {
        con.connect(function (err) {
            if (err) throw err;
            res.send(favorite);
        })

        con.end(function (err) {
            if (err) throw err;
        });
    });
}

exports.getFavorites = getFavorites
exports.addFavorite = addFavorite
exports.removeFavorite = removeFavorite