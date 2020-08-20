import React from 'react';
import styled from 'styled-components';

import { FiMaximize2 } from 'react-icons/fi';
import { IoIosCloseCircleOutline, IoMdRemove } from 'react-icons/io';

import { useDispatch } from "react-redux";
import { closeWindow } from "../../actions";

function Windows({ children }) {
  const dispatch = useDispatch();

  const handleWindowClose = app => {
    dispatch(closeWindow(app));
  }

  return (
    <Wrapper>
      <Header>
        <IoMdRemove />
        <FiMaximize2 />
        <IoIosCloseCircleOutline onClick={() => handleWindowClose('web')} />
      </Header>
      {children}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;
  background-color: white;
  height: calc(100vh - 60px);
  width: 100vw;
  left: 0;
  top: 0;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 50px;
  padding: 0 15px;
  background-color: lightblue;

  svg {
    font-size: 1.2em;
    cursor: pointer;

    &:not(:first-child) {
      margin-left: 20px;
    }
  }
`;

export default Windows;
