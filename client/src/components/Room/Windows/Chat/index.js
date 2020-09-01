import React from 'react';
import styled from 'styled-components';

import Header from './Header';

function Chat() {
  return (
    <Wrapper>
      <Header />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;

export default Chat;
