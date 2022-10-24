/**
 * The server entry point.
 * author - Christopher Evans, 30.05.2022
 *
 * This is where the main tie together of the whole api. Very little
 *  functionality sits here. This is just where modules get initiated and
 *  attached to the main process.
 */

const express = require('express')
const bodyParser = require('body-parser')
const {testCreate, testFetch} = require('./src/db');

const app = express()
const port = 5000;
app.use("/user", require("./src/routes/user"))

//temporary mongodb database url for testing


app.get('/',
    async function(req, res){
        res.send('<h1>Hello World</h1>')
    }
);

// a simpledatabase testing function
app.get('/dbtest', async function(req, res){
   testFetch().then((data)=>res.send(data));
})

// Handle errors
app.use(function (err, req, res, next) {
    console.error(err);
    res.status(400).send(err.message);
})


app.listen(port, () => console.log(`Goals for Gordon listening on port ${port}!`))

