import React from 'react';

import Browser from './Windows/Browser';
import Games from './Windows/Games/index';
import Youtube from './Windows/Youtube/index';
import Deezer from './Windows/Deezer/index';
import Activities from './Windows/Activities/index';
import Widgets from './Windows/Widgets';
import Preferences from './Windows/Preferences';
import Settings from './Windows/Settings';

const windowCenter = { x: window.innerWidth / 4, y: window.innerHeight / 4 };
const miniWindow = { width: 50, height: 50 };

export const DEFAULTS = {
  defaultWindowPosition: { x: 0, y: 0 },
  defaultWindowSize: { width: 100, height: 100 },
}

export const APPS = {
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
  widgets: {
    name: 'Widgets',
    component: props => (<Widgets {...props} />),
    position: windowCenter,
    size: miniWindow,
  },
  preferences: {
    name: 'Preferences',
    component: props => (<Preferences {...props} />),
    position: windowCenter,
    size: miniWindow,
  },
  settings: {
    name: 'Settings',
    component: props => (<Settings {...props} />),
    position: windowCenter,
    size: miniWindow,
  }
};
