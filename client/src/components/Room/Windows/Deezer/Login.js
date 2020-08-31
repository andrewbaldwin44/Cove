import React from 'react';
import styled from 'styled-components';

function Login({ loginUrl }) {
  return (
    <Wrapper>
      <a
        href={loginUrl}
        target='_blank'
        alt='Deezer Login'
        rel='noopener noreferrer'
      >
        Login to Deezer
      </a>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1em;
    height: 50px;
    width: 180px;
    background-color: var(--light-blue);
    border: 1px solid var(--main-black);
    border-radius: 4px;
  }
`;

export default Login;
