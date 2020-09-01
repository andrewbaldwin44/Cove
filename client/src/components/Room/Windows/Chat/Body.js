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
    saveMessages,
  } = useContext(RoomContext);

  const {
    userData: {
      displayName,
      photoURL,
    },
  } = useContext(AuthenticationContext);

  const chatMessage = createRef();

  const clearChatMessage = () => chatMessage.current.value = ''

  const sendChat = event => {
    event.preventDefault();

    const newMessage = chatMessage.current.value;
    const senderData = { displayName, photoURL };

    const { messageTimeStamp, messageID } = updateMessages(newMessage, senderData);
    saveMessages(newMessage, senderData, messageTimeStamp, messageID);
    clearChatMessage();
  }

  return (
    <Wrapper>
      <ChatArea>
        {toArray(messageData).map(([messageID, messageContent]) => {
          const { message, displayName, photoURL, timeStamp } = messageContent;

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
