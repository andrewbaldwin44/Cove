import React, { useState, useContext } from 'react';
import styled from 'styled-components';

import Header from './Header/index';
import RoomPortal from './RoomPortal';
import NewRoomDialog from './NewRoomDialog';

import { AuthenticationContext } from './AuthenticationContext';

import { isContainingData } from '../utils/index';

function Homepage() {
  const {
    userData,
  } = useContext(AuthenticationContext);

  const [openDialog, setOpenDialog] = useState(false);

  const configureNewRoom = () => setOpenDialog(true);

  return (
    <>
      <Header />
      {isContainingData(userData) && (
        <Wrapper>
          <Add
            onClick={configureNewRoom}
          >
            Add +
          </Add>
          {userData.ownedRooms.map(roomID => {
            return (
              <RoomPortal
                key={roomID}
                roomID={roomID}
              />
            )
          })}
          <NewRoomDialog
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
          />
        </Wrapper>
    )}
    </>
  )
}

const Wrapper = styled.main`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin: var(--main-height-padding) var(--main-width-padding);
`;

const Add = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: var(--portal-height);
  width: var(--portal-width);
  margin-bottom: var(--portal-gap);
  margin-right: var(--portal-gap);
  border-radius: var(--portal-border-radius);
  color: var(--light-green);
  font-size: 28px;
  font-weight: bold;
  border: 5px dashed var(--light-green);
  cursor: pointer;
`;

export default Homepage;
