const request = require('supertest');
const {Genres} = require('../../models/genres');

describe ('/api/genres', () => {

    let app;

    beforeEach( () => { app = require ('../../index'); } );
    afterEach( async () =>  {
        //await server.close();
        await Genres.remove({});
     });

    describe('GET /', () => {
        Genres.collection.insertMany([
            {name: 'genres'},
            {name: 'genres1'},
            {name: 'genres2'},
        ]);

        it ('should return all genres' , async () => {
             const res = await request.agent(app).get('/api/genres');
             expect(res.status).toBe(200);
             expect(res.body.length).toBe(3);
             expect(res.body.some(data => data.name == 'genres')).toBeTruthy();
             expect(res.body.some(data => data.name == 'genres1')).toBeTruthy();
             expect(res.body.some(data => data.name == 'genres2')).toBeTruthy();
        });
    });
});

