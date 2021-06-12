import { createReducer, combineReducers } from '@reduxjs/toolkit';
import actions from '../actions/actions'
import data from '../../workers'
let init = data.getTasks(10);

const tasks = createReducer(init, {
    [actions.addTask]: (state, action) => {return [...state, action.payload]},
    [actions.removeTask]: (state, action) => {return state.filter(el=>el.id !== action.payload)}
  });

  export default tasks;