import React, { useState, useContext } from 'react';
import styled from 'styled-components';

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
      {isContainingData(userData) && (
        <>
          <Add
            onClick={configureNewRoom}
          >
            Add +
          </Add>
          <NewRoomDialog
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
          />
        </>
    )}
    </>
  )
}

const Add = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--light-green);
  font-size: 28px;
  font-weight: bold;
  height: 150px;
  width: 200px;
  border: 5px dashed var(--light-green);
  border-radius: 10px;
  cursor: pointer;
`;

export default Homepage;
