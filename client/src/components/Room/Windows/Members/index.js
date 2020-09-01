import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

import { getRoomMembers } from '../../../../utils/authenticationUtils';
import { RoomContext } from '../../RoomContext';

function Members() {
  const {
    roomID,
  } = useContext(RoomContext);

  const [members, setMemebers] = useState(null);

  useEffect(() => {
    getRoomMembers(roomID)
      .then(({ roomMembers }) => setMemebers(roomMembers));
      // eslint-disable-next-line
  }, []);

  return (
    <Wrapper>
      <h4>Members</h4>
      <Body>
        {members && members.map(members => {
          const { displayName, email, photoURL } = members;

          return (
            <Profile key={`memberprofile${email}`}>
              <img src={photoURL} alt='Profile' />
              <div>
                <h3>{displayName}</h3>
                <span className='email'>{email}</span>
              </div>
            </Profile>
          )
        })}
      </Body>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 20px 30px;
  height: 100%;
  width: 100%;
`;

const Body = styled.div`
  padding: 10px 30px;
  width: 100%;
  height: 80%;
  margin-top: 25px;
  overflow-y: scroll;
  box-shadow: 1px 1px 5px var(--dark-shadow);

  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-right: 100px;
  margin-top: 25px;

  img {
    min-height: 50px;
    min-width: 50px;
    height: 50px;
    width: 50px;
    border-radius: 100%;
    border: 3px solid black;
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 20px;
  }

  h3 {
    font-weight: bold;
  }
`;

export default Members;
