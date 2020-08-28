import React, { useContext } from 'react';
import styled from 'styled-components';

import BoardGames from './BoardGames';

import { RoomContext } from '../../RoomContext';

function Games({ innerWindow }) {
  const {
    navigateToInnerWindow,
  } = useContext(RoomContext);

  if (!innerWindow) {
    return (
      <Wrapper>
        <GameTile
          onClick={() => navigateToInnerWindow('board', 'games')}
        >
          Play Board Games
        </GameTile>
      </Wrapper>
    )
  }
  else {
    return (
      <BoardGames />
    )
  }
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 30px 80px;
`;

const GameTile = styled.div`
  height: 160px;
  width: calc((100vw - 160px) / 8);
  border: 2px dashed black;
  cursor: pointer;
`;

export default Games;
