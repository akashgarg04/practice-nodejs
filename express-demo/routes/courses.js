const Joi = require ('joi');
const express = require('express');
const router = express.Router();


const courses = [
    {id: 1, name: 'course1' },
    {id: 2, name: 'course2' },
    {id: 3, name: 'course3' },
];


// This app has GET PUT POST and DELETE methods

//get all
router.get('/',(req, res) => {
    res.send(courses);
});

// Understanding Route Param vs Query Param
// app.get('/api/course/:id',(req, res) => {
//     res.send(req.params.id);
//     res.send(req.query)
// });

//get by id
router.get('/:id',(req, res) => {
    const course = courses.find( c => c.id == parseInt(req.params.id))
    if (!course) {return res.status(404).send('Course not found')}
    else { res.send(course); }
});

//post
router.post('/',(req, res) => {
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

//put
router.put('/:id',(req, res) => {
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

//Delete
router.delete('/:id', (req, res) => {
    const course = courses.find(c => (c.id == parseInt(req.params.id)))
    if (!course) { return res.status(404).send('Course cannot be deleted as it does not exists.')    }
    else {
        const index = courses.indexOf(course);
        courses.splice(index,1);
    }
    res.send(course);
});



function validateCourse(text) {
    // validate the new info, if invalid, return 404
    const schema = {
        name: Joi.string().min(3).required()
    };
    return (Joi.validate(text,schema));
}


module.exports = router;