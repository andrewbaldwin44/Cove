import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { AuthenticationContext } from './AuthenticationContext';

function Header() {
  const {
    userData,
    handleSignOut,
  } = useContext(AuthenticationContext);

  console.log(userData);

  const history = useHistory();

  const signOutRedirect = () => {
    handleSignOut();
    history.push('/');
  }

  return (
    <Wrapper>
      <NavLinks>
        {userData === null ? (
          <>
            <Link to='/users/sign_up'>Sign Up</Link>
            <Link to='/users/log_in'>Log In</Link>
          </>
        ) : (
          <button type='button' onClick={signOutRedirect}>Sign Out</button>
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

export default Header;
