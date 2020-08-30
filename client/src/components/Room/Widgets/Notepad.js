import React from 'react';
import styled from 'styled-components';

function Notepad({ position }) {
  return (
    <Wrapper>
      <Header />
      <StyledTextArea />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 200px;
  box-shadow: 4px 4px 5px var(--dark-shadow);
`;

const Header = styled.div`
  width: 100%;
  height: 28px;
  background-color: #ffea00;
  border: none;
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  height: 200px;
  resize: none;
  padding: 10px 20px;
  margin: 0;
  //background-color: #ffee58;
  background-image: linear-gradient(190deg, #fffc00, #ffffff);
  border: none;
`;

export default Notepad;
