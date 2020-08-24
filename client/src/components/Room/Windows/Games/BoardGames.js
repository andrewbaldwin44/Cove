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
  height: 100%;
  width: 100%;
`;

export default BoardGames;
