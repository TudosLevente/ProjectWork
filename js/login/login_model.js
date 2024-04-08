const mysql = require("mysql2");
const config = require("../App/config");
const jwt = require("jsonwebtoken");
var userLoggedIn = false;

function adminLogin(req, res) {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            res.status(400).send("Töltsd ki az összes adatot!");
        }

        var con = mysql.createConnection(config.database);

        con.connect(function (err) {
            if (err) throw err;
        });

        const sql = 'CALL adminBejelentkezes(?,?)';

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
                con.query('CALL felhTokenFrissites(?,?)', [result[0][0].felhasznalo_id, token], (err, result, fields) => {
                    if (err) throw err;
                    user.token = token;
                    res.send(result);
                })
            }
            else {
                res.status(401).send("nem engedélyezett");
            }
        });

        con.end(function (err) {
            if (err) throw err;
        });
    } catch (error) {

    }
}


function login(req, res) {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            res.status(400).send("Töltsd ki az összes adatot!");
        }
        var con = mysql.createConnection(config.database);

        con.connect(function (err) {
            if (err) throw err;
        });

        const sql = 'SELECT felhBejelentkezes(?,?)';
        con.query(sql, [email, password], (err, result) => {
            if (err) throw err;
            if (result.length > 0 && Object.values(result[0])[0] > 0) {

                const functionResult = result[0];
                const functionCall = Object.keys(functionResult)[0];
                const matches = functionCall.match(/'([^']+)'/g);

                const token = jwt.sign({
                    email: matches[0].replace(/'/g, '')
                }, config.TokenKey,
                    {
                        expiresIn: "2h",
                    });

                const getUserDataQuery = 'SELECT User_ID, Username, Email FROM Users WHERE Email = (?)';

                var loggedInUserData = {
                    logged_user_id: null,
                    logged_username: "",
                    logged_email: ""
                };

                con.query(getUserDataQuery, [matches[0].replace(/'/g, '')], (err, result, fields) => {
                    if (err) throw err;

                    loggedInUserData.logged_user_id = result[0].User_ID;
                    loggedInUserData.logged_username = result[0].Username;
                    loggedInUserData.logged_email = result[0].Email;

                    con.query('SELECT felhTokenFrissites(?,?)', [loggedInUserData.logged_user_id, token], (err, result, fields) => {
                        if (err) throw err;

                        userLoggedIn = true;
                        var resData = {
                            result: result,
                            loggedIn: userLoggedIn,
                            user_id: loggedInUserData.logged_user_id,
                            username: loggedInUserData.logged_username,
                            email: loggedInUserData.logged_email
                        };
                        res.status(200).send(resData);
                    });
                });
            }
            else {
                res.status(401).send("Nem engedélyezett");
            }
        });
    }
    catch (error) {

    }
}

exports.login = login
exports.adminLogin = adminLogin
