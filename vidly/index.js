const config = require ('config');
const express = require('express');
require('express-async-errors');
const mongoose = require('mongoose');
const Joi = require ('joi');
Joi.objectId = require('joi-objectid')(Joi);

const genres = require('./routes/genresDb');
const customer = require('./routes/customer');
const movie = require('./routes/movie');
const rental = require('./routes/rental');
const user = require('./routes/user');
const auth = require('./routes/auth');

const error = require('./middleware/error');

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: vidly_jwtPrivateKey not defined');
    process.exit(1);
}

const app = express();

// Connect to the mongoDB DB - vidly collection
mongoose.connect('mongodb://localhost/vidly')
    .then(()=> {console.log('Connection to mongoDB was successful')})
    .catch((err) => {console.log('Connection to DB failed', err.message)});

// Home screen
app.get('/',(req, res) => {
    res.send('Welcome to VIDLY!!');
});

app.use('/api/genres',genres);
app.use('/api/customer',customer);
app.use('/api/movie',movie);
app.use('/api/rental',rental);
app.use('/api/user',user);
app.use('/api/auth',auth);

//Catch all exceptions
app.use( error );

const PORT = process.env.NODE_PORT || 3000
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});

