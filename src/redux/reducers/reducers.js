import { createReducer } from "@reduxjs/toolkit";
import actions from "../actions/actions";
import data from "../../workers";

let init = data.getTasks(10);

const tasks = createReducer(init, {
  [actions.addTask]: (state, { payload }) => {
    return [...state, payload];
  },
  [actions.removeTask]: (state, { payload }) => {
    return state.filter((el) => el.id !== payload.task.id);
  },
});

const initWorkers = data.getWorkers(25);

const workers = createReducer(initWorkers, {
  [actions.getWorkers]: (state, action) => {
    return data.getWorkers(action.payload);
  },
  [actions.editShift]: (state, { payload }) => {
    if (!state[payload.id - 1].tasks[payload.task.id - 1]) {
      // if(!state.filter((el,i) => i === payload.id - 1 )[0].tasks.filter(el=>el.id === payload.task.id).length>0 ){
      let workers = state.filter((el, i) => i !== payload.id - 1);
      let worker = state[payload.id - 1];
      let tasks = worker.tasks
        ? [...worker.tasks, payload.task]
        : [payload.task];
      return [...workers, { ...worker, tasks: tasks }].sort(
        (a, b) => a.number - b.number,
      );
    }
  },
  [actions.removeShift]: (state, { payload }) => {
    if (
      state[payload.id - 1].tasks.filter((el) => el.id === payload.task.id)[0]
    ) {
      let workers = state.filter((el, i) => i !== payload.id - 1);
      let worker = state[payload.id - 1];
      let tasks = worker.tasks.filter((el) => el.id !== payload.task.id);
      return [...workers, { ...worker, tasks: tasks }].sort(
        (a, b) => a.number - b.number,
      );
    }
  },
  [actions.editShiftTime]: (state, { payload }) => {
    let workers = state.filter((el) => el.number !== payload.id);
    let worker = state[payload.id - 1];
    let shift = { ...payload.shift };
    return [...workers, { ...worker, shift: { ...shift } }].sort(
      (a, b) => a.number - b.number,
    );
  },
});

const initBuffer = null;

const buffer = createReducer(initBuffer, {
  [actions.addBufferTask]: (state, { payload }) => {
    return { ...payload };
  },
  [actions.removeBufferTask]: (state, { payload }) => {
    return initBuffer;
  },
});

const initTableBuffer = null;

const tableBuffer = createReducer(initTableBuffer, {
  [actions.addTableBufferTask]: (state, { payload }) => {
    return { ...payload };
  },
  [actions.removeTableBufferTask]: (state, { payload }) => {
    return initTableBuffer;
  },
});

export default { tasks, workers, buffer, tableBuffer };
