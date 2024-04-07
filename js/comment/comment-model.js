const mysql = require("mysql2");
const config = require("../App/config");
const fs = require('fs');
const Comment = require("./comment");

function getCommentContent(req, res) {
    var con = mysql.createConnection(config.database);
    con.connect(function (err) {
        if (err) throw err;
        console.log('Sikeres csatlakozás az adatbázishoz!\nJó szórakozást!');
    })
    con.query('CALL getCommentContent(?)', [req.params['id']], (err, result) => {
        if (err) throw err;
        res.send(result);
    })
}

function checkForSwearWords(message, swearWordsData) {
    const dirtyWords = swearWordsData.split(';');
    for (let i = 0; i < dirtyWords.length; i++) {
        if (message.toLowerCase().includes(dirtyWords[i].toLowerCase())) {
            return true;
        }
    }
    return false;
}

async function uploadComment(req, res) {
    const comment = new Comment(
        null,
        req.body.user_id,
        req.body.recipe_id,
        req.body.comment_text,
        null
    );

    if (!(req.body.comment_text)) {
        res.status(400).send("Üresen hagytad a comment részt, tölstd ki rendesen!");
    }

    try {
        fs.readFile('../../ProjectWork/dirty_words.txt', 'utf8', (err, data) => {
            if (err) {
                console.error("Hiba a fájl olvasása közben:", err);
                return;
            }

            if (checkForSwearWords(comment.comment_text, data)) {
                //felugró ablak, hogy a komment káromkodást tartalmaz így az nem elküldhető
                console.log("Csúnya szó!");
                return;
            }
            else {
                console.log("Hurrá nincs csúnya szó!");
            }
        });

        var con = mysql.createConnection(config.database);
        con.connect(function (err) {
            if (err) throw err;
            console.log('Sikeres csatlakozás az adatbázishoz!\nJó szórakozást!');
        })

        const date = new Date();

        comment.date_posted = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;

        const sql = 'INSERT INTO Comments (User_ID,Recipe_ID,Comment_Text,Date_Posted) Values (?,?,?,?)';

        con.query(sql, [comment.user_id, comment.recipe_id, comment.comment_text, comment.date_posted], (err, result) => {
            con.connect(function (err) {
                if (err) throw err;
                if (result === undefined) {
                    return;
                }
                console.log('Sikeres komment feltöltés!');
                console.log(result)
                res.send(comment);
            })
        })
    } catch (err) { }

}

exports.getCommentContent = getCommentContent
exports.uploadComment = uploadComment