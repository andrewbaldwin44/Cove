import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

import { getRoomMembers } from '../../../../utils/authenticationUtils';
import { RoomContext } from '../../RoomContext';

function Chat() {
  const {
    roomID,
  } = useContext(RoomContext);

  const [members, setMemebers] = useState(null);

  const parseMemberData = (roomMembers) => {
    const memberData = roomMembers.reduce((memberData, member) => {
      const { displayName, photoURL } = member;

      const existingNames = memberData.names || [];
      const existingPhotos = memberData.photos || [];

      return {
        names: [
          ...existingNames,
          displayName
        ],
        photos: [
          ...existingPhotos,
          photoURL,
        ],
      };
    }, {});

    setMemebers(memberData);
  }

  useEffect(() => {
    getRoomMembers(roomID)
      .then(({ roomMembers }) => parseMemberData(roomMembers));
      // eslint-disable-next-line
  }, []);

  return (
    <Wrapper>
      <Profiles>
        {members && members.photos.map((photo, index) => {
          return (
            <img key={`chatphoto${index}`} src={photo} alt='Chat Member' />
          )
        })}
      </Profiles>
      {members && members.names.length > 1 && (
        <div>
          {members.names.join(', ')}
        </div>
      )}
      {members && members.names.length === 1 && (
        <div>
          {members.names[0]}
        </div>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 15%;
  width: 100%;
  padding: 5px 15px;
  border-bottom: 1px solid var(--light-blue);
`;

const Profiles = styled.div`


  img {
    min-height: 50px;
    min-width: 50px;
    height: 50px;
    width: 50px;
    border-radius: 100%;
    border: 3px solid black;
  }
`;

export default Chat;
