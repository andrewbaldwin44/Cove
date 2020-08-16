import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import { AuthenticationContext } from './AuthenticationContext';

import { isContainingData, isEmptyData } from '../utils/index';

function Profile() {
  const {
    userData,
  } = useContext(AuthenticationContext);

  return (
    <div>
      {isContainingData(userData) && (
        <div>{userData.displayName ? userData.displayName : userData.email}'s Profile</div>
      )}
      {isEmptyData(userData) && (
        <Redirect from='/users/profile' to='/users/log_in' />
      )}
    </div>
  )
}

export default Profile;
