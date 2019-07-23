const Joi = require ('joi');
const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

const genereSchema
 = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 12
    }});

const Genres = mongoose.model('Genres', genereSchema);

function validateGenre(text) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return (Joi.validate(text,schema));
}

module.exports.Genres = Genres;
module.exports.validate = validateGenre;
