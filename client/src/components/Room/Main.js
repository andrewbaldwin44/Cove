import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import AppBar from './AppBar';
import WindowManager from './WindowManager';
import VideoCall from './VideoCall';
import Menu from './Menu';

import { BsArrowLeftShort } from 'react-icons/bs';
import { SiKatana } from 'react-icons/si';

import GameIcon from '../../assets/images/game.png';
import YoutubeIcon from '../../assets/images/youtube.png';
import DeezerIcon from '../../assets/images/deezer.png';
import ActivityIcon from '../../assets/images/activity.png';

import { RoomContext } from './RoomContext';

function Main({ isOwner }) {
  const {
    roomDetails,
    changeWindowState,
  } = useContext(RoomContext);

  const { background } = roomDetails;

  const [menuToggle, setMenuToggle] = useState(false);
  const [menuPosition, setMenuPosition] = useState({});

  const openWindow = app => {
    const newState = ['isOpen', true];
    changeWindowState(app, newState);
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
      </Header>
      <WindowManager />
      <VideoCall />
      <AppBar length={'80%'} position={'bottom'}>
        <WebIcon onClick={() => openWindow('web')} />
        <StyledGameIcon
          src={GameIcon}
          alt='Games'
          onClick={() => openWindow('games')}
        />
      <StyledYoutubeIcon
        src={YoutubeIcon}
        alt='Youtube'
        onClick={() => openWindow('youtube')}
      />
      <StyledDeezerIcon
        src={DeezerIcon}
        alt='Deezer'
        onClick={() => openWindow('deezer')}
      />
      <StyledActivityIcon
        src={ActivityIcon}
        alt='Activities'
        onClick={() => openWindow('activity')}
      />
      </AppBar>
      <Menu
        toggle={menuToggle}
        position={menuPosition}
        openWindow={openWindow}
      />
    </Wrapper>
  )
}

//<AppBar length={'40%'} position={'left'} />

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
`;

const BackArrow = styled(BsArrowLeftShort)`
  font-size: 4.5em;
  justify-self: flex-start;
  color: var(--main-black);
`;

const WebIcon = styled(SiKatana)`
  font-size: 2.5em;
  color: white;
`;

const StyledGameIcon = styled.img`
  height: 40px;
  width: 40px;
`;

const StyledYoutubeIcon = styled.img`
  height: 50px;
  width: 50px;
`;

const StyledDeezerIcon = styled.img`
  height: 50px;
  width: 50px;
`;

const StyledActivityIcon = styled.img`
  height: 50px;
  width: 50px;
`;

export default Main;
