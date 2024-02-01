const mysql = require("mysql2");
const config = require("../App/config");
const Comment = require("./comment");

 function getCommentContent(req,res) {
    var con = mysql.createConnection(config.database);
    con.connect(function(err) {
        if (err) throw err;
        console.log('Sikeres csatlakozás az adatbázishoz!\nJó szórakozást!');
    })
    con.query('CALL getCommentContent(?)',[req.params['id']], (err,result) =>{
        if (err) throw err;
        res.send(result);
    })   
}

async function uploadComment (req,res)  {
    const comment = new Comment(
        null,
        null,
        null,
        req.body.comment_text,
        null
        );

    if (!(req.body.comment_text)) {
        res.status(400).send("Üresen hagytad a comment részt, tölstd ki rendesen!");
    } 

    var con = mysql.createConnection(config.database);
    con.connect(function(err) {
        if (err) throw err;
        console.log('Sikeres csatlakozás az adatbázishoz!\nJó szórakozást!');
    })
    
    const sql = 'INSERT INTO Comments (Comment_Text) Values (?)';

    con.query(sql,[req.body.comment_text], (err,result) =>{
        comment.comment_id = 0;
        comment.recipe_id = 0;
        comment.user_id = 0;

        const date = new Date();

        comment.date_posted = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;

        //Teszt
        console.log(comment.date_posted);

        con.connect(function(err){
            if (err) throw err;
            console.log('Sikeres feltöltés!');
            console.log(result)
            res.send(comment);
        })
    })   
}

exports.getCommentContent = getCommentContent
exports.uploadComment = uploadComment