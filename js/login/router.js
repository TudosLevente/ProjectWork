var login = require('../login/login_model.js')
var router = require('express').Router()

router.post('/login', login.login);
router.post('/adminLogin', login.adminLogin);

module.exports = router