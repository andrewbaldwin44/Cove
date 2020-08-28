import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import ActionBar from './ActionBar';
import WindowManager from './WindowManager';
import VideoCall from './VideoCall';
import Menu from './Menu';

import { BsArrowLeftShort } from 'react-icons/bs';

import { APPS } from './appConstants';
import { toArray } from '../../utils/index';

import useSockets, { sendChanges } from './hooks/useSockets' ;

import { RoomContext } from './RoomContext';
import { requestInvite } from '../../utils/authenticationUtils';

import { SOCKET_PATHS } from '../../constants';
const { SEND_WINDOW_STATE } = SOCKET_PATHS;

function Main({ isOwner }) {
  const {
    roomID,
    changeWindowState,
    roomDetails,
    actionBars,
    updateOpenWindows,
  } = useContext(RoomContext);

  useSockets(roomID);

  const { background } = roomDetails;

  const [menuToggle, setMenuToggle] = useState(false);
  const [menuPosition, setMenuPosition] = useState({});

  const openWindow = app => {
    const newState = ['isOpen', true];
    changeWindowState(app, newState);
    updateOpenWindows(app, newState);
    sendChanges(SEND_WINDOW_STATE, { app, newState });
  }

  const openMenu = event => {
    const { target } = event;

    if (target.classList.contains('desktop')) {
      const { clientX, clientY } = event;

      setMenuToggle(!menuToggle);
      setMenuPosition({ x: clientX, y: clientY });
    }
    else {
      setMenuToggle(false);
    }
  }

  return (
    <Wrapper
      onClick={openMenu}
      className='desktop'
      background={background}
    >
      <Header>
        <Link to='/'><BackArrow /></Link>
        <button type='button' onClick={() => requestInvite(roomID, 'public')}>Invite</button>
      </Header>
      <WindowManager />
      <VideoCall />
      {actionBars && toArray(actionBars).map(([position, details], index) => {
        const { apps, length } = details;

        return (
          <ActionBar key={`actionbar${index}`} length={length} position={position}>
            {apps.map((appID, index) => {
              const { icon, name } = APPS[appID];

              return (
                <StyledIcon
                  key={`${appID}${index}`}
                  src={icon}
                  alt={name}
                  onClick={() => openWindow(appID)}
                />
              )
            })}
          </ActionBar>
        )
      })}
      <Menu
        toggle={menuToggle}
        position={menuPosition}
        openWindow={openWindow}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  background-image: url(${({ background }) => background});
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  height: 100px;
  width: 100%;
  padding: 0 10px;

  button {
    border: 1px solid black;
    padding: 10px 15px;
  }
`;

const BackArrow = styled(BsArrowLeftShort)`
  font-size: 4.5em;
  justify-self: flex-start;
  color: var(--main-black);
`;

const StyledIcon = styled.img`
  height: 50px;
  width: 50px;
`;

export default Main;
