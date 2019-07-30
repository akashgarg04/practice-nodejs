const Joi = require('joi');
//const validate = require('../middleware/validate');
const {Rental} = require('../models/rental');
const {Movie} = require('../models/movies');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const moment = require('moment');

router.use(express.json());

router.post('/', auth, async (req, res) => { 
    if (!req.body.customerId){return res.status(400).send('customerId is not provided');}
    if (!req.body.movieId){return res.status(400).send('movieId is not provided');}
    const rental = await Rental.findOne({
        'customer._id': req.body.customerId, 
        'movie._id' :req.body.movieId
    });
    if (!rental) {return res.status(404).send('rental not found');} 
    if (rental.dateReturned) return res.status(400).send('Return already processed.');
    rental.dateReturned = new Date();
    const noOfDays = moment().diff(rental.dateOut, 'days');
    rental.amount = noOfDays * (rental.movie.dailyRentalRate)
    await rental.save();

    await Movie.update({ 
        _id:req.body.movieId } , {
            $inc: { numberInStock : 1 }
        });
    
    return res.status(200).send(rental);
})

module.exports = router; 