import React, { createContext, useState, useEffect } from 'react';

import { DATABASE_PATHS } from '../../constants';
const {
  ROOMS_PATH,
  ROOM_STATE_PATH,
  ROOM_DETAILS_PATH,
  WINDOW_STATE_PATH,
  ACTION_BAR_STATE_PATH,
} = DATABASE_PATHS;

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

  const updateOpenWindows = (app, newData) => {
    const [stateType, newState] = newData;

    const newAppState = {
      ...openWindows[app],
      [stateType]: newState,
    }

    const newOpenWindows = {
      ...openWindows,
      [app]: newAppState,
    }

    setOpenWindows(newOpenWindows);
  }

  const updateRoomDatabase = (path, newData) => {
    const roomReference = database.collection(ROOMS_PATH).doc(ROOM_DETAILS_PATH);

    const roomPath = `${roomID}.${path}`;

    roomReference.update({ [roomPath]: newData });
  }

  const changeWindowState = (app, newState) => {
    const reference = database.collection(ROOMS_PATH).doc(ROOM_STATE_PATH)
                              .collection(roomID).doc(WINDOW_STATE_PATH);
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

  const updateActionBarDatabase = newState => {
    const reference = database.collection(ROOMS_PATH).doc(ROOM_STATE_PATH)
                              .collection(roomID).doc(ACTION_BAR_STATE_PATH);

    reference.update(newState);
  }

  const setInitialWindowState = () => {
    const reference = database.collection(ROOMS_PATH).doc(ROOM_STATE_PATH)
                              .collection(roomID).doc(WINDOW_STATE_PATH);

    reference.get().then(snapshot => {
      const data = snapshot.data() || [];

      setOpenWindows(data);
    });
  }

  const navigateToInnerWindow = (innerWindow, app) => {
    const newState = ['innerWindow', innerWindow];
    changeWindowState(app, newState);
    updateOpenWindows(app, newState);
  }

  // clicking the arrows in window navbar
  const navigateFromInnerWindow = app => {
    const newState = ['innerWindow', null];
    changeWindowState(app, newState);
    updateOpenWindows(app, newState);
  }

  useEffect(() => {
    setInitialWindowState();
    // eslint-disable-next-line
  }, []);

  return (
    <RoomContext.Provider
      value={{
        roomDetails,
        openWindows,
        changeWindowState,
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
      }}
    >
      {children}
    </RoomContext.Provider>
  )
}
