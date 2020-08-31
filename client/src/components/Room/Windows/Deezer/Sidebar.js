import React from 'react';
import styled from 'styled-components';

function Sidebar() {
  return(
    <Wrapper>
      <h4>Home</h4>
      <Underline />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  min-width: 10%;
  width: 10%;
  height: 100%;
  padding: var(--window-header-height) 40px;
  box-shadow: 0 5px 5px var(--dark-shadow);

  h4 {
    font-size: 1.2em;
    font-weight: bold;
  }
`;

const Underline = styled.div`
  width: 60px;
  height: 5px;
  margin-top: 5px;
  background-color: var(--light-blue);
`;

export default Sidebar;
