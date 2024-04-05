var upload_model = require('./upload-model');
var router = require('express').Router();

router.post("/upload", upload_model.uploadPicture);

module.exports = router