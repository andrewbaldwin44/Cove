import React from 'react';
import styled from 'styled-components';

import CircularProgress from './CircularProgress';

function Timer({ isStarted, activityCards }) {
  const totalTime = activityCards.reduce((total, card) => {
    return total += card.time;
  }, 0);

  return (
    <Wrapper>
      <CircularProgress
        progress={50}
        size={350}
        strokeWidth={15}
        elapsedColor='red'
        shadowColor='gray'
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
