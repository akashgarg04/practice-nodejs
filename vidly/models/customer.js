const mongoose = require('mongoose');
const Joi = require ('joi');

mongoose.set('useFindAndModify', false);

const Customer = mongoose.model('Customers', new mongoose.Schema({
        name: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 10
        },
        isGold: {
            type: Boolean,
            default: false
        },
        phone: {
            type: String,
            maxlength: 10,
            minlength: 10
        }
}));

function validateCustomer(text) {
    const schema = {
        name: Joi.string().min(3).max(10).required(),
        phone: Joi.string().length(10),
        isgold: Joi.boolean()
    };
    return (Joi.validate(text,schema));
}

module.exports.Customer = Customer;
module.exports.validate = validateCustomer;