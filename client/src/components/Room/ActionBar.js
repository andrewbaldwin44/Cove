import React, { createRef, useEffect } from 'react';
import styled from 'styled-components';

const defaultActionBarHeight = '60px';

function ActionBar({ children, length, position }) {
  const container = createRef();

  useEffect(() => {
    const actionBarElement = container.current;

    const setElementStyle = (width, height, centeringPosition, transform) => {
      actionBarElement.style.width = width;
      actionBarElement.style.height = height;
      actionBarElement.style[position] = 0;
      actionBarElement.style[centeringPosition] = '50%';
      actionBarElement.style.transform = `${transform}(-50%)`;
    }

    if (actionBarElement) {
      if (position === 'left' || position === 'right') {
        setElementStyle(defaultActionBarHeight, length, 'top', 'translateY');
        actionBarElement.style.flexDirection = 'column';
        actionBarElement.style.alignItems = 'center';
        actionBarElement.style.justifyContent = 'flex-start';
        actionBarElement.style.padding = '30px 0';
      }
      else {
        setElementStyle(length, defaultActionBarHeight, 'left', 'translateX');
      }
    }
  }, [container, length, position]);

  return (
    <Wrapper
      ref={container}
      position={position}
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

  img {
    cursor: pointer;
  }

  img:not(:first-child) {
    ${({ position }) => {
      if (position === 'top' || position === 'bottom') return 'margin-left: 30px;';
      else return 'margin-top: 30px;';
    }}
  }
`;

export default ActionBar
