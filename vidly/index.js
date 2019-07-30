const winston = require('winston');
const express = require('express');
const app = express();

require('./init/logging')();
require('./init/config')();
require('./init/route')(app);
require('./init/db')();
require('./init/validation')();

//if (process.env.NODE_ENV != 'test') {
    const port = process.env.NODE_PORT || 3000
    const server = app.listen(port, () => {
        winston.info(`listening on port ${port}`);
    });
//}

module.exports = server;