import { themes } from '../themes';

const initialState = {
  colors: themes.default.colors,
};

export default function itemsReducer(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_THEME': {
      return {
        ...state,
        colors: action.colors,
      }
    }
    default: {
      return state
    }
  }
}
