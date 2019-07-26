const winston = require('winston');
require('express-async-errors');
require('winston-mongodb');

module.exports = function() {

    // Process is an Event Emitter - publish events
    // Subscribe to an uncought exception
    process.on('uncaughtException',(ex) => {
        //console.log('****uncaughtException****')
        winston.error('****uncaughtException****',ex);
    });
    // unHandledRejection
    process.on('unHandledRejection',(ex) => {
        //console.log('****unHandledRejection****')
        winston.error('****unHandledRejection****',ex);
    });

    // Added file transport to winston
    //winston.add(winston.transports.File, {filename: 'logfile.log'} );
    winston.add(new winston.transports.MongoDB({ db: 'mongodb://localhost/vidly'} ));
}