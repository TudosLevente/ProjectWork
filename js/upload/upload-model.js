const uploadFile = require("./upload");
const config = require("../App/config");
var fs = require('fs');

const upload = async (req, res) => {
    var recipe_id = req.body.recipe_id;
    console.log("1. fut");
    console.log(req.body);

    try {
        await uploadFile(req, res);

        console.log("2. fut");
        console.log(req.file);
        console.log(req.body);
        console.log(req.body.recipe_id);

        if (req.file == undefined) {
            return res.status(400).send({ message: "Please upload a file!" });
        }

        const image = req.file.filename;
        const sql = 'UPDATE Recipes SET Picture_data = ? WHERE Recipe_id = ?';

        var con = mysql.createConnection(config.database);
        con.connect(function (err) {
            if (err) throw err;
            console.log('Felkészülés a kép feltöltéséhez!');
        })

        con.query(sql, [image, recipe_id], (err, result) => {
            if (err) throw err;
            console.log(result);
        });

        res.status(200).send({
            message: "Uploaded the file successfully: " + req.file.originalname,
        });
    } catch (err) {
        res.status(500).send({
            message: `Could not upload the file: ${req.file.originalname}. ${err}`,
        });
    }
};

const getListFiles = (req, res) => {
    const directoryPath = __basedir + "/uploads/";

    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            res.status(500).send({
                message: "Unable to scan files!",
            });
        }

        let fileInfos = [];

        files.forEach((file) => {
            fileInfos.push({
                name: file,
                url: "http://localhost:8000/api/files/" + file,
            });
        });

        res.status(200).send(fileInfos);
    });
};

const download = (req, res) => {
    const fileName = req.params.name;
    const directoryPath = __basedir + "/uploads/";

    res.download(directoryPath + fileName, fileName, (err) => {
        if (err) {
            res.status(500).send({
                message: "Could not download the file. " + err,
            });
        }
    });
};

module.exports = {
    upload,
    getListFiles,
    download,
};