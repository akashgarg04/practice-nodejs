const express = require('express');
const router = express.Router();

router.get('/',(req, res) => {
    //    res.send('Helloo!!');
        res.render('index',{
            title: "",
            message: "Hello!!",
            desc: "Welcome to the REST world."
        })
    });
    
module.exports = router;