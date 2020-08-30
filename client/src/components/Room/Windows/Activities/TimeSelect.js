import React, { useContext } from 'react';
import styled from 'styled-components';
import TimeField from 'react-simple-timefield';

import { ActivitiesContext } from './ActivitiesContext';

function TimeSelect({ timeLeft, clockSize, id }) {
  const { isStarted, updateCardTime } = useContext(ActivitiesContext);

  return (
    <Wrapper clockSize={clockSize}>
      <TimeField
        value={timeLeft}
        input={<StyledTimeInput type='text' />}
        disabled={isStarted}
        onBlur={(event) => updateCardTime(event, id)}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;
  font-size: ${({ clockSize }) => clockSize || '1em'};
`;

const StyledTimeInput = styled.input`
  width: 55px;
  text-align: center;
  border: none;
  background-color: white;
`;

export default TimeSelect;
