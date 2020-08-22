import React, { useContext, useState } from 'react';
import styled from 'styled-components';

import Windows from './Windows/index';
import Browser from './Windows/Browser';
import Games from './Windows/Games/index';

import { RoomContext } from './RoomContext';

function WindowManager() {
  const {
    openWindows,
  } = useContext(RoomContext);

  return (
    <Wrapper>
      {openWindows.map(([app, appState], index) => {
        if (app === 'web' && appState.isOpen) {
          return (
            <Windows
              key={`window${index}`}
              title={'Web'}
            >
              <Browser />
            </Windows>
          )
        }
        else if (app === 'games' && appState.isOpen) {
          return (
            <Windows
              key={`window${index}`}
              title={'Games'}
            >
              <Games />
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
