var admin_model = require('./admin_model');
var router = require('express').Router()

router.get('/notVerifiedRecipes', admin_model.loadNotVerifiedRecipes);
router.put('/verifyRecipe', admin_model.verifyRecipe);
router.delete('/deleteRecipe', admin_model.deleteRecipe);

router.put('/giveAdminRole', admin_model.giveAdminRole);
router.delete('/deleteAdminRole', admin_model.deleteAdminRole);
router.get('/getAdmins', admin_model.getAdmins);

router.post('/uploadIngredient', admin_model.uploadIngredient);
router.put('/updateIngredient', admin_model.updateIngredient);
router.delete('/removeIngredient', admin_model.removeIngredient);

module.exports = router