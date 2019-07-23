
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(()=> console.log('MongoDB database connected on the mongo-exercises collection!!'))
    .catch(()=> console.error('Error connecting MongoDB database!!', err));

const courseSchema = new mongoose.Schema({
    tags: [String],
    date: {type: Date, default: Date.now},
    name: { type: String, required: true},
    author: String,
    isPublished: Boolean,
    price: Number
});

const Course = new mongoose.model('Course', courseSchema);

run();

async function run() {
    const exResult_1 = await getAllBackendCourses();
    //console.log(exResult_1);

    const exResult_2 = await getAllCourses();
    //console.log(exResult_2);

    const exResult_3 = await getCoursesAbove15();
    console.log(exResult_3);
}

async function getAllBackendCourses() {
    return await Course
        .find( { isPublished: true, tags: 'backend'} )
        .sort({name: 1})
        .select({name: 1, author: 1});
}

async function getAllCourses () {
    return await Course
        .find({ isPublished: true })
        .or([ {tags: 'frontend'} ,{ tags: 'backend'} ])
        .sort('-price')
        .select('name author price');
}
async function getCoursesAbove15 () {
    return await Course
        .find( { isPublished: true } )
        .or([ { price: {$gte: 15 }} , {name: /.*by.*/i } ]);
}