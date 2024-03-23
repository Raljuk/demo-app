import { initialState } from './state';

export const ADD_LEVEL = 'ADD_LEVEL';

export function addLevel(text) {
  return { type: ADD_LEVEL, text };
}

export function levelsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_LEVEL:
      return [...state, action.text];
    default:
      return state;
  }
}
