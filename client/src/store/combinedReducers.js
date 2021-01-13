import { combineReducers } from 'redux';
import UserReducer from './user-reducer';
import AppReducer from './app-reducer';

const combinedReducers = combineReducers({
  user: UserReducer,
  app: AppReducer
});

export default combinedReducers;
