import React, { useEffect, useState, useContext } from 'react';

import { AuthenticationContext } from '../../../AuthenticationContext';

import Login from './Login';
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
  }, [userData]);

  if (deezerID) {
    return (
      <Home deezerID={deezerID} />
    )
  }
  else {
    return (
      <Login loginUrl={loginUrl} />
    )
  }
}
export default Deezer;
