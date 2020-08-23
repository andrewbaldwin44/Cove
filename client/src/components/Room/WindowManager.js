import React, { useContext } from 'react';
import styled from 'styled-components';

import Windows from './Windows/index';
import Browser from './Windows/Browser';
import Games from './Windows/Games/index';
import Youtube from './Windows/Youtube/index';
import Deezer from './Windows/Deezer/index';
import Activities from './Windows/Activities/index';

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
              containing={'web'}
            >
              <Browser />
            </Windows>
          )
        }
        else if (app === 'games' && appState.isOpen) {
          const { innerWindow } = appState;

          return (
            <Windows
              key={`window${index}`}
              title={'Games'}
              containing={'games'}
            >
              <Games
                innerWindow={innerWindow}
              />
            </Windows>
          )
        }
        else if (app === 'youtube' && appState.isOpen) {
          const { innerWindow } = appState;

          return (
            <Windows
              key={`window${index}`}
              title={'Youtube'}
              containing={'youtube'}
            >
              <Youtube
                innerWindow={innerWindow}
              />
            </Windows>
          )
        }
        else if (app === 'deezer' && appState.isOpen) {
          return (
            <Windows
              key={`window${index}`}
              title={'Deezer'}
              containing={'deezer'}
            >
              <Deezer />
            </Windows>
          )
        }
        else if (app === 'activity' && appState.isOpen) {
          return (
            <Windows
              key={`window${index}`}
              title={'Timed Activities'}
              containing={'activity'}
            >
              <Activities />
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
