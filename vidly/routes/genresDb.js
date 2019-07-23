const Joi = require ('joi');
const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
router.use(express.json());
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

router.get('/', async (req, res) => {
    const genres = await Genres.find();
    res.send(genres);
});

router.get('/:id', async (req, res) => {
    try {
        console.log(req.params.id);
        const genre = await Genres.findByIdAndRemove(req.params.id);
        console.log(genre);
        res.send(genre);
    }
    catch (ex) {
        return res.status(404).send('genre not found');
    }
});

router.post('/', async (req, res) => {
    const {error} = validategenre(req.body);
    if (error){
        res.status(400).send(error.details[0].message)
        return;
    }

    try{  
        var genre = new Genres({
            name: req.body.name
        });
        await genre.save();
    }
    catch(ex) { 
        console.log ('Something went wrong!', ex.message); 
        return;
    }
    res.send(genre);
});

router.put('/:id', async (req, res) => {

    const {error} = validategenre(req.body); // {error} = result.error
    if (error){
        res.status(400).send(error.details[0].message);
        return;
    }

    try {
        //update genre and send response
        // console.log(req.params.id);
        // console.log(req.body.name);
        const genre = await Genres.findByIdAndUpdate ( 
                    req.params.id , 
                    { name: req.body.name} ,
                    { new: true } );
        console.log(genre);
        res.send(genre);
    }
    catch (ex)
    {
        return res.status(404).send('genre not found to update');
    }
});

router.delete('/:id', async (req, res) => {
    try{
        const genre = await Genres.findByIdAndRemove(
                req.params.id , 
                { new: true } );
        res.send(genre);
    }
    catch (ex) {
        return res.status(404).send('genre cannot be '
                    + 'deleted as it does not exists.');
    }
});


function validategenre(text) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return (Joi.validate(text,schema));
}

module.exports = router;