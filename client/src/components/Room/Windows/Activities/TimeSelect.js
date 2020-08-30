import React from 'react';
import styled from 'styled-components';

function TimeSelect({ timeLeft, clockSize, isStarted, updateCardTime, id }) {
  return (
    <Wrapper clockSize={clockSize}>
      <StyledTimeInput
        value={timeLeft}
        onChange={(value) => updateCardTime(value, id)}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;
  font-size: ${({ clockSize }) => clockSize || '1em'};
`;

const StyledTimeInput = styled.input`
  width: 200px;
  border: none;
  background-color: white;
`;

export default TimeSelect;
