import { initialState } from './state';

export const SET_MODE = 'SET_MODE';

export function setMode(text) {
  return { type: SET_MODE, text };
}

export function globalReducer(state = initialState, action) {
  switch (action.type) {
    case SET_MODE:
      return { mode: action.text };
    default:
      return state;
  }
}
