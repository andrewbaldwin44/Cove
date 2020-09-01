'use strict';

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const PORT = 4000;

const app = express();

const server = http.Server(app);
const socket = require('socket.io');
const io = socket(server);

const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server, {
  debug: true
});

const {
  handleLogin,
  handleNewRoom,
  validateRoomMember,
  handleRoomDetails,
  handleRoomMembers,
  handleUserSearch,
  handleInviteCreation,
  handleInviteValidation,
} = require('./handlers/authenticationHandlers');

const {
  handleSockets,
} = require('./handlers/socketHandlers');

const {
  handleYoutubeSearch,
} = require('./handlers/youtubeApiHandlers');

const {
  handleDeezerLogin,
  handleDeezerRegistration,
  handleDeezerSearch,
  handleDeezerChart,
} = require('./handlers/deezerApiHandlers');

io.on('connection', socket => handleSockets(socket, io));

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
.use('/peerjs', peerServer)

.post('/users/login', handleLogin)
.post('/users/rooms/validate_member', validateRoomMember)
.post('/users/rooms/details', handleRoomDetails)
.post('/users/rooms/invite_members', handleInviteCreation)
.post('/users/rooms/validate_invite', handleInviteValidation)
.post('/rooms/newroom', handleNewRoom)
.get('/users/rooms/members/:roomID', handleRoomMembers)

.get('/search_users', handleUserSearch)

.get('/api/youtube_search', handleYoutubeSearch)

.get('/api/deezer_login', handleDeezerLogin)
.post('/api/register_deezer_id', handleDeezerRegistration)
.post('/api/deezer_search', handleDeezerSearch)
.get('/api/deezer_chart', handleDeezerChart)

server.listen(PORT, () => console.info(`Listening on port ${PORT}`));
