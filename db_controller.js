var mongodb = require("mongodb");

exports.increaseByOne = function(id) {

};

exports.decreaseByOne = function(id) {

}

exports.getNumber = function(id) {

}

// Connect to database.
var initDb = function() {
  var mongoUrl = process.env["MONGOHQ_URL"] ||
    "mongodb://localhost/sushiaaa";

  console.log("Mongo URL: " + mongoUrl);
};

initDb();
