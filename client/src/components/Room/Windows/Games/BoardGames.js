import React from 'react';
import styled from 'styled-components';

function BoardGames() {
  return (
    <Wrapper
      src='http://playingcards.io/'
    />
  )
}

const Wrapper = styled.iframe`
  height: calc(100% - 50px);
  width: 100%;
`;

export default BoardGames;
