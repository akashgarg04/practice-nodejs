
module.exports = function (err, req, res, next) {
    res.status(500).send('Internal Server error!! Truly, this is the first!!');
}
