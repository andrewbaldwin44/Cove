import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';

import Windows from '../Windows/index';
import Browser from '../Windows/Browser';

import { toArray } from '../../utils/index';

import { AuthenticationContext } from '../AuthenticationContext';

function WindowManager({ roomID }) {
  const {
    database,
  } = useContext(AuthenticationContext);

  const [openWindows, setOpenWindows] = useState([]);

  useEffect(() => {
    const windowStateReference = database.collection('rooms').doc('state')
                                         .collection(roomID).doc('Windows');

    const observer = windowStateReference.onSnapshot(snapshot => {
      const data = snapshot.data() || [];
      const openWindows = toArray(data);
      setOpenWindows(openWindows);
    });

    return () => observer();
    // eslint-disable-next-line
  }, []);

  const handleWindowClose = app => {
    const reference = database.collection('rooms').doc('state')
                              .collection(roomID).doc('Windows');
    reference.set({
      [app]: {
        isOpen: false
      }
    });
  }

  return (
    <Wrapper>
      {openWindows.map(([app, appState], index) => {
        if (app === 'web' && appState.isOpen) {
          return (
            <Windows
              key={`window${index}`}
              title={'Web'}
              handleWindowClose={handleWindowClose}
            >
              <Browser />
            </Windows>
          )
        }
        else return null;
      })}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: fixed;
  height: 100vh;
  width: 0;
`;

export default WindowManager;
