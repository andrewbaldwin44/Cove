'use strict';

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const PORT = 4000;

const app = express();

const server = http.createServer(app);
const socket = require('socket.io');
const io = socket(server);

const {
  handleLogin,
  handleNewRoom,
  validateRoomMember,
  handleUserSearch,
} = require('./handlers/authenticationHandlers');

const {
  handleVideoCall,
} = require('./handlers/socketHandlers');


io.on('connection', socket => handleVideoCall(socket, io));

app
.use(function(req, res, next) {
  res.header(
    'Access-Control-Allow-Methods',
    'OPTIONS, HEAD, GET, PUT, POST, DELETE'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
})
.use(morgan('tiny'))
.use(express.static('./server/assets'))
.use(bodyParser.json())
.use(express.urlencoded({ extended: false }))
.use('/', express.static(__dirname + '/'))

.post('/users/login', handleLogin)
.post('/users/rooms/validate_member', validateRoomMember)
.post('/rooms/newroom', handleNewRoom)

.get('/search_users', handleUserSearch)

server.listen(PORT, () => console.info(`Listening on port ${PORT}`));
