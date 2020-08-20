const users = {};

function handleVideoCall(socket, io) {
  socket.emit('socketID', socket.id);

  socket.on('newConnection', ({ userData, roomID }) => {
    if (!users[socket.id]) {
      users[socket.id] = userData;
    }

    io.sockets.emit("allUsers", users);
  });

  socket.on('disconnect', () => {
    delete users[socket.id];
  });

  socket.on('callUser', ({ peerSocketID, signalData, userSocketID, caller }) => {
    io.to(peerSocketID).emit('incomingCall', {
      signal: signalData,
      callerSocketID: userSocketID,
      caller
    });
  });

  socket.on('acceptCall', ({ callerSocketID, peerSignal }) => {
    io.to(callerSocketID).emit('callAccepted', peerSignal);
  });
}

module.exports = { handleVideoCall };
