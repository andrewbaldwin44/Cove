import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { APPS } from '../../appConstants';

function AppCheckbox({ id, app, addApp, selectedActionBar }) {
  const { name, icon } = app;

  const initalSelected = selectedActionBar.includes(id);
  const [isSelected, setIsSelected] = useState(initalSelected);

  useEffect(() => {
    setIsSelected(initalSelected);
  }, [selectedActionBar]);

  console.log('initial: ', initalSelected, 'isSelected:', isSelected)

  const handleSelection = () => {
    const newIsSelected = !isSelected

    setIsSelected(newIsSelected);
    addApp(id, newIsSelected);
  }

  return (
    <Wrapper
      isSelected={isSelected}
      onClick={handleSelection}
    >
      <img src={icon} alt='App' />
      {name}
    </Wrapper>
  )
}

const Wrapper  = styled.div`
  display: flex;
  align-items: center;
  width: calc((100% / 3) - 5px);
  padding-left: 10px;
  margin-right: 5px;
  margin-bottom: 5px;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${({ isSelected }) => isSelected ? 'var(--light-blue)' : ''};


  img {
    height: 50px;
    width: 50px;
    margin-right: 10px;
  }
`;

export default AppCheckbox;
