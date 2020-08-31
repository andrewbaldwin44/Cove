import React, { useContext } from 'react';
import Draggable from 'react-draggable';

import { sendChanges } from '../hooks/useSockets';
import { SOCKET_PATHS } from '../../../constants';

import { RoomContext } from '../RoomContext';

const { SEND_WIDGET_STATE } = SOCKET_PATHS;

function Widgets({ children, appWindow, containing, parent, position, isSelected, setIsSelected }) {
  const {
    changeWidgetState,
    updateOpenWidgets,
    closeWindow,
  } = useContext(RoomContext);

  const handleDrag = () => {
    if (parent === 'selector') {
      setIsSelected(true);

      if (appWindow) {
        appWindow.current.style.opacity = 0.3;
      }

      const newState = ['isOpen', true];

      changeWidgetState(containing, newState);
      updateOpenWidgets('notepad', newState);
      sendChanges(SEND_WIDGET_STATE, { widget: containing, newState });
    }
  }

  const handleDragStop = (event, ui) => {
    if (appWindow && appWindow.current) {
      appWindow.current.style.opacity = 1;
    }

    let windowPosition;
    if (parent === 'selector') {
      setIsSelected(false);
      closeWindow('widgets');
      return;
    }
    else {
      const { x, y } = ui;
      windowPosition = { x, y };
    }

    const newState = ['position', windowPosition];
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
      <div>
          {children}
      </div>
    </Draggable>
  )
}

export default Widgets;
