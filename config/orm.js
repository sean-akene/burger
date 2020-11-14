var connection = require("./connection.js");
// Helper function for SQL syntax.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
  var arr = [];
  for (var i = 0; i < num; i++) {
    arr.push("?");
  }
  return arr.toString();
}
// A Helper function to convert key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];
  // We Loop through the keys and push/value as a string int arr
  for (let key in ob) {
    var value = ob[key];
    if (Object.hasOwnProperty.call(ob, key)) {
   
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      
      arr.push(key + "=" + value);
    }
  }
  // Here we translate array of string to a single comma-separated string
  return arr.toString();
}
var orm = {
  selectAll: function (tableInput, cb) {
    var queryString = "SELECT * FROM " + tableInput + ";";
    console.log(tableInput);
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  insertOne: function (table, cols, vals, cb) {
    var queryString = "INSERT INTO " + table;
    console.log(table);
    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";
    console.log(queryString);
    connection.query(queryString, vals, function (err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  updateOne: function (table, objColVals, condition, cb) {
    var queryString = " UPDATE " + table;
    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;
    console.log(queryString);
    connection.query(queryString, function (err, result) {
      if (err) throw err;
      cb(result);
    });
  },
};
module.exports = orm;