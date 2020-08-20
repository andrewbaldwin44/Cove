const initialState = {
  web: false,
}

export default function windowReducer(state = initialState, action) {
  switch(action.type) {
    case 'OPEN_APP': {
      return {
        ...state,
        [action.app]: true,
      }
    }

    default: {
      return state;
    }
  }
}
