import React, { createRef, useState } from 'react';
import styled from 'styled-components';

import { BsSearch } from 'react-icons/bs';

function Home({ deezerID }) {
  const searchInput = createRef();
  const [searchResults, setSearchResults] = useState([]);

  const requestDeezerResults = searchValue => {
    fetch(`/api/deezer_search?search=${searchValue}&code=${deezerID}`)
      .then(response => response.json())
      .then(({ searchResults }) => {
        console.log(searchResults)
        setSearchResults(searchResults)
      })
  }

  const getSearchResults = event => {
    event.preventDefault();

    const searchValue = searchInput.current.value;

    if (searchValue.length > 0) {
      requestDeezerResults(searchValue)
    }
  }

  return(
    <Wrapper>
      <Header>
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
      </Header>
      Whooooooo
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

export default Home;
