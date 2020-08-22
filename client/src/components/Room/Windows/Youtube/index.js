import React, { useContext, createRef, useState } from 'react';
import styled from 'styled-components';

import { BsSearch } from 'react-icons/bs';

function Youtube() {
  const searchInput = createRef();
  const [searchResults, setSearchResults] = useState([]);

  const openVideo = () => {

  }

  const requestYoutubeResults = event => {
    event.preventDefault();

    const searchValue = searchInput.current.value;

    if (searchValue.length > 0) {
      fetch(`/api/youtube_search?search=${searchValue}`)
        .then(response => response.json())
        .then(({ searchResults }) => setSearchResults(searchResults));
    }
  }

  return (
    <Wrapper>
      <Header>
        <form onSubmit={requestYoutubeResults}>
          <YoutubeSearch
            type='text'
            ref={searchInput}
            placeholder='Search'
          />
          <SearchButton
            type='submit'
          >
              <BsSearch />
          </SearchButton>
        </form>
      </Header>
      <Body>
        {searchResults.map(result => {
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
              key={videoId}
              style={{ height, width }}
              onClick={() => openVideo(videoId)}
            >
              <img
                src={url}
                style={{ height, width }}
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
    </Wrapper>
  )
}

const Wrapper = styled.div`
  overflow-y: scroll;
  overflow-x: hidden;
  height: calc(100% - 50px);
`;

const Header = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 70px;
  background-color: var(--main-black);
`;

const YoutubeSearch = styled.input`
  height: 40px;
  width: 400px;
  padding-right: 2px;
  font-size: 1em;
`;

const SearchButton = styled.button`
  width: 70px;
  height: 40px;
  background-color:#4B515D;

  svg {
    color: white;
  }
`;

const Body = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 90px;
`;

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

export default Youtube;
