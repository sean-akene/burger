var mysql = require("mysql");
var connection;

if (process.env.JAWSDB_URL) {
  conncection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "burger_db",
  });
}
console.log(connection);
connection.connect();
module.exports = connection;