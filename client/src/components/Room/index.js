import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import styled from 'styled-components';

import { AuthenticationContext } from '../AuthenticationContext';

function Room() {
  const {
    userData,
    retrieveClientID,
    validateRoomMember,
  } = useContext(AuthenticationContext);

  const { roomID } = useParams();

  const [memberData, setMemberData] = useState(null);

  useEffect(() => {
    const clientID = retrieveClientID()
    if (clientID) {
      clientID
        .then(idToken => validateRoomMember(idToken, roomID))
        .then(data => setMemberData(data))
        .catch(({ message }) => console.log(message));
    }
  }, [userData]);

  if (!memberData) {
    return (
      <div>loading...</div>
    )
  }
  else if (memberData.isOwner) {
    return (
      <div>
        Welcome to your new room {userData.displayName || userData.email}!
      </div>
    )
  }
  else if (memberData.isMember) {
    return (
      <div>
        Welcome to the room!
      </div>
    )
  }
  else {
    return (
      <div>
          You do not have access to this room!
      </div>
    )
  }
}

export default Room;
