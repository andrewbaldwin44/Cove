import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import CircularProgress from './CircularProgress';

import { ActivitiesContext } from './ActivitiesContext';

function Timer() {
  const {
    isStarted,
    activityCards
  } = useContext(ActivitiesContext);

  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    const newTotalTime = activityCards.reduce((total, card) => {
      return total + card.time;
    }, 0);

    setTotalTime(newTotalTime);
  }, [activityCards]);

  return (
    <Wrapper>
      <CircularProgress
        progress={50}
        size={350}
        strokeWidth={15}
        elapsedColor='#CE5374'
        shadowColor='#4B515D'
        isStarted={isStarted}
        clockSize='1.2em'
        timeLimit={totalTime}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 30%;
`;

export default Timer;
