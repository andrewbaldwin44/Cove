import React from 'react';
import styled from 'styled-components';

function CallButton({ text, icon, callBack }) {
  return (
    <Wrapper onClick={callBack}>
      {icon && (
        icon
      )}
      {text}
    </Wrapper>
  )
}

const Wrapper = styled.button`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-between;

  top: 25px;
  right: 30px;

  color: white;
  height: 60px;
  min-width: 200px;
  padding: 30px 20px;
  background-image: linear-gradient(60deg, var(--light-green), var(--secondary-green));
  //background-image: linear-gradiant
  //background-color: var(--light-green);
  font-size: 1.2em;
  border-radius: 15px;

  svg {
    font-size: 1.5em;
    margin-right: 10px;
  }
`;

export default CallButton;
