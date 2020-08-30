import React, { useState } from 'react';
import styled from 'styled-components';

import Items from './Items';
import Timer from './Timer';

import { ImPencil } from 'react-icons/im';
import { BsPauseFill, BsPlayFill } from 'react-icons/bs';

import { ActivitiesProvider } from './ActivitiesContext';

function Activities() {
  const [isStarted, setIsStarted] = useState(false);

  return (
    <Wrapper>
      <Header>
        <div>
          <input
            type='text'
            placeholder='My Activity'
          />
          <ImPencil />
          <StartButton
            type='button'
            onClick={() => setIsStarted(!isStarted)}
          >
              {isStarted ? (
                <ButtonContent><BsPauseFill /> Pause</ButtonContent>
              ) : (
                <ButtonContent><BsPlayFill /> Start</ButtonContent>
              )}
          </StartButton>
        </div>
      </Header>
      <Body>
        <ActivitiesProvider
          isStarted={isStarted}
          setIsStarted={setIsStarted}
        >
          <Items />
          <Timer />
        </ActivitiesProvider>
      </Body>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  border-bottom: 1px solid black;
  height: 70px;
  width: 100%;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 70%;
  }

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

const StartButton = styled.button`
  background-color: var(--light-green);
  box-shadow: 2px 2px 10px black;
  margin-left: 90px;
  width: 200px;
  height: 45px;
  border-radius: 10px;
  z-index: 10;
`;

const ButtonContent = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 0 20px;
`;

const Body = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  overflow-y: scroll;
`;

export default Activities;
