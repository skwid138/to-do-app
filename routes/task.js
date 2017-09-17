// requires
var router = require('express').Router();
var pool = require('../modules/pool');

// GET query DB and respond with all rows
router.get('/', function(req, res) {
    console.log('in GET task route');
    pool.connect(function(err, client, done) {
        if (err) {
            console.log('GET connection error ->', err);
            res.sendStatus(500);
            done();
        } else {
            var queryString = 'SELECT * FROM tasks';
            client.query(queryString, function(queryErr, resObj) {
                if(queryErr) {
                    console.log('Query GET Error ->', queryErr);
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
router.post('/', function(req, res) {
    console.log('In POST task route.');
    console.log('req.body ->', req.body);
    // variables from client
    var name = req.body.name;
    var description = req.body.description;
    var due = req.body.due;
    pool.connect(function(err, client, done){
        if (err) {
            console.log('POST connection error ->', err);
            res.sendStatus(500);
            done();
        } else {
            var queryString = "INSERT INTO tasks (name, description, due) VALUES ($1, $2, $3)";
            var values = [name, description, due];
            client.query(queryString, values, function (queryErr, resObj) {
                if(queryErr) {
                    console.log('Query POST Error ->', queryErr);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(201);
                } // end else
                done();
            }); // end query
        } // end else
    }); // end connect
}); // end POST

// PUT update db row with new information and respond with accepted
router.put('/:id', function(req, res) {
    console.log('in PUT task route');
    var taskId = req.params.id;
    var completed = req.body.completed;
    pool.connect(function(err, client, done) {
        if(err) {
            console.log('PUT connection error ->', err);
            res.sendStatus(500);
            done();
        } else {
            var queryString = "UPDATE tasks SET status='true', completed=$2 WHERE id=$1";
            var values = [taskId, completed];
            client.query(queryString, values, function(queryErr, resObj){
                if (queryErr) {
                    console.log('Query PUT Error ->', queryErr);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(201);
                } // end else
                done();
            }); // end query
        } // end else
    }); // end connect
}); // end PUT

// Delete remove row from db and respond with accepted
router.delete('/:id', function(req, res){
    console.log('in DELETE task route');
    var taskId = req.params.id;
    pool.connect(function(err, client, done) {
        if(err) {
            console.log('DELETE connection error ->', err);
            res.sendStatus(500);
            done();
        } else {
            var queryString = 'DELETE FROM tasks WHERE id=$1';
            var values = [taskId];
            client.query(queryString, values, function(queryErr, resObj) {
                if(queryErr) {
                    console.log('Query DELETE Error ->', queryErr);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(202);
                } // end else
            }); // end query
        } // end else
    }); // end connect
}); // end DELETE

// export
module.exports = router;