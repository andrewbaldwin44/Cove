import React, { createRef, useState } from 'react';
import styled from 'styled-components';

import AppHeader from './AppHeader';

import { BsSearch } from 'react-icons/bs';

function Browser() {
  const searchInput = createRef();

  const [url, setUrl] = useState('');

  const getWebsite = event => {
    event.preventDefault();

    setUrl(searchInput.current.value);
  }

  return (
    <>
      <AppHeader>
        <form onSubmit={getWebsite}>
          <Search
            type='text'
            ref={searchInput}
            placeholder='Url'
          />
          <SearchButton
            type='submit'
          >
              <BsSearch />
          </SearchButton>
        </form>
      </AppHeader>
      <StyledIframe
        src={url}
        width='100%'
      />
    </>
  )
}

const Search = styled.input`
  height: 40px;
  width: 70vw;
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

const StyledIframe = styled.iframe`
  margin-top: 70px;
  height: calc(100% - 50px);
`;

export default Browser;
