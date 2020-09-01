import React from 'react';

import Browser from './Windows/Browser';
import Games from './Windows/Games/index';
import Youtube from './Windows/Youtube/index';
import Deezer from './Windows/Deezer/index';
import Activities from './Windows/Activities/index';
import Widgets from './Windows/WidgetSelector';
import Preferences from './Windows/Preferences/index';
import Members from './Windows/Members/index';
import Settings from './Windows/Settings';
import Notepad from './Widgets/Notepad';

import BrowserIcon from '../../assets/images/browser.png';
import GamesIcon from '../../assets/images/game.png';
import YoutubeIcon from '../../assets/images/youtube.png';
import DeezerIcon from '../../assets/images/deezer.png';
import ActivitiesIcon from '../../assets/images/activity.png';
import NotepadIcon from '../../assets/images/notepad.png';
import MemberIcon from '../../assets/images/default-profile.png';

const windowCenter = { x: window.innerWidth / 4, y: window.innerHeight / 4 };
const miniWindow = { width: 50, height: 50 };

export const UTILITY_APPS = ['widgets', 'preferences', 'settings'];

export const DEFAULTS = {
  defaultWindowPosition: { x: 0, y: 0 },
  defaultWindowSize: { width: 100, height: 100 },
  defaultWidgetPosition: { x: 90, y: 90 }
}

export const APPS = {
  web: {
    name: 'Web',
    component: props => (<Browser {...props} />),
    icon: BrowserIcon,
  },
  games: {
    name: 'Games',
    component: props => (<Games {...props} />),
    icon: GamesIcon,
  },
  youtube: {
    name: 'YouTube',
    component: props => (<Youtube {...props} />),
    icon: YoutubeIcon,
  },
  deezer: {
    name: 'Deezer',
    component: props => (<Deezer {...props} />),
    icon: DeezerIcon,
  },
  activity: {
    name: 'Timed Activities',
    component: props => (<Activities {...props} />),
    icon: ActivitiesIcon,
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
    position: { ...windowCenter, y: window.innerHeight / 6 },
    size: { ...miniWindow, height: 70 },
  },
  settings: {
    name: 'Settings',
    component: props => (<Settings {...props} />),
    position: windowCenter,
    size: miniWindow,
  },
  members: {
    name: 'Members',
    component: props => (<Members {...props} />),
    position: windowCenter,
    size: miniWindow,
    icon: MemberIcon,
  }
};

export const WIDGETS = {
  notepad: {
    name: 'Notepad',
    component: props => (<Notepad {...props} />),
    icon: NotepadIcon
  }
}
