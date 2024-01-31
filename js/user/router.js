var user_model = require('./user-model');
var router = require('express').Router();
const auth = require("../auth/auth");

router.get('/user',auth,user_model.getAllUserInfos);
router.get('/user/:id',user_model.getUserDataFromId);
router.post('/regFelh',user_model.regFelh);

module.exports = router