import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function Header() {
  return (
    <Wrapper>
      <NavLinks>
        <Link to='/users/sign_up'>Sign Up</Link>
        <Link to='/users/log_in'>Log In</Link>
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

  a {
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
