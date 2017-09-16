// requires
var router = require('express').Router();
var path = require('path');

// GET HTML
router.get('/', function( req, res ) {
    console.log('In base route.');
    var indexRoute = (path.resolve('public/views/index.html'));
    res.sendFile(indexRoute);
});

// export
module.exports = router;