import React from 'react';
import styled from 'styled-components';

import { ReactComponent as Pelican} from '../../assets/images/pelican.svg';

function Logo() {
  return (
    <Wrapper>
      <h1>Cove</h1>
      <Pelican />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  h1 {
    color: white;
    font-family: 'Poppins', sans-serif;
    font-weight: bold;
    font-size: 3.8em;
    letter-spacing: 2px;
    z-index: 5;
    text-shadow: 1px 1px 12px var(--main-black);
  }

  svg {
    width: 190px;
    height: 170px;
    margin-top: -90px;
    margin-left: -90px;
    transform: rotate(18deg);
  }
`;

export default Logo
