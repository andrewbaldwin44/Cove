import React, { useState } from 'react';
import styled from 'styled-components';

import { GrMicrophone, GrVideo } from 'react-icons/gr';
import { CgArrowsExpandDownLeft } from 'react-icons/cg'

function Call({ createVideoElement, userStream, peerStreams }) {
  const [strikeThru, setStrikeThu] = useState({ mic: true, video: true });

  const toggleVideo = () => {
    const toggle = !strikeThru.video;
    setStrikeThu({ ...strikeThru, video: toggle });
  }

  const toggleMic = () => {
    const toggle = !strikeThru.mic;
    setStrikeThu({ ...strikeThru, mic: toggle });
  }

  const [mainPeerStream, ...remainingPeerStreams] = peerStreams

  return (
    <Wrapper>
      <MainVideo>
        {createVideoElement(mainPeerStream, 1, false, '250px')}
        <Expand className='controls'>
          <CgArrowsExpandDownLeft />
        </Expand>
      </MainVideo>
      <VideoContainer peerStreams={peerStreams}>
        <MainVideo>
          {createVideoElement(userStream, 0, true)}
          <Controls className='controls'>
            <ControlContainer>
              <Strike strikeThru={strikeThru.video} />
              <GrVideo onClick={toggleVideo} />
            </ControlContainer>
            <ControlContainer>
              <Strike strikeThru={strikeThru.mic} />
              <GrMicrophone onClick={toggleMic} />
            </ControlContainer>
          </Controls>
        </MainVideo>
        {remainingPeerStreams.map((peerStream, index) => {
          return (
            createVideoElement(peerStream, index + 2) // user video is index 0, speaker is 1
          )
        })}
      </VideoContainer>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  right: 0px;
  width: 415px;
  height: 100%;
  margin: 30px 30px;
`;

const MainVideo = styled.div`
  position: relative;

  .controls {
      transition: opacity 0.4s;
  }

  &:hover > .controls {
    opacity: 1;
  }
`;

const Expand = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  bottom: 0;
  height: 50px;
  width: 100%;
  padding: 15px;
  opacity: 0;

  svg {
    font-size: 1.2em;
    color: white;
    cursor: pointer;
  }
`;

const VideoContainer = styled.div`
  margin-top: 60px;
  margin-left: auto;
  max-height: 363px;
  width: 60%;
  ${({ peerStreams }) => peerStreams.length > 2 && 'overflow-y: scroll'};

  box-shadow: -2px -2px 8px var(--dark-shadow),
              4px 4px 5px var(--dark-shadow);
`;

const Controls = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 45px;
  width: 100%;
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.8);
  bottom: 4px;
  border-radius: 5px;
  opacity: 0;

  svg {
    font-size: 1.2em;
    cursor: pointer;
  }
`;

const ControlContainer = styled.div`
  position: relative;
`;

const Strike = styled.div`
  position: absolute;
  height: 3px;
  top: -5px;
  left: 3px;
  width: ${({ strikeThru }) => strikeThru ? '32px' : 0};
  background-color: #ff5252;
  border-radius: 3px;
  transform: rotate(62deg);
  transform-origin: 0% 35%;
  transition: 0.4s width;
`;

export default Call;
