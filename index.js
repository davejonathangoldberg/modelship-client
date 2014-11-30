// index.js: composition root

// REQUIRED LIBRARIES
var http = require('http');
var https = require('https');
var fs = require('fs');
var Mailgun = require('mailgun-js');

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

app.get('/apis/:id', function(req, res, next){
  console.log('API Param ID: ' + req.params['id']);
  var options = {
    hostname: process.env['API_URL'],
    port: 80,
    path: '/apis/' + req.params['id'],
    method: 'GET',
    headers: {
      "Accept" : "application/json"
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
  httpRequest.end();
});

app.post('/apis', function(req, res, next){
  var inputInterface = req.body;
  inputInterface.webhookUrl = process.env['WEBHOOK_URL'];
  console.log('inputInterface: ' + JSON.stringify(inputInterface));
  var options = {
    hostname: process.env['API_URL'],
    port: 80,
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
  console.log('\n\ninbound_hooks');
  console.log('req.body: ' + JSON.stringify(req.body));
  console.log('req.path: ' + req.path);
  console.log('req.protocol: ' + req.protocol);
  console.log('req.originalUrl: ' + req.originalUrl);
  console.log('req.method: ' + req.method);
  io.sockets.in(req.body['id']).emit('appReady', req.body);
  return res.status(200).send(req.body['id']);
});

app.post('/contact_form', function(req, res, next){
  //Your api key, from Mailgun’s Control Panel
  var api_key = 'key-57da3f8bb02d6cf063000b20d3d67ef5';
  var domain = 'mg.modelship.io';
  var from_who = 'dave@mg.modelship.io';

  console.log('req.body: ' + req.body);
  
  var mailgun = new Mailgun({apiKey: api_key, domain: domain});

  var data = {
    from: from_who,
  //The email to contact
    to: req.body['contact-form-email'],
  //Subject and text data  
    subject: 'ModelShip - New comment from ' + req.body['contact-form-name'],
    html: req.body['contact-form-comments']
  }

  //Invokes the method to send emails given the above data with the helper library
  mailgun.messages().send(data, function (err, body) {
      //If there is an error, render the error page
      if (err) {
          res.status(500).json({"error" : "Send mail failure"});
          return console.log('got an error: ', err);
      }
      //Else we can greet    and leave
      else {
          //Here "submitted.jade" is the view file for this landing page 
          //We pass the variable "email" from the url parameter in an object rendered by Jade
          res.status(200).json({"sendStatus" : "Success"});
          return console.log(body);
      }
  });
  
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
  res.status(400).json(errorTemplate);
}); // RETURN ERROR FOR ANYTHING THAT OTHERWISE HASN'T BEEN CAUGHT