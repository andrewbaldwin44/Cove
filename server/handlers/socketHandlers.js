const allUsers = {};
let callStarted = false;

function handleVideoCall(socket, io) {
  socket.on('join-room', () => {
    io.to(socket.id).emit('room-status', callStarted);
  })

  socket.on('join-call', (roomID, userData) => {
    const { userID } = userData;

    if (!allUsers[userID]) allUsers[userID] = userData;

    socket.join(roomID);
    io.in(roomID).emit('user-connected', { allUsers, newUserID: userID });

    socket.on('disconnect', () => {
      socket.to(roomID).broadcast.emit('user-disconnected', userID)
    });
  });

  socket.on('call-started', (roomID, userData) => {
    callStarted = true;

    // socket.join(roomID);
    // socket.to(roomID).broadcast.emit('ongoing-call');
  });
}

module.exports = { handleVideoCall };
