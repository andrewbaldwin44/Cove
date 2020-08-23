import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';

import { AuthenticationContext } from '../../../AuthenticationContext';

import Home from './Home';

function Deezer() {
  const {
    userData,
  } = useContext(AuthenticationContext);

  const [loginUrl, setLoginUrl] = useState(null);
  const [deezerID, setDeezerID] = useState(null);

  useEffect(() => {
    const { deezerID = null } = userData;

    if (deezerID) {
      setDeezerID(deezerID);
    }
    else {
      fetch(`/api/deezer_login`)
        .then(response => response.json())
        .then(({ loginUrl }) => setLoginUrl(loginUrl));
    }
  }, []);

  return (
    <Body>
    {loginUrl && (
      <a
        href={loginUrl}
        target='_blank'
        alt='Deezer Login'
        rel='noopener noreferrer'
      >
        Login to Deezer
      </a>
    )}
    {deezerID && (
      <Home deezerID={deezerID} />
    )}
    </Body>
  )
}

const Body = styled.div`
  margin-top: 70px;
  height: calc(100% - 72px);
`;

export default Deezer;
