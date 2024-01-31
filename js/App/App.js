const app = require('./index');
const config = require('./config')

// ez a végpont mutatja, hogy fut a node js szerver
app.get('/',(req,res) => {
    res.send("<h1>Szerver fut</h1>")
})

// publikáljuk a szervert
app.listen(config.port, () => {
console.log(`A szerver fut | http://localhost:${config.port}`);

})