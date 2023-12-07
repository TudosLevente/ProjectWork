const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const config = require('./config'); // Adjust the path if necessary
const app = express();
const PORT = 8080;

app.use(cors({origin: '*'}));

app.use(express.json());

app.listen(PORT, () => {
    console.log(`The server is online http://localhost:${PORT}`);
});

app.get('/user/:id', (req, res) => {
    const con = mysql.createConnection(config.database);

    con.connect(function(err){
        if(err) throw err;
        console.log('Successfully created connection!');
    });

    const { id } = req.params;

    con.query(`SELECT * FROM Users WHERE User_ID LIKE ${id}`, (err, result) => {
        if(err) throw err;
        res.send(result);
    });
});

app.post('/user/register', (req, res) => {
    const con = mysql.createConnection(config.database);

    con.connect(function(err){
        if(err) throw err;
        console.log('Successfully created connection!');
    });

    const { Username, Email, Password } = req.body;

    if(!Username){
        res.status(418).send({ message: 'We need a username!'});
    }
    if(!Email){
        res.status(418).send({ message: 'We need a email!'});
    }
    if(!Password){
        res.status(418).send({ message: 'We need a password!'});
    }

    con.query(`INSERT INTO Users (Username, Email, Password) VALUES ('${Username}', '${Email}', '${Password}');`, (err, result) => {
        if(err) throw err;
        res.send('User addedd successfully!');
    });
});

// ---------------------------   TESZTELÉS   --------------------------- //
// app.get('/user', (req, res) => {
//     res.status(200).send({
//         name: 'Levi',
//         age: '19'
//     });
// });

// app.get('/user/:id', (req, res) => {
    
// });

// app.post('/user/:id', (req, res) => {

//     const { id } = req.params;
//     const { name } = req.body;

//     if(!name) {
//         res.status(418).send({ message: 'We need a name!'});
//     }

//     res.send({
//         user: `User with your name ${name} and ID of ${id}`,
//     });
// });
