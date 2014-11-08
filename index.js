// index.js: composition root

// REQUIRED LIBRARIES
var http = require('http');
var fs = require('fs');

// REQUIRED CLASSES
var App = require("./app.js");

// CLASS INSTANTIATION
var app = new App();
var io = app.io;

// ESTABLISH ROUTE CLASSES & ROUTES
//var Routes = require('./routes');
//var routes = new Routes(app);

io.on('connection', function (socket) {
  console.log('socket io connection');
  socket.on('newApp', function (data) {
    console.log(data);
    socket.join(data);
  });
});


app.get('/', function(req, res, next){
  return res.send('Success');
});

app.post('/apis', function(req, res, next){
  var inputInterface = req.body;
  console.log('inputInterface: ' + JSON.stringify(inputInterface));
  var options = {
    hostname: 'localhost',
    port: 3000,
    path: '/apis',
    method: 'POST',
    headers: {
      "Content-Type" : "application/json"
    }
  };
  
  var httpRequest = http.request(options, function(httpRes) {
    var responseString = '';
    var responseData;
    console.log('RESPONSE STATUS: ' + res.statusCode);
    console.log('RESPONSE HEADERS: ' + JSON.stringify(res.headers));
    httpRes.setEncoding('utf8');
    httpRes.on('data', function (chunk) {
      console.log('BODY: ' + chunk);
      responseString += chunk;
    });
    httpRes.on('end', function() {
      responseData = JSON.parse(responseString);
      if((httpRes.statusCode === 200) || (httpRes.statusCode === 201) || (httpRes.statusCode === 202)){
        console.log('equal to 200, 201, 202');
        return res.status(httpRes.statusCode).json(responseData);
      } else {
        console.log('not equal to 200, 201, 202');
        return res.status(httpRes.statusCode).json(responseData);
      }
    });
  });
  
  httpRequest.on('error', function(e) {
    console.log('problem with request: ' + e.message);
    return res.status(500).json({"errorCode" : 1, "errorDetails" : "Something went wrong"});
  });
  
  // write data to request body
  httpRequest.write(JSON.stringify(inputInterface));
  httpRequest.end();
  
  
});

app.post('/inbound_hooks', function(req, res, next){
  console.log('req.body: ' + JSON.stringify(req.body));
  console.log('req.path: ' + req.path);
  console.log('req.protocol: ' + req.protocol);
  console.log('req.originalUrl: ' + req.originalUrl);
  console.log('req.method: ' + req.method);
  io.sockets.in(req.body['id']).emit('appReady', req.body);
  return res.status(200).send(req.body['id']);
});

app.post('*', function(req, res, next){
  if (!req.is('json')) {
    res.set('Content-Type', app.mediaType);
    res.statusCode = 415;
    return res.json({errorCode : res.statusCode, 'errorMessage' : 'Please re-submit request with a Content-Type header value of "application/json"'});
  }
  return next();
});

app.all('*', function(req, res){
  console.log('req.path: ' + req.path);
  console.log('req.protocol: ' + req.protocol);
  console.log('req.originalUrl: ' + req.originalUrl);
  console.log('req.method: ' + req.method);
  var errorMessage = "Invalid or Unsupported Request. Please check your input and try again.";
  var errorTemplate = { "requestRoute" : req.path, "message" : errorMessage };
  res.set('Content-Type', app.mediaType);
  res.statusCode = 400;
  res.json(400, errorTemplate);
}); // RETURN ERROR FOR ANYTHING THAT OTHERWISE HASN'T BEEN CAUGHT