import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import AppBar from './AppBar';
import WindowManager from './WindowManager';

import { BsArrowLeftShort, BsSearch } from 'react-icons/bs';
import { SiKatana } from 'react-icons/si';

import DefaultBackground from '../../assets/images/default-background.jpeg';

import { AuthenticationContext } from '../AuthenticationContext';

function Main({ roomID, isOwner }) {
  const {
    database,
  } = useContext(AuthenticationContext);

  const handleWindowOpen = app => {
    const reference = database.collection('rooms').doc('state')
                              .collection(roomID).doc('Windows');
    reference.set({
      [app]: {
        isOpen: true
      }
    });
  }

  return (
    <Wrapper>
      <Header>
        <Link to='/'><BackArrow /></Link>
        <SearchContainer>
          <StyledSearchIcon />
          <SearchInput type='text' placeholder='Search...' />
        </SearchContainer>
      </Header>
      <WindowManager roomID={roomID} />
      <AppBar length={'40%'} position={'left'} />
      <AppBar length={'80%'} position={'bottom'}>
        <WebIcon onClick={() => handleWindowOpen('web')} />
      </AppBar>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  background-image: url(${DefaultBackground});
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
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
`;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin: 0 auto;
`;

const SearchInput = styled.input`
  width: 400px;
  height: 40px;
  color: inherit;
  padding: 5px 10px;
  padding-left: 40px;
  outline: none;
  border: none;
  border-radius: 8px;
  box-shadow: 1px 1px 5px var(--dark-shadow),
              2px 2px 5px var(--dark-shadow);
`;

const StyledSearchIcon = styled(BsSearch)`
  position: absolute;
  height: 20px;
  width: 20px;
  margin-left: 10px;
  color: inherit;
`;

const WebIcon = styled(SiKatana)`
  font-size: 2.5em;
  color: white;
  cursor: pointer;
`;

export default Main;
