const express = require('express');
const genres = require('./routes/genres');

const app = express();

// Home screen
app.get('/',(req, res) => {
    res.send('Welcome to VIDLY!!');
});

app.use('/api/genres',genres);


const PORT = process.env.NODE_PORT || 3000
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});

