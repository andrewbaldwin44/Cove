import React from 'react';
import styled from 'styled-components';

import { useSelector } from "react-redux";

function Window() {
  const openApps = useSelector(state => state.window);

  return (
    <div>
      {openApps.web && (
        'Browser'
      )}
    </div>
  )
}

export default Window;
