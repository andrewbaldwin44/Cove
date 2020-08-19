import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import io from 'socket.io-client';

import { AuthenticationContext } from './AuthenticationContext';

import { isContainingData } from '../utils/index';

const socket = io.connect('http://localhost:4000');

function TestCall() {
  const {
    userData,
  } = useContext(AuthenticationContext);

  const [userID, setUserID] = useState("");

  const { callID } = useParams();

  useEffect(() => {
    if (isContainingData(userData)) {
      const { userID } = userData;

      socket.emit('join-room', callID, userID);

      socket.on('user-connected', userID => {
        console.log('User Connected' + userID)
      });
    }
    // eslint-disable-next-line
  }, [userData]);

  return (
    <VideoGrid>

    </VideoGrid>
  )
}

const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);
  gird-auto-rows: 300px;
`;

const Video = styled.video`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

export default TestCall;
