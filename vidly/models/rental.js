const mongoose = require('mongoose');
const Joi = require ('joi');

mongoose.set('useFindAndModify', false);

const Rental = mongoose.model('Rental', new mongoose.Schema({
    customer: { 
        type: new mongoose.Schema({
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
                required: true,
                minlength: 3,
                maxlength: 10
            }      
        }),  
        required: true
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                trim: true, 
                minlength: 3,
                maxlength: 10
            },
            dailyRentalRate: { 
                type: Number, 
                required: true,
                min: 0,
                max: 20
            }   
        }),
        required: true
    },
    dateOut: {
        type: Date,
        default: Date.now,
        required: true
    },
    dateReturned: {
        type: Date
    },
    amount: {
        type: Number,
        min: 0
    },
    paid: {
        type: Boolean,
        default: false
    }
}));

function validateRental(rental) {
    const schema = {
      customerId: Joi.string().required(),
      movieId: Joi.string().required()
    };
  
    return Joi.validate(rental, schema);
}
  
exports.Rental = Rental; 
exports.validate = validateRental;