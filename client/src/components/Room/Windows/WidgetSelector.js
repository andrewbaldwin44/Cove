import React, { useState } from 'react';
import styled from 'styled-components';

import Widget from '../Widgets/index';

import { WIDGETS } from '../appConstants';
import { toArray } from '../../../utils/index';

function WidgetSelector({ appWindow }) {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <Wrapper>
      {toArray(WIDGETS).map(([id, widget], index) => {
        const { name, icon, component } = widget;

        return (
          <Widget
            key={`${id}${index}`}
            appWindow={appWindow}
            containing={id}
            isSelected={isSelected}
            setIsSelected={setIsSelected}
            parent='selector'
          >
            {isSelected ? (
              component()
            ) : (
              <Container>
                <Icon
                  src={icon}
                  alt={`${name}${index}`}
                  draggable='false'
                />
                <span>{name}</span>
              </Container>
            )}
          </Widget>
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
  padding: 20px 30px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Icon = styled.img`
  height: 50px;
  wdith: 50px;
  padding-bottom: 5px;
`;

export default WidgetSelector;
