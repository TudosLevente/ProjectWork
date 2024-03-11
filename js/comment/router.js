var comment_model = require('./comment-model');
var router = require('express').Router();

router.get('/getComment/:id', comment_model.getCommentContent);
router.post('/uploadComment', comment_model.uploadComment);

module.exports = router