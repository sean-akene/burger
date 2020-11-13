const connection = require("./connection");

function printQuestionMarks(num) {
    let array = [];
    for (var i = 0; i < num; i++) {
        array.push("?");
    }
    return array.toString();
};

function objectToSequel(object) {
    var array = [];
    for (var key in object) {
        array.push(key + "=" + object[key]);
    }
    return array.toString();
};

var orm = {
    all: function(tableInput, cb) {
      var queryString = "SELECT * FROM " + tableInput + ";";
      connection.query(queryString, function(err, result) {
        if (err) {
          throw err;
        }
        cb(result);
      });
    },
    // vals is an array of values that we need to save to cols
    // cols are the columns we need to place the values into
    create: function(table, cols, vals, cb) {
      var queryString = "INSERT INTO " + table;
      queryString += " (";
      queryString += cols.toString();
      queryString += ") ";
      queryString += "VALUES (";
      queryString += printQuestionMarks(vals.length);
      queryString += ") ";
      // (LINES 32-38 above) -> queryString = "INSERT INTO " + table + " ("cols.toString();") " VALUES (" printQuestionMarks(vals.length);")"
      console.log(queryString);
      connection.query(queryString, vals, function(err, result) {
        if (err) {
          throw err;
        }
        cb(result);
      });
    },
    // objColVals would be the columns and values that we need to update
    // exxamples of objColVals include {name: panther, sleepy: true}
    update: function(table, objColVals, condition, cb) {
      var queryString = "UPDATE " + table;
      queryString += " SET ";
      queryString += objectToSequel(objColVals);
      queryString += " WHERE ";
      queryString += condition;
      console.log(queryString);
      connection.query(queryString, function(err, result) {
        if (err) {
          throw err;
        }
        cb(result);
      });
    }
  };
  module.exports = orm;