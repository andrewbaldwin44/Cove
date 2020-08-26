import React from 'react';
import styled from 'styled-components';

import { MdWidgets } from 'react-icons/md';
import { BiCustomize, BiCog, BiCubeAlt } from 'react-icons/bi';

function Main({ position, toggle }) {
  return (
    <Wrapper
      position={position}
      toggle={toggle}
    >
      <MenuItem>
        <BiCubeAlt />
        <span>Widgets</span>
      </MenuItem>
      <MenuItem>
        <BiCustomize />
        <span>Preferences</span>
      </MenuItem>
      <MenuItem>
        <BiCog />
        <span>Settings</span>
      </MenuItem>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;
  display: ${({ toggle }) => toggle ? 'flex' : 'none'};
  flex-direction: column;
  left: ${({ position }) => position.x + 10}px;
  top: ${({ position }) => position.y}px;
  background-color: var(--main-headers);
  height: 150px;
  width: 150px;
  color: white;
  box-shadow: -2px -2px 8px var(--dark-shadow),
              4px 10px 5px var(--dark-shadow);
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0 10px;
  height: 50px;
  border-radius: 2px;
  cursor: pointer;
  transition: background-color 0.1s;

  svg {
    font-size: 1.2em;
    margin-right: 15px;
  }

  &:hover {
    background-color: #4B515D;
  }
`;

export default Main;
