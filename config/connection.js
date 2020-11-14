var mysql = require("mysql");
var connection;
if (process.env.JAWSDB_URL) {
  conncection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "burger_db",
  });
}
connection.connect();
module.exports = connection;