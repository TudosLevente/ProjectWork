var recipe_model = require('./recipe-model');
var router = require('express').Router();

router.get('/recipe/:id', recipe_model.getRecipeInfos);
router.post('/uploadRecipe', recipe_model.uploadRecipe);

module.exports = router