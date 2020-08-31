import React, { useContext } from 'react';
import Draggable from 'react-draggable';

import { sendChanges } from '../hooks/useSockets';
import { SOCKET_PATHS } from '../../../constants';

import { RoomContext } from '../RoomContext';

const { SEND_WIDGET_STATE } = SOCKET_PATHS;

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
    sendChanges(SEND_WIDGET_STATE, { widget: containing, newState });
  }

  const handleDragStop = (_, ui) => {
    const { x, y } = ui;

    if (appWindow) {
      appWindow.current.style.opacity = 1;
    }

    const position = { x, y };
    const newState = ['position', position];
    changeWidgetState(containing, newState);
    sendChanges(SEND_WIDGET_STATE, { widget: containing, newState });
  }

  return (
    <Draggable
      grid={[25, 25]}
      onDrag={handleDrag}
      onStop={handleDragStop}
      defaultPosition={position}
    >
      <div position={position}>
        {children}
      </div>
    </Draggable>
  )
}

export default Widgets;
