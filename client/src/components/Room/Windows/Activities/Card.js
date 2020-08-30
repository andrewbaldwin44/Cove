import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';

import { GrClose } from 'react-icons/gr';

import CircularProgress from './CircularProgress';

import { ActivitiesContext } from './ActivitiesContext';

function Card({ id, position, title, description, time, deleteCard }) {
  const {
    isStarted,
    setStartTimer,
    activityPlaying,
    setActivityPlaying,
    updateCardContent,
  } = useContext(ActivitiesContext);

  const [playCard, setPlayCard] = useState(false);

  const handleClick = event => {
    event.stopPropagation();

    const { target } = event;

    if (target.classList.contains('close-button')) {
      deleteCard(id);
    }
  }

  const activityEnded = () => {
    setPlayCard(false);
    setActivityPlaying(activityPlaying + 1);
  }

  useEffect(() => {
    if (isStarted && activityPlaying === position) {
      setPlayCard(true);
    }
  }, [isStarted, activityPlaying, position]);

  useEffect(() => {
    setStartTimer(isStarted);
    // eslint-disable-next-line
  }, [isStarted]);

  return (
    <Wrapper onMouseDown={handleClick}>
      <Header>
        <StyledInput
          onBlur={(event) => updateCardContent(event, 'title', id)}
          type='text'
          defaultValue={title}
        />
        <button
          className='close-button'
          type='button'
        >
          <GrClose className='close-button' />
        </button>
      </Header>
      <StyledInput
        onBlur={(event) => updateCardContent(event, 'description', id)}
        type='text'
        defaultValue={description}
      />
      <ProgressContainer>
        <CircularProgress
          progress={50}
          size={70}
          strokeWidth={4}
          elapsedColor='#CE5374'
          shadowColor='#4B515D'
          isStarted={playCard}
          endCallBack={activityEnded}
          id={id}
          timeLimit={time}
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
  border: 3px solid var(--activity-red);
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
    width: 30px;
    height: 30px;
    z-index; 10;
  }
`;

const ProgressContainer = styled.div`
  position: absolute;
  right: 100px;
`;

export default Card;
