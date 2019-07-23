//////////// This file is depricated, use genresDb instead

const Joi = require ('joi');
const express = require('express');
const router = express.Router();

router.use(express.json());

const genres = [
        {id: 1, name: 'action' },
        {id: 2, name: 'horror' },
        {id: 3, name: 'romantic' },
        {id: 4, name: 'sifi' },
        {id: 5, name: 'classic' },
        {id: 6, name: 'thriller' },
];


router.get('/',(req, res) => {
    res.send(genres);
});

router.get('/:id',(req, res) => {
    const genres = genres.find( c => c.id == parseInt(req.params.id));
    if (!genre) {return res.status(404).send('genre not found'); }
    else { res.send(genre); }
});

router.post('/',(req, res) => {
    const {error} = validategenre(req.body);
    if (error){
        res.status(400).send(error.details[0].message)
        return;
    }
    
    const genre = {
        id: genres.length+1,
        name: req.body.name
    };
    genres.push(genre);
    res.send(genres);
});

router.put('/:id',(req, res) => {
    var genre = genres.find( c => c.id == parseInt(req.params.id));
    if (!genre) {return res.status(404).send('genre not found to update'); }

    const {error} = validategenre(req.body); // {error} = result.error
    if (error){
        res.status(400).send(error.details[0].message);
        return;
    }

    //update genre and send response
    genre.name = req.body.name;
    res.send(genres);
});

router.delete('/:id', (req, res) => {
    const genre = genres.find(c => (c.id == parseInt(req.params.id)));
    if (!genre) { return res.status(404).send('genre cannot be deleted as it does not exists.'); }
    else {
        const index = genres.indexOf(genre);
        genres.splice(index,1);
    }
    res.send(genre);
});


function validategenre(text) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return (Joi.validate(text,schema));
}

module.exports = router;