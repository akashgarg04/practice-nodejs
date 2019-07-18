const Joi = require ('joi');
const express = require('express');
const logger = require('./logger');
const morgan = require('morgan');
const helmet = require('helmet');
const config = require('config');
const debugapp = require ('debug')('app:app');
const debugapi = require ('debug')('app:api');

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

const courses = [
        {id: 1, name: 'course1' },
        {id: 2, name: 'course2' },
        {id: 3, name: 'course3' },
];

// This app has GET PUT POST and DELETE methods

app.get('/',(req, res) => {
    res.send('Helloo!!');
});

app.get('/api/course',(req, res) => {
    res.send(courses);
});

// Understanding Route Param vs Query Param
// app.get('/api/course/:id',(req, res) => {
//     res.send(req.params.id);
//     res.send(req.query)
// });

app.get('/api/course/:id',(req, res) => {
    const course = courses.find( c => c.id == parseInt(req.params.id))
    if (!course) {return res.status(404).send('Course not found')}
    else { res.send(course); }
});

app.post('/api/courses',(req, res) => {
    // if (!req.body.name || req.body.name.length < 3){
    //     res.status(400).send('Name missing')
    //     return;
    // }
    // Below is the same validation using joi

    // ------Improved code below
    // const schema = {
    //     name: Joi.string().min(3).required()
    // };
    // const result = Joi.validate(req.body,schema);
    // console.log(result);
    // if (result.error){
    //     res.status(400).send(result.error.details[0].message)
    //     return;
    // }

    const {error} = validateCourse(req.body); // {error} = result.error
    if (error){
        res.status(400).send(error.details[0].message)
        return;
    }
    
    const course = {
        id: courses.length+1,
        name: req.body.name
    }
    courses.push(course);
    res.send(courses);
});

app.put('/api/course/:id',(req, res) => {
    // Look for the course. If it does not exist, return error
    var course = courses.find( c => c.id == parseInt(req.params.id))
    if (!course) {return res.status(404).send('Course not found to update')}

    // // validate the new info, if invalid, return 404
    // const schema = {
    //     name: Joi.string().min(3).required()
    // };
    // const result = Joi.validate(req.body,schema);
    const {error} = validateCourse(req.body); // {error} = result.error
    if (error){
        res.status(400).send(error.details[0].message)
        return;
    }

    //update course and send response
    course.name = req.body.name;
    res.send(courses);
});

app.delete('/api/course/:id', (req, res) => {
    const course = courses.find(c => (c.id == parseInt(req.params.id)))
    if (!course) { return res.status(404).send('Course cannot be deleted as it does not exists.')    }
    else {
        const index = courses.indexOf(course);
        courses.splice(index,1);
    }
    res.send(course);
});

// Fetch Config
console.log(`Env Variable 1 is : ${process.env.NODE_ENV}`);
console.log(`Env Variable 2 is : ${app.get('env')}`);  /// Gets the same result like above but used 'development' as default

console.log(`The name of the Application is : ${config.get('name')}`);
console.log(`The name of the mail server host is : ${config.get('mail.host')}`);
console.log(`The name of the email user is : ${config.get('mail.username')}`);

console.log(`The password is : ${config.get('mail.password')}`);



const PORT = process.env.NODE_PORT || 3000
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});


function validateCourse(text) {
    // validate the new info, if invalid, return 404
    const schema = {
        name: Joi.string().min(3).required()
    };
    return (Joi.validate(text,schema));
}
