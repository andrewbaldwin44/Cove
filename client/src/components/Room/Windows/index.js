import React, { useContext, useState, useEffect, createRef } from 'react';
import styled from 'styled-components';

import Draggable from 'react-draggable';

import { FiMaximize2 } from 'react-icons/fi';
import { IoIosCloseCircleOutline, IoMdRemove } from 'react-icons/io';
import { BsArrowLeftShort } from 'react-icons/bs';

import { RoomContext } from '../RoomContext';

function Windows({ children, title, containing, size, position }) {
  const {
    changeWindowState,
    navigateInnerWindow,
    windowProperties,
    setWindowProperties,
  } = useContext(RoomContext);

  const appWindow = createRef();

  const [windowY, setWindowY] = useState(0);
  const [mouseX, setMouseX] = useState(0);
  const [windowPosition, setWindowPosition] = useState(position);

  const handleMouseMove = event => {
    const { clientX } = event;

    setMouseX(clientX);
  }

  const closeWindow = app => {
    const newState = ['isOpen', false];
    changeWindowState(app, newState);
  }

  const handleDrag = (event, ui) => {
    const { deltaY } = ui;

    setWindowY(windowY + deltaY);
  }

  const handleWindowMove = () => {
    setWindowProperties({ position: null });
    setWindowPosition(null);
  };

  const handleMouseRelease = () => {
    if (position.x !== 0 && position.y !== 0) return;

    const windowWidth = window.innerWidth - 1;

    if (windowY === 0) {
      setWindowProperties({ position: 'top' });
    }
    else if (mouseX === 0) {
      setWindowProperties({ position: 'left' });
    }
    else if (mouseX === windowWidth) {
      setWindowProperties({ position: 'right' });
    }
  }

  const resetDeltaY = () => setWindowY(0);
  const setWindowTopLeft = () => setWindowPosition({ x: 0, y: 0 });
  const setWindowTopRight = () => {
    const windowWidth = window.innerWidth;
    const windowCenter = windowWidth / 2;

    setWindowPosition({ x: windowCenter, y: 0 });
  }

  const maximizeWindow = () => {
    setWindowTopLeft();
    resetDeltaY();
    appWindow.current.style.width = '100vw';
  }

  const handleWindowLocking = position => {
    const windowElement = appWindow.current;

    if (position === 'left') {
      setWindowTopLeft();
      resetDeltaY();
      windowElement.style.width = '50vw';
    }
    else if (position === 'top') {
      maximizeWindow();
    }
    else if (position === 'right') {
      setWindowTopRight();
      windowElement.style.width = '50vw';
      resetDeltaY();
    }
  }

  useEffect(() => {
    document.onmousemove = handleMouseMove;

    return () => document.onmousemove = null;
  }, []);

  useEffect(() => {
    const { position } = windowProperties;

    if (position) handleWindowLocking(position);
    // eslint-disable-next-line
  }, [windowProperties]);

  return (
    <Draggable
      handle='.anchor'
      bounds={{ top: 0 }}
      onDrag={handleDrag}
      onStart={handleWindowMove}
      onStop={handleMouseRelease}
      position={windowPosition}
    >
    <Wrapper
      ref={appWindow}
      size={size}
    >
      <Header
        className='anchor'
      >
        <HeaderNav>
          <BsArrowLeftShort
            onClick={() => navigateInnerWindow(containing)}
          />
          {title}
        </HeaderNav>
        <div>
          <IoMdRemove />
          <FiMaximize2 onClick={maximizeWindow} />
          <IoIosCloseCircleOutline onClick={() => closeWindow(containing)} />
        </div>
      </Header>
      <Body>
        {children}
      </Body>
    </Wrapper>
    </Draggable>
  )
}

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: var(--main-background);
  height: ${({ size }) => {
    return `calc((100vh - var(--default-appbar-height)) * ${size.height / 100} )`;
  }};
  width: ${({ size }) => {
    return `calc(100vw * (${size.width / 100}))`;
  }};
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: var(--window-header-height);
  padding: 0 15px;
  background-color: var(--main-headers);
  color: white;
  cursor: grab;


  &:active {
  }

  svg {
    font-size: 1.2em;
    cursor: pointer;

    &:not(:first-child) {
      margin-left: 20px;
    }
  }
`;

const HeaderNav = styled.div`
  display: flex;
  align-items: center;
  width: 400px;
  height: 100%;

  svg {
    font-size: 30px;
    margin-right: 20px;
  }
`;

const Body = styled.div`
  position: relative;
  top: 0;
  height: calc(100% - var(--window-header-height));
`;

export default Windows;
