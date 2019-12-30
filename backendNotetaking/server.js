const express = require('express');
const bodyParser = require('body-parser');

const dbConfig = require('./config/database.config.js');
const app = express();


app.use(bodyParser.urlencoded({ extended: true }))
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.use(bodyParser.json())
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
    next();
});

app.get('/', (req, res) => {
    res.json({ "message": "Welcome to Notet taking application." });
});

require('./app/routes/note.route.js')(app);
require('./app/routes/user.route.js')(app);
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});