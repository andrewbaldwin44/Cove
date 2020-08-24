import Default from './assets/images/themes/default.jpeg';
import Dark from './assets/images/themes/dark.jpeg';
import Vampire from './assets/images/themes/vampire.jpeg';
import Glacier from './assets/images/themes/glacier.png';
import Lavendar from './assets/images/themes/lavendar.jpeg';
import HotPink from './assets/images/themes/hot-pink.jpeg';

export const themes = {
  default: {
    img: Default,
    name: 'Default',
    colors: {
      mainHeaders: '#444146',
      mainBackground: 'white',
    }
  },
  dark: {
    img: Dark,
    name: 'Dark',
    colors: {
      mainHeaders: '#444146',
      mainBackground: '#4B515D',
      fontColor: '#212121',
    }
  },
  vampire: {
    img: Vampire,
    name: 'Vampire',
    colors: {
      mainHeaders: '#b71c1c',
      mainBackground: '#4B515D',
      fontColor: '#f44336',
    }
  },
  glacial: {
    img: Glacier,
    name: 'Glacial',
    colors: {
      mainHeaders: '#006064',
      mainBackground: '#4dd0e1',
    }
  },
  lavendar: {
    img: Lavendar,
    name: 'Lavendar',
    colors: {
      mainHeaders: '#8e24aa',
      mainBackground: '#9575cd',
    }
  },
  hotPink: {
    img: HotPink,
    name: 'Hot Pink',
    colors: {
      mainHeaders: '#c51162',
      mainBackground: '#f06292',
    }
  },
}
