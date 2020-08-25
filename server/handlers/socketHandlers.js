const allUsers = {};

function handleVideoCall(socket, io) {
  socket.on('join-room', (roomID, userData) => {
    const { userID } = userData;

    if (!allUsers[userID]) allUsers[userID] = userData;

    socket.join(roomID);
    io.in(roomID).emit('user-connected', allUsers);

    socket.on('disconnect', () => {
      socket.to(roomID).broadcast.emit('user-disconnected', userID)
    });
  });
}

module.exports = { handleVideoCall };
