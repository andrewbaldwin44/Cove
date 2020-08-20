import React from 'react';

import Windows from '../Windows/index';
import Browser from '../Windows/Browser';

import { useSelector } from "react-redux";

import { toArray } from '../../utils/index';

function WindowManager() {
  const openWindows = useSelector(state => toArray(state.window.openWindows));

  return (
    <div>
      {openWindows.map(([app, appState], index) => {
        console.log(app, appState)
        return (
          <Windows key={`window${index}`}>
            {app === 'web' && appState.isOpen && (
              <Browser />
            )}
          </Windows>
        )
      })}
    </div>
  )
}

export default WindowManager;
