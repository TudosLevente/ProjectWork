const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../../images/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Initialize multer middleware
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single('fileToUpload');

// Check file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images only!');
  }
}

// Serve HTML file as default page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'recipeimage.html'));
});


// Route for file upload
app.post('/upload', (req, res) => {
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
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});