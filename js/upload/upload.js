const util = require("util");
const multer = require("multer");
const path = require("path");

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __basedir + "/uploads/");
    },
    filename: (req, file, cb) => {
        console.log(file.originalname);
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    },
});

let uploadFile = multer({
    storage: storage
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;