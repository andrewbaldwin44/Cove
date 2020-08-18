import React, { useContext } from 'react';
import styled from 'styled-components';

import { AuthenticationContext } from '../AuthenticationContext';

function Main({ isOwner }) {
  const {
    userData,
  } = useContext(AuthenticationContext);

  return (
    <div>
      {isOwner ? (
        `Welcome to your new room ${userData.displayName || userData.email}!`
      ) : (
        `Welcome to the room!`
      )}
    </div>
  )
}

export default Main;
