import React, { useContext } from 'react';
import styled from 'styled-components';

import Widget from './Widgets/index';

import { RoomContext } from './RoomContext';

import { WIDGETS, DEFAULTS } from './appConstants';
import { toArray } from '../../utils/index';

const { defaultWidgetPosition } = DEFAULTS;

function WidgetManager() {
  const {
    openWidgets,
  } = useContext(RoomContext);

  return (
    <Wrapper>
      {toArray(openWidgets).map(([widget, widgetState], index) => {

        const {
          component,
          position = defaultWidgetPosition,
        } = WIDGETS[widget]

        if (widgetState.isOpen) {
          return (
            <Widget
              key={`${widget}container${index}`}
              position={position}
              containing={widget}
            >
              {component()}
            </Widget>
          )
        }
        else return null
      })}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: fixed;
  height: 100vh;
  width: 0;
`;

export default WidgetManager;
