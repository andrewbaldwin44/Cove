import React, { useState, createRef } from 'react';
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

function DraggableDialog(props) {
  return (
    <Draggable>
        <Paper {...props} />
    </Draggable>
  )
}

function Homepage() {
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const roomNameInput = createRef();

  const configureNewRoom = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const createNewRoom = () => {
    const roomName = roomNameInput.current.value;
    
    history.push(`rooms/room/${roomName}`);
  }

  return (
    <>
      <Add
        onClick={configureNewRoom}
      >
        Add +
      </Add>
      <StyledDialog
        open={open}
        onClose={handleClose}
        PaperComponent={DraggableDialog}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          New Room
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Choose a Room Name to get Started!
          </DialogContentText>
          <StyledInput
            type='text'
            ref={roomNameInput}
          />
        <DialogActions>
          <SubmitButton
            onClick={createNewRoom}
          >
            <StyledDoorIcon />
            Open
          </SubmitButton>
        </DialogActions>
        </DialogContent>
      </StyledDialog>
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

const StyledDialog = styled(Dialog)`

`;

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

export default Homepage;
