import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';

import AppCheckbox from './AppCheckbox';

import { APPS, UTILITY_APPS } from '../../appConstants';
import { toArray, capitalizeFirstLetter } from '../../../../utils';
import { sendChanges } from '../../hooks/useSockets';
import { SOCKET_PATHS } from '../../../../constants';

import { RoomContext } from '../../RoomContext';

const { ACTION_BAR_CHANGE } = SOCKET_PATHS;

function AppSelect() {
  const {
    actionBars,
    updateActionBars,
    updateActionBarDatabase,
  } = useContext(RoomContext);

  const [actionBar, setActionBar] = useState(actionBars['bottom']);
  const [selection, setSelection] = useState('bottom');

  useEffect(() => {
    setActionBar(actionBars[selection]);
    // eslint-disable-next-line
  }, [actionBars]);

  const toggleApp = (app, isSelected) => {
    const newActionBars = { ...actionBars };
    const newSelectedApps = [...actionBar.apps];

    if (isSelected) {
      newSelectedApps.push(app);
    }
    else {
      const index = newSelectedApps.indexOf(app);
      newSelectedApps.splice(index, 1);
    }

    newActionBars[selection].apps = newSelectedApps;

    updateActionBars(newActionBars);
    updateActionBarDatabase(newActionBars);
    sendChanges(ACTION_BAR_CHANGE, newActionBars);
  }

  const handleSelectedOption = event => {
    const { target: { value } } = event;

    setActionBar(actionBars[value]);
    setSelection(value);
  }

  return (
    <Wrapper>
      <BarSelect>
        <select
          name='action-bars'
          id='action-bars'
          onChange={handleSelectedOption}
          defaultValue='bottom'
        >
          {toArray(actionBars, 'keys').map((position, index) => {
            return (
              <option key={`actionbaroption${index}`} value={position}>
                {capitalizeFirstLetter(position)}
              </option>
            )
          })}
        </select>
        <label htmlFor='action-bars'>Action Bar</label>
      </BarSelect>
      <fieldset>
        <label htmlFor='app-select'>Choose your apps</label>
        <Apps>
          {toArray(APPS).map(([id, app], index) => {
            if (UTILITY_APPS.includes(id)) return null;

            return (
              <AppCheckbox
                key={`appCheckbox${index}`}
                id={id}
                app={app}
                toggleApp={toggleApp}
                actionBar={actionBar}
              />
            )
          })}
        </Apps>
      </fieldset>
    </Wrapper>
  )
}

const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 400px;
  padding: 40px 50px;
`;

const BarSelect = styled.fieldset`
  select {
    line-height: 1.3;
    padding: .6em 1.4em .5em .8em;
    width: 30%;
    box-sizing: border-box;
    margin-right: 10px;
    border: 1px solid #aaa;
    box-shadow: 0 1px 0 1px rgba(0,0,0,.04);
    border-radius: .5em;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-color: #fff;
    background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),
      linear-gradient(to bottom, #ffffff 0%,#e5e5e5 100%);
    background-repeat: no-repeat, repeat;
    /* arrow icon position (1em from the right, 50% vertical) , then gradient position*/
    background-position: right .7em top 50%, 0 0;
    /* icon size, then gradient */
    background-size: .65em auto, 100%;
    cursor: pointer;

    /* Hide arrow icon in IE browsers */
    .select-css::-ms-expand {
      display: none;
    }

    &:hover {
      border-color: #888;
    }

    &:focus {
      border-color: #aaa;
      box-shadow: 0 0 1px 3px rgba(59, 153, 252, .7);
      box-shadow: 0 0 0 3px -moz-mac-focusring;
      color: #222;
      outline: none;
    }

    option {
        font-weight: normal;
    }

  }
`;

const Apps = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 200px;
  padding: 10px 20px;
  margin-top: 20px;
  border: 1px solid var(--main-headers);
`;

export default AppSelect
