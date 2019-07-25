const config = require ('config');
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {

    const token = req.header('x-auth-token');
    if (! token) { return res.status(401).send('No token found');}

    try {
        req.user = jwt.verify(token, config.get('jwtPrivateKey'));
        next();
    }
    catch (ex) {
        return res.status(400).send('Incorrect token');
    }
}