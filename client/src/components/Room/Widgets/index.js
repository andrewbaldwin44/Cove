import React, { useContext } from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';

import { RoomContext } from '../RoomContext';

function Widgets({ children, appWindow, containing, position }) {
  const {
    changeWidgetState,
  } = useContext(RoomContext);

  const handleDrag = () => {
    if (appWindow) {
      appWindow.current.style.opacity = 0.3;
    }

    const newState = ['isOpen', true];

    changeWidgetState(containing, newState);
  }

  const handleDragStop = (_, ui) => {
    const { x, y } = ui;

    if (appWindow) {
      appWindow.current.style.opacity = 1;
    }

    const position = { x, y };
    const newState = ['position', position];
    changeWidgetState(containing, newState);
  }

  return (
    <Draggable
      grid={[25, 25]}
      onDrag={handleDrag}
      onStop={handleDragStop}
      defaultPosition={position}
    >
      <Wrapper>
        {children}
      </Wrapper>
    </Draggable>
  )
}

const Wrapper = styled.div`
  height: 100px;
  width: 100px;
  border: 1px solid blue;
`;

export default Widgets;
