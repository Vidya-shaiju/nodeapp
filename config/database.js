var mysql      = require('mysql');

// // creating a database connection
// var connection = mysql.createConnection({
//       host     : 'localhost',
//       user     : 'root',
//       password : 'mysqldatabase12345',
//       database : 'nodedatabase'
// });

// creating a database connection
var connection = mysql.createConnection({
    host     : 'nodedatabase1.cqzfa1fb6jax.us-east-2.rds.amazonaws.com',
    user     : 'root',
    password : 'mysqldatabase12345',
    database : 'nodedatabase'
});
connection.connect();

module.exports = {
    connection : connection
};