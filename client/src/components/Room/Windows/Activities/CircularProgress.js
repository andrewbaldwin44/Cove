import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import useInterval from '../../hooks/useInterval';

import TimeSelect from './TimeSelect';

function formatTimeLeft(time) {
  let minutes = Math.floor(time / 60);

  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${minutes}:${seconds}`;
}

function CircularProgress({
  timeLimit = 20, progress, size, strokeWidth, elapsedColor, shadowColor, isStarted,
  clockSize, endCallBack, id
}) {
  const [offset, setOffset] = useState(0);

  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = radius * 2 * Math.PI;

  const [timeLeft, setTimeLeft] = useState(timeLimit);

  useEffect(() => {
    setTimeLeft(timeLimit)
  }, [timeLimit]);

  useEffect(() => {
    if (isStarted) {
      const progressOffset = ((timeLimit - timeLeft) / timeLimit) * circumference;

      setOffset(progressOffset);
    }
  }, [setOffset, circumference, timeLeft, offset, isStarted, timeLimit]);

  useInterval(() => {
    if (timeLeft > 0 && isStarted) {
      setTimeLeft(timeLeft - 1);
    }
    if (timeLeft === 0) {
      // turn off timer
      if (endCallBack) endCallBack();
    }
  }, 1000);

  return (
    <Wrapper>
      <svg width={size} height={size}>
        <circle
          stroke={elapsedColor}
          strokeWidth={strokeWidth}
          fill='none'
          cx={center}
          cy={center}
          r={radius}
        />
        <ShadowCircle
          stroke={shadowColor}
          fill='none'
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <TimeSelect
        clockSize={clockSize}
        timeLeft={formatTimeLeft(timeLeft)}
        id={id}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ShadowCircle = styled.circle`
  transform: rotate(268deg);
  transform-origin: center;

  transition: 1s linear all;
`;

export default CircularProgress;
