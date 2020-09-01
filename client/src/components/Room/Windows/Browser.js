import React, { createRef, useContext } from 'react';
import styled from 'styled-components';

import AppHeader from './AppHeader';

import { BsSearch } from 'react-icons/bs';
import BrowserIcon from '../../../assets/images/browser.png';

import { sendChanges } from '../hooks/useSockets';
import { SOCKET_PATHS } from '../../../constants';

import { RoomContext } from '../RoomContext';

const { SEND_URL } = SOCKET_PATHS;

function Browser() {
  const {
    url,
    setUrl,
  } = useContext(RoomContext);

  const searchInput = createRef();

  const getWebsite = event => {
    event.preventDefault();

    const newURL = searchInput.current.value;

    setUrl(newURL);
    sendChanges(SEND_URL, newURL);
  }

  return (
    <>
      <AppHeader>
        <form onSubmit={getWebsite}>
          <Search
            type='text'
            ref={searchInput}
            placeholder='Url'
            defaultValue={url}
          />
          <SearchButton
            type='submit'
          >
              <BsSearch />
          </SearchButton>
        </form>
      </AppHeader>
      <Body>
        {url ? (
          <StyledIframe
            src={url}
            width='100%'
          />
        ) : (
          <Landing>
            <img src={BrowserIcon} alt='Browser' />
            <div>
              <h4>Welcome to the Web!</h4>
              <span>Enter a URL to get Started</span>
            </div>
          </Landing>
        )}
      </Body>
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

const Body = styled.div`
  padding-top: 70px;
  height: 100%;
`;

const StyledIframe = styled.iframe`
  height: 100%;
`;

const Landing = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  img {
    height: 70px;
    width: 70px;
  }

  h4 {
    font-size: 1.2em;
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
    height: 50px;
    margin-left: 40px;
  }
`;

export default Browser;
