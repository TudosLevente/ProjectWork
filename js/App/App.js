const express = require('express');
const app = require('./index');
const config = require('./config')
const path = require('path')
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cookieParser = require('cookie-parser');

const publicDirectoryPath = path.join(__dirname, '../../../ProjectWork');

app.use(express.static(publicDirectoryPath));

var loggedInUserData = {
    loggedIn: false,
    user_id: null,
    username: "",
    email: "",
    isAdmin: null
};

app.get('/getLoggedInUserData', (req, res) => {
    res.send(loggedInUserData);
})

app.post('/getLoginInfo', (req, res) => {
    loggedInUserData.loggedIn = req.body.loggedIn;
    loggedInUserData.user_id = req.body.user_id;
    loggedInUserData.username = req.body.username;
    loggedInUserData.email = req.body.email;
    loggedInUserData.isAdmin = req.body.isAdmin;
})

app.get('/logout', (req, res) => {
    loggedInUserData.loggedIn = false;
    loggedInUserData.user_id = null;
    loggedInUserData.username = "";
    loggedInUserData.email = "";

    res.send(loggedInUserData);
});

app.get('/', (req, res) => {
    if (loggedInUserData.loggedIn) {
        res.sendFile(path.join(publicDirectoryPath, '/html/mainPage.html'));
    }
    else {
        res.sendFile(path.join(publicDirectoryPath, '/html/mainPage.html'));
    }
})

app.get('/adminPage', (req, res) => {
    if (loggedInUserData.loggedIn) {
        res.sendFile(path.join(publicDirectoryPath, '/html/adminPage.html'));
    }
    else {
        res.sendFile(path.join(publicDirectoryPath, '/html/errorPage.html'));
    }
})


app.listen(config.port, () => {
    console.log(`A szerver fut | http://localhost:${config.port}`);
})

app.post('/sendEmail', (req, res) => {
    const { to, subject, body } = req.body;

    const transporter = nodemailer.createTransport({
        host: 'smtp.mailersend.net',
        port: 587,
        secure: false,
        auth: {
            user: 'MS_XqGaJW@trial-o65qngkv85jlwr12.mlsender.net',
            pass: 'XSrjoCJGHUnRFL4a'
        }
    });

    const mailOptions = {
        from: "MS_XqGaJW@trial-o65qngkv85jlwr12.mlsender.net",
        to: to,
        subject: subject,
        text: body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Az emailt nem sikerült elküldeni.' + error.message);
        } else {
            res.status(200).send('Email sikeresen elküldve!');
        }
    });
});

app.use(cookieParser());

app.post('/accept-cookies', (req, res) => {
    res.cookie('cookies_accepted', 'true', { httpOnly: true });
    res.status(200).send('Cookies accepted');
});

app.get('/check-cookies', (req, res) => {
    if (req.cookies.cookies_accepted === 'true') {
        res.status(200).json({ message: "Cookies accepted" });
    } else {
        res.status(400).json({ message: "Cookies not accepted" });
    }
});