const express = require('express');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { Genres, validate } = require('../models/genres');

const router = express.Router();
router.use(express.json());


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

router.post('/', auth , async (req, res) => {
    const {error} = validate(req.body);
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

    const {error} = validate(req.body); // {error} = result.error
    if (error){
        res.status(400).send(error.details[0].message);
        return;
    }

    try {
        //update genre and send response
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

router.delete('/:id', [auth, admin] , async (req, res) => {
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

module.exports = router;