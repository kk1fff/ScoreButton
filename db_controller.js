var mongodb = require("mongodb");
var logger = require("./logger.js"), log = logger('db', true);

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
    // Parse URL
    log.l("mongoUrl: " + mongoUrl);
    var reg = /(\w+):(\w+)@([\w\.]+)[:]?(\d*)\/(\w+)/;
    var parsed = mongoUrl.match(reg);
    var user = parsed[1];
    var pass = parsed[2];
    var host = parsed[3];
    var port = parsed[4];
    var db = parsed[5];
  } else {
    log.e("Unable to get mongo uri");
  }
};

initDb();
