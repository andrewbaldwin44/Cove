import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import io from 'socket.io-client';

const socket = io.connect('http://localhost:4000');

function TestCall() {
  const { callID } = useParams();

  useEffect(() => {
    socket.emit('join-room', callID, 10);
    // eslint-disable-next-line
  }, [])

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

export default TestCall;
