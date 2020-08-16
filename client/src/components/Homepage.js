import React, { useState } from 'react';
import styled from 'styled-components';

import NewRoomDialog from './NewRoomDialog';

function Homepage() {
  const [openDialog, setOpenDialog] = useState(false);

  const configureNewRoom = () => setOpenDialog(true);

  return (
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
