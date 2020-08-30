import React, { createContext, useState, useEffect, useContext } from 'react';

import { RoomContext } from '../../RoomContext';

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
  }, []);

  useEffect(() => {
    if (!firstRender) {
      const newState = ['activityCards', activityCards];

      changeWindowState('activity', newState);
    }
  }, [activityCards]);

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
  }

  const updateCardContent = (event, type, id) => {
    const newContent = event.target.value;

    const newActivityCards = [...activityCards];
    const cardIndex = newActivityCards.findIndex(card => card.id === id);

    if (firstRender) setFirstRender(false);

    newActivityCards[cardIndex][type] = newContent;
    setActivityCards(newActivityCards);
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
      }}
    >
      {children}
    </ActivitiesContext.Provider>
  )
}
