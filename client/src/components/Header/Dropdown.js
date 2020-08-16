import React, { useContext, createRef, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { AuthenticationContext } from '../AuthenticationContext';

function Dropdown() {
  const {
    userData: {
      email,
      displayName,
      photoURL,
    },
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
      dropdownMenu.current.style.display = dropdownState ? 'none' : 'flex';
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
        <ProfileImage src={photoURL} alt='Profile Image' />
      </button>
      <DropdownMenu ref={dropdownMenu}>
        <h4>{displayName ? displayName : email}</h4>
        <Seperator />
        <Link to='users/profile'>View Profile</Link>
        <button type='button' onClick={signOutRedirect}>Sign Out</button>
      </DropdownMenu>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  display: inline-block;

  button, a {
    cursor: pointer;
  }
`;

const DropdownMenu = styled.div`
  display: none;
  flex-direction: column;
  position: absolute;
  right: 0;
  margin-top: 5px;
  background-color: white;
  width: 230px;
  box-shadow: 0px 8px 16px 0px var(--dark-shadow);
  padding: 15px 16px;
  z-index: 1;

  h4 {
    font-weight: bold;
  }

  button {
    align-self: flex-end;
    color: var(--light-blue);
    margin-top: 40px;
  }
`;

const Seperator = styled.div`
  width: 100%;
  margin: 20px 0;
  border: 1px solid #e0e0e0;
  align-self: center;
`;

const ProfileImage = styled.img`
  border-radius: 100%;
  height: 50px;
  width: 50px;
`;

export default Dropdown
