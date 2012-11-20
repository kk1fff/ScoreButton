var mongodb = require("mongodb");

exports.increaseByOne = function(id) {

};

exports.decreaseByOne = function(id) {

}

exports.getNumber = function(id) {

}

// Connect to database.
var initDb = function() {
  var mongoUrl = process.env["MONGOLAB_URI"];

  if (mongoUrl) {
    console.log("DB: Mongo URL - " + mongoUrl);
    // Parse URL
    var reg = /(\w+):(\w+)@([\w\.]+)[:]?(\d*)\/(\w+)/;
    var parsed = mongoUrl.match(reg);
    var user = parsed[1];
    var pass = parsed[2];
    var host = parsed[3];
    var port = parsed[4];
    var db = parsed[5];

    console.log("Mongo info:");
    console.log("  user: " + user);
    console.log("  pass: " + pass);
    console.log("  host: " + host);
    console.log("  port: " + port);
    console.log("  db: " + db);
  } else {
    console.log("DB: Unable to get mongo uri");
  }
};

initDb();
