import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

import Header from '../Header/index';
import User from './User';

import { AuthenticationContext } from '../AuthenticationContext';

import { isContainingData, isEmptyData } from '../../utils/index';

function Profile() {
  const {
    userData,
  } = useContext(AuthenticationContext);

  return (
    <>
      <Header />
      <Wrapper>
        {isContainingData(userData) && (
          <User userData={userData} />
        )}
        {isEmptyData(userData) && (
          <Redirect from='/users/profile' to='/users/log_in' />
        )}
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: var(--navbar-height);
  margin-left: 90px;
`;

export default Profile;
