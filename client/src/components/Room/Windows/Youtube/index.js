import React, { useContext, createRef, useState, useEffect } from 'react';
import styled from 'styled-components';

import { BsSearch } from 'react-icons/bs';

import SearchedVideos from './SearchedVideos';
import Video from './Video';

import { RoomContext } from '../../RoomContext';

function Youtube({ innerWindow }) {
  const {
    navigateInnerWindow,
  } = useContext(RoomContext);

  const searchInput = createRef();
  const [searchResults, setSearchResults] = useState([]);
  const [message, setMessage] = useState('');

  const requestYoutubeResults = searchValue => {
    fetch(`/api/youtube_search?search=${searchValue}`)
      .then(response => response.json())
      .then(({ searchResults, message }) => {
        if (searchResults) {
          setSearchResults(searchResults)
        }
        else {
          setMessage(message)
        }
      });
  }

  const getSearchResults = event => {
    event.preventDefault();

    const searchValue = searchInput.current.value;

    if (searchValue.length > 0) {
      requestYoutubeResults(searchValue)

      navigateInnerWindow('youtube');
    }
  }

  // homepage
  useEffect(() => requestYoutubeResults(''), []);

  return (
    <Wrapper>
      <Header>
        <form onSubmit={getSearchResults}>
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
      {message.length > 0 && (
        <Error>{message}</Error>
      )}
      {innerWindow ? (
        <Video
          videoId={innerWindow}
        />
      ) : (
        <SearchedVideos
          searchResults={searchResults}
        />
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  overflow-y: scroll;
  overflow-x: hidden;
  height: 100%;
`;

const Header = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 70px;
  background-color: var(--main-headers);
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

const Error = styled.div`
  color: red;
  margin: 80px 15px;
`;

export default Youtube;
