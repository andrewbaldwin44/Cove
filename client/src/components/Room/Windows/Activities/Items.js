import React from 'react';
import styled from 'styled-components';

import Board from "@lourenci/react-kanban";

import Card from './Card';

const board = {
  columns: [
    {
      id: 1,
      title: 'Add a new Activity',
      cards: [
        {
          id: 1,
          title: "Card title 1",
          description: "Card content"
        },
        {
          id: 2,
          title: "Card title 2",
          description: "Card content"
        },
        {
          id: 3,
          title: "Card title 3",
          description: "Card content"
        }
      ]
    }
  ]
};

function Items() {
  return (
    <Wrapper>
      <StartButton type='button'>
          Start
      </StartButton>
      <Board
        disableColumnDrag
        onCardRemove={console.log}
        initialBoard={board}
        allowAddCard={{ on: 'bottom' }}
        onNewCardConfirm={draftCard => ({
          id: new Date().getTime(),
          ...draftCard
        })}
        onCardNew={console.log}
        renderCard={({ title, description }, { removeCard, dragging }) => (
          <Card
            title={title}
            description={description}
            removeCard={removeCard}
            dragging={dragging}
          />
        )}
      >
        {board}
      </Board>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  border-right: 1px solid black;
  height: 100%;
  width: 100%;
  padding: 20px 50px;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const StartButton = styled.button`
  position: absolute;
  right: 20px;
  top: 10px;
  background-color: var(--light-green);
  width: 200px;
  height: 50px;
  border-radius: 10px;
`;

export default Items;
