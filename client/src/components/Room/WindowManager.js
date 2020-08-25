import React, { useContext } from 'react';
import styled from 'styled-components';

import Windows from './Windows/index';
import { apps } from './apps';

import { RoomContext } from './RoomContext';

function WindowManager() {
  const {
    openWindows,
  } = useContext(RoomContext);

  return (
    <Wrapper>
      {openWindows.map(([app, appState], index) => {
        const { innerWindow } = appState;

        const {
          name,
          component
        } = apps[app];

        if (appState.isOpen) {
          return (
            <Windows
              key={`window${index}`}
              title={name}
              containing={app}
            >
              {component({ innerWindow: innerWindow })}
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
