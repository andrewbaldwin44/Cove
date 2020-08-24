import React from 'react';
import styled from 'styled-components';

import ThemeSelector from './ThemeSelector';
import Form from './Form';

function User({ userData }) {
  const { displayName, email, photoURL } = userData;

  console.log(userData);

  return (
    <Wrapper>
      <Left>
        <ProfilePicture src={photoURL} alt='Profile' />
        <h2>{displayName}</h2>
        <span className='email'>{email}</span>
      </Left>
      <Right>
        <h3>Preferences</h3>
        <ThemeSelector />
        <h3 className='bottom-right'>Edit Public Profile</h3>
        <Form userData={userData} />
      </Right>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  height: 100%;

  h2 {
    font-weight: bold;
    font-size: 1.8em;
    margin-bottom: 10px;
  }

  .email {
    color: var(--light-gray);
    font-size: 1.2em;
    font-style: italic;
  }
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 100px;
`;

const ProfilePicture = styled.img`
  height: 150px;
  width: 150;
  border-radius: 100%;
  margin-bottom: 20px;
  border: 3px solid black;
`;

const Right = styled.div`
  border: 1px solid black;
  width: 60vw;
  height: 80vh;
  padding: 20px;

  h3 {
    font-size: 1.4em;
    color: red;
    font-weight: bold;
    text-decoration: underline;
  }

  .bottom-right {
    margin-top: 50px;
  }
`;

export default User;
