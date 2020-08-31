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
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    const { deezerID = null, userID } = userData;

    if (deezerID && userID) {
      setUserID(userID);
      setDeezerID(deezerID);
    }
    else {
      setDeezerID(null);

      fetch(`/api/deezer_login`)
        .then(response => response.json())
        .then(({ loginUrl }) => setLoginUrl(loginUrl));
    }
  }, [userData, deezerID]);

  if (deezerID) {
    return (
      <Home deezerID={deezerID} userID={userID} />
    )
  }
  else {
    return (
      <Login loginUrl={loginUrl} />
    )
  }
}
export default Deezer;
