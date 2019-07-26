const config = require ('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Joi = require ('joi');

mongoose.set('useFindAndModify', false);

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 10
    },
    email: {
        type: String,
        required: true,
        uninque: true,
        minlength: 5,
        maxlength: 50
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

userSchema.methods.generateAuthToken = function() {
    return jwt.sign({ _id: this._id, isAdmin: this.isAdmin} , config.get('jwtPrivateKey') );
}

const User = mongoose.model('User', userSchema);

function validateUser(text) {
    const schema = {
        name: Joi.string().min(3).max(10).required(),
        email: Joi.string().min(5).max(50).required().email(),
        password: Joi.string().min(3).required(),
        isAdmin: Joi.boolean()
    };
    return (Joi.validate(text,schema));
}

function validateUserLogin(text) {
    const schema = {
        email: Joi.string().min(5).max(50).required().email(),
        password: Joi.string().min(3).required(),
    };
    return (Joi.validate(text,schema));
}


module.exports.User = User;
module.exports.validate = validateUser;
module.exports.validateLogin = validateUserLogin;
