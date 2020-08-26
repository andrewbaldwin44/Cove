import React, { createContext, useState, useEffect } from 'react';

import { toArray } from '../../utils/index';
import { DATABASE_PATHS } from '../../constants';
const {
  ROOMS_PATH,
  ROOM_STATE_PATH,
  ROOM_DETAILS_PATH,
  WINDOW_STATE_PATH,
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

export function RoomProvider({ children, roomID, roomDetails, database }) {
  const [openWindows, setOpenWindows] = useState([]);
  const [windowProperties, setWindowProperties] = useState({
    isMinimized: false,
    position: null,
  });

  const updateRoomDatabase = (path, newData) => {
    const roomReference = database.collection(ROOMS_PATH).doc(ROOM_DETAILS_PATH);

    const roomPath = `${roomID}.${path}`;

    roomReference.update({ [roomPath]: newData });
  }

  useEffect(() => {
    const windowStateReference = database.collection(ROOMS_PATH).doc(ROOM_STATE_PATH)
                                         .collection(roomID).doc(WINDOW_STATE_PATH);

    const observer = windowStateReference.onSnapshot(snapshot => {
      const data = snapshot.data() || [];
      const openWindows = data;

      setOpenWindows(toArray(openWindows));
    });

    return () => observer();
    // eslint-disable-next-line
  }, []);

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

  const navigateInnerWindow = app => {
    const newState = ['innerWindow', null];
    changeWindowState(app, newState);
  }

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
      }}
    >
      {children}
    </RoomContext.Provider>
  )
}
