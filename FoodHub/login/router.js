var login = require('../login/login_model')
var router = require('express').Router()

router.post('/login',login.signin);

module.exports = router