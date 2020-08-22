import React, { createContext, useState, useEffect } from 'react';

import { toArray } from '../../utils/index';
import { DATABASE_PATHS } from '../../constants';
const {
  ROOMS_PATH,
  ROOM_STATE_PATH,
  WINDOW_STATE_PATH,
} = DATABASE_PATHS;

export const RoomContext = createContext(null);

export function RoomProvider({ children, roomID, database }) {
  const [openWindows, setOpenWindows] = useState([]);

  useEffect(() => {
    const windowStateReference = database.collection(ROOMS_PATH).doc(ROOM_STATE_PATH)
                                         .collection(roomID).doc(WINDOW_STATE_PATH);

    const observer = windowStateReference.onSnapshot(snapshot => {
      const data = snapshot.data() || [];
      const openWindows = toArray(data);

      setOpenWindows(openWindows);
    });

    return () => observer();
    // eslint-disable-next-line
  }, []);

  const changeWindowState = (app, state) => {
    const reference = database.collection(ROOMS_PATH).doc(ROOM_STATE_PATH)
                              .collection(roomID).doc(WINDOW_STATE_PATH);
    reference.set({
      [app]: {
        isOpen: state
      }
    });
  }

  return (
    <RoomContext.Provider
      value={{
        openWindows,
        changeWindowState,
      }}
    >
      {children}
    </RoomContext.Provider>
  )
}
