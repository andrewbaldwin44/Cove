import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { AuthenticationContext } from './AuthenticationContext';

import { isContainingData } from '../utils/index';

function DeezerAuthenticated() {
  const {
    userData,
    updateUserData
  } = useContext(AuthenticationContext);

  const location = useLocation();
  const code = new URLSearchParams(location.search).get('code');

  useEffect(() => {
    if (isContainingData(userData)) {
      const { userID } = userData;
      const newUserData = { deezerID: code };

      updateUserData(userID, newUserData);
    }
  }, [userData]);

  if (code) {
    return (
      <div>Login Successful! You may now return to your room</div>
    )
  }
  else {
    return (
      <div>Deezer authentication was unsuccesful</div>
    )
  }
}

export default DeezerAuthenticated;
