const mongoose = require('mongoose');
const Joi = require ('joi');

mongoose.set('useFindAndModify', false);

const Movie = mongoose.model('Movie', new mongoose.Schema({
        title: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 10
        },
        genre: {
            type: new mongoose.Schema({ name: String }) 
        },
        numberInStock: {
            type: Number,
            min: 0,
            default: 10
        },
        dailyRentalRate: {
            type: Number,
            min: 0,
            default: 3
        }
}));

function validateMovie(text) {
    const schema = {
        title: Joi.string().min(3).max(10).required(),
        genreId: Joi.string(),
        numberInStock: Joi.number().min(0),
        dailyRentalRate: Joi.number().min(0)
    };
    return (Joi.validate(text,schema));
}

exports.validate =  validateMovie;
exports.Movie = Movie ;