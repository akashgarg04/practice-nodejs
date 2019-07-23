const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(()=> console.log('MongoDB database connected!!'))
    .catch(()=> console.error('Error connecting MongoDB database!!', err));

const courseSchema = new mongoose.Schema({
    // Adding validation for name as required. 
    // -----NOTE THIS VALIDATION IS JUST IN MONGOOSE, MONGODB DOES NOT CARE
    name: { type: String, 
            required: true,
            minlength: 5,
            maxlength:100
            // , match: /pattern/
        },
    level: {
        type: String,
        required: true,
        enum : ['beginner','intermidate','expert'],
        lowercase: true,
        trim: true
    },
    author: String,
    date: {type: Date, default: Date.now},
    // Custom Validation
    tags: {
            type: Array,
            // //////// Async validation
            // validate: {
            //     isAsync: true,
            //     validator: function (v , callback) {
            //         setTimeout(() => {
            //             // Some API Call
            //             callback (v && v.length > 0);
            //         }, 4000);
            //     },
            //     message: 'Atleast one tag is required.'
            // }
            ////// Sync validation
            validate: {
                validator: function (v) {   // This could be a async call using callback
                    return (v && v.length > 0);
                },
                message: 'Atleast one tag is required.'
            }
          },
    isPublished: Boolean,
    price: {   
            type: Number,
            min:8, max: 20,
            get: v => Math.round(v),
            set: v => Math.round(v),
            // Following validation makes price required if published is true
            // FUNCTION CANNOT BE REPLACED BY => AS THIS WILL LOOSE THE CONTEXT
            required: function () { return this.isPublished }}
});

const Course = mongoose.model('Course', courseSchema);

createCourse();
//getCourse();
//updateCourse('5d363f74c0e2151fd3eaf760');
//deleteCourse('5d363f74c0e2151fd3eaf760');

async function createCourse() {
    try{
        const course = new Course({
            name: 'Become Angular Expert',
            author: 'not so smart guy',
            level: '1',
            tags: ['frontend', 'angular'],
            isPublished: true,
            price: 12
        });
        const result = await course.save();
        console.log(result);
    }
    catch(ex)
    {
        //console.error('Error happened', err.message);
        for (field in ex.errors)
            console.log(ex.errors[field].message);
    }
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
