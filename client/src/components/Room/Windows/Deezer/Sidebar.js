import React from 'react';
import styled from 'styled-components';

import DeezerHead from '../../../../assets/images/deezer-head.png';

function Sidebar() {
  return(
    <Wrapper>
      <img src={DeezerHead} alt='Deezer' />
      <h4>Home</h4>
      <Underline />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 60px;
  min-width: 10%;
  width: 10%;
  height: 100%;
  box-shadow: 0 5px 5px var(--dark-shadow);

  h4 {
    font-size: 1.2em;
    font-weight: bold;
  }

  img {
    height: 70px;
    width: 130px;
    margin-bottom: 30px;
  }
`;

const Underline = styled.div`
  width: 60px;
  height: 5px;
  margin-top: 5px;
  background-color: var(--light-blue);
`;

export default Sidebar;
