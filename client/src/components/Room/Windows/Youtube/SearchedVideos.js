import React, { useContext } from 'react';
import styled from 'styled-components';

import { RoomContext } from '../../RoomContext';

function SearchedVideos({ searchResults }) {
  const {
    navigateToInnerWindow,
  } = useContext(RoomContext);

  return (
    <Body>
      {searchResults.map((result, index) => {
        const {
          id: {
            videoId
          },
          snippet: {
            title,
            channelTitle,
            thumbnails: {
              medium: {
                url,
                width,
                height
              }
            },
          }
        } = result;

        return (
          <Result
            key={`${index}${videoId}`}
            style={{ height, width, minWidth: width }}
            onClick={() => navigateToInnerWindow(videoId, 'youtube')}
          >
            <img
              src={url}
              style={{ height, width }}
              alt='Youtube Thumbnail'
            />
            <div
              style={{ width }}
              className='video-information'
            >
              <span className='video-title'>{title}</span>
              <span className='video-channel'>{channelTitle}</span>
            </div>
          </Result>
        )
      })}
    </Body>
  )
}

const Result = styled.div`
  margin: 0 auto;
  margin-bottom: 120px;
  cursor: pointer;

  .video-information {
    display: flex;
    flex-direction: column;
    padding-left: 5px;
    margin-top: 10px;
  }

  .video-title {
    font-weight: bold;
    margin-bottom: 8px;
  }

  .video-channel {
    font-size: 0.9em;
    padding-left: 5px;
  }
`;

const Body = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 90px;
  height: 100%;
`;

export default SearchedVideos;
