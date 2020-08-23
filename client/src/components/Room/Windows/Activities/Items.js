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
      ]
    }
  ]
};

function Items() {
  return (
    <Wrapper>
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
  width: 70%;
  padding: 20px 50px;
`;

export default Items;
