import { useContext, useEffect } from 'react';
import { RoomContext } from '../RoomContext';
import { AuthenticationContext } from '../../AuthenticationContext';

import { isContainingData } from '../../../utils/index';
import { SOCKET_PATHS } from '../../../constants';

import io from 'socket.io-client';
const socket = io.connect('http://localhost:4000');

const {
  RECEIVE_ACTION_BAR,
  RECEIVE_ROOM_DETAILS,
  RECEIVE_WINDOW_STATE,
  RECEIVE_WIDGET_STATE,
  RECEIVE_NOTE,
  RECEIVE_URL,
  RECEIVE_CHAT,
} = SOCKET_PATHS;

function useSockets(roomID) {
  const {
    userData
  } = useContext(AuthenticationContext);

  const {
    updateActionBars,
    updateRoomDetails,
    updateOpenWindows,
    updateOpenWidgets,
    openWidgets,
    openWindows,
    setNote,
    setUrl,
    messageData,
    updateMessages,
  } = useContext(RoomContext);

  useEffect(() => {
    if (isContainingData(userData)) {
      socket.emit('join-room', roomID, userData);
    }
    // eslint-disable-next-line
  }, [userData]);

  useEffect(() => {
    socket.on(RECEIVE_ACTION_BAR, newActionBarData => {
      updateActionBars(newActionBarData);
    });

    socket.on(RECEIVE_ROOM_DETAILS, newRoomDetails => {
      updateRoomDetails(newRoomDetails);
    });

    socket.on(RECEIVE_NOTE, (newNote) => {
      setNote(newNote);
    });

    socket.on(RECEIVE_URL, (newURL) => {
      setUrl(newURL);
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    socket.on(RECEIVE_WIDGET_STATE, ({ widget, newState }) => {
      updateOpenWidgets(widget, newState);
    });
    // eslint-disable-next-line
  }, [openWidgets])

  useEffect(() => {
    socket.on(RECEIVE_WINDOW_STATE, ({ app, newState }) => {
      updateOpenWindows(app, newState);
    });
    // eslint-disable-next-line
  }, [openWindows]);

  useEffect(() => {
    socket.on(RECEIVE_CHAT, (newChat) => {
      updateMessages(newChat);
    });
    // eslint-disable-next-line
  }, [messageData])
}

export function sendChanges(path, newData) {
  socket.emit(path, newData);
}

export default useSockets;
