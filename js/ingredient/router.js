var ingredient_model = require('./ingredient-model');
var router = require('express').Router();

router.get('/ingredients', ingredient_model.getIngredients);

module.exports = router