import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';

import { requestInvite } from '../../../../utils/authenticationUtils';
import { BASE_URL } from '../../../../constants';

import { FiRefreshCcw } from 'react-icons/fi';

import { RoomContext } from '../../RoomContext';

function InviteDialogue() {
  const { roomID } = useContext(RoomContext);

  const [privateLink, setPrivateLink] = useState(null);
  const [publicLink, setPublicLink] = useState(null);

  const constructLink = link => {
    return BASE_URL + link;
  }

  const requestPrivateLink = () => {
    requestInvite(roomID, 'private')
      .then(({ registrationLink }) => constructLink(registrationLink))
      .then(link => setPrivateLink(link));
  }

  const requestPublicLink = () => {
    requestInvite(roomID, 'public')
      .then(({ registrationLink }) => constructLink(registrationLink))
      .then(link => setPublicLink(link));
  }

  const handleInputFoucs = event => {
    event.target.select();
    document.execCommand('copy');
  }

  useEffect(() => {
    requestPrivateLink();
    requestPublicLink();
    // eslint-disable-next-line
  }, []);

  return (
    <Wrapper className='invite-dialogue'>
      <Dialogue>
        <div>
          <h4>Private</h4>
          <Actions>
            <input
              type='text'
              defaultValue={privateLink}
              onFocus={handleInputFoucs}
            />
            <button type='button' onClick={requestPrivateLink}>
              <FiRefreshCcw />
            </button>
          </Actions>
        </div>
        <div>
          <h4>Public</h4>
          <Actions>
            <input
              type='text'
              defaultValue={publicLink}
              onFocus={handleInputFoucs}
            />
            <button type='button' onClick={requestPublicLink}>
              <FiRefreshCcw />
            </button>
          </Actions>
        </div>
      </Dialogue>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Dialogue = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 52%;
  width: 70%;
  background-color: white;
  border-radius: 5px;
  padding: 15px 30px;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;

  input {
    width: 88%;
    height: 30px;
  }

  svg {
    margin-left: 10px;
    padding: 2px;
    color: var(--light-blue);
    height: 30px;
    width: 30px;
  }
`;

export default InviteDialogue;
