var express = require('express');
const cors = require('cors');
var app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(require('../router/router'));
app.use('/api', require("../user/router"));
app.use('/api', require("../login/router"));
app.use('/api', require("../recipe/router"));
app.use('/api', require("../comment/router"));
app.use('/api', require("../favorite/router"));
app.use('/api', require("../ingredient/router"));
app.use('/api', require("../upload/router"));
app.use('/api', require("../admin/router"));

module.exports = app