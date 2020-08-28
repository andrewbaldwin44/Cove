import { useContext, useEffect } from 'react';
import { RoomContext } from '../RoomContext';
import { AuthenticationContext } from '../../AuthenticationContext';

import { isContainingData } from '../../../utils/index';
import { SOCKET_PATHS } from '../../../constants';

import io from 'socket.io-client';
const socket = io.connect('http://localhost:4000');

const {
  ACTION_BAR_CHANGE,
  ROOM_DETAILS_CHANGE,
} = SOCKET_PATHS;

function useSockets(roomID) {
  const {
    userData
  } = useContext(AuthenticationContext);

  const {
    updateActionBars,
    updateRoomDetails,
  } = useContext(RoomContext);

  useEffect(() => {
    if (isContainingData(userData)) {
      socket.emit('join-room', roomID, userData);
    }
    // eslint-disable-next-line
  }, [userData]);

  useEffect(() => {
    socket.on(ACTION_BAR_CHANGE, newActionBarData => {
      updateActionBars(newActionBarData);
    });

    socket.on(ROOM_DETAILS_CHANGE, newRoomDetails => {
      updateRoomDetails(newRoomDetails);
    });
    // eslint-disable-next-line
  }, []);
}

export function sendChanges(path, newData) {
  socket.emit(path, newData);
}

export default useSockets;
