var user_model = require('./user-model');
var router = require('express').Router();
const auth = require("../auth/auth");

router.get('/users', user_model.getAllUserInfos);
router.get('/userRecipes/:id', user_model.getUserRecipes)
router.get('/user/:id', user_model.getUserDataFromId);
router.post('/regUser', user_model.regUser);
router.put('/updateUser', user_model.updateUser);
router.delete('/deleteUser', user_model.deleteUser);

module.exports = router