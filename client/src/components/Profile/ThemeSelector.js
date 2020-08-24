import React from 'react';
import styled from 'styled-components';

import { useDispatch } from "react-redux";
import { changeTheme } from '../../actions';

import { themes } from '../../themes';
import { toArray } from '../../utils/index';

function ThemeSelector({ selectedTheme, setSelectedTheme }) {
  const dispatch = useDispatch();

  const handleThemeSelection = (theme, colors) => {
    if (theme !== selectedTheme) {
      setSelectedTheme(theme);
      dispatch(changeTheme(colors));
    }
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
                src={img}
                alt={`${name} Theme`}
                theme={theme}
                selectedTheme={selectedTheme}
                onClick={() => handleThemeSelection(theme, colors)}
              />
              <span>{name}</span>
            </ThemeContainer>
          )
        })}
      </Icons>
    </Wrapper>
  )
}

const Wrapper = styled.div`
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

const ThemeIcon = styled.img`
  height: 110px;
  width: 110px;
  border-radius: 50%;
  cursor: pointer;
  border: ${({ theme, selectedTheme }) => {
    return theme === selectedTheme
      ? '2px solid var(--main-red)'
      : '';
  }};
`;

export default ThemeSelector;
