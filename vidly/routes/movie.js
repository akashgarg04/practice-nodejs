const express = require('express');
const { Movie, validate } = require('../models/movies');
const { Genres } = require('../models/genres');

const router = express.Router();
router.use(express.json());


router.get('/', async (req, res) => {
    res.send(await Movie.find());
});


router.get('/:id', async (req, res) => {
    try {
        res.send(await Movie.findById(req.params.id));
        // res.send(movie);
    }
    catch (ex) {
        return res.status(404).send('movie not found');
    }
});


router.post('/', async (req, res) => {
    try{  
        const {error} = validate(req.body);
        if (error){
            res.status(400).send(error.details[0].message)
            return;
        }

        const genre = await Genres.findById(req.body.genreId);
        console.log(genre);
        if (!genre){ return res.status(400).send('Genre not found');}

        let movie = new Movie({
            title: req.body.title,
            genre: {
                _id: genre._id,
                name: genre.name
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate : req.body.dailyRentalRate
        });
        await movie.save();
        res.send(movie);
    }
    catch(ex) { 
        console.log ('Something went wrong!', ex.message); 
        return;
    }
});


router.put('/:id', async (req, res) => {

    const {error} = validate(req.body);
    if (error){
        res.status(400).send(error.details[0].message);
        return;
    }

    try {
        const genres = await Genres.findById(req.body.genreId);

        const movie = await Movie.findByIdAndUpdate ( 
                    req.params.id , 
                    {
                        title: req.body.name,
                        genre: genres,
                        numberInStock: req.body.numberInStock,
                        dailyRentalRate : req.body.dailyRentalRate
                    } ,
                    { new: true } );
        res.send(movie);
    }
    catch (ex)
    {
        return res.status(404).send('movie not found to update');
    }
});

router.delete('/:id', async (req, res) => {
    try{
        const movie = await Movie.findByIdAndRemove(
                req.params.id , 
                { new: true } );
        res.send(movie);
    }
    catch (ex) {
        return res.status(404).send('movie cannot be '
                    + 'deleted as it does not exists.');
    }
});

module.exports = router;