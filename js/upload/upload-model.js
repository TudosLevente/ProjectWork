const upload = require("./upload");
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

function uploadPicture(req, res) {
    upload(req, res, (err) => {
        if (err) {
            res.status(400).send(err);
        } else {
            const title = req.body.title;
            let filename = req.file.filename;

            if (!title || !filename) {
                res.status(400).send("Error: No File Selected!");
            } else {
                const originalExtension = path.extname(req.file.originalname);
                const titleWithoutSpaces = title.replace(/\s+/g, '-');

                const currentDate = new Date();
                const year = currentDate.getFullYear();
                const month = String(currentDate.getMonth() + 1).padStart(2, '0');
                const day = String(currentDate.getDate()).padStart(2, '0');

                filename = `${titleWithoutSpaces}-${year}.${month}.${day}${originalExtension}`;

                const newPath = path.join(req.file.destination, filename);

                fs.rename(req.file.path, newPath, (err) => {
                    if (err) {
                        res.status(500).send(JSON.stringify("Error: File Rename Failed!"));
                    } else {
                        res.status(200).send(JSON.stringify(newPath));
                    }
                });
            }
        }
    });
};

exports.uploadPicture = uploadPicture;