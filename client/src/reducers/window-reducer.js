const initialState = {
  openWindows: {},
}

export default function windowReducer(state = initialState, action) {
  const { openWindows } = state;
  const { app } = action;

  switch(action.type) {
    case 'OPEN_WINDOW': {
      return {
        ...state,
        openWindows: {
          ...openWindows,
          [app]: {
            ...openWindows[app],
            isOpen: true,
          }
        }
      }
    }

    case 'CLOSE_WINDOW': {
      return {
        ...state,
        openWindows: {
          ...openWindows,
          [app]: {
            ...openWindows[app],
            isOpen: false,
          }
        }
      }
    }

    default: {
      return state;
    }
  }
}
