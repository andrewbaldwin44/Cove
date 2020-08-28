import React, { useContext, useState, useEffect } from 'react';
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
    const newState = ['innerWindow', menuItem];
    changeWindowState('preferences', newState);
  }

  useEffect(() => {
    setNavigate(direction(innerWindow));
  }, [innerWindow]);

  return (
    <Wrapper>
      <Navbar>
        <h3
          onClick={() => handleNavigation('theme')}
        >
          Theme
        </h3>
        <h3
          onClick={() => handleNavigation('action-bars')}
        >
          Action Bars
        </h3>
        <Underline navigate={navigate} />
      </Navbar>
      {!innerWindow || innerWindow === 'theme' ? (
        <BackgroundSelect />
      ) : (
        <AppSelect />
      )}
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
  width: ${({ navigate }) => navigate === 'right' ? '120px' : '70px'};
  height: 3px;
  background-color: var(--main-red);
  transition: transform 0.4s, width 0.4s;
  transform: ${({ navigate }) => {
    if (navigate === 'right') return 'translateX(85px)';
    else if (navigate === 'left') return 'translateX(0)';
    else return '';
  }};
`;

export default Preferences;
