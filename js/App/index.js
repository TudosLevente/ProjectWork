var express = require('express');
const cors = require('cors');
var app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(require('../router/router'));
app.use('/api', require("../user/router"));//put, delete megírása
app.use('/api', require("../login/router"));
app.use('/api', require("../recipe/router")); //put, delete megírása
app.use('/api', require("../comment/router"));//put, delete megírása
app.use('/api', require("../favorite/router"));//put, delete megírása
app.use('/api', require("../ingredient/router"));
app.use('/api', require("../upload/router"));

module.exports = app