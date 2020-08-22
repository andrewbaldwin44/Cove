import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import BoardGames from './BoardGames';

function Games({ windowNavigation, setWindowNavigation }) {
  const [gamePlaying, setGamePlaying] = useState(null);

  useEffect(() => {
    if (windowNavigation === 'back') {
      setGamePlaying(null);
      setWindowNavigation(null);
    }
  }, [windowNavigation]);

  if (gamePlaying === null) {
    return (
      <Wrapper>
        <GameTile
          onClick={() => setGamePlaying('board')}
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
