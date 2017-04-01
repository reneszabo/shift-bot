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

mongoose.connect('mongodb://localhost/shift-bot');
app.set('port', port);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);
app.use('/api/twitter', apiTwitter);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});





/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
