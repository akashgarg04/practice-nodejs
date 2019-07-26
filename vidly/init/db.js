const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function() {
    // Connect to the mongoDB DB - vidly collection
    mongoose.connect('mongodb://localhost/vidly')
        .then(()=> {winston.info('Connection to mongoDB was successful')});
        //// The catch exception is not no longer needed as it is implimented overall with unHandledRejection
        //  .catch((err) => {console.log('Connection to DB failed', err.message)});
    
}
