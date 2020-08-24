import React, { createRef, useEffect } from 'react';
import styled from 'styled-components';

const defaultAppBarHeight = '60px';

function AppBar({ children, length, position }) {
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
    >
      {children}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  padding: 0 30px;
  border-radius: 8px;
  background-color: var(--main-headers);
  box-shadow: -2px -2px 8px var(--dark-shadow),
              4px 10px 5px var(--dark-shadow);

  z-index: 1;

  img, svg {
    cursor: pointer;
  }

  img, svg:not(:first-child) {
    margin-left: 30px;
  }
`;

export default AppBar
