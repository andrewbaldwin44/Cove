import React, { useContext, createRef, useState, useEffect } from 'react';
import styled from 'styled-components';

import { BsSearch } from 'react-icons/bs';

import AppHeader from '../AppHeader'
import SearchedVideos from './SearchedVideos';
import Video from './Video';

import YoutubeHead from '../../../../assets/images/youtube-head.png';

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
      <AppHeader>
        <StyledYoutubeHead src={YoutubeHead} alt='Youtube' />
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
      </AppHeader>
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

const StyledYoutubeHead = styled.img`
  height: 50px;
  width: 140px;
  position: absolute;
  left: 200px;
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
