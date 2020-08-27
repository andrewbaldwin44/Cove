import React, { useState } from 'react';
import styled from 'styled-components';

function AppCheckbox({ id, app, addApp }) {
  const { name, icon } = app;

  const [isSelected, setIsSelected] = useState(false);

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
