import React from 'react';

import Windows from '../Windows/index';
import Browser from '../Windows/Browser';

import { useSelector } from "react-redux";

function WindowManager() {
  const windows = useSelector(state => state.window);

  return (
    <div>
      {windows.openWindows.map((window, index) => {
        return (
          <Windows key={`window${index}`}>
            {window['web'] && (
              <Browser />
            )}
          </Windows>
        )
      })}
    </div>
  )
}

export default WindowManager;
