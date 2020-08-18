import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import styled from 'styled-components';

import Main from './Main';

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
  else if (memberData.isOwner || memberData.isMember) {
    return (
      <Main isOwner={memberData.isOwner} />
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
