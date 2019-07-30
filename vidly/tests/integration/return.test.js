const mongoose = require('mongoose');
const request = require('supertest');
const moment = require('moment');
const {Rental} = require('../../models/rental');
const {Movie} = require('../../models/movies');
const {User} = require('../../models/user');

describe ('/api/returns' , () => {
    let customerId; 
    let movieId;
    let rental;
    let movie; 
    let token;
    let appf

    const exec = () => {
        return (request.agent(app))
            .post('/api/returns')
            .set('x-auth-token', token)
            .send({ customerId, movieId });
    };

    beforeEach(async () => { 
        app = require('../../index'); 
        customerId = mongoose.Types.ObjectId();
        movieId = mongoose.Types.ObjectId();
        token = new User().generateAuthToken();
    
        movie = new Movie({
            _id: movieId,
            title: '12345',
            dailyRentalRate: 2,
            genre: { name: '12345' },
            numberInStock: 10 
        });
        
        await movie.save();

        rental = new Rental({
            customer: {
                _id: customerId,
                name: '12345',
                phone: '12345'
            },
            movie: {
                _id: movieId,
                title: '12345',
                dailyRentalRate: 2
            },
            dateOut: moment().add(-3, 'days').toDate()
        });

        await rental.save();
    });

    afterEach(async () => { 
        //await server.close(); 
        await Rental.remove({});
        await Movie.remove({});
    });  

    it('should return 401 if client is not logged in', async () => {
        token = '';
        const res = await exec();
        expect(res.status).toBe(401);
    });

    it('should return 400 if customerId is not provided', async () => {
        customerId = '';   
        const res = await exec();
        expect(res.status).toBe(400);
    });

    it('should return 400 if movieId is not provided', async () => {
        movieId = ''; 
        const res = await exec();
        expect(res.status).toBe(400);
    });

    it('should return 404 if no rental found for the customer/movie', async () => {
        await Rental.remove({});
        const res = await exec();
        expect(res.status).toBe(404);
    });

    it('should return 400 if return is already processed', async () => {
        rental.dateReturned = new Date();
        await rental.save();
        const res = await exec();
        expect(res.status).toBe(400);
    });

    it('should return 200 if we have a valid request', async () => {
        const res = await exec();
        expect(res.status).toBe(200);
    });

    it('should return set the return date and different is less than 10 seconds from now', async () => {
        const res = await exec();
        const result = await Rental.findById(rental._id);
        expect(result.dateReturned).toBeDefined();
        const diff = new Date() - result.dateReturned;
        // different in time must be less than 10 seconds
        expect(diff).toBeLessThan(10*1000);
    });

    it('should calculate rental fee', async () => {
        const res = await exec();
        const result = await Rental.findById(rental._id);
        expect(result.amount).toBeDefined();

        const noOfDays = moment().diff(result.dateReturned, rental.dateOut, 'days');
        const fee = rental.movie.dailyRentalRate * ( noOfDays);
        expect(result.amount).toBe(6);
    });

    it('should update the stock after return', async () => {
        const res = await exec();
        const result = await Movie.findById(movieId);
        expect(result.numberInStock).toBe(movie.numberInStock+1);
    });

    it('should update the stock after return', async () => {
        const res = await exec();
        const result = await Rental.findById(rental._id);
        expect(res.body).toHaveProperty('dateReturned');
        expect(res.body).toHaveProperty('dateOut');
        expect(res.body).toHaveProperty('amount');
        expect(res.body).toHaveProperty('customer');
        expect(res.body).toHaveProperty('movie');
    });
});

