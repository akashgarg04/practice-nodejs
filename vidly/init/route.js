const genres = require('../routes/genresDb');
const customer = require('../routes/customer');
const movie = require('../routes/movie');
const rental = require('../routes/rental');
const user = require('../routes/user');
const auth = require('../routes/auth');
const error = require('../middleware/error');

module.exports = function (app) 
{
    // Home screen
    app.get('/',(req, res) => {
        res.send('Welcome to VIDLY!!');
    });

    app.use('/api/genres',genres);
    app.use('/api/customer',customer);
    app.use('/api/movie',movie);
    app.use('/api/rental',rental);
    app.use('/api/user',user);
    app.use('/api/auth',auth);

    //Catch all exceptions
    app.use( error );
}
