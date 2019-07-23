const express = require('express');
const { Customer, validate } = require('../models/customer');

const router = express.Router();
router.use(express.json());


router.get('/', async (req, res) => {
    res.send(await Customer.find());
});


router.get('/:id', async (req, res) => {
    try {
        const customer = await Customer.findByIdAndRemove(req.params.id);
        res.send(customer);
    }
    catch (ex) {
        return res.status(404).send('customer not found');
    }
});


router.post('/', async (req, res) => {
    try{  
        const {error} = validate(req.body);
        if (error){
            res.status(400).send(error.details[0].message)
            return;
        }

        var customer = new Customer({
            name: req.body.name,
            phone: req.body.phone,
            isGold: req.body.isgold
        });
        await customer.save();
    }
    catch(ex) { 
        console.log ('Something went wrong!', ex.message); 
        return;
    }
    res.send(customer);
});


router.put('/:id', async (req, res) => {

    const {error} = validate(req.body);
    if (error){
        res.status(400).send(error.details[0].message);
        return;
    }

    try {
        const customer = await Customer.findByIdAndUpdate ( 
                    req.params.id , 
                    { 
                        name: req.body.name ,
                        phone: req.body.phone,
                        isGold: req.body.isgold
                    } ,
                    { new: true } );
        //console.log(customer);
        res.send(customer);
    }
    catch (ex)
    {
        return res.status(404).send('customer not found to update');
    }
});

router.delete('/:id', async (req, res) => {
    try{
        const customer = await Customer.findByIdAndRemove(
                req.params.id , 
                { new: true } );
        res.send(customer);
    }
    catch (ex) {
        return res.status(404).send('customer cannot be '
                    + 'deleted as it does not exists.');
    }
});

module.exports = router;