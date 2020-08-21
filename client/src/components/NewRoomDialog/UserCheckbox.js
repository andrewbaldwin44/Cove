import React, { useState } from 'react';
import styled from 'styled-components';

function UserCheckbox({ userData, addMember }) {
  const { displayName, email, photoURL } = userData;

  const [selected, setSelected] = useState(false);

  const selectUser = () => {
    setSelected(!selected);
    addMember(email);
  }

  return (
    <Wrapper
      onClick={selectUser}
      selected={selected}
    >
      <ProfileImage src={photoURL} alt='User Profile Picture' />
      <Details>
        <span>{displayName}</span>
        <span className='email'>{email}</span>
      </Details>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: ${({ selected }) => selected ? '#b2dfdb' : ''};
  margin-bottom: 10px;
  padding-left: 10px;
  width: 390px;
`;

const ProfileImage = styled.img`
  height: 30px;
  width: 30px;
  border-radius: 50%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 60px;
  margin-left: 15px;
  line-height: 1.1;

  .email {
    font-style: italic;
    color: var(--light-gray);
  }
`;

export default UserCheckbox;
