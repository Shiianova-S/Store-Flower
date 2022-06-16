import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/root.reducer';
import { composeWithDevTools } from '@redux-devtools/extension';

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware()))
