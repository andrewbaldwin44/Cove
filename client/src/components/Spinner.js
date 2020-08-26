import React from 'react';
import styled, { keyframes } from 'styled-components';

import { AiOutlineLoading3Quarters } from 'react-icons/ai'

function Spinner() {
  return (
    <SpinnerIcon />
  )
}

const Spin = keyframes`
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
     transform: translate(-50%, -50%) rotate(360deg);
  }
`;

const SpinnerIcon = styled(AiOutlineLoading3Quarters)`
  font-size: 1.4em;
  color: var(--main-red);
  animation: ${Spin} 1s infinite linear;
`;

export default Spinner;
