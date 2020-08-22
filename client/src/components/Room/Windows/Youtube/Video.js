import React from 'react';
import styled from 'styled-components';

function Video({ videoId }) {
  return (
    <Body>
      <iframe
        width='100%'
        height='100%'
        title={videoId}
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder='0'
        allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen>
      </iframe>
    </Body>
  )
}

const Body = styled.div`
  margin-top: 70px;
  height: calc(100% - 72px);
`;

export default Video;
