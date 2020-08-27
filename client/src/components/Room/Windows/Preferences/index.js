import React, { useContext, useState } from 'react';
import styled from 'styled-components';

import BackgroundSelect from './BackgroundSelect';
import AppSelect from './AppSelect';

import { RoomContext } from '../../RoomContext';

function Preferences({ innerWindow }) {
  const {
    changeWindowState,
  } = useContext(RoomContext);

  const direction = menuItem => menuItem === 'theme' ? 'left' : 'right';

  const [navigate, setNavigate] = useState(direction(innerWindow));

  const handleNavigation = menuItem => {
    setNavigate(direction(menuItem));

    const newState = ['innerWindow', menuItem];
    changeWindowState('preferences', newState);
  }

  return (
    <Wrapper>
      <Navbar>
        <h3
          onClick={() => handleNavigation('theme')}
        >
          Theme
        </h3>
        <h3
          onClick={() => handleNavigation('app-bars')}
        >
          App Bars
        </h3>
        <Underline navigate={navigate} />
      </Navbar>
      <Body>
        {!innerWindow || innerWindow === 'theme' ? (
          <BackgroundSelect />
        ) : (
          <AppSelect />
        )}
      </Body>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;

  h3 {
    font-size: 1.2em;
    font-weight: bold;
    cursor: pointer;
    margin-right: 20px;
  }
`;

const Navbar = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  padding: 20px 30px;
`;

const Underline = styled.div`
  position: absolute;
  bottom: 10px;
  width: ${({ navigate }) => navigate === 'right' ? '100px' : '70px'};
  height: 3px;
  background-color: var(--main-red);
  transition: transform 0.4s, width 0.4s;
  transform: ${({ navigate }) => {
    if (navigate === 'right') return 'translateX(85px)';
    else if (navigate === 'left') return 'translateX(0)';
    else return '';
  }};
`;

const Body = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90%;
`;

export default Preferences;
