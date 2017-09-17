// requires
var router = require('express').Router();
var pool = require('../modules/pool');

// GET query DB and respond with all rows
router.get('/', function(req, res) {
    console.log('in GET task route');
    pool.connect(function(err, client, done) {
        if (err) {
            console.log('connection error ->', err);
            res.sendStatus(500);
            done();
        } else {
            var queryString = 'SELECT * FROM tasks';
            client.query(queryString, function(queryErr, resObj) {
                if(queryErr) {
                    console.log('query error ->', queryErr);
                    res.sendStatus(500);
                } else {
                    console.log('result object rows', resObj.rows);
                    res.send(resObj.rows);
                } // end else
                done();
            }); // end query
        } // end else
    }); // end connect
}); // end GET

// POST add row to DB and respond with created

// PUT update db row with new information and respond with accepted

// Delete remove row from db and respond with accepted

// export
module.exports = router;