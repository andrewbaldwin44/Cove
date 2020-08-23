import React from 'react';
import styled from 'styled-components';

import Items from './Items';
import Timer from './Timer';

import { ImPencil } from 'react-icons/im';

function Activities() {
  return (
    <Wrapper>
      <Header>
        <input
          type='text'
          placeholder='My Activities'
        />
        <ImPencil />
      </Header>
      <Body>
        <Items />
        <Timer />
      </Body>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid black;
  height: 70px;
  width: 100%;

  input {
    font-size: 1.3em;
    width: 200px;
    border: none;
    text-align: center;
  }

  svg {
    font-size: 1.3em;
    margin-left: -20px;
  }
`;

const Body = styled.div`
  display: flex;
  height: 100%;
`;

export default Activities;
