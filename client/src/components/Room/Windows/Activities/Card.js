import React from 'react';
import styled from 'styled-components';

import { GrClose } from 'react-icons/gr';

import CircularProgress from './CircularProgress';

function Card({ title, description }) {
  return (
    <Wrapper>
      <Header>
        <StyledInput
          type='text'
          className='title'
          defaultValue={title}
        />
        <button type='button'>
          <GrClose />
        </button>
      </Header>
      <StyledInput
        type='text'
        className='description'
        defaultValue={description}
      />
      <ProgressContainer>
        <CircularProgress
          progress={50}
          size={70}
          strokeWidth={4}
          elapsedColor='red'
          shadowColor='gray'
        />
      </ProgressContainer>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
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
  cursor: grab;
`;

const StyledInput = styled.input`
  border: none;
  text-align: center;
`;

const Header = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 5px;
  margin-bottom: 10px;

  button {
    position: absolute;
    right: 0;
    top: 0;
  }
`;

const ProgressContainer = styled.div`
  position: absolute;
  right: 100px;
`;

export default Card;
