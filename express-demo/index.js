const express = require('express');
const logger = require('./middleware/logger');
const morgan = require('morgan');
const helmet = require('helmet');
const config = require('config');
const debugapp = require ('debug')('app:app');
const debugapi = require ('debug')('app:api');
const home = require('./routes/home');
const courses = require('./routes/courses');

const app = express();

app.use(express.json());  // express.json calls a middleware function that looks for JSON type in the request
                          // and parses it into json object and set the req.body object
// Parses incomming requests for url encoded payloads
// Can read the requests that are of type urlencoded with values as key-value pair from postman 
app.use(express.urlencoded({extended: true})); 

// uses static file
app.use(express.static('public'));

// Middleware function for logging
app.use(logger);
app.use(helmet());

// Enable if its not production
if (app.get('env') != 'production')
{
    app.use(morgan('tiny'));
    debugapp('Morgan is here!!!')
}

// Middleware function for authentication
app.use( (req, res, next) => {
    debugapi('Performing Authentication...');
    //perform authentication
    if (1) // check is authentication is successful
    {
        debugapp('Successfully Authenticated! Welcome!!');
        next();
    }
});

app.use('/',home);
app.use('/api/courses',courses);

// Assign templating engine
app.set('view engine','pug');
app.set('views','./views'); // this is the default value, not necessary to set


// Assign Config
console.log(`Env Variable 1 is : ${process.env.NODE_ENV}`);
console.log(`Env Variable 2 is : ${app.get('env')}`);  /// Gets the same result like above but used 'development' as default

console.log(`The name of the Application is : ${config.get('name')}`);
console.log(`The name of the mail server host is : ${config.get('mail.host')}`);
console.log(`The name of the email user is : ${config.get('mail.username')}`);

console.log(`The password is : ${config.get('mail.password')}`);


// Assign port
const PORT = process.env.NODE_PORT || 3000
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
