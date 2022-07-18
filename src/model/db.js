let mysql = require("mysql");
// make sure to DOUBLE check all syntax
let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT

});
// connect to the DB
connection.connect();

connection.query("select now()", function(err, results){
    if(err){
        console.log("Could not test the database connection", err);
    } else {
        console.log("Connection test results: ", results);
    }
}),
// export the connection
module.exports = connection;