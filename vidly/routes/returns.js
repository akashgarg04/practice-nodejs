const Joi = require('joi');
const validateModel = require('../middleware/validateModel');
const auth = require('../middleware/auth');
const {Rental} = require('../models/rental');
const {Movie} = require('../models/movies');
const express = require('express');
const router = express.Router();

router.use(express.json());

router.post('/', [ auth , validateModel(validateReturns) ], async (req, res) => {
    const rental = await Rental.lookup( req.body.customerId,req.body.movieId);
    if (!rental) {return res.status(404).send('rental not found');} 
    if (rental.dateReturned) return res.status(400).send('Return already processed.');

    rental.processReturn();
    await rental.save();

    await Movie.update({ 
        _id:req.body.movieId } , {
            $inc: { numberInStock : 1 }
        });
    
    return res.send(rental);
})

function validateReturns(text) {
    const schema = {
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    };
    return (Joi.validate(text,schema));
}

module.exports = router; 