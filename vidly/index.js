const express = require('express');
const genres = require('./routes/genresDb');
const mongoose = require('mongoose');

const app = express();

// Connect to the mongoDB DB - vidly collection
mongoose.connect('mongodb://localhost/vidly')
    .then(()=> {console.log('Connection to mongoDB was successful')})
    .catch((err) => {console.log('Connection to DB failed', err.message)});

// Home screen
app.get('/',(req, res) => {
    res.send('Welcome to VIDLY!!');
});

app.use('/api/genres',genres);


const PORT = process.env.NODE_PORT || 3000
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});

