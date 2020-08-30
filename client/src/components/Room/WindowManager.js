import React, { useContext, createRef } from 'react';
import styled from 'styled-components';

import Windows from './Windows/index';
import { APPS, DEFAULTS } from './appConstants';

import { RoomContext } from './RoomContext';

import { toArray } from '../../utils/index';

const { defaultWindowPosition, defaultWindowSize } = DEFAULTS;

function WindowManager() {
  const {
    openWindows,
  } = useContext(RoomContext);

  const appWindow = createRef();

  return (
    <Wrapper>
      {toArray(openWindows).map(([app, appState], index) => {
        const { innerWindow } = appState;

        const {
          name,
          component,
          size = defaultWindowSize,
          position = defaultWindowPosition,
        } = APPS[app];

        if (appState.isOpen) {
          return (
            <Windows
              key={`window${index}`}
              title={name}
              containing={app}
              size={size}
              position={position}
              appWindow={appWindow}
            >
              {component({ innerWindow, appWindow })}
            </Windows>
          )
        }
        else return null;
      })}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: fixed;
  height: 100vh;
  width: 0;
`;

export default WindowManager;
