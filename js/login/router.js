var login = require('../login/login_model')
var router = require('express').Router()

router.post('/login',login.bejelentkezes);
router.post('/adminLogin',login.adminBejelentkezes);

module.exports = router