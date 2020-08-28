import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import Logo from './Logo';
import Dropdown from './Dropdown';

import { AuthenticationContext } from '../AuthenticationContext';
import { createLoginLink } from '../../utils/authenticationUtils';

import { isContainingData, isEmptyData } from '../../utils/index';

function Header() {
  const {
    userData,
  } = useContext(AuthenticationContext);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const redirect = query.get('redirect');
  const inviteID = query.get('id');
  const signUpLink = createLoginLink(redirect, inviteID, 'sign_up');
  const loginLink = createLoginLink(redirect, inviteID, 'log_in');

  return (
    <Wrapper>
      <Link to='/'><Logo /></Link>
      <NavLinks>
        {isContainingData(userData) && (
            <Dropdown />
        )}
        {isEmptyData(userData) && (
          <>
            <Link to={signUpLink}>Sign Up</Link>
            <Link to={loginLink}>Log In</Link>
          </>
        )}
      </NavLinks>
    </Wrapper>
  )
}

const Wrapper = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--main-width-padding);
  width: 100vw;
  height: var(--navbar-height);
  background-color: var(--main-headers);
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 160px;

  > a {
    color: white;
    font-size: 1.1em;
  }
`;

export default Header;
