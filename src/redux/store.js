import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import tasks from './reducers/reducers'

const rootReducer = combineReducers({
  tasks,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
