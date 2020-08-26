import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function RoomPortal({ roomID, roomDetails }) {
  const { background, name } = roomDetails;
  console.log(roomDetails);

  return (
    <Wrapper to={`/rooms/room/${roomID}`}>
      <HoverZoom>
        <RoomPreview src={background} alt='Room Preview' />
      </HoverZoom>
      <NameContainer>
          <h3>{name}</h3>
      </NameContainer>
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
  border-radius: calc(var(--portal-border-radius) + 4px);
  border: 3px solid var(--main-headers);
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

const NameContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  font-weight: bold;
  font-size: 1.2em;
  border-radius: var(--portal-border-radius);
  margin-top: -50px;
  z-index: 100;
` ;

export default RoomPortal;
