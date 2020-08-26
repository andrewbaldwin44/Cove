import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Logo from './Logo';
import Dropdown from './Dropdown';

import { AuthenticationContext } from '../AuthenticationContext';

import { isContainingData, isEmptyData } from '../../utils/index';

function Header() {
  const {
    userData,
  } = useContext(AuthenticationContext);

  return (
    <Wrapper>
      <Link to='/'><Logo /></Link>
      <NavLinks>
        {isContainingData(userData) && (
            <Dropdown />
        )}
        {isEmptyData(userData) && (
          <>
            <Link to='/users/sign_up'>Sign Up</Link>
            <Link to='/users/log_in'>Log In</Link>
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
