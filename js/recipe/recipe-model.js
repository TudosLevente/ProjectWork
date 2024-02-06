const mysql = require("mysql2");
const config = require("../App/config");
const Recipe = require("./recipe");

function getRecipeInfos(req, res) {
    var con = mysql.createConnection(config.database);
    con.connect(function (err) {
        if (err) throw err;
        console.log('Sikeres csatlakozás az adatbázishoz!\nJó szórakozást!');
    })
    con.query('CALL getRecipeInfos(?) ', [req.params['id']], (err, result) => {
        if (err) throw err;
        res.send(result);
    })
}

async function uploadRecipe(req, res) {
    const recipe = new Recipe(
        null,
        null,
        req.body.picture_data,
        req.body.title,
        req.body.description,
        req.body.instructions,
        req.body.serving,
        req.body.difficulty_level,
        req.body.food_category,
        null
    );

    if (!(recipe.picture_data && recipe.title && recipe.description && recipe.instructions && recipe.serving && recipe.difficulty_level && recipe.food_category)) {
        res.status(400).send("Töltsd ki az adatatokat rendesen!");
    }

    var con = mysql.createConnection(config.database);
    con.connect(function (err) {
        if (err) throw err;
        console.log('Sikeres csatlakozás az adatbázishoz!\nJó szórakozást!');
    })

    const sql = 'INSERT INTO Recipes (Picture_data,Title,Description,Instructions,Serving,Difficulty_Level,Food_Category) Values (?,?,?,?,?,?,?)';

    const picture_data = req.file.buffer; // Binary data of the uploaded image

    con.query(sql, [picture_data, req.body.title, req.body.description, req.body.instructions, req.body.serving, req.body.difficulty_level, req.body.food_category], (err, result) => {
        recipe.recipe_id = 0;
        recipe.user_id = 0;

        const date = new Date();

        recipe.date_created = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;

        //Teszt
        console.log(recipe.date_created);

        con.connect(function (err) {
            if (err) throw err;
            console.log('Sikeres feltöltés!');
            console.log(result)
            res.send(recipe);
        })
    })
}

exports.getRecipeInfos = getRecipeInfos
exports.uploadRecipe = uploadRecipe