// App.js
module.exports = function App() {
  var express = require('express');
  var https = require('https');
  var app = express();
  var server = require('http').Server(app);
  var io = require('socket.io')(server);
  var favicon = require('serve-favicon');
  var logger = require('morgan');
  var methodOverride = require('method-override');
  var session = require('express-session');
  var bodyParser = require('body-parser');
  var multer = require('multer');
  var errorHandler = require('errorhandler');
  
  
  var localPort = 8000;
  var port = process.env.PORT || localPort;
  
  app.io = io;
  app.version = "1.0";
  app.port = (port == localPort) ? (":" + port) : ("");
  app.host = "";
  app.basepath = '/';
  app.mediaType = 'application/json';
  
  app.set('views', __dirname + '/views');
  app.use('/swagger', function(req, res, next){
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, PATCH, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type, api_key, Authorization');
    next();
  });
  app.use(express.static(__dirname + '/public/'));
  console.log(__dirname + '/public/');
  //app.use(favicon(__dirname + '/public/favicon.ico'));
  app.use(logger('dev'));
  //app.use(methodOverride());
  //app.use(session({ resave: true,
  //                  saveUninitialized: true,
  //                  secret: 'uwotm8' }));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(multer());
  app.use(function(err, req, res, next){
    if(err.status === 400 ){
      var errorMessage = "Invalid or Unsupported Request. Please check your input and try again.";
      var errorTemplate = { "requestRoute" : req.path, "message" : errorMessage };
      res.set('Content-Type', app.mediaType);
      res.status(400).json(errorTemplate);
    } else {
      var errorMessage = "Internal Server Error.";
      var errorTemplate = { "requestRoute" : req.path, "message" : errorMessage };
      res.set('Content-Type', app.mediaType);
      res.status(500).json(errorTemplate);
    }
  });
  

  server.listen(port);
  console.log('Listening on port ' + port + ' at ' + new Date());
  
  return app;
};