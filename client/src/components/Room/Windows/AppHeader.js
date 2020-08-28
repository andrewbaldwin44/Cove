import React from 'react';
import styled from 'styled-components';

function AppHeader({ children }) {
  return (
    <Wrapper>
      {children}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 70px;
  background-color: var(--secondary-headers);
`;

export default AppHeader;
