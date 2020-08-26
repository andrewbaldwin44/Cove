import React from 'react';
import styled, { keyframes } from "styled-components";

import SpinnerImage from "../assets/images/spinner.png";

function Spinner({ height }) {
  height = height || '30px';

  return (
    <SpinnerIcon src={SpinnerImage} height={height} />
  )
}

const Spin = keyframes`
  from {
    transform: translate3d(-50%, -50%, 0) rotate(0deg);
  }
  to {
     transform: translate3d(-50%, -50%, 0) rotate(360deg);
  }
`;

const SpinnerIcon = styled.img`
  height: ${props => props.height};
  width: auto;
  animation: ${Spin} 1s infinite linear;
`;

export default Spinner;
