import client from '@utility/client';
import { initialState } from './state';

export const ADD_LEVEL = 'ADD_LEVEL';
export const ADD_LEVEL_FAILURE = 'ADD_LEVEL_FAILURE';
export const FETCH_LEVELS = 'FETCH_LEVELS_SUCCESS';
export const FETCH_LEVELS_FAILURE = 'FETCH_LEVELS_FAILURE';

export const fetchLevels = () => async (dispatch) => {
  try {
    const response = await client.get('/levels');

    dispatch({ type: FETCH_LEVELS, text: response.data });
  } catch (error) {
    dispatch({ type: FETCH_LEVELS_FAILURE, text: error.message });
  }
};

export const addLevel = (levelData) => async (dispatch) => {
  try {
    const response = await client.post('/levels', levelData);

    dispatch({ type: ADD_LEVEL, text: response.data });
  } catch (error) {
    dispatch({ type: ADD_LEVEL_FAILURE, payload: error.message });
  }
};

export function levelsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_LEVELS:
      return [...state, ...action.text];
    case ADD_LEVEL:
      return [...state, action.text];
    default:
      return state;
  }
}
