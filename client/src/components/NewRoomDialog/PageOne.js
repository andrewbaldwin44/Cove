import React from 'react';
import styled, { keyframes } from 'styled-components';

import { StyledInput, FormAction } from './index';

import { MdKeyboardArrowRight } from 'react-icons/md';

function PageOne({ roomNameInput, pageSwitch, setPageSwitch }) {
  const handlePageSwitch = event => {

    if (roomNameInput.current.value.length > 0) {
      event.preventDefault();
      setPageSwitch(true);
    }
  }

  return (
    <Wrapper
      pageSwitch={pageSwitch}
      onSubmit={handlePageSwitch}
    >
      <label htmlFor='room-name'>Choose a Room Name to get Started!</label>
      <StyledInput
        id='room-name'
        name='room-name'
        type='text'
        ref={roomNameInput}
        required
        autoFocus
      />
      <NextButton
        type='submit'
        onClick={handlePageSwitch}
        pageSwitch={pageSwitch}
      >
        Next
        <MdKeyboardArrowRight />
      </NextButton>
    </Wrapper>
  )
}

const FadeLeft = keyframes`
  20% {opacity: 0}
  to {
    transform: translateX(-80%);
    opacity: 0;
    display: none;
  }
`;

const Wrapper = styled.form`
  margin-top: 50px;
  width: 48%;

  animation-name: ${({ pageSwitch }) => pageSwitch ? FadeLeft : ''};
  animation-fill-mode: forwards;
  animation-duration: 1.8s;
`;

const NextButton = styled.button`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-around;
  right: 40px;
  padding: 10px 15px;
  padding-right: 0;
  margin-top: 35px;
  font-size: 1.1em;

  svg {
    font-size: 1.6em;
  }
`;

export default PageOne;
