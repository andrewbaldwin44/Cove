import React, { createRef, useContext } from 'react';
import { useHistory } from 'react-router-dom'
import styled from 'styled-components';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';

import { ReactComponent as DoorIcon } from '../assets/images/door.svg';

import { AuthenticationContext } from './AuthenticationContext';

function DraggableDialog(props) {
  return (
    <Draggable>
        <Paper {...props} />
    </Draggable>
  )
}

function NewRoomDialog({ openDialog, setOpenDialog }) {
  const {
    userData,
  } = useContext(AuthenticationContext);

  const history = useHistory();
  const roomNameInput = createRef();

  const handleClose = () => setOpenDialog(false);

  const createNewRoom = event => {
    event.preventDefault();

    const roomName = roomNameInput.current.value;
    const { uid } = userData;

    const roomData = { roomName, uid };

    fetch('/rooms/newroom', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(roomData),
    })
    .then(response => response.json())
    .then(({ roomNumber }) => {
      history.push(`rooms/room/${roomNumber}`);
    })
    .catch(error => console.log(error));
  }

  return (
    <Dialog
      open={openDialog}
      onClose={handleClose}
      PaperComponent={DraggableDialog}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        New Room
      </DialogTitle>
      <DialogContent>
        <form onSubmit={createNewRoom}>
          <DialogContentText name='room-name' htmlFor='room-name'>
            Choose a Room Name to get Started!
          </DialogContentText>
          <StyledInput
            id='room-name'
            name='room-name'
            type='text'
            ref={roomNameInput}
            required
          />
          <DialogActions>
            <SubmitButton
              type='submit'
            >
              <StyledDoorIcon />
              Open
            </SubmitButton>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  )
}

const StyledInput = styled.input`
  width: 100%;
  border: none;
  border-bottom: 1px solid black;
  padding: 10px 3px;
  transition: border-color 0.1s;

  &:focus {
    border-color: var(--red-highlight);
  }
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 10px 15px;
  margin-top: 15px;
  width: 150px;
`;

const StyledDoorIcon = styled(DoorIcon)`
  width: 50px;
  height: 50px;
`;

export default NewRoomDialog;
