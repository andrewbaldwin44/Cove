import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import DefaultBackground from '../assets/images/default-background.jpeg';

function RoomPortal({ roomID }) {
  return (
    <Wrapper to={`/rooms/room/${roomID}`}>
      <HoverZoom>
        <RoomPreview src={DefaultBackground} alt='Room Preview' />
      </HoverZoom>
    </Wrapper>
  )
}

const Wrapper = styled(Link)`
  position: relative;
  height: var(--portal-height);
  width: var(--portal-width);
  margin-bottom: var(--portal-gap);
  margin-right: var(--portal-gap);
`;

const HoverZoom = styled.div`
  height: 100%;
  border-radius: var(--portal-border-radius);
  overflow: hidden;
`;

const RoomPreview = styled.img`
  transition: transform .5s ease;
  height: 100%;
  width: 100%;
  border-radius: var(--portal-border-radius);

  &:hover {
    transform: scale(1.1);
  }
`;

export default RoomPortal;
