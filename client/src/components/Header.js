import React, { useContext, createRef, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { AuthenticationContext } from './AuthenticationContext';

function Header() {
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
  }, [dropdownState]);

  return (
    <Wrapper>
      <NavLinks>
        {userData === null ? (
          <>
            <Link to='/users/sign_up'>Sign Up</Link>
            <Link to='/users/log_in'>Log In</Link>
          </>
        ) : (
          <Dropdown>
            <DropdownButton onClick={toggleDropdown}>
              <ProfileImage src={userData.photoURL} alt='Profile Image' />
            </DropdownButton>
            <DropdownMenu ref={dropdownMenu}>
              <button type='button' onClick={signOutRedirect}>Sign Out</button>
            </DropdownMenu>
          </Dropdown>
        )}
      </NavLinks>
    </Wrapper>
  )
}

const Wrapper = styled.nav`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 100px;
  width: 100vw;
  height: var(--navbar-height);
  background-color: var(--main-black);

  a, button {
    color: white;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 10%;
`;

const Dropdown = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
`;

const DropdownButton = styled.div`

`;

const DropdownMenu = styled.div`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding: 12px 16px;
  z-index: 1;
`;

const ProfileImage = styled.img`
  border-radius: 100%;
  height: 50px;
  width: 50px;
`;

export default Header;
