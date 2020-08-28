const allUsers = {};
let callStarted = false;

const {
  SOCKET_PATHS: {
    ACTION_BAR_CHANGE,
    ROOM_DETAILS_CHANGE,
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
  socket.on(ACTION_BAR_CHANGE, newData => {
    socket.to(roomID).broadcast.emit(ACTION_BAR_CHANGE, newData);
  });

  socket.on(ROOM_DETAILS_CHANGE, newData => {
    socket.to(roomID).broadcast.emit(ROOM_DETAILS_CHANGE, newData);
  })
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
