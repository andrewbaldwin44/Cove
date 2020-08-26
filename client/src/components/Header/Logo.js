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
    font-family: 'Oswald', sans-serif;
    font-weight: 700;
    font-size: 3.4em;
    letter-spacing: 2px;
    z-index: 5;
    text-shadow: var(--heading-text-shadow);
    padding-bottom: 5px;
  }

  svg {
    width: 190px;
    height: 170px;
    margin-top: -90px;
    margin-left: -75px;
    transform: rotate(18deg);
  }
`;

export default Logo
