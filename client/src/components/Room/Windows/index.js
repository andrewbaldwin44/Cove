import React, { useContext } from 'react';
import styled from 'styled-components';

import Draggable from 'react-draggable';

import { FiMaximize2 } from 'react-icons/fi';
import { IoIosCloseCircleOutline, IoMdRemove } from 'react-icons/io';
import { BsArrowLeftShort } from 'react-icons/bs';

import { RoomContext } from '../RoomContext';

function Windows({ children, title, containing }) {
  const {
    changeWindowState,
  } = useContext(RoomContext);

  const closeWindow = app => {
    const newState = ['isOpen', false];
    changeWindowState(app, newState);
  }

  const naviagateInnerWindow = () => {
    const newState = ['innerWindow', null];
    changeWindowState('games', newState);
  }

  return (
    <Draggable
      handle='.anchor'
      bounds={{ top: 0 }}
    >
    <Wrapper>
      <Header
        className='anchor'
      >
        <HeaderNav>
          <BsArrowLeftShort
            onClick={naviagateInnerWindow}
          />
          {title}
        </HeaderNav>
        <div>
          <IoMdRemove />
          <FiMaximize2 />
          <IoIosCloseCircleOutline onClick={() => closeWindow(containing)} />
        </div>
      </Header>
      {children}
    </Wrapper>
    </Draggable>
  )
}

const Wrapper = styled.div`
  position: relative;
  background-color: white;
  height: calc(100vh - 60px);
  width: 100vw;
  left: 0;
  top: 0;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  padding: 0 15px;
  background-color: lightblue;
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
  justify-content: space-between;
  width: 100px;
  height: 100%;

  svg {
    font-size: 30px;
  }
`;

export default Windows;
