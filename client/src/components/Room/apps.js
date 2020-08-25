import React from 'react';

import Browser from './Windows/Browser';
import Games from './Windows/Games/index';
import Youtube from './Windows/Youtube/index';
import Deezer from './Windows/Deezer/index';
import Activities from './Windows/Activities/index';

export const apps = {
  web: {
    name: 'Web',
    component: props => (<Browser {...props} />)
  },
  games: {
    name: 'Games',
    component: props => (<Games {...props} />)
  },
  youtube: {
    name: 'YouTube',
    component: props => (<Youtube {...props} />)
  },
  deezer: {
    name: 'Deezer',
    component: props => (<Deezer {...props} />)
  },
  activity: {
    name: 'Timed Activities',
    component: props => (<Activities {...props} />)
  },
};
