import { createReducer, combineReducers } from "@reduxjs/toolkit";
import actions from "../actions/actions";
import data from "../../workers";

let init = data.getTasks(10);

const tasks = createReducer(init, {
  [actions.addTask]: (state, action) => {
    return [...state, action.payload];
  },
  [actions.removeTask]: (state, action) => {
    return state.filter((el) => el.id !== action.payload);
  },
});

const initWorkers = data.getWorkers(25);

const workers = createReducer(initWorkers, {
  [actions.getWorkers]: (state, action) => {
    return data.getWorkers(action.payload);
  },
  [actions.editShift]: (state, { payload }) => {
    const worker = state.workers.find((el) => el.number === payload.id);
    worker.shift = {
      ...worker.shift,
      start: payload.start,
      end: payload.end,
      sum: payload.sum,
    };
    return [...workers.filter((el) => el.id !== payload.id), worker];
  },
});

export default { tasks, workers };
