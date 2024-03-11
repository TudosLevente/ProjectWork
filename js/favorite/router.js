var favorite_model = require('./favorite-model');
var router = require('express').Router();

router.get('/getFavorites/:id', favorite_model.getFavorites);
router.post('/addFavorite', favorite_model.addFavorite);
router.delete('/removeFavorite', favorite_model.removeFavorite);

module.exports = router