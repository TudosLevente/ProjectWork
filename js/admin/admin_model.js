const mysql = require("mysql2");
const config = require("../App/config");

function loadNotVerifiedRecipes(req, res) {
    var con = mysql.createConnection(config.database);

    con.connect(function (err) {
        if (err) throw err;
    });

    const sql = 'CALL loadRecipeInfosAdmin';
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });

    con.end(function (err) {
        if (err) throw err;
    });
}

function verifyRecipe(req, res) {
    var con = mysql.createConnection(config.database);

    con.connect(function (err) {
        if (err) throw err;
    });

    const sql = 'CALL verifyRecipe(?)';
    con.query(sql, [req.body.recipeid], (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
    });

    con.end(function (err) {
        if (err) throw err;
    });
}

function deleteRecipe(req, res) {
    var con = mysql.createConnection(config.database);

    con.connect(function (err) {
        if (err) throw err;
    });

    try {
        const sql_time = 'CALL deleteFromTime(?)';

        con.query(sql_time, [req.body.recipeid], (err, result) => {
            if (err) throw err;
        });
    } catch (err) {
        console.error(err);
    }

    try {
        const sql_ingredients = 'CALL deleteFromRecipe_Ingredients(?)';

        con.query(sql_ingredients, [req.body.recipeid], (err, result) => {
            if (err) throw err;
        });
    } catch (err) {
        console.error(err);
    }

    try {
        const sql_recipe = 'CALL deleteFromRecipe(?)';

        con.query(sql_recipe, [req.body.recipeid], (err, result) => {
            if (err) throw err;
        });
    } catch (err) {
        console.error(err);
    }

    con.end(function (err) {
        if (err) throw err;
    });
}

function giveAdminRole(req, res) {
    var con = mysql.createConnection(config.database);

    con.connect(function (err) {
        if (err) throw err;
    });

    const sql = 'CALL giveAdminRole(?)';
    con.query(sql, [req.body.user_email], (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
    });

    con.end(function (err) {
        if (err) throw err;
    });
}

function deleteAdminRole(req, res) {
    var con = mysql.createConnection(config.database);

    con.connect(function (err) {
        if (err) throw err;
    });

    const sql = 'CALL deleteAdminRole(?)';
    con.query(sql, [req.body.user_email], (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
    });

    con.end(function (err) {
        if (err) throw err;
    });
}

function getAdmins(req, res) {
    var con = mysql.createConnection(config.database);

    con.connect(function (err) {
        if (err) throw err;
    });

    const sql = 'CALL getAdmins(?)';
    con.query(sql, [req.body.user_email], (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
    });

    con.end(function (err) {
        if (err) throw err;
    });
}

function uploadIngredient(req, res) {
    var con = mysql.createConnection(config.database);

    con.connect(function (err) {
        if (err) throw err;
    });

    const sql = 'CALL uploadIngredient(?,?)';
    con.query(sql, [req.body.ingredient_name, req.body.ingredient_category], (err, result) => {
        if (err) {
            console.error(err);
            res.status(409).send('Ilyen hozzávaló már létezik!');
        }
        res.status(200).send(result);
    });

    con.end(function (err) {
        if (err) throw err;
    });
}

function updateIngredient(req, res) {
    var con = mysql.createConnection(config.database);

    con.connect(function (err) {
        if (err) throw err;
    });

    const sql = 'CALL updateIngredient(?,?)';
    con.query(sql, [req.body.ingredient_id, req.body.ingredientName], (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
    });

    con.end(function (err) {
        if (err) throw err;
    });
}

function removeIngredient(req, res) {
    var con = mysql.createConnection(config.database);

    con.connect(function (err) {
        if (err) throw err;
    });

    const sql = 'CALL removeIngredient(?)';
    con.query(sql, [req.body.ingredient_id], (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
    });

    con.end(function (err) {
        if (err) throw err;
    });
}

exports.loadNotVerifiedRecipes = loadNotVerifiedRecipes
exports.verifyRecipe = verifyRecipe
exports.deleteRecipe = deleteRecipe

exports.giveAdminRole = giveAdminRole
exports.deleteAdminRole = deleteAdminRole
exports.getAdmins = getAdmins

exports.uploadIngredient = uploadIngredient
exports.updateIngredient = updateIngredient
exports.removeIngredient = removeIngredient