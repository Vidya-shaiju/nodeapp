var mysql      = require('mysql');

// creating a database connection
var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : 'mysqldatabase12345',
      database : 'nodedatabase'
});
connection.connect();

module.exports = {
    connection : connection
};