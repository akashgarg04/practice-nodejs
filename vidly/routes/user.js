const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validate } = require('../models/user');

const router = express.Router();
router.use(express.json());

router.post('/', async (req, res) => {
    try{  
        const {error} = validate(req.body);
        if (error){
            res.status(400).send(error.details[0].message)
            return;
        }

        // Check for existing user
        let user = await User.findOne({ email: req.body.email });
        if (user) { return res.status(400).send('User already exists.');}

        user = new User( _.pick (req.body, ['name','email','password'] ));
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);
        await user.save();
        
        res.header('x-auth-token', user.generateAuthToken()).send(_.pick(user, [ '_id', 'name', 'email' ]));
    }
    catch(ex) { 
        console.log ('Something went wrong!', ex.message); 
        return;
    }
});

module.exports = router;
