"use strict";
const express     = require('express');
const http        = require('http');
const path        = require('path');
const checkAuth   = require('check-auth');
const bodyParser  = require('body-parser')
const log 	  	  = require('./libs/log')(module);
const config      = require('./config');
const rout_api    = require('./routes/rout');
const app         = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", rout_api);
app.use(express.static(__dirname + '/public'));

http.createServer(app).listen(config.get('port'), function(){
  console.log('Express server listening on port ' + config.get('port'));
});




