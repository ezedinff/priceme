const express = require('express');
const cors = require('cors');
const jwt = require('express-jwt');
const initializeDB = require('./db/initializeDB');
require('dotenv').config();
const routes = require("./routers");
const bodyParser = require('body-parser');

const app = express();


const corsOptions = {
    origin: '*',
}
/**
 * Middlewares
 */
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static('public'));

/**
 * Initialize Database
 */
initializeDB();


/**
 * Initialize Routes
 */
routes(app);




app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send({success: false, error: {message: err.message}});
    }
    else {
        next(err);
    }
});




module.exports = app;
