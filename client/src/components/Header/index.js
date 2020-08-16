import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Dropdown from './Dropdown';

import { AuthenticationContext } from '../AuthenticationContext';

import { isContainingData, isEmptyData } from '../../utils/index';

function Header() {
  const {
    userData,
  } = useContext(AuthenticationContext);

  return (
    <Wrapper>
      <Logo to='/'>Home</Logo>
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
  background-color: var(--main-black);
`;

const Logo = styled(Link)`
  color: white;
  font-weight; bold;
  font-size: 2.8em;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 10%;

  > a {
    color: white;
  }
`;

export default Header;
