const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

module.exports = function() {
    // Connect to the mongoDB DB - vidly collection
    const db = config.get('db');
    mongoose.connect(db)
        .then(()=> {winston.info(`Connection to mongoDB - ${db} was successful`)});
        //// The catch exception is not no longer needed as it is implimented overall with unHandledRejection
        //  .catch((err) => {console.log('Connection to DB failed', err.message)});   
}
