import { combineReducers } from 'redux';
import { levelsReducer } from './levels';
import { globalReducer } from './global';

const rootReducer = combineReducers({
  levels: levelsReducer,
  global: globalReducer,
});

export default rootReducer;
