require('express-async-errors');
const config = require ('config');
const express = require('express');
const winston = require('winston');
require('winston-mongodb');
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

// Process is an Event Emitter - publish events
// Subscribe to an uncought exception
process.on('uncaughtException',(ex) => {
    console.log('****uncaughtException****')
    winston.error('****uncaughtException****',ex);
});
// unHandledRejection
process.on('unHandledRejection',(ex) => {
    console.log('****unHandledRejection****')
    winston.error('****unHandledRejection****',ex);
});
// Added file transport to winston
//winston.add(winston.transports.File, {filename: 'logfile.log'} );
winston.add(new winston.transports.MongoDB({ db: 'mongodb://localhost/vidly'} ));

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: vidly_jwtPrivateKey not defined');
    process.exit(1);
}

// Connect to the mongoDB DB - vidly collection
mongoose.connect('mongodb://localhost/vidly')
    .then(()=> {console.log('Connection to mongoDB was successful')})
    .catch((err) => {console.log('Connection to DB failed', err.message)});

const app = express();

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

