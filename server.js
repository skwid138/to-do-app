// requires
var express = require('express');
var bodyParser = require('body-parser');

// globals
var app = express();
var port = 5000;

// route requires
var indexRouter = require('./routes/index');
var taskRouter = require('./routes/task');

// module use
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

// routes
app.use('/', indexRouter);
app.use('/task', taskRouter);

//listen
app.listen(port, function( ) {
    console.log('Server Listening on port: ', port);
});