const initialState = {
  openWindows: {},
}

export default function windowReducer(state = initialState, action) {
  const { openWindows } = state;

  switch(action.type) {
    case 'OPEN_WINDOW': {
      const app = action.app;

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

    default: {
      return state;
    }
  }
}
