import React from 'react';
import styled from 'styled-components';

import Widgets from '../Widgets/index';

import { WIDGETS } from '../appConstants';
import { toArray } from '../../../utils/index';

function WidgetSelector({ appWindow }) {
  return (
    <Wrapper>
      {toArray(WIDGETS).map(([id, widget], index) => {
        const { component } = widget;

        return (
          <Widgets
            key={`${id}${index}`}
            appWindow={appWindow}
            containing={id}
          >
            {component()}
          </Widgets>
        )
      })}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
`;

export default WidgetSelector;
