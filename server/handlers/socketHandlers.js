function handleVideoCall(socket, io) {
  socket.on('join-room', (roomID, userID) => {
    socket.join(roomID);
    socket.to(roomID).broadcast.emit('user-connected', userID);
  });
}

module.exports = { handleVideoCall };
