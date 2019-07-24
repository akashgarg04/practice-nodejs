const express = require('express');
const mongoose = require('mongoose');
const Joi = require ('joi');
Joi.objectId = require('joi-objectid')(Joi);

const genres = require('./routes/genresDb');
const customer = require('./routes/customer');
const movie = require('./routes/movie');
const rental = require('./routes/rental');

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


const PORT = process.env.NODE_PORT || 3000
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});

