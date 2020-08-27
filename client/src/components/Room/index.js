import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import Main from './Main';
import Spinner from '../Spinner';

import { AuthenticationContext } from '../AuthenticationContext';
import { RoomProvider } from './RoomContext';
import { getActionBars } from '../../utils/roomUtils';

function Room() {
  const {
    userRooms,
    retrieveClientID,
    validateRoomMember,
    database,
  } = useContext(AuthenticationContext);

  const { roomID } = useParams();

  const [memberData, setMemberData] = useState(null);
  const [actionBars, setActionBars] = useState(null);

  useEffect(() => {
    getActionBars(roomID, setActionBars, database);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const clientID = retrieveClientID()
    if (clientID) {
      clientID
        .then(idToken => validateRoomMember(idToken, roomID))
        .then(data => setMemberData(data))
        .catch(({ message }) => console.log(message));
    }
  }, [retrieveClientID, roomID, validateRoomMember]);

  if (!memberData || !userRooms || !userRooms[roomID] || !actionBars) {
    return (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    )
  }
  else if (memberData.isOwner || memberData.isMember) {
    const roomDetails = userRooms[roomID];

    return (
      <RoomProvider
        database={database}
        roomID={roomID}
        roomDetails={roomDetails}
        actionBars={actionBars}
      >
        <Main
          isOwner={memberData.isOwner}
          actionBars={actionBars}
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

const SpinnerContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export default Room;
