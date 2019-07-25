const express = require('express');
const bcrypt = require('bcrypt');
const { User, validateLogin } = require('../models/user');

const router = express.Router();
router.use(express.json());

router.post('/', async (req, res) => {
    try{  
        const {error} = validateLogin(req.body);
        if (error){
            res.status(400).send(error.details[0].message)
            return;
        }

        let user = await User.findOne({ email: req.body.email });
        if (!user || 
            !bcrypt.compare(req.body.password , user.password)) 
        { 
            return res.status(400).send('Invalid email or password');
        }
        
        // Using JWT instead
        console.log('Login Successful');
        res.send(user.generateAuthToken());

    }
    catch(ex) { 
        console.log ('Something went wrong!', ex.message); 
        return;
    }
});


module.exports = router;

