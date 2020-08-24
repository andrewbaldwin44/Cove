import React from 'react';
import styled from 'styled-components';

import { useDispatch } from "react-redux";
import { changeTheme } from '../../actions';

import { themes } from '../../themes';
import { toArray } from '../../utils/index';

import Default from '../../assets/images/default.jpeg';

function ThemeSelector() {
  const dispatch = useDispatch();

  const handleThemeSelection = colors => {
    dispatch(changeTheme(colors));
  }

  return (
    <Wrapper>
      <label>Choose a Theme</label>
      <Icons>
        {toArray(themes).map(([theme, attributes], index) => {
          const { img, name, colors } = attributes;

          return (
            <ThemeContainer key={`theme${index}`}>
              <ThemeIcon
                src={Default}
                alt='Theme'
                onClick={() => handleThemeSelection(colors)}
              />
              <span>{name}</span>
            </ThemeContainer>
          )
        })}
      </Icons>
    </Wrapper>
  )
}

const Wrapper = styled.form`
  height: 30%;
  width: 100%;
  margin: 20px 0;

  label {
    font-size: 1.1em;
    font-weight: bold;
  }
`;

const Icons = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const ThemeIcon = styled.img`
  height: 110px;
  width: 110px;
  border-radius: 50%;
  cursor: pointer;
`;

const ThemeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 55px;

  span {
    padding-top: 15px;
    font-style: italic;
  }
`;

export default ThemeSelector;
