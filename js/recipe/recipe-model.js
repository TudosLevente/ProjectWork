const mysql = require("mysql2");
const config = require("../App/config");
const Recipe = require("./recipe");

function getRecipeInfos(req, res) {
    var con = mysql.createConnection(config.database);
    con.connect(function (err) {
        if (err) throw err;
        console.log('A recept adatok lekérése sikeres.\n');
    })
    con.query('CALL getRecipeInfos(?) ', [req.params['id']], (err, result) => {
        if (err) throw err;
        res.send(result);
    })
}

function loadRecipeInfos(req, res) {
    var con = mysql.createConnection(config.database);
    con.connect(function (err) {
        if (err) throw err;
        console.log('A recept adatok lekérése sikeres.\n');
    })
    con.query('CALL loadRecipeInfos(?) ', [req.params['id']], (err, result) => {
        if (err) throw err;
        res.send(result);
    })
}

async function uploadRecipe(req, res) {
    const recipe = new Recipe(
        null, //recept id, ami feltöltéskor adodik majd hozzá
        null, //user id, az éppen bejelentkezett user-nek az id-je
        req.body.picture_data,
        req.body.title,
        req.body.description,
        req.body.instructions,
        //---
        req.body.ingredient_name,
        req.body.ingredient_quantity,
        req.body.ingredient_measurement,
        req.body.time_prep_type,
        req.body.time_quantity,
        req.body.time_type,
        //---
        req.body.serving,
        req.body.difficulty_level,
        req.body.food_category,
        null //ez a feltöltési dátum ideje
    );

    if (!(recipe.picture_data && recipe.title && recipe.description && recipe.instructions && recipe.ingredient_name && recipe.ingredient_quantity && recipe.ingredient_measurement && recipe.time_prep_type && recipe.time_quantity && recipe.time_type && recipe.serving && recipe.difficulty_level && recipe.food_category)) {
        res.status(400).send("Töltsd ki az adatatokat rendesen!");
    }

    var con = mysql.createConnection(config.database);
    con.connect(function (err) {
        if (err) throw err;
        console.log('Csatlakozva a recept feltöltéshez.');
    })

    const sql = 'INSERT INTO Recipes (User_ID,Picture_data,Title,Description,Instructions,Serving,Difficulty_Level,Food_Category,Date_Created) Values (?,?,?,?,?,?,?,?,?)';

    function concatenatedTitlesAndInputs(array) {
        var concatenatedStrings = array.map(function (obj) {
            return obj.title + " (" + obj.input + ")";
        });

        var concatenatedString = concatenatedStrings.join(';');

        return concatenatedString;
    }

    var concatenatedInstructions = concatenatedTitlesAndInputs(recipe.instructions);

    recipe.user_id = req.body.user_id; //le kell kérni majd a szerverről

    const date = new Date();

    recipe.date_created = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;

    con.query(sql, [recipe.user_id, req.body.picture_data, req.body.title, req.body.description, concatenatedInstructions, req.body.serving, req.body.difficulty_level, req.body.food_category, recipe.date_created], (err, result) => {
        if (err) throw err;
        recipe.recipe_id = result.insertId; //ez majd a létrehozott id-nek kell lennie

        var ingredient_id = null;

        (async () => {
            for (var i = 0; i < recipe.ingredient_name.length; i++) {
                try {
                    const result = await new Promise((resolve, reject) => {
                        con.query('SELECT Ingredient_ID FROM Ingredients WHERE Ingredient_Name = ?', [recipe.ingredient_name[i]], (err, result) => {
                            if (err) reject(err);
                            resolve(result);
                        });
                    });

                    console.log(result[0].Ingredient_ID);
                    ingredient_id = result[0].Ingredient_ID;

                    console.log(recipe.ingredient_measurement[i]);
                    console.log(recipe.ingredient_quantity[i]);

                    const insertResult = await new Promise((resolve, reject) => {
                        con.query('INSERT INTO Recipe_Ingredients (Recipe_ID,Ingredient_ID,Quantity,Measurement) VALUES (?,?,?,?)', [recipe.recipe_id, ingredient_id, recipe.ingredient_quantity[i], recipe.ingredient_measurement[i]], (err, result) => {
                            if (err) reject(err);
                            resolve(result)
                        });
                    });

                    console.log(insertResult);
                } catch (err) {
                    console.error(err);
                }
            }
        })();


        for (var i = 0; i < recipe.time_prep_type.length; i++) {
            var timePrepType = recipe.time_prep_type[i];
            var timeQuantity = recipe.time_quantity[i];
            var timeType = recipe.time_type[i];

            con.query('INSERT INTO Time (Recipe_ID,Time_Prep_Type,Time_Quantity,Time_Type) VALUES (?,?,?,?)', [recipe.recipe_id, timePrepType, timeQuantity, timeType], (err, result) => {
                if (err) throw err;

            });
        };

        con.connect(function (err) {
            if (err) throw err;
            console.log('Sikeres feltöltés!');
            console.log(result)
            res.status(200).send(recipe);
        })
    })
}

exports.getRecipeInfos = getRecipeInfos;
exports.uploadRecipe = uploadRecipe;
exports.loadRecipeInfos = loadRecipeInfos;