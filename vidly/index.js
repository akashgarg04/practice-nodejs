const winston = require('winston');
const express = require('express');
const app = express();

require('./init/logging')();
require('./init/config')();
require('./init/route')(app);
require('./init/db')();
require('./init/validation')();

const PORT = process.env.NODE_PORT || 3000
app.listen(PORT, () => {
    winston.info(`listening on port ${PORT}`);
});
