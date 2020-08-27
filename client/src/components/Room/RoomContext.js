import React, { createContext, useState, useEffect } from 'react';

import { toArray } from '../../utils/index';
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

    reference.update(newState)
  }

  const observeWindowState = () => {
    const reference = database.collection(ROOMS_PATH).doc(ROOM_STATE_PATH)
                              .collection(roomID).doc(WINDOW_STATE_PATH);

    const observer = reference.onSnapshot(snapshot => {
      const data = snapshot.data() || [];
      const openWindows = data;

      setOpenWindows(toArray(openWindows));
    });

    return observer;
  }

  const navigateInnerWindow = app => {
    const newState = ['innerWindow', null];
    changeWindowState(app, newState);
  }

  useEffect(() => {
    let windowStateObserver = observeWindowState();

    return () => windowStateObserver();
    // eslint-disable-next-line
  }, []);

  return (
    <RoomContext.Provider
      value={{
        roomDetails,
        openWindows,
        changeWindowState,
        navigateInnerWindow,
        windowProperties,
        setWindowProperties,
        updateRoomDatabase,
        updateRoomDetails,
        actionBars,
        updateActionBars,
        updateActionBarDatabase,
      }}
    >
      {children}
    </RoomContext.Provider>
  )
}
