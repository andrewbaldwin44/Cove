const initialState = {
  openWindows: [],
}

export default function windowReducer(state = initialState, action) {
  switch(action.type) {
    case 'OPEN_APP': {
      console.log(action.app)
      const newWindow = { [action.app]: true };
      return {
        ...state,
        openWindows: [
          ...state.openWindows,
          newWindow,
        ]
      }
    }

    default: {
      return state;
    }
  }
}
