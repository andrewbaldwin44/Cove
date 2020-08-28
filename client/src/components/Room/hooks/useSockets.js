import { useContext, useEffect } from 'react';
import { RoomContext } from '../RoomContext';
import { AuthenticationContext } from '../../AuthenticationContext';

import { isContainingData } from '../../../utils/index';

import io from 'socket.io-client';
const socket = io.connect('http://localhost:4000');

function useSockets(roomID) {
  const {
    userData
  } = useContext(AuthenticationContext);

  const {
    updateActionBars
  } = useContext(RoomContext);

  useEffect(() => {
    if (isContainingData(userData)) {
      socket.emit('join-room', roomID, userData);
    }
    // eslint-disable-next-line
  }, [userData]);

  useEffect(() => {
    socket.on('room-change', (newData) => {
      updateActionBars(newData);
    });
    // eslint-disable-next-line
  }, []);
}

export function sendChanges(newData) {
  socket.emit('state-change', newData);
}

export default useSockets;
