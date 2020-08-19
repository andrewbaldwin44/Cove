function handleVideoCall(socket, io) {
  socket.on('join-room', (roomID, userID) => {
    console.log(roomID, userID);
  });
}

module.exports = { handleVideoCall };
