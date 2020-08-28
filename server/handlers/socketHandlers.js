const allUsers = {};
let callStarted = false;

const {
  SOCKET_PATHS: {
    SEND_ACTION_BAR,
    SEND_ROOM_DETAILS,
    SEND_WINDOW_STATE,
    RECEIVE_ACTION_BAR,
    RECEIVE_ROOM_DETAILS,
    RECEIVE_WINDOW_STATE,
  }
} = require('../constants');

function handleVideoCall(socket, io, roomID, userData) {
    const { userID } = userData;

    socket.on('join-call', () => {
      if (!allUsers[userID]) allUsers[userID] = userData;

      // register users in call
      io.in(roomID).emit('user-connected', { allUsers, newUserID: userID });
    });

    socket.on('call-started', () => {
      callStarted = true;

      // tell everyone except sender that a call has started
      socket.to(roomID).broadcast.emit('room-status', callStarted);
    });

    // user can get the 'room status' when they first join
    io.to(socket.id).emit('room-status', callStarted);

    socket.on('disconnect', () => {
      delete allUsers[userID]

      if (Object.keys(allUsers).length === 0) {
        callStarted = false;
        io.in(roomID).emit('room-status', callStarted);
      }

      socket.to(roomID).broadcast.emit('user-disconnected', userID)
    });
}

function handleRoomState(socket, io, roomID) {
  socket.on(SEND_ACTION_BAR, newData => {
    socket.to(roomID).broadcast.emit(RECEIVE_ACTION_BAR, newData);
  });

  socket.on(SEND_ROOM_DETAILS, newData => {
    socket.to(roomID).broadcast.emit(RECEIVE_ROOM_DETAILS, newData);
  });

  socket.on(SEND_WINDOW_STATE, newData => {
    socket.to(roomID).broadcast.emit(RECEIVE_WINDOW_STATE, newData);
  });
}

function handleSockets(socket, io) {
  socket.on('join-room', (roomID, userData) => {
    // bundle socket id with room id
    socket.join(roomID);

    handleVideoCall(socket, io, roomID, userData);
    handleRoomState(socket, io, roomID);
  });
}

module.exports = { handleSockets };
