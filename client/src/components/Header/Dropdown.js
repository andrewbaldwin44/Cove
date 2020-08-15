import React, { useContext, createRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { AuthenticationContext } from '../AuthenticationContext';

function Dropdown() {
  const {
    userData,
    handleSignOut,
  } = useContext(AuthenticationContext);

  const [dropdownState, setDropdownState] = useState(false);
  const dropdownMenu = createRef();

  const history = useHistory();

  const signOutRedirect = () => {
    handleSignOut();
    history.push('/');
  }

  const toggleDropdown = () => {
    if (dropdownMenu.current) {
      dropdownMenu.current.style.display = dropdownState ? 'none' : 'block';
      setDropdownState(!dropdownState);
    }
  }

  useEffect(() => {
    window.onclick = event => toggleDropdown();
    // eslint-disable-next-line
  }, [dropdownState]);

  return (
    <Wrapper>
      <button onClick={toggleDropdown}>
        <ProfileImage src={userData.photoURL} alt='Profile Image' />
      </button>
      <DropdownMenu ref={dropdownMenu}>
        <button type='button' onClick={signOutRedirect}>Sign Out</button>
      </DropdownMenu>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
`;

const DropdownMenu = styled.div`
  display: none;
  position: absolute;
  right: 0;
  margin-top: 10px;
  background-color: white;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px var(--dark-shadow);
  padding: 12px 16px;
  z-index: 1;
`;

const ProfileImage = styled.img`
  border-radius: 100%;
  height: 50px;
  width: 50px;
`;

export default Dropdown
