const express = require('express');
const app = require('./index');
const config = require('./config')
const path = require('path')

const publicDirectoryPath = path.join(__dirname, '../../../ProjectWork');

app.use(express.static(publicDirectoryPath));

// ez a végpont mutatja, hogy fut a node js szerver
app.get('/', (req, res) => {
    res.sendFile(path.join(publicDirectoryPath, '/html/mainPage.html'));
})

// publikáljuk a szervert
app.listen(config.port, () => {
    console.log(`A szerver fut | http://localhost:${config.port}`);

})