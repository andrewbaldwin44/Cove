import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'

import Main from './Main';

import { AuthenticationContext } from '../AuthenticationContext';
import { RoomProvider } from './RoomContext';

function Room() {
  const {
    retrieveClientID,
    validateRoomMember,
    database,
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
  }, [retrieveClientID, roomID, validateRoomMember]);

  if (!memberData) {
    return (
      <div>loading...</div>
    )
  }
  else if (memberData.isOwner || memberData.isMember) {
    return (
      <RoomProvider
        database={database}
        roomID={roomID}
      >
        <Main
          isOwner={memberData.isOwner}
        />
      </RoomProvider>
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
