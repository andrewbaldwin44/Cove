import React from 'react';
import styled from 'styled-components';

import { BiCustomize, BiCog, BiCubeAlt } from 'react-icons/bi';

function Main({ position, toggle, openWindow }) {
  return (
    <Wrapper
      position={position}
      toggle={toggle}
    >
      <MenuItem
        onClick={() => openWindow('widgets')}
      >
        <BiCubeAlt />
        <span>Widgets</span>
      </MenuItem>
      <MenuItem
        onClick={() => openWindow('preferences')}
      >
        <BiCustomize />
        <span>Preferences</span>
      </MenuItem>
      <MenuItem
        onClick={() => openWindow('settings')}
      >
        <BiCog />
        <span>Settings</span>
      </MenuItem>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: fixed;
  display: ${({ toggle }) => toggle ? 'flex' : 'none'};
  flex-direction: column;
  left: ${({ position }) => position.x + 10}px;
  top: ${({ position }) => position.y}px;
  background-color: var(--main-headers);
  height: var(--room-menu-height);
  width: var(--room-menu-width);
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
