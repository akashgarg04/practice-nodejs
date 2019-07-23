const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(()=> console.log('MongoDB database connected!!'))
    .catch(()=> console.error('Error connecting MongoDB database!!', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    date: {type: Date, default: Date.now},
    tags: [ String ],
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

//createCourse();
//getCourse();
//updateCourse('5d363f74c0e2151fd3eaf760');
deleteCourse('5d363f74c0e2151fd3eaf760');

async function createCourse() {
    const course = new Course({
        name: 'Become Angular Expert',
        author: 'not so smart guy',
        tags: ['node', 'waaho'],
        isPublished: true
    });
    const result = await course.save();
    console.log(result);
}

async function getCourse()
{
    const courses = await Course
        .find({ isPublished: true})
        .limit(10)
        .sort({name: -1})
        .select({ tags: 1, date: 1})
        .count();
    console.log(courses);
}

//// Mongo comparision operators
// eq (equals), ne (not equals), gt (greater than), gte (gt or eq to)
// lt (less than), lte (lt or eq to), in , nin (not in)  Eg:
    // find({ price: {$gt: 10, $lt: 20} }})
    // find({{ price: {$in: [10, 15, 20]} }})

//// logical operators .or() and .and()
    // .find().or([{ author: 'Smart' }, {isPublished: true}])
    // .find().and([{ author: 'Smart' }, {isPublished: true}])

//// Regular expression
    // .find( { author: /^Smart/ } )  - Author starts with Smart
    // .find( { author: /Guy$/i } )  - Author ends with Guy case insensitive 
    // .find( { author: /.*Smart Guy.*/i } )  - Author having smart guy case insensitive

// Update and fetch document
async function updateCourse(id) {
    console.log(id);
    console.log(Course.findById(id));
    const course = await Course.findByIdAndUpdate ( id, {
        $set: {
            author: 'new person',
            isPublished: false
        }
    }, { new: true} );  // If the new is not set to true, the method will return the old record
    console.log(course);
}

//Delete course
async function deleteCourse(id) {
    const course = await Course.deleteMany ({ isPublished:false});
    console.log(course);
}
