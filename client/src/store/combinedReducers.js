import { combineReducers } from 'redux';
import UserReducer from './user-reducer';

const combinedReducers = combineReducers({
  user: UserReducer
});

export default combinedReducers;
