const express = require('express');
const app = require('./index');
const config = require('./config')
const path = require('path')

const publicDirectoryPath = path.join(__dirname, '../../../ProjectWork');

app.use(express.static(publicDirectoryPath));

var loggedInUserData = {
    loggedIn: false,
    user_id: null,
    username: "",
    email: ""
};

app.post('/getLoginInfo', (req, res) => {
    loggedInUserData.loggedIn = req.body.loggedIn;
    loggedInUserData.user_id = req.body.user_id;
    loggedInUserData.username = req.body.username;
    loggedInUserData.email = req.body.email;

    console.log(loggedIn);
    console.log(loggedInUserData.user_id);
    console.log(loggedInUserData.username);
    console.log(loggedInUserData.email);
})

app.get('/', (req, res) => {
    if (loggedInUserData.loggedIn) {
        console.log("a loggedIn főoldal fut");
        //res.send(loggedInUserData);
        res.sendFile(path.join(publicDirectoryPath, '/html/mainPage.html'));
    }
    else {
        res.sendFile(path.join(publicDirectoryPath, '/html/mainPage.html'));
    }
})

app.listen(config.port, () => {
    console.log(`A szerver fut | http://localhost:${config.port}`);
})