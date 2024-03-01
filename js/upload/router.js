var upload_model = require('./upload-model');
var router = require('express').Router();

router.post("/uploadPicture", upload_model.upload);
router.get("/files", upload_model.getListFiles);
router.get("/files/:name", upload_model.download);


module.exports = router