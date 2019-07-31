const mongoose = require('mongoose');
const moment = require('moment');
const Joi = require ('joi');

mongoose.set('useFindAndModify', false);

const rentalSchema = new mongoose.Schema({
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
});

rentalSchema.statics.lookup =  function (customerId, movieId) {
    return this.findOne({
        'customer._id': customerId, 
        'movie._id' :movieId
    });
} 

rentalSchema.methods.processReturn = function () {
    this.dateReturned = new Date();
    const noOfDays = moment().diff(this.dateOut, 'days');
    this.amount = noOfDays * (this.movie.dailyRentalRate)
}

const Rental = mongoose.model('Rental', rentalSchema );

function validateRental(rental) {
    const schema = {
      customerId: Joi.objectId().required(),
      movieId: Joi.objectId().required()
    };
  
    return Joi.validate(rental, schema);
}
  
exports.Rental = Rental; 
exports.validate = validateRental;