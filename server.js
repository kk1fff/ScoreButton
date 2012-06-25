var express = require('express');
var fs      = require('fs');
var url     = require('url');

var app = express.createServer(express.logger());

var verifyScoreButtonId = function() {
  return true;
};

var getQueryParameter = function(req) {
  return url.parse(req.url, true).query;
};

var toJsonp = function(jsonString, req) {
  var cbFunctionName = getQueryParameter(req)['callback'];
  console.log(cbFunctionName);
  if (cbFunctionName === undefined) {
    console.error("Client didn't send callback name");
    console.error(getQueryParameter(req));
    return jsonString;  // Client didn't send a callback function string.
  } else {
    return cbFunctionName + "(" + jsonString + ")";
  }
};

app.get('/', function(request, response) {
  response.send('Hello World!');
});

app.get('/score_button.js', function(req, resp) {
  var q = getQueryParameter(req);

  // Load script for the id.
  if (verifyScoreButtonId(q['id'])) {
    // We load script for valid script.
    fs.readFile(__dirname + '/score_button.js', 'utf8', function(err, data) {
      resp.setHeader('content-type', 'application/javascript; charset=utf-8');
      var scorebuttonloader_path = 
        "http://" + req.headers.host + "/score_button_loader.js";
      resp.end(data.
               replace("SCOREBUTTONID", "\"" + q['id'] + "\"").
               replace("SCOREBUTTONLOADER", "\"" +
                       scorebuttonloader_path + "\""));
    });
  } else {
    // For invalid id, we send 404 status back.
    resp.statusCode = 404;
    resp.end('404/Not found');
  }
});

app.get('/score_button_loader.js', function(req, resp) {
  fs.readFile(__dirname + '/score_button_loader.js', 'utf8', function(err, data) {
    resp.setHeader('content-type', 'application/javascript; charset=utf-8');
    resp.end(data);
  });
});

app.get('/plus', function(req, resp) {
  resp.setHeader('content-type', 'application/javascript; charset=utf-8');
  resp.send(toJsonp('{ score: 1}', req));
});

app.get('/minus', function(req, resp) {
  resp.statusCode = 200;
  resp.setHeader('content-type', 'application/json; charset=utf-8');
  resp.end(toJsonp('{ score: 0}', req));
});

app.get('/score', function(req, resp) {
  resp.send(toJsonp('{ score: -1}', req));
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
