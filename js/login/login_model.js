const mysql = require("mysql2");
const config = require("../App/config");
const jwt = require("jsonwebtoken");

function adminLogin(req, res) {

    try {
        const { email, password } = req.body;
        console.log(req.body);
        if (!(email && password)) {
            res.status(400).send("Töltsd ki az összes adatot!");
        }
        var con = mysql.createConnection(config.database);

        con.connect(function (err) {
            if (err) throw err;
            console.log('sikeres csatlakozás');
        })

        const sql = 'call adminBejelentkezes(?,?)';

        con.query(sql, [email, password], (err, result) => {
            console.log(result);
            if (err) throw err;
            if (result[0].length > 0) {
                const token = jwt.sign({
                    felhasznalo_id: result[0][0].felhasznalo_id,
                    email: result[0][0].email
                }, config.TokenKey,
                    {
                        expiresIn: "2h",
                    });

                let user = result[0][0];
                con.query('call felhTokenFrissites(?,?)', [result[0][0].felhasznalo_id, token], (err, result, fields) => {
                    if (err) throw err;
                    user.token = token;
                    res.send(result);
                })
            }
            else {
                res.status(401).send("nem engedélyezett");
            }
        })
    } catch (error) {

    }
}


function login(req, res) {

    try {
        const { email, password } = req.body;
        console.log(req.body);
        if (!(email && password)) {
            res.status(400).send("Töltsd ki az összes adatot!");
        }
        var con = mysql.createConnection(config.database);
        con.connect(function (err) {
            if (err) throw err;
            console.log('sikeres csatlakozás');
        })

        const sql = 'call felhBejelentkezes(?,?)';

        con.query(sql, [email, password], (err, result) => {
            console.log(result);
            if (err) throw err;
            if (result[0].length > 0) {
                const token = jwt.sign({
                    user_id: result[0][0].user_id,
                    email: result[0][0].email
                }, config.TokenKey,
                    {
                        expiresIn: "2h",
                    });

                let user = result[0][0];
                con.query('call felhTokenFrissites(?,?)', [result[0][0].user_id, token], (err, result, fields) => {
                    if (err) throw err;
                    user.token = token;
                    res.send(result);
                })
            }
            else {
                res.status(401).send("nem engedélyezett");
            }
        })
    } catch (error) {

    }
}

exports.login = login
exports.adminLogin = adminLogin