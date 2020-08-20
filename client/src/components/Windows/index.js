import React from 'react';
import styled from 'styled-components';

import Draggable from 'react-draggable';

import { FiMaximize2 } from 'react-icons/fi';
import { IoIosCloseCircleOutline, IoMdRemove } from 'react-icons/io';

import { useDispatch } from "react-redux";
import { closeWindow } from "../../actions";

function Windows({ children, title }) {
  const dispatch = useDispatch();

  const handleWindowClose = app => {
    dispatch(closeWindow(app));
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
        <div>
            {title}
        </div>
        <div>
          <IoMdRemove />
          <FiMaximize2 />
          <IoIosCloseCircleOutline onClick={() => handleWindowClose('web')} />
        </div>
      </Header>
      {children}
    </Wrapper>
    </Draggable>
  )
}

const Wrapper = styled.div`
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

export default Windows;