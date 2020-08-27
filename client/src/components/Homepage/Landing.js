import React from 'react';
import styled from 'styled-components';

import Features from './Features';
import Beach from '../../assets/images/landing.jpeg';

function Landing() {
  return (
    <>
      <Wrapper>
        <TextContent>
          <h2>Welcome to Cove</h2>
          <h3>The ultimate collaborative platform</h3>
        </TextContent>
        <Overlay />
      </Wrapper>
      <Features />
    </>
  )
}

const Wrapper = styled.div`
  position: relative;
  height: 220px;
  width: 100%;
  background-image: url(${Beach});
  background-size: cover;
  border: 1px solid black;
`;

const TextContent = styled.div`
  position: absolute;
  text-align: center;
  color: white;
  font-family: 'Oswald', sans-serif;
  line-height: 1.4;
  left: 50%;
  top: calc(220px / 2);
  transform: translate(-50%, -50%);
  z-index: 5;

  h2 {
    font-family: inherit;
    font-size: 5em;
    font-weight: 500;
    text-shadow: var(--heading-text-shadow);
  }

  h3 {
    font-style: italic;
    font-size: 1.5em;
    color: #f5f5f5;
  }
`;

const Overlay = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background: linear-gradient(to bottom, rgba(0,0,0,0.25) 100%, rgba(255,255,255,0.15) 0%);
`;

export default Landing;
