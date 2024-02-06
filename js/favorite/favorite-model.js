const mysql = require("mysql2");
const config = require("../App/config");
const Favorite = require("./favorite");

function getFavorites(req, res) {
    var con = mysql.createConnection(config.database);
    con.connect(function (err) {
        if (err) throw err;
        console.log('Sikeres csatlakozás az adatbázishoz!\nJó szórakozást!');
    })
    con.query('CALL getFavorites(?)', [req.params['id']], (err, result) => {
        if (err) throw err;
        res.send(result);
    })
}

async function addFavorite(req, res) {
    const favorite = new Favorite(
        null,
        null,
        null
    );

    var con = mysql.createConnection(config.database);
    con.connect(function (err) {
        if (err) throw err;
        console.log('Sikeres csatlakozás az adatbázishoz!\nJó szórakozást!');
    })

    const sql = 'INSERT INTO Favorite () Values ()';

    con.query(sql, (err, result) => {
        favorite.favorite_id = 0;
        favorite.recipe_id = 0;
        favorite.user_id = 0;

        con.connect(function (err) {
            if (err) throw err;
            console.log('Sikeres feltöltés!');
            console.log(result)
            res.send(favorite);
        })
    })
}

exports.getFavorites = getFavorites
exports.addFavorite = addFavorite