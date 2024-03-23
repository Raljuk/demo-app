import { createStore } from 'redux';
import reducers from '../reducers';

export const mockStore = (state = {}) => createStore(reducers, state);
