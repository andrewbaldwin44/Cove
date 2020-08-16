import React from 'react';
import { useParams } from 'react-router-dom'
import styled from 'styled-components';

function Room() {
  const { roomID } = useParams();

  return (
    <div>
      New Room
    </div>
  )
}

export default Room;
