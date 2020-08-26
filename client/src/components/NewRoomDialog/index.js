import React, { createRef, useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import Draggable from 'react-draggable';

import PageOne from './PageOne';
import PageTwo from './PageTwo';

import { AuthenticationContext } from '../AuthenticationContext';

import DefaultBackground from '../../assets/images/default-background.jpeg';

function NewRoomDialog({ openDialog, setOpenDialog }) {
  const {
    userData,
  } = useContext(AuthenticationContext);

  const [pageSwitch, setPageSwitch] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const history = useHistory();
  const roomNameInput = createRef();
  const overlay = createRef();

  useEffect(() => {
    window.onclick = event => {
      if (event.target === overlay.current) setOpenDialog(false);
    }

    return () => {
      window.onclick = null;
    }
  });

  const addMember = member => {
    setSelectedMembers([...selectedMembers, member]);
  }

  const requestNewRoom = roomData => {
    fetch('/rooms/newroom', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(roomData),
    })
    .then(response => response.json())
    .then(data => {
      const { roomID } = data;

      history.push(`rooms/room/${roomID}`);
    })
    .catch(error => console.log(error));
  }

  const createNewRoom = event => {
    event.preventDefault();

    const roomName = roomNameInput.current.value;
    const roomBackground = DefaultBackground;
    const { userID } = userData;

    const roomData = { roomName, roomBackground, userID, selectedMembers };

    requestNewRoom(roomData);
  }

  return (
    <Overlay
      ref={overlay}
      openDialog={openDialog}
    >
      <Draggable
        bounds='body'
      >
        <Wrapper>
          <h2>New Room</h2>
          <FormPages>
            <PageOne
              roomNameInput={roomNameInput}
              pageSwitch={pageSwitch}
              setPageSwitch={setPageSwitch}
            />
            <PageTwo
              pageSwitch={pageSwitch}
              createNewRoom={createNewRoom}
              addMember={addMember}
            />
          </FormPages>
      </Wrapper>
      </Draggable>
    </Overlay>
  )
}

const Overlay = styled.div`
  position: absolute;
  display: ${({ openDialog }) => openDialog ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0,0,0,0.5)
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: white;
  min-height: 265px;
  width: 450px;
  padding: 30px;
  overflow: hidden;

  &:active {
    cursor: grab;
  }

  h2 {
    font-size: 1.4em;
    font-weight: bold;
  }
`;

const FormPages = styled.div`
  display: flex;
  width: 200%;
`;

export const StyledInput = styled.input`
  width: 100%;
  border: none;
  border-bottom: 1px solid black;
  padding: 10px 3px;
  margin-top: 15px;
  transition: border-color 0.1s;

  &:focus {
    border-color: var(--red-highlight);
  }
`;


export default NewRoomDialog;
