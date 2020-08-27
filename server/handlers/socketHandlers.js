const allUsers = {};
let callStarted = false;

function handleVideoCall(socket, io) {
  socket.on('join-room', (roomID, userData) => {
    const { userID } = userData;

    // bundle socket id with room id
    socket.join(roomID);

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
  });
}

function handleSockets(socket, io) {
  handleVideoCall(socket, io);
}

module.exports = { handleSockets };
