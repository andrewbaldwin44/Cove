import React, { createContext, useState, useEffect, useContext } from 'react';

import { sendChanges } from '../../hooks/useSockets';
import { SOCKET_PATHS } from '../../../../constants';

import { RoomContext } from '../../RoomContext';

const {
  SEND_ACTIVITY_CARDS,
} = SOCKET_PATHS;

export const ActivitiesContext = createContext(null);

export function ActivitiesProvider({ children, isStarted, setIsStarted }) {
  const { changeWindowState, openWindows } = useContext(RoomContext);

  const [startTimer, setStartTimer] = useState(false); // handle delay
  const [activityPlaying, setActivityPlaying] = useState(0);
  const [firstRender, setFirstRender] = useState(true);

  const [activityCards, setActivityCards] = useState([]);

  const createActivityCard = (position) => {
    return {
      title: 'Title',
      description: 'Description',
      position,
      time: 20,
      id: new Date().getTime()
    }
  }

  useEffect(() => {
    const savedActivityCards = openWindows.activity.activityCards;
    if (savedActivityCards) {
      setActivityCards(savedActivityCards);
    }
    else {
      setActivityCards([createActivityCard(0)]);
    }
    // eslint-disable-next-line
  }, []);

  const updateRoomDatabase = () => {
    const newState = ['activityCards', activityCards];

    changeWindowState('activity', newState);
    sendChanges(SEND_ACTIVITY_CARDS, { app: 'activity', newState });
  }

  const parseTime = timeString => {
    const [minutes, seconds] = timeString.split(':');
    const minutesInSeconds = Number(minutes) * 60;

    return minutesInSeconds + Number(seconds);
  }

  const updateCardTime = (event, id) => {
    const newTime = parseTime(event.target.value);

    const newActivityCards = [...activityCards];
    const cardIndex = newActivityCards.findIndex(card => card.id === id);

    if (firstRender) setFirstRender(false);

    newActivityCards[cardIndex].time = newTime;

    setActivityCards(newActivityCards);
    updateRoomDatabase();
  }

  const updateCardContent = (event, type, id) => {
    const newContent = event.target.value;

    const newActivityCards = [...activityCards];
    const cardIndex = newActivityCards.findIndex(card => card.id === id);

    if (firstRender) setFirstRender(false);

    newActivityCards[cardIndex][type] = newContent;

    setActivityCards(newActivityCards);
    updateRoomDatabase();
  }

  return (
    <ActivitiesContext.Provider
      value={{
        isStarted,
        setIsStarted,
        startTimer,
        setStartTimer,
        activityCards,
        setActivityCards,
        activityPlaying,
        setActivityPlaying,
        firstRender,
        setFirstRender,
        updateCardTime,
        createActivityCard,
        updateCardContent,
        updateRoomDatabase,
      }}
    >
      {children}
    </ActivitiesContext.Provider>
  )
}
