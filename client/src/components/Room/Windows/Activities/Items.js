import React, { useState, createRef, useEffect } from 'react';
import styled from 'styled-components';

import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';

import { IoIosAdd } from 'react-icons/io';

import Card from './Card';

function Items({ isStarted }) {
  const [firstRender, setFirstRender] = useState(true);
  const [activityCards, setActivityCards] = useState(
    [
      {
        title: 'Push Ups',
        description: 'None',
        position: 0,
        id: 0,
      },
      {
        title: 'Sit Ups',
        description: 'None',
        position: 1,
        id: 1,
      },
      {
        title: 'Squats',
        description: 'None',
        position: 2,
        id: 2,
      },
      {
        title: 'Kick Ups',
        description: 'None',
        position: 3,
        id: 3,
      },
      {
        title: 'Kick Ups',
        description: 'None',
        position: 4,
        id: 4,
      },
      {
        title: 'Kick Ups',
        description: 'None',
        position: 5,
        id: 5,
      },
      {
        title: 'I am',
        description: 'None',
        position: 6,
        id: 6,
      }
    ]
  );

  console.log(activityCards);

  const SortableItem = SortableElement(({ value, index }) => {
    const { title, description } = value;
    return (
      <Card
        title={title}
        description={description}
      />
    )
  });

  const SortableList = SortableContainer(({ items }) => {
    return (
      <div>
          {items.sort((a, b) => a.position - b.position).map((value, index) => {
            return (
              <SortableItem
                key={value.id}
                value={value}
                index={index}
              />
            )
          })}
      </div>
    )
  });

  const scrollToBottom = () => {
    const activityElement = activityContainer.current;

    if (activityElement) {
      activityElement.scrollTop = activityElement.scrollHeight;
    }
  }

  const addCard = () => {
    const cardsLength = activityCards.length - 1;
    const previousActivity = activityCards[cardsLength];
    const { position: previousPosition, id: previousID } = previousActivity;

    const newActivityCard = {
      title: 'Title',
      description: 'Description',
      position: previousPosition + 1,
      id: previousID + 1,
    }

    if (firstRender) setFirstRender(false);
    setActivityCards([...activityCards, newActivityCard]);
  }

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const newActivityCards = arrayMove(activityCards, oldIndex, newIndex);

    for (let i = 0; i < newActivityCards.length; i++) {
      newActivityCards[i].position = i;
    }

    setActivityCards(newActivityCards);
  }

  useEffect(() => {
    if (!firstRender) scrollToBottom();
    // eslint-disable-next-line
  }, [activityCards, firstRender]);

  const activityContainer = createRef();

  return (
    <Wrapper ref={activityContainer}>
      <SortableList
        items={activityCards}
        onSortEnd={onSortEnd}
        axis='xy'
      />
    <AddButton onClick={addCard}>
          <IoIosAdd />
      </AddButton>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  border-right: 1px solid black;
  height: 100%;
  width: 70%;
  padding: 20px 50px;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const AddButton = styled.button`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 20px;
  top: 20px;
  height: 40px;
  width: 40px;
  border: 3px dashed var(--light-green);

  svg {
    color: var(--light-green);
    font-size: 1.4em;
  }
`;

export default Items;
