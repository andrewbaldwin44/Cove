import React from 'react';
import styled from 'styled-components';

function Timer() {
  return (
    <Wrapper>
      <Circle>
        <span>10:00:00</span>
      </Circle>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const Circle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4em;
  height: 200px;
  width: 200px;
  border: 8px solid lightblue;
  border-radius: 50%;
`;

export default Timer;
