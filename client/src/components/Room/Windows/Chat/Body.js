import React, { useContext, createRef } from 'react';
import styled from 'styled-components';

import { IoMdSend } from 'react-icons/io';

import { toArray } from '../../../../utils/index';
import { sendChanges } from '../../hooks/useSockets';
import { RoomContext } from '../../RoomContext';
import { AuthenticationContext } from '../../../AuthenticationContext';

function Body() {
  const {
    messageData,
    updateMessages,
  } = useContext(RoomContext);

  const {
    userData: {
      displayName,
      photoURL,
    },
  } = useContext(AuthenticationContext);

  const chatMessage = createRef();

  const sendChat = event => {
    event.preventDefault();

    const newMessage = chatMessage.current.value;
    updateMessages(newMessage, { displayName, photoURL });
    chatMessage.current.value = '';
  }

  console.log(messageData);

  return (
    <Wrapper>
      <ChatArea>
        {toArray(messageData).map(([messageID, messageContent]) => {
          const { message, displayName, photoURL, timeStamp } = messageContent;
          console.log(message)

          return (
            <div key={messageID}>
              <span>{message}</span>
            </div>
          )
        })}
      </ChatArea>
      <ChatForm onSubmit={sendChat}>
        <ChatInput ref={chatMessage} />
        <button type='submit'>
          <IoMdSend />
        </button>
      </ChatForm>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  height: 95%;
  width: 100%;
`;

const ChatArea = styled.div`
  height: 85%;
  width: 100%;
`;

const ChatForm = styled.form`
  button {
    position: absolute;
    right: 0;
    height: 80px;
    width: 60px;
    cursor: pointer;

    svg {
      font-size: 1.7em;
    }
  }
`;

const ChatInput = styled.input`
  position: absolute;
  bottom: 0;
  padding: 10px;
  width: 100%;
  height: 80px;
  resize: none;
  outline: none;
  border: none;
  box-shadow: 1px 0 5px var(--light-blue);
`;

export default Body;
