const winston = require('winston');

module.exports = function (err, req, res, next) {
    // First arg is log level - error, warn, info, verbose, debub, silly
    //winston.log('error',err.message, err);
    winston.error(err.message, err);
    res.status(500).send('Internal Server error!! Truly, this is the first!!');
}
