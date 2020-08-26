import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';

import { RoomContext } from '../RoomContext';
import { AuthenticationContext } from '../../AuthenticationContext';

function Preferences() {
  const {
    roomDetails: {
      background
    },
    updateRoomDatabase,
  } = useContext(RoomContext);

  const {
    uploadFile,
  } = useContext(AuthenticationContext);

  const [backgroundPreview, setBackgroundPreview] = useState(background);

  const { register, handleSubmit } = useForm();

  const handleNewBackground = async data => {
    const { background } = data;
    const [file] = background;

    if (file) {
      const fileURL = await uploadFile(file);
      await updateRoomDatabase('background', fileURL)
    }
  }

  return (
    <Wrapper>
      <h3>Theme</h3>
      <BackgroundSelect>
        <BackgroundPreview src={background} alt='Background Preview' />
        <label htmlFor='background'>
          Change Desktop Background
        </label>
        <input
          type='file'
          name='background'
          id='background'
          ref={register}
          onChange={handleSubmit(handleNewBackground)}
        />
      </BackgroundSelect>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  padding: 20px 40px;

  h3 {
    font-size: 1.2em;
    font-weight: bold;
  }
`;

const BackgroundSelect = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  &[type="file"], label {
    background: var(--main-red);
    color: white;
    font-weight: normal;
    padding: 20px;
    width: 50%;
    height: 50px;
    margin-top: -50px;
    cursor: pointer;
  }

  & input {
    display: none;
  }

  img, label {
    align-self: center;
  }
`;

const BackgroundPreview = styled.img`
  height: auto;
  width: 50%;
`;

export default Preferences;
