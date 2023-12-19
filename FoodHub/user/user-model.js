const mysql = require("mysql2");
const config = require("../App/config");
const jwt = require("jsonwebtoken");
const User = require("./user");

// ez a függvény visszaadja az összes felhasználó adatát
 function getAllUserInfos(req,res) {
    var con = mysql.createConnection(config.database);
    con.connect(function(err) {
        if (err) throw err;
        console.log('sikeres csatlakozás');
    })
    con.query('select * from User', (err,result) =>{
        if (err) throw err;
        res.send(result);
    })   
}

function getUserDataFromId(req,res) {
    var con = mysql.createConnection(config.database);
    con.connect(function(err) {
        if (err) throw err;
        console.log('sikeres csatlakozás');
    })
    con.query('CALL getAllUserInfos(?) ',[req.params['id']], (err,result) =>{
        if (err) throw err;
        res.send(result);
    })
}

// Ez a függvény regisztrál egy új felhasználót és lementi az adatbázisba
async function regUser (req,res)  {

    const user = new User(null,req.body.name,req.body.email,null);

    if (!(user.name && user.email && req.body.password)) {
        res.status(400).send("Töltsd ki az adatatokat rendesen!");
    }

    //ecryptedPw = await bcrypt.hash(password,10);       

    var con = mysql.createConnection(config.database);
    con.connect(function(err) {
        if (err) throw err;
        console.log('sikeres csatlakozás');
    })
    
    const sql = 'INSERT INTO users (name,email,password) values (?,?,?)';
    con.query(sql,[req.body.name,req.body.email,req.body.password], (err,result) =>{
        if (err) throw err;
        const token = jwt.sign(
            {
                user_id: result.insertId,
                email: user.email
            },
            config.TokenKey,
            {
                expiresIn:"2h",
            }); 
        user.token = token;
        user.user_id = result.insertId;    
        console.log(user.user_id)    
        con.connect(function(err) {
            if (err) throw err;
            console.log('sikeres csatlakozás');
        })        
        con.query('call userUpdateToken(?,?)',[user.user_id,token],(err,result,fields)=>{
            if (err) throw err;
            console.log(user.token)
            res.send(user);
        })
    })   
}

exports.getAllUserInfos = getAllUserInfos
exports.getUserDataFromId = getUserDataFromId
exports.regUser = regUser