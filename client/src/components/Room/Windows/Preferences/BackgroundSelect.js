import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';

import Spinner from '../../../Spinner';

import { RoomContext } from '../../RoomContext';
import { AuthenticationContext } from '../../../AuthenticationContext';
import { sendChanges } from '../../hooks/useSockets';
import { SOCKET_PATHS } from '../../../../constants';

const { SEND_ROOM_DETAILS } = SOCKET_PATHS;

function BackgroundSelect() {
  const {
    roomDetails: {
      background
    },
    updateRoomDatabase,
    updateRoomDetails
  } = useContext(RoomContext);

  const {
    uploadFile,
  } = useContext(AuthenticationContext);

  const [backgroundStatus, setBackgroundStatus] = useState('idle');
  const { register, handleSubmit } = useForm();

  const handleNewBackground = async data => {
    const { background } = data;
    const [file] = background;

    if (file) {
      setBackgroundStatus('loading');

      const fileURL = await uploadFile(file);
      await updateRoomDatabase('background', fileURL);

      const newRoomDetails = { background: fileURL };

      updateRoomDetails(newRoomDetails);
      setBackgroundStatus('idle');
      sendChanges(SEND_ROOM_DETAILS, newRoomDetails);
    }
  }

  return (
    <Wrapper>
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
      <Overlay backgroundStatus={backgroundStatus}>
          <Spinner />
      </Overlay>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 80px auto;

  &[type="file"], label {
    background: var(--main-red);
    color: white;
    font-weight: normal;
    padding: 20px;
    height: 50px;
    margin-top: -50px;
    cursor: pointer;
  }

  & input {
    display: none;
  }
`;

const BackgroundPreview = styled.img`
  width: 100%;
  height: auto;
`;

const Overlay = styled.div`
  position: absolute;
  display: ${({ backgroundStatus }) => backgroundStatus === 'idle' ? 'none' : 'flex'};
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

export default BackgroundSelect;
