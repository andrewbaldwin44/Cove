import React, { createRef, useState, useEffect } from 'react';
import styled from 'styled-components';

import { BsSearch } from 'react-icons/bs';

import AppHeader from  '../AppHeader';
import Sidebar from './Sidebar';
import SearchedSongs from './SearchedSongs';

import { getDeezerSearch, getDeezerChart } from '../../../../utils/authenticationUtils';

function Home({ deezerID, userID }) {
  const searchInput = createRef();
  const [searchResults, setSearchResults] = useState([]);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);

  const requestDeezerResults = searchValue => {
    getDeezerSearch(searchValue, deezerID, userID)
      .then(({ searchResults }) => setSearchResults(searchResults))
  }

  const requestDeezerChart = () => {
      getDeezerChart()
        .then(({ deezerChart }) => setSearchResults(deezerChart.tracks.data));
  }

  const getSearchResults = event => {
    event.preventDefault();

    const searchValue = searchInput.current.value;

    if (searchValue.length > 0) {
      requestDeezerResults(searchValue)
    }
  }

  // homepage
  // eslint-disable-next-line
  useEffect(() => requestDeezerChart(), []);

  return(
    <Wrapper>
      <AppHeader>
        <form onSubmit={getSearchResults}>
          <DeezerSearch
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
      <Main>
        <Sidebar />
        <Body>
        <SearchedSongs
          searchResults={searchResults}
          setCurrentlyPlaying={setCurrentlyPlaying}
        />
        <Player
          scrolling='no'
          frameBorder='0'
          allowtransparency='true'
          src={`https://www.deezer.com/plugins/player?format=classic&playlist=true&autoplay=true \
                &color=007FEB&layout=dark&size=medium&type=tracks&id=${currentlyPlaying}& \
                app_id=431662`}
        />
        </Body>
      </Main>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const DeezerSearch = styled.input`
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

const Main = styled.div`
  display: flex;
  height 100%;
  width: 100%;
  max-height: calc(100% - var(--window-header-height));
  margin-top: var(--window-header-height);
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  height 100%;
  width: 90%;
`;

const Player = styled.iframe`
  width: 100%;
  height: 90px;
`;

export default Home;
