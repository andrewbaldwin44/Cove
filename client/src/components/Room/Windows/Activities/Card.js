import React from 'react';
import styled from 'styled-components';

import { GrClose } from 'react-icons/gr';

function Card({ title, description, removeCard, dragging }) {
  return (
    <Wrapper dragging={dragging}>
      <Header>
        <span className='title'>{title}</span>
        <button type="button" onClick={removeCard}>
          <GrClose />
        </button>
      </Header>
      <span className='description'>{description}</span>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100px;
  width: 780px;
  border: 3px solid red;
  margin-top: 20px;
  margin-bottom: 10px;
  padding: 10px 20px;
  background-color: white;

  .title {
    font-weight: bold;
    padding-bottom: 30px;
  }
`;

const Header = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  button {
    position: absolute;
    right: 0;
    top: 0;
  }
`;

export default Card;
