import React from 'react';
import styled, { keyframes } from 'styled-components';

import { StyledInput, FormAction } from './index';

import { ReactComponent as DoorIcon } from '../../assets/images/door.svg';

function PageOne({ pageSwitch, createNewRoom }) {
  const handleUserSearch = event => {
    const search = event.target.value;

    fetch(`/search_users?search=${search}`)
      .then(response => response.json())
      .then(data => console.log(data))
  }

  return (
    <Wrapper
      onSubmit={createNewRoom}
      pageSwitch={pageSwitch}
    >
      <label htmlFor='user-select'>Invite your Friends!</label>
      <StyledInput
        id='user-select'
        name='user-select'
        type='text'
        onInput={handleUserSearch}
      />
      <FormAction>
        <SubmitButton
          type='submit'
          pageSwitch={pageSwitch}
        >
          <StyledDoorIcon />
          Open
        </SubmitButton>
      </FormAction>
    </Wrapper>
  )
}

const FadeInRight = keyframes`
  from {
    opacity: 0;
  }
  25% {
    opacity: 0;
  }
  to {
    transform: translateX(-92%);
    opacity: 1;
  }
`;

const Wrapper = styled.form`
  margin-top: 50px;
  flex-grow: 1;
  opacity: 1;
  transform: translateX(900px);

  animation-name: ${({ pageSwitch }) => pageSwitch ? FadeInRight : ''};
  animation-fill-mode: forwards;
  animation-duration: 1s;
`;

const SubmitButton = styled.button`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-around;
  right: 0;
  padding: 10px 15px;
  margin-top: 15px;
`;

const StyledDoorIcon = styled(DoorIcon)`
  width: 60px;
  height: 60px;
`;

export default PageOne;
