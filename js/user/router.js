var user_model = require('./user-model');
var router = require('express').Router();
const auth = require("../auth/auth");

router.get('/user',auth,user_model.getAllUserInfos);
router.get('/user/:id',user_model.getUserDataFromId);
router.post('/regUser',user_model.regUser);

module.exports = router