import React, { createRef, useEffect } from 'react';
import styled from 'styled-components';

const defaultAppBarHeight = '60px';

function AppBar({ length, position }) {
  const container = createRef();

  useEffect(() => {
    const appBarElement = container.current;

    const setElementStyle = (width, height, centeringPosition, transform) => {
      appBarElement.style.width = width;
      appBarElement.style.height = height;
      appBarElement.style[position] = 0;
      appBarElement.style[centeringPosition] = '50%';
      appBarElement.style.transform = `${transform}(-50%)`;
    }

    if (appBarElement) {
      if (position === 'left' || position === 'right') {
        setElementStyle(defaultAppBarHeight, length, 'top', 'translateY');
      }
      else {
        setElementStyle(length, defaultAppBarHeight, 'left', 'translateX');
      }
    }
  }, [container, length, position]);

  return (
    <Wrapper
      ref={container}
    />
  )
}

const Wrapper = styled.div`
  position: absolute;
  border-radius: 8px;
  background-color: var(--main-black);
  box-shadow: -2px -2px 8px var(--dark-shadow),
              4px 10px 5px var(--dark-shadow);
`;

export default AppBar
