var recipe_model = require('./recipe-model');
var router = require('express').Router();

router.get('/recipe/:id', recipe_model.getRecipeInfos);
router.get('/loadrecipe/:id', recipe_model.loadRecipeInfos);
router.post('/uploadRecipe', recipe_model.uploadRecipe);

module.exports = router