import React from 'react';
import styled from "styled-components";

function Homepage() {
  return (
    <>
      <Add>
          Add +
      </Add>
    </>
  )
}

const Add = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--light-green);
  font-size: 28px;
  font-weight: bold;
  height: 150px;
  width: 200px;
  border: 5px dashed var(--light-green);
  border-radius: 10px;
  cursor: pointer;
`;

export default Homepage;
