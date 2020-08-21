import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

import SelectUsers from './SelectUsers';

import { StyledInput } from './index';

import { ReactComponent as DoorIcon } from '../../assets/images/door.svg';

function PageTwo({ pageSwitch, createNewRoom, addMember }) {
  const [users, setUsers] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleUserSearch = event => {
    const search = event.target.value;

    if (search.length > 0) setHasSearched(true);
    else setHasSearched(false);

    fetch(`/search_users?search=${search}`)
      .then(response => response.json())
      .then(({ searchedUsers }) => setUsers(searchedUsers));
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
      <SelectUsers
        users={users}
        hasSearched={hasSearched}
        addMember={addMember}
      />
      <SubmitButton
        type='submit'
        pageSwitch={pageSwitch}
      >
        <StyledDoorIcon />
        Open
      </SubmitButton>
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
  //position: absolute;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  right: 0;
  padding: 10px 15px;
  margin-top: 15px;
  width: 400px;
`;

const StyledDoorIcon = styled(DoorIcon)`
  width: 60px;
  height: 60px;
`;

export default PageTwo;
