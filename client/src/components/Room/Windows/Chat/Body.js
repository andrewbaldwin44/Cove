import React, { useContext, createRef } from 'react';
import styled from 'styled-components';

import { IoMdSend } from 'react-icons/io';

import { toArray } from '../../../../utils/index';
import { sendChanges } from '../../hooks/useSockets';
import { RoomContext } from '../../RoomContext';
import { AuthenticationContext } from '../../../AuthenticationContext';
import { SOCKET_PATHS } from '../../../../constants';

const { SEND_CHAT } = SOCKET_PATHS;

function Body() {
  const {
    messageData,
    updateMessages,
    saveMessages,
  } = useContext(RoomContext);

  const {
    userData: {
      displayName,
      email,
    },
    userData,
  } = useContext(AuthenticationContext);

  const chatMessage = createRef();

  const clearChatMessage = () => chatMessage.current.value = ''

  const sendChat = event => {
    event.preventDefault();

    const newMessage = chatMessage.current.value;
    const senderData = { displayName, email };
    const messageTimeStamp = new Date();
    const messageData = {
      message: newMessage,
      timeStamp: messageTimeStamp,
      ...senderData
    }

    updateMessages(messageData);
    saveMessages(messageData);
    sendChanges(SEND_CHAT, messageData);
    clearChatMessage();
  }

  return (
    <Wrapper>
      <ChatArea>
        {messageData && toArray(messageData).map(([messageID, messageContent]) => {
          const { message, displayName, email } = messageContent;

          return (
            <Bubble
              className={email === userData.email ? 'user-message' : ''}
              key={messageID}
            >
              <div className='chat-message'>
                <span>{message}</span>
              </div>
              <div className='chat-details'>
                <span>{displayName}</span>
              </div>
            </Bubble>
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
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-color: light-blue;
  height: 85%;
  width: 100%;
  max-width: 100%;
  padding: 0 10px;
  overflow-y: scroll;

  .user-message {
    align-self: flex-end;
  }

  .user-message > .chat-message{
    background-color: var(--light-gray);
  }
`;

const Bubble = styled.div`
  margin-bottom: 5px;

  .chat-message {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    min-height: 50px;
    min-width: 150px;
    max-width: 230px;
    border-radius: 5px;
    background-color: var(--light-blue);
  }

  .chat-details span {
    font-size: 0.9em;
    padding-left: 5px;
    padding-top: 3px;
    color: #9e9e9e;
    font-style: italic;
  }
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
