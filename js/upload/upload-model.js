const upload = require("./upload");
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

// Route for file upload
function uploadPicture(req, res) {
    upload(req, res, (err) => {
        if (err) {
            res.status(400).send(err);
        } else {
            const title = req.body.title;
            let filename = req.file.filename; // original filename

            if (!title || !filename) {
                res.status(400).send('Error: No File Selected!');
            } else {
                const originalExtension = path.extname(req.file.originalname); // Get original extension
                const titleWithoutSpaces = title.replace(/\s+/g, '-'); // Replace spaces in title

                // Get current date
                const currentDate = new Date();
                const year = currentDate.getFullYear();
                const month = String(currentDate.getMonth() + 1).padStart(2, '0');
                const day = String(currentDate.getDate()).padStart(2, '0');

                // Construct filename
                filename = `${titleWithoutSpaces}-${year}.${month}.${day}${originalExtension}`;

                const newPath = path.join(req.file.destination, filename);

                fs.rename(req.file.path, newPath, (err) => {
                    if (err) {
                        res.status(500).send('Error: File Rename Failed!');
                    } else {
                        res.send('File Uploaded Successfully!' + filename);
                    }
                });
            }
        }
    });
};

exports.uploadPicture = uploadPicture;