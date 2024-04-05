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

app.get('/getLoggedInUserData', (req, res) => {
    res.send(loggedInUserData);
})

app.post('/getLoginInfo', (req, res) => {
    loggedInUserData.loggedIn = req.body.loggedIn;
    loggedInUserData.user_id = req.body.user_id;
    loggedInUserData.username = req.body.username;
    loggedInUserData.email = req.body.email;

    console.log(loggedInUserData.loggedIn);
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

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.mailersend.net',
    port: 587,
    secure: false,
    auth: {
        user: 'MS_XqGaJW@trial-o65qngkv85jlwr12.mlsender.net',
        pass: 'XSrjoCJGHUnRFL4a'
    }
});

app.post('/sendfeedback', (req, res) => {
    const mailOptions = {
        from: 'MS_XqGaJW@trial-o65qngkv85jlwr12.mlsender.net',
        to: 'foodhub.noreply.hu@gmail.com',
        subject: 'Feedback from ' + req.body.user_email,
        text: 'Feedback from: ' + req.body.user_email + '\n\n' + req.body.text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Hiba:', error.message);
            res.status(500).send('Hiba a feedback küldésekor!');
        } else {
            res.status(200);
            console.log('Email sikeresen elküldve!');
        }
    });
});