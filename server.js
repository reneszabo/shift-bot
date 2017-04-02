// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
require('dotenv').config();
/**
 * Create HTTP server.
 */
const port = process.env.PORT || '8082';
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

const mongoose = require('mongoose');
// Get our API routes
const api = require('./server/routes/api')(io);
const apiTwitter = require('./server/routes/api-twitter')(io);
const apiSlack = require('./server/routes/api-slack')(io);

mongoose.connect('mongodb://localhost/shift-bot');
app.set('port', port);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'dist')));

// CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  next();
});
io.set('origins', '*:*');

// Set our api routes
app.use('/api', api);
app.use('/api/twitter', apiTwitter);
app.use('/api/slack', apiSlack);

// Catch all other routes and return the index file
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, function () {
  console.log('API running on localhost: ' +  port);
});

// SOCKET CONNECTIONS

io.on('connection', function(socket) {
  console.log('connection');
});
