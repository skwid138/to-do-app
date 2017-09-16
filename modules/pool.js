// requires
var Pool = require('pg').Pool;

//server config
var config = {
    host: 'localhost',
    port: 5432,
    database: 'to-do',
    max: 20
};

// construct pool
var pool = new Pool(config);

//export
module.exports = pool;