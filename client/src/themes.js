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
      secondaryHeaders: '#4B515D',
      mainBackground: 'white',
    }
  },
  dark: {
    img: Dark,
    name: 'Dark',
    colors: {
      mainHeaders: '#444146',
      secondaryHeaders: '#2E2E2E',
      mainBackground: '#4B515D',
      fontColor: '#212121',
    }
  },
  vampire: {
    img: Vampire,
    name: 'Vampire',
    colors: {
      mainHeaders: '#C33C54',
      secondaryHeaders: '#2E2E2E',
      mainBackground: '#4B515D',
      fontColor: '#f44336',
    }
  },
  glacial: {
    img: Glacier,
    name: 'Glacial',
    colors: {
      mainHeaders: '#006064',
      secondaryHeaders: '#00838f',
      mainBackground: '#80deea',
      overwrite: '#A18276',
      secondaryOverwrite: '#b69e95',
    }
  },
  lavendar: {
    img: Lavendar,
    name: 'Lavendar',
    colors: {
      mainHeaders: '#6a1b9a',
      secondaryHeaders: '#8e24aa',
      mainBackground: '#9575cd',
    }
  },
  hotPink: {
    img: HotPink,
    name: 'Hot Pink',
    colors: {
      mainHeaders: '#c51162',
      secondaryHeaders: '#f50057',
      mainBackground: '#f8bbd0',
    }
  },
}
