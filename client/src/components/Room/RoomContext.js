import React, { createContext, useState, useEffect } from 'react';

import { sendChanges } from './hooks/useSockets';
import { DATABASE_PATHS, SOCKET_PATHS } from '../../constants';
const {
  ROOMS_PATH,
  ROOM_STATE_PATH,
  ROOM_DETAILS_PATH,
  WINDOW_STATE_PATH,
  WIDGET_STATE_PATH,
  ACTION_BAR_STATE_PATH,
} = DATABASE_PATHS;

const {
  SEND_WINDOW_STATE
} = SOCKET_PATHS ;

export const RoomContext = createContext(null);

function updateWindowState(app, newState, reference) {
  const [stateType, stateChange] = newState;

  const path = `${app}.${stateType}`;

  reference.update({
    [path]: stateChange
  });
}

function writeWindowState(app, newState, reference) {
  const [stateType, stateChange] = newState;

  reference.set({
    [app]: {
      [stateType]: stateChange
    }
  });
}

export function RoomProvider({ children, roomID, roomDetails: initialRoomDetails, actionBars: initialActionBars, database }) {
  const [roomDetails, setRoomDetails] = useState(initialRoomDetails);
  const [actionBars, setActionBars] = useState(initialActionBars);
  const [openWindows, setOpenWindows] = useState([]);
  const [openWidgets, setOpenWidgets] = useState([]);
  const [note, setNote] = useState('');
  const [url, setUrl] = useState('');
  const [windowProperties, setWindowProperties] = useState({
    isMinimized: false,
    position: null,
  });

  const updateRoomDetails = (newData) => {
    setRoomDetails({ ...roomDetails, ...newData });
  }

  const updateActionBars = (newData) => {
    setActionBars(newData);
  }

  const createNewRoomState = (app, newData, originalState) => {
    const [stateType, newState] = newData;

    const newAppState = {
      ...originalState[app],
      [stateType]: newState,
    }

    const newRoomState = {
      ...originalState,
      [app]: newAppState,
    }

    return newRoomState
  }

  const updateOpenWindows = (app, newData) => {
    const newOpenWindows = createNewRoomState(app, newData, openWindows);

    setOpenWindows(newOpenWindows);
  }

  const updateOpenWidgets = (widget, newData) => {
    const newOpenWidgets = createNewRoomState(widget, newData, openWidgets);

    setOpenWidgets(newOpenWidgets);
  }

  const updateRoomDatabase = (path, newData) => {
    const roomReference = database.collection(ROOMS_PATH).doc(ROOM_DETAILS_PATH);

    const roomPath = `${roomID}.${path}`;

    roomReference.update({ [roomPath]: newData });
  }

  const getRoomStateReference = path => {
    return database.collection(ROOMS_PATH).doc(ROOM_STATE_PATH)
                   .collection(roomID).doc(path);
  }

  const writeOrUpdateWindowState = (app, newState, reference) => {
    reference
      .get()
      .then(snapshot => {
        const data = snapshot.data();

        if (data) {
          updateWindowState(app, newState, reference);
        }
        else {
          writeWindowState(app, newState, reference);
        }
      });
  }

  const changeWindowState = (app, newState) => {
    const reference = getRoomStateReference(WINDOW_STATE_PATH);
    writeOrUpdateWindowState(app, newState, reference);
  }

  const changeWidgetState = (widget, newState) => {
    const reference = getRoomStateReference(WIDGET_STATE_PATH);
    writeOrUpdateWindowState(widget, newState, reference);
  }

  const updateActionBarDatabase = newState => {
    const reference = database.collection(ROOMS_PATH).doc(ROOM_STATE_PATH)
                              .collection(roomID).doc(ACTION_BAR_STATE_PATH);

    reference.update(newState);
  }

  const setInitialState = (path, callBack) => {
    const reference = database.collection(ROOMS_PATH).doc(ROOM_STATE_PATH)
                              .collection(roomID).doc(path);

    reference.get().then(snapshot => {
      const data = snapshot.data() || [];

      callBack(data);
    });
  }

  const handleInitialWidgetState = data => {
    setOpenWidgets(data);

    const { notepad } = data;

    if (notepad && notepad.content) {
      setNote(notepad.content);
    }
  }

  const navigateToInnerWindow = (innerWindow, app) => {
    const newState = ['innerWindow', innerWindow];

    changeWindowState(app, newState);
    updateOpenWindows(app, newState);
    sendChanges(SEND_WINDOW_STATE, { app, newState });
  }

  // clicking the arrows in window navbar
  const navigateFromInnerWindow = app => {
    const newState = ['innerWindow', null];

    changeWindowState(app, newState);
    updateOpenWindows(app, newState);
    sendChanges(SEND_WINDOW_STATE, { app, newState });
  }

  const closeWindow = app => {
    const newState = ['isOpen', false];
    changeWindowState(app, newState);
    updateOpenWindows(app, newState);
    sendChanges(SEND_WINDOW_STATE, { app, newState });
  }

  useEffect(() => {
    setInitialState(WINDOW_STATE_PATH, setOpenWindows);
    setInitialState(WIDGET_STATE_PATH, handleInitialWidgetState);
    // eslint-disable-next-line
  }, []);

  return (
    <RoomContext.Provider
      value={{
        roomID,
        roomDetails,
        openWindows,
        openWidgets,
        changeWindowState,
        changeWidgetState,
        closeWindow,
        navigateToInnerWindow,
        navigateFromInnerWindow,
        windowProperties,
        setWindowProperties,
        updateRoomDatabase,
        updateRoomDetails,
        actionBars,
        updateActionBars,
        updateActionBarDatabase,
        updateOpenWindows,
        updateOpenWidgets,
        note,
        setNote,
        url,
        setUrl,
      }}
    >
      {children}
    </RoomContext.Provider>
  )
}
