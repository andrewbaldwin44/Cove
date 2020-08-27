import React from 'react';
import styled from 'styled-components';

import Youtube from '../../assets/images/youtube.png';
import Deezer from '../../assets/images/deezer.png';
import Netflix from '../../assets/images/netflix.png';
import Placeholder from '../../assets/images/placeholder.jpeg';

function Features() {
  return (
    <Wrapper>
      <Row>
        <TileItem>
          <Title>
            <h4>All your favorite apps</h4>
            <p>All in one place</p>
          </Title>
        </TileItem>
        <TileItem>
          <AppPresent>
            <img src={Youtube} alt='Youtube' />
            <img src={Deezer} alt='Deezer' />
            <img src={Netflix} alt='Netflix' />
          </AppPresent>
        </TileItem>
      </Row>

      <Row>
        <TileItem>
          <img src={Placeholder} alt='Video Call' />
        </TileItem>
        <TileItem>
          <Title>
            <h4>Seamlessly intergreated</h4>
            <p>With video chat and live updating</p>
          </Title>
        </TileItem>
      </Row>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 30px 100px;
  line-height: 1.5;
  overflow: hidden;

  h4 {
    font-size: 2em;
  }

  p {
    font-size: 1.4em;
    color: var(--light-gray);
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  width: 100%;
  margin-bottom: 100px;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
`;

const TileItem = styled.div`
  display: flex;
  justify-content: center;
  width: 50%;
`;

const AppPresent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 250px;

  img {
    width: 70px;
    height: 70px;
  }
`;

export default Features
