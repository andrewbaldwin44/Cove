import React, { useContext, useEffect, useState, useRef } from 'react';
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

  const { callID } = useParams();

  const [stream, setStream] = useState();

  const userVideoSource = useRef();

  useEffect(() => {
    if (isContainingData(userData)) {
      const { userID } = userData;

      socket.emit('join-room', callID, userID);

      socket.on('user-connected', userID => {
        console.log('User Connected' + userID)
      });

      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
        setStream(stream);

        if (userVideoSource.current) {
          userVideoSource.current.srcObject = stream;
        }
      });
    }
    // eslint-disable-next-line
  }, [userData]);

  let UserVideo;
  if (stream) {
    UserVideo = (
      <Video playsInline muted ref={userVideoSource} autoPlay />
    );
  }

  return (
    <VideoGrid>
      {UserVideo}
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
