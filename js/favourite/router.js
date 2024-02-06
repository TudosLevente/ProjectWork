var favorite_model = require('./favorite-model');
var router = require('express').Router();

router.get('/getFavorite/:id', favorite_model.getFavorite);
router.get('/getFavorites', favorite_model.getFavorites);
router.post('/addFavorite', favorite_model.addFavorite);

module.exports = router