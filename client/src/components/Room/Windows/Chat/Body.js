import React from 'react';
import styled from 'styled-components';

import { IoMdSend } from 'react-icons/io';

function Body() {
  const sendChat = event => {
    event.preventDefault();
    console.log('hi')
  }

  return (
    <Wrapper>
      <ChatArea></ChatArea>
      <ChatForm onSubmit={sendChat}>
        <ChatInput />
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
