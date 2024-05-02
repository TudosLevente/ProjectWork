const mysql = require("mysql2");
const config = require("../App/config");
const fs = require('fs');
const Comment = require("./comment");

function getCommentContent(req, res) {
    var con = mysql.createConnection(config.database);

    con.connect(function (err) {
        if (err) throw err;
    });

    con.query('CALL getCommentContent(?)', [req.params['id']], (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send("Hibás azonosító!");
        }
        res.send(result);
    });

    con.end(function (err) {
        if (err) throw err;
    });
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

            if (!checkForSwearWords(comment.comment_text, data)) {
                var con = mysql.createConnection(config.database);

                const date = new Date();

                comment.date_posted = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;

                const sql = 'INSERT INTO Comments (User_ID,Recipe_ID,Comment_Text,Date_Posted) Values (?,?,?,?)';

                con.query(sql, [comment.user_id, comment.recipe_id, comment.comment_text, comment.date_posted], (err, result) => {
                    con.connect(function (err) {
                        if (err) throw err;
                        if (result === undefined) {
                            return;
                        }
                        res.send(comment);
                    });

                    con.end(function (err) {
                        if (err) throw err;
                    });
                });
                return;
            }

        });
    } catch (err) {
        console.log("Error:" + err);
    }

}

exports.getCommentContent = getCommentContent
exports.uploadComment = uploadComment