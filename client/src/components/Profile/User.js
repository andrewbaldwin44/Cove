import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';

import ThemeSelector from './ThemeSelector';
import Form from './Form';

function User({ userData, updateUserDatabase, uploadFile }) {
  const { displayName, email, photoURL, selectedTheme: currentTheme } = userData;
  const { register, handleSubmit } = useForm();

  const [selectedTheme, setSelectedTheme] = useState(currentTheme);
  const [message, setMessage] = useState(null);

  const onSubmit = async data => {
    const {
      name,
      profile
    } = data;

    const [file] = profile;

    if (file) {
      await uploadFile(file);
    }

    if (selectedTheme !== 'default' || name !== displayName) {
      const newUserData = { selectedTheme, displayName: name };

      await updateUserDatabase(newUserData);
    }

    if (file || selectedTheme !== 'default' || name !== displayName) {
      setMessage('Profile Updated!');
    }
  }

  return (
    <Wrapper onSubmit={handleSubmit(onSubmit)}>
      <Left>
        <ProfilePicture src={photoURL} alt='Profile' />
        <h2>{displayName}</h2>
        <span className='email'>{email}</span>
      </Left>
      <Right>
        <h3>Preferences</h3>
        <ThemeSelector
          selectedTheme={selectedTheme}
          setSelectedTheme={setSelectedTheme}
        />
        <h3 className='bottom-right'>Edit Public Profile</h3>
        <Form
          currentName={displayName}
          register={register}
        />
        <Footer>
          <Message message={message}>{message}</Message>
          <SaveButton
            type='submit'
          >
            Save
          </SaveButton>
        </Footer>
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

const Right = styled.form`
  position: relative;
  border: 1px solid black;
  width: 60vw;
  height: 80vh;
  padding: 20px;

  h3 {
    font-size: 1.4em;
    color: var(--main-red);
    font-weight: bold;
    text-decoration: underline;
  }

  .bottom-right {
    margin-top: 50px;
  }
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Message = styled.div`
  display: flex;
  visibility: ${({ message }) => message === null ? 'hidden' : 'visible'};
  align-items: center;
  justify-content: center;
  background-image:linear-gradient(to bottom right, var(--light-green), lightgreen);
  border-radius: 5px;
  height: 50px;
  width: 70%;
`;

const SaveButton = styled.button`
  border-radius: 10px;
  background-color: var(--light-green);
  font-weight: bold;
  height: 50px;
  width: 150px;
`;

export default User;
